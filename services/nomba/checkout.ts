import {
  NombaCheckoutOrderResponse,
  NombaConfig,
  NombaCreateCheckoutOrderInput,
  NombaTransactionVerificationParams,
  NombaTransactionVerificationResponse,
  nombaCheckoutEnvelopeSchema,
  nombaTransactionVerificationEnvelopeSchema,
} from '@/services/nomba/types';
import { getNombaAccessToken } from '@/services/nomba/auth';
import {
  NombaConfigurationError,
  getNombaConfig,
  nombaRequest,
} from '@/services/nomba/utils';

export interface NombaCheckoutOptions {
  readonly config?: Partial<NombaConfig>;
  readonly accessToken?: string;
  readonly signal?: AbortSignal;
}

export async function createNombaCheckoutOrder(
  input: NombaCreateCheckoutOrderInput,
  options: NombaCheckoutOptions = {},
): Promise<NombaCheckoutOrderResponse> {
  const config = getNombaConfig(options.config);
  const accessToken =
    options.accessToken ??
    (await getNombaAccessToken({ config, signal: options.signal })).accessToken;

  const response = await nombaRequest({
    config,
    path: '/v1/checkout/order',
    method: 'POST',
    accessToken,
    body: input,
    schema: nombaCheckoutEnvelopeSchema,
    signal: options.signal,
  });

  return response.data;
}

export async function verifyNombaTransaction(
  params: NombaTransactionVerificationParams,
  options: NombaCheckoutOptions = {},
): Promise<NombaTransactionVerificationResponse> {
  if (!params.orderReference && !params.transactionRef) {
    throw new NombaConfigurationError(
      'Provide orderReference or transactionRef to verify a Nomba transaction.',
    );
  }

  const config = getNombaConfig(options.config);
  const accessToken =
    options.accessToken ??
    (await getNombaAccessToken({ config, signal: options.signal })).accessToken;

  const response = await nombaRequest({
    config,
    path: '/v1/transactions/accounts/single',
    method: 'GET',
    accessToken,
    query: {
      orderReference: params.orderReference,
      transactionRef: params.transactionRef,
    },
    schema: nombaTransactionVerificationEnvelopeSchema,
    signal: options.signal,
  });

  return response.data;
}

