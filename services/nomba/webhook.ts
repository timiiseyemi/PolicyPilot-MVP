import { NombaConfig, NombaWebhookPayload } from '@/services/nomba/types';
import {
  NombaWebhookVerificationError,
  buildNombaWebhookHeaders,
  constantTimeEqual,
  generateNombaWebhookSignature,
  getNombaConfig,
  parseNombaWebhookPayload,
} from '@/services/nomba/utils';

export interface VerifyNombaWebhookSignatureInput {
  readonly rawBody: string;
  readonly headers: Headers | Record<string, string | string[] | undefined>;
  readonly secret?: string;
  readonly config?: Partial<NombaConfig>;
  readonly maxAgeMs?: number;
}

export interface VerifiedNombaWebhook {
  readonly payload: NombaWebhookPayload;
  readonly receivedAt: string;
}

export function verifyNombaWebhookSignature(
  input: VerifyNombaWebhookSignatureInput,
): VerifiedNombaWebhook {
  const secret =
    input.secret ?? getNombaConfig(input.config).credentials.webhookSecret;

  if (!secret) {
    throw new NombaWebhookVerificationError(
      'Nomba webhook secret is not configured.',
    );
  }

  const webhookHeaders = buildNombaWebhookHeaders(input.headers);
  const payload = parseNombaWebhookPayload(input.rawBody);

  if (
    webhookHeaders.algorithm &&
    webhookHeaders.algorithm.toLowerCase() !== 'hmacsha256'
  ) {
    throw new NombaWebhookVerificationError(
      `Unsupported Nomba webhook algorithm: ${webhookHeaders.algorithm}.`,
    );
  }

  if (input.maxAgeMs !== undefined) {
    assertWebhookTimestampFresh(webhookHeaders.timestamp, input.maxAgeMs);
  }

  const generatedSignature = generateNombaWebhookSignature({
    payload,
    secret,
    timestamp: webhookHeaders.timestamp,
  });

  if (!constantTimeEqual(generatedSignature, webhookHeaders.signature)) {
    throw new NombaWebhookVerificationError(
      'Nomba webhook signature verification failed.',
    );
  }

  return {
    payload,
    receivedAt: webhookHeaders.timestamp,
  };
}

export function isNombaPaymentSuccessWebhook(
  payload: NombaWebhookPayload,
): boolean {
  return payload.event_type === 'payment_success';
}

function assertWebhookTimestampFresh(
  timestamp: string,
  maxAgeMs: number,
): void {
  const receivedAt = Date.parse(timestamp);

  if (Number.isNaN(receivedAt)) {
    throw new NombaWebhookVerificationError(
      'Nomba webhook timestamp is invalid.',
    );
  }

  if (Math.abs(Date.now() - receivedAt) > maxAgeMs) {
    throw new NombaWebhookVerificationError(
      'Nomba webhook timestamp is outside the allowed window.',
    );
  }
}
