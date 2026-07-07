import crypto from 'crypto';
import { z, ZodType } from 'zod';

import {
  NombaApiEnvelope,
  NombaConfig,
  NombaEnvironment,
  NombaWebhookHeaders,
  NombaWebhookPayload,
  nombaEnvironmentSchema,
  nombaWebhookPayloadSchema,
} from '@/services/nomba/types';

const DEFAULT_TIMEOUT_MS = 15000;
const DEFAULT_TOKEN_REFRESH_SKEW_MS = 60_000;

const nombaRuntimeConfigSchema = z.object({
  environment: nombaEnvironmentSchema.default('sandbox'),
  baseUrl: z.string().url().optional(),
  timeoutMs: z.number().int().positive().default(DEFAULT_TIMEOUT_MS),
  clientId: z.string().min(1),
  clientSecret: z.string().min(1),
  accountId: z.string().min(1),
  webhookSecret: z.string().min(1).optional(),
});

export class NombaServiceError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = 'NombaServiceError';
  }
}

export class NombaConfigurationError extends NombaServiceError {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = 'NombaConfigurationError';
  }
}

export class NombaApiError extends NombaServiceError {
  readonly status: number;
  readonly code?: string;
  readonly description?: string;
  readonly details?: unknown;

  constructor(args: {
    message: string;
    status: number;
    code?: string;
    description?: string;
    details?: unknown;
    cause?: unknown;
  }) {
    super(args.message, { cause: args.cause as Error | undefined });
    this.name = 'NombaApiError';
    this.status = args.status;
    this.code = args.code;
    this.description = args.description;
    this.details = args.details;
  }
}

export class NombaWebhookVerificationError extends NombaServiceError {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = 'NombaWebhookVerificationError';
  }
}

export interface NombaRequestOptions<TResponse> {
  readonly config: NombaConfig;
  readonly path: string;
  readonly method?: 'GET' | 'POST';
  readonly accessToken?: string;
  readonly body?: unknown;
  readonly query?: Readonly<Record<string, string | undefined>>;
  readonly schema: ZodType<TResponse>;
  readonly signal?: AbortSignal;
}

export function resolveNombaBaseUrl(environment: NombaEnvironment): string {
  return environment === 'production'
    ? 'https://api.nomba.com'
    : 'https://sandbox.nomba.com';
}

export function getNombaConfig(overrides?: Partial<NombaConfig>): NombaConfig {
  const environmentInput =
    overrides?.environment ?? process.env.NOMBA_ENVIRONMENT ?? 'sandbox';

  const environment = nombaEnvironmentSchema.parse(environmentInput);
  const baseUrl = overrides?.baseUrl ?? process.env.NOMBA_BASE_URL;
  const timeoutMsInput =
    overrides?.timeoutMs ??
    (process.env.NOMBA_TIMEOUT_MS
      ? Number.parseInt(process.env.NOMBA_TIMEOUT_MS, 10)
      : undefined);

  const parsedConfig = nombaRuntimeConfigSchema.safeParse({
    environment,
    baseUrl,
    timeoutMs: timeoutMsInput,
    clientId: overrides?.credentials?.clientId ?? process.env.NOMBA_CLIENT_ID,
    clientSecret:
      overrides?.credentials?.clientSecret ?? process.env.NOMBA_CLIENT_SECRET,
    accountId:
      overrides?.credentials?.accountId ?? process.env.NOMBA_ACCOUNT_ID,
    webhookSecret:
      overrides?.credentials?.webhookSecret ?? process.env.NOMBA_WEBHOOK_SECRET,
  });

  if (!parsedConfig.success) {
    throw new NombaConfigurationError(
      `Invalid Nomba configuration: ${parsedConfig.error.message}`,
    );
  }

  return {
    environment: parsedConfig.data.environment,
    baseUrl:
      parsedConfig.data.baseUrl ??
      resolveNombaBaseUrl(parsedConfig.data.environment),
    timeoutMs: parsedConfig.data.timeoutMs,
    credentials: {
      clientId: parsedConfig.data.clientId,
      clientSecret: parsedConfig.data.clientSecret,
      accountId: parsedConfig.data.accountId,
      webhookSecret: parsedConfig.data.webhookSecret,
    },
  };
}

export function buildNombaHeaders(args: {
  readonly accountId: string;
  readonly accessToken?: string;
}): HeadersInit {
  return {
    'Content-Type': 'application/json',
    accountId: args.accountId,
    ...(args.accessToken
      ? { Authorization: `Bearer ${args.accessToken}` }
      : {}),
  };
}

export function buildNombaWebhookHeaders(
  headers: Headers | Record<string, string | string[] | undefined>,
): NombaWebhookHeaders {
  const getHeader = (name: string): string | undefined => {
    if (headers instanceof Headers) {
      return headers.get(name) ?? undefined;
    }

    const value = headers[name] ?? headers[name.toLowerCase()];

    if (Array.isArray(value)) {
      return value[0];
    }

    return value;
  };

  const signature = getHeader('nomba-signature');
  const timestamp = getHeader('nomba-timestamp');

  if (!signature || !timestamp) {
    throw new NombaWebhookVerificationError(
      'Missing required Nomba webhook headers.',
    );
  }

  return {
    signature,
    timestamp,
    algorithm: getHeader('nomba-signature-algorithm'),
    version: getHeader('nomba-signature-version'),
  };
}

export async function nombaRequest<TResponse>({
  config,
  path,
  method = 'GET',
  accessToken,
  body,
  query,
  schema,
  signal,
}: NombaRequestOptions<TResponse>): Promise<TResponse> {
  const url = new URL(path, ensureTrailingSlash(config.baseUrl));

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value) {
        url.searchParams.set(key, value);
      }
    }
  }

  let response: Response;

  try {
    response = await fetch(url.toString(), {
      method,
      headers: buildNombaHeaders({
        accountId: config.credentials.accountId,
        accessToken,
      }),
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: signal ?? AbortSignal.timeout(config.timeoutMs),
      cache: 'no-store',
    });
  } catch (error) {
    throw new NombaApiError({
      message: `Nomba request failed for ${method} ${url.pathname}.`,
      status: 0,
      cause: error,
    });
  }

  const rawResponse = await readResponseBody(response);

  if (!response.ok) {
    const envelope = tryParseApiEnvelope(rawResponse);

    throw new NombaApiError({
      message: `Nomba request failed with status ${response.status}.`,
      status: response.status,
      code: envelope?.code,
      description: envelope?.description,
      details: rawResponse,
    });
  }

  const parsed = schema.safeParse(rawResponse);

  if (!parsed.success) {
    throw new NombaApiError({
      message: 'Nomba response validation failed.',
      status: response.status,
      details: parsed.error.flatten(),
    });
  }

  return parsed.data;
}

export function parseNombaWebhookPayload(rawBody: string): NombaWebhookPayload {
  let parsedJson: unknown;

  try {
    parsedJson = JSON.parse(rawBody) as unknown;
  } catch (error) {
    throw new NombaWebhookVerificationError(
      'Webhook body is not valid JSON.',
      { cause: error as Error },
    );
  }

  const parsedPayload = nombaWebhookPayloadSchema.safeParse(parsedJson);

  if (!parsedPayload.success) {
    throw new NombaWebhookVerificationError(
      'Webhook payload failed schema validation.',
      { cause: parsedPayload.error },
    );
  }

  return parsedPayload.data;
}

export function buildNombaWebhookSignaturePayload(
  payload: NombaWebhookPayload,
  timestamp: string,
): string {
  const merchant = payload.data.merchant ?? {};
  const transaction = payload.data.transaction ?? {};

  const normalizedResponseCode =
    transaction.responseCode === null || transaction.responseCode === 'null'
      ? ''
      : (transaction.responseCode ?? '');

  return [
    payload.event_type ?? '',
    payload.requestId ?? '',
    merchant.userId ?? '',
    merchant.walletId ?? '',
    transaction.transactionId ?? '',
    transaction.type ?? '',
    transaction.time ?? '',
    normalizedResponseCode,
    timestamp,
  ].join(':');
}

export function generateNombaWebhookSignature(args: {
  readonly payload: NombaWebhookPayload;
  readonly secret: string;
  readonly timestamp: string;
}): string {
  const hashingPayload = buildNombaWebhookSignaturePayload(
    args.payload,
    args.timestamp,
  );

  return crypto
    .createHmac('sha256', args.secret)
    .update(hashingPayload)
    .digest('base64');
}

export function constantTimeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);

  if (left.length !== right.length) {
    return false;
  }

  return crypto.timingSafeEqual(left, right);
}

export function isAccessTokenExpired(
  expiresAt: string,
  skewMs = DEFAULT_TOKEN_REFRESH_SKEW_MS,
): boolean {
  const expiryTime = Date.parse(expiresAt);

  if (Number.isNaN(expiryTime)) {
    return true;
  }

  return expiryTime - skewMs <= Date.now();
}

async function readResponseBody(response: Response): Promise<unknown> {
  const contentType = response.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    return response.json();
  }

  return response.text();
}

function tryParseApiEnvelope(
  data: unknown,
): NombaApiEnvelope<unknown> | undefined {
  const envelopeSchema = z.object({
    code: z.string().optional(),
    description: z.string().optional(),
    data: z.unknown().optional(),
  });

  const parsed = envelopeSchema.safeParse(data);

  if (!parsed.success || !parsed.data.code || !parsed.data.description) {
    return undefined;
  }

  return parsed.data as NombaApiEnvelope<unknown>;
}

function ensureTrailingSlash(baseUrl: string): string {
  return baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
}
