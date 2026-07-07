import { NextResponse } from "next/server";



import {
  isNombaPaymentSuccessWebhook,
  verifyNombaWebhookSignature,
} from "@/services/nomba/webhook";

import { markPaymentSuccessful } from "@/services/payments/payment-service";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();

    const { payload } = verifyNombaWebhookSignature({
      rawBody,
      headers: req.headers,
      maxAgeMs: 5 * 60 * 1000,
    });
console.log("========== WEBHOOK ==========");
console.log(JSON.stringify(payload, null, 2));
console.log("=============================");
    if (!isNombaPaymentSuccessWebhook(payload)) {
      return NextResponse.json({
        received: true,
        ignored: true,
      });
    }

    const orderReference =
  payload.data.order?.orderReference;

if (!orderReference) {
  console.log("Webhook payload:");
  console.log(JSON.stringify(payload, null, 2));

  return NextResponse.json(
    {
      error: "No orderReference found.",
    },
    {
      status: 400,
    }
  );
}

   const transactionReference =
  payload.data.transaction?.transactionId;

if (!transactionReference) {
  return NextResponse.json(
    {
      error: "No transaction reference found.",
    },
    {
      status: 400,
    }
  );
}

    await markPaymentSuccessful(
  orderReference,
  transactionReference,
);

    return NextResponse.json({
      received: true,
      processed: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Webhook verification failed.",
      },
      {
        status: 400,
      }
    );
  }
}