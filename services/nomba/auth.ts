import {
  NombaAccessToken,
  NombaConfig,
  nombaAuthEnvelopeSchema,
} from '@/services/nomba/types';
import {
  getNombaConfig,
  isAccessTokenExpired,
  nombaRequest,
} from '@/services/nomba/utils';

interface CachedNombaAccessToken {
  readonly accessToken: NombaAccessToken;
}

const accessTokenCache = new Map<string, CachedNombaAccessToken>();

export interface NombaAuthOptions {
  readonly config?: Partial<NombaConfig>;
  readonly signal?: AbortSignal;
}

export async function getNombaAccessToken(
  options: NombaAuthOptions = {},
): Promise<NombaAccessToken> {
  const config = getNombaConfig(options.config);
  const cacheKey = createCacheKey(config);
  const cachedToken = accessTokenCache.get(cacheKey)?.accessToken;

  if (cachedToken && !isAccessTokenExpired(cachedToken.expiresAt)) {
    return cachedToken;
  }

  const freshToken = await issueNombaAccessToken({ config, signal: options.signal });

  accessTokenCache.set(cacheKey, {
    accessToken: freshToken,
  });

  return freshToken;
}

export async function issueNombaAccessToken(
  options: NombaAuthOptions = {},
): Promise<NombaAccessToken> {
  const config = getNombaConfig(options.config);

  const response = await nombaRequest({
    config,
    path: '/v1/auth/token/issue',
    method: 'POST',
    body: {
      grant_type: 'client_credentials',
      client_id: config.credentials.clientId,
      client_secret: config.credentials.clientSecret,
    },
    schema: nombaAuthEnvelopeSchema,
    signal: options.signal,
  });

  return {
    accessToken: response.data.access_token,
    refreshToken: response.data.refresh_token,
    expiresAt: response.data.expiresAt,
  };
}

export function clearNombaAccessTokenCache(config?: Partial<NombaConfig>): void {
  if (!config) {
    accessTokenCache.clear();
    return;
  }

  accessTokenCache.delete(createCacheKey(getNombaConfig(config)));
}

function createCacheKey(config: NombaConfig): string {
  return [
    config.environment,
    config.baseUrl,
    config.credentials.accountId,
    config.credentials.clientId,
  ].join(':');
}

