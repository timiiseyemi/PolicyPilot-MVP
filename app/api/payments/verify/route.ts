import { NextResponse } from "next/server";
import { markPaymentSuccessful } from "@/services/payments/payment-service";
import { getNombaAccessToken,NOMBA_BASE_URL, } from "@/lib/nomba";



export async function POST(req: Request) {
  try {
    const { orderReference } = await req.json();

    console.log("=================================");
console.log("ORDER REFERENCE FROM CALLBACK");
console.log(orderReference);
console.log("=================================");

    const accessToken = await getNombaAccessToken();

    const response = await fetch(
  `${NOMBA_BASE_URL}/transactions/accounts/single?orderReference=${orderReference}`,
  {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      accountId: process.env.NOMBA_ACCOUNT_ID!,
    },
  }
);

    const result = await response.json();

    console.log("Verify Response:");
console.log(JSON.stringify(result, null, 2));

    if (result.code !== "00") {
      return NextResponse.json(
        { error: result.description },
        { status: 400 }
      );
    }

    const transaction = result.data;
    console.log(JSON.stringify(transaction, null, 2));

    if (transaction.status !== "SUCCESS") {
      return NextResponse.json({
        status: transaction.status,
      });
    }

    await markPaymentSuccessful(
      orderReference,
      transaction.Id,
    );

    return NextResponse.json({
      success: true,
    });

  } catch (err) {
    console.error(err);

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