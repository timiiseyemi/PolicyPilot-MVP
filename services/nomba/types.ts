import { z } from 'zod';

export const nombaEnvironmentSchema = z.enum(['sandbox', 'production']);

export type NombaEnvironment = z.infer<typeof nombaEnvironmentSchema>;

export const nombaAllowedPaymentMethodSchema = z.enum([
  'Card',
  'Transfer',
  'Nomba QR',
  'USSD',
  'Buy Now Pay Later',
  'MOMO',
  'Intl Card',
  'Apple Pay',
]);

export type NombaAllowedPaymentMethod = z.infer<
  typeof nombaAllowedPaymentMethodSchema
>;

export const nombaSplitTypeSchema = z.enum(['PERCENTAGE', 'AMOUNT']);

export type NombaSplitType = z.infer<typeof nombaSplitTypeSchema>;

export interface NombaCredentials {
  readonly clientId: string;
  readonly clientSecret: string;
  readonly accountId: string;
  readonly webhookSecret?: string;
}

export interface NombaConfig {
  readonly environment: NombaEnvironment;
  readonly baseUrl: string;
  readonly timeoutMs: number;
  readonly credentials: NombaCredentials;
}

export interface NombaSplitRecipient {
  readonly accountId: string;
  readonly value: string;
}

export interface NombaSplitRequest {
  readonly splitType: NombaSplitType;
  readonly splitList: readonly NombaSplitRecipient[];
}

export interface NombaCheckoutOrderRequest {
  readonly amount: string;
  readonly currency: string;
  readonly orderReference?: string;
  readonly callbackUrl?: string;
  readonly customerEmail?: string;
  readonly customerId?: string;
  readonly accountId?: string;
  readonly splitRequest?: NombaSplitRequest;
  readonly orderMetaData?: Readonly<Record<string, string>>;
  readonly allowedPaymentMethods?: readonly NombaAllowedPaymentMethod[];
}

export interface NombaCreateCheckoutOrderInput {
  readonly order: NombaCheckoutOrderRequest;
  readonly tokenizeCard?: boolean;
  readonly meta?: Readonly<Record<string, unknown>>;
}

export interface NombaAccessToken {
  readonly accessToken: string;
  readonly refreshToken?: string;
  readonly expiresAt: string;
}

export interface NombaCheckoutOrderResponse {
  readonly checkoutLink: string;
  readonly orderReference: string;
}

export interface NombaTransactionVerificationParams {
  readonly orderReference?: string;
  readonly transactionRef?: string;
}

export interface NombaTransactionVerificationResponse {
  readonly status: string;
  readonly transactionId?: string;
  readonly orderReference?: string;
  readonly amount?: number | string;
  readonly currency?: string;
  readonly paymentMethod?: string;
  readonly [key: string]: unknown;
}

export interface NombaApiEnvelope<TData> {
  readonly code: string;
  readonly description: string;
  readonly data: TData;
}

export interface NombaWebhookMerchant {
  readonly walletId?: string;
  readonly walletBalance?: number;
  readonly userId?: string;
}

export interface NombaWebhookTransaction {
  readonly transactionId?: string;
  readonly type?: string;
  readonly transactionAmount?: number;
  readonly fee?: number;
  readonly time?: string;
  readonly responseCode?: string | null;
  readonly [key: string]: unknown;
}

export interface NombaWebhookCustomer {
  readonly billerId?: string;
  readonly senderName?: string;
  readonly bankCode?: string;
  readonly bankName?: string;
  readonly accountNumber?: string;
  readonly [key: string]: unknown;
}

export interface NombaWebhookOrder {
  readonly orderReference?: string;
  readonly amount?: number;
  readonly currency?: string;
  readonly paymentMethod?: string;
  readonly cardType?: string;
  readonly cardLast4Digits?: string;
  readonly customerId?: string;
  readonly orderMetaData?: Readonly<Record<string, string>>;
  readonly [key: string]: unknown;
}

export interface NombaWebhookPayload {
  readonly event_type: string;
  readonly requestId: string;
  readonly data: {
    readonly merchant?: NombaWebhookMerchant;
    readonly terminal?: Readonly<Record<string, unknown>>;
    readonly transaction?: NombaWebhookTransaction;
    readonly customer?: NombaWebhookCustomer;
    readonly order?: NombaWebhookOrder;
    readonly [key: string]: unknown;
  };
}

export interface NombaWebhookHeaders {
  readonly signature: string;
  readonly algorithm?: string;
  readonly version?: string;
  readonly timestamp: string;
}

export const nombaAccessTokenSchema = z.object({
  access_token: z.string().min(1),
  refresh_token: z.string().min(1).optional(),
  expiresAt: z.string().min(1),
});

export const nombaAuthEnvelopeSchema = z.object({
  code: z.string().min(1),
  description: z.string().min(1),
  data: nombaAccessTokenSchema,
});

export const nombaCheckoutOrderResponseSchema = z.object({
  checkoutLink: z.string().url(),
  orderReference: z.string().min(1),
});

export const nombaCheckoutEnvelopeSchema = z.object({
  code: z.string().min(1),
  description: z.string().min(1),
  data: nombaCheckoutOrderResponseSchema,
});

export const nombaTransactionVerificationEnvelopeSchema = z.object({
  code: z.string().min(1),
  description: z.string().min(1),
  data: z
    .object({
      status: z.string().min(1),
    })
    .passthrough(),
});

export const nombaWebhookPayloadSchema = z
  .object({
    event_type: z.string().min(1),
    requestId: z.string().min(1),
    data: z
      .object({
        merchant: z
          .object({
            walletId: z.string().optional(),
            walletBalance: z.number().optional(),
            userId: z.string().optional(),
          })
          .partial()
          .optional(),
        terminal: z.record(z.string(), z.unknown()).optional(),
        transaction: z
          .object({
            transactionId: z.string().optional(),
            type: z.string().optional(),
            transactionAmount: z.number().optional(),
            fee: z.number().optional(),
            time: z.string().optional(),
            responseCode: z.union([z.string(), z.null()]).optional(),
          })
          .passthrough()
          .optional(),
        customer: z.record(z.string(), z.unknown()).optional(),
        order: z.record(z.string(), z.unknown()).optional(),
      })
      .passthrough(),
  })
  .passthrough();

