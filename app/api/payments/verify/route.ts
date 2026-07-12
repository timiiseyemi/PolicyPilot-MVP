import { NextResponse } from "next/server";
import { markPaymentSuccessful } from "@/services/payments/payment-service";
import { verifyNombaTransaction } from "@/services/nomba/checkout";

export async function POST(req: Request) {
  try {
    const { orderReference } = await req.json();

    console.log(`[Verification Started] OrderReference: ${orderReference}`);

    if (!orderReference) {
      return NextResponse.json(
        { error: "Order reference is required." },
        { status: 400 }
      );
    }

    const transaction = await verifyNombaTransaction({ orderReference });

    console.log(`[Verification Response] Entire: ${JSON.stringify(transaction, null, 2)}`);
    console.log(`[Verification Response] Status: ${transaction.status}`);

    if (transaction.status !== "SUCCESS") {
      return NextResponse.json({
        status: transaction.status,
      });
    }

    if (!transaction.transactionId) {
      console.error("[Verification Failed] Missing transaction ID");
      return NextResponse.json(
        { error: "Missing transaction ID." },
        { status: 500 }
      );
    }

    await markPaymentSuccessful(
      orderReference,
      transaction.transactionId,
    );

    console.log(`[Verification Success] Database Updated for: ${orderReference}`);

    return NextResponse.json({
      success: true,
    });

  } catch (err) {
    console.error("[Verification Failed]", err);

    return NextResponse.json(
      {
        error: "Verification failed.",
      },
      {
        status: 500,
      }
    );
  }
}