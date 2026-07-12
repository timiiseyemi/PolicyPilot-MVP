import { NextResponse } from "next/server";
import {
  isNombaPaymentSuccessWebhook,
  verifyNombaWebhookSignature,
} from "@/services/nomba/webhook";
import { markPaymentSuccessful } from "@/services/payments/payment-service";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();

    console.log("[Webhook Received]");

    const { payload } = verifyNombaWebhookSignature({
      rawBody,
      headers: req.headers,
      maxAgeMs: 5 * 60 * 1000,
    });

    if (!isNombaPaymentSuccessWebhook(payload)) {
      console.log(`[Webhook Ignored] Event type: ${payload.event_type}`);
      return NextResponse.json({
        received: true,
        ignored: true,
      });
    }

    const orderReference = payload.data.order?.orderReference;
    const transactionReference = payload.data.transaction?.transactionId;

    if (!orderReference) {
      console.error("[Webhook Error] No orderReference found in payload");
      return NextResponse.json(
        { error: "No orderReference found." },
        { status: 400 }
      );
    }

    if (!transactionReference) {
      console.error("[Webhook Error] No transactionId found in payload");
      return NextResponse.json(
        { error: "No transaction reference found." },
        { status: 400 }
      );
    }

    console.log(`[Webhook Processing] Order: ${orderReference}, Tx: ${transactionReference}`);

    await markPaymentSuccessful(
      orderReference,
      transactionReference,
    );

    console.log(`[Webhook Success] Database Updated for: ${orderReference}`);

    return NextResponse.json({
      received: true,
      processed: true,
    });
  } catch (error) {
    console.error("[Webhook Failed]", error);

    return NextResponse.json(
      {
        error: "Webhook processing failed.",
      },
      {
        status: 400,
      }
    );
  }
}