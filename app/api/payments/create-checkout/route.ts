import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getNombaAccessToken } from "@/lib/nomba";

export async function POST(req: Request) {
  try {
    const {
      customerId,
      policyId,
      amount,
    } = await req.json();

    // Find customer
    const customer = await prisma.customer.findUnique({
      where: {
        id: customerId,
      },
    });

    if (!customer) {
      return NextResponse.json(
        { error: "Customer not found." },
        { status: 404 }
      );
    }

    // Find policy
    const policy = await prisma.policy.findUnique({
      where: {
        id: policyId,
      },
    });

    if (!policy) {
      return NextResponse.json(
        { error: "Policy not found." },
        { status: 404 }
      );
    }

    // Create payment
    const payment = await prisma.payment.create({
      data: {
        amount: Number(amount),
        status: "PENDING",
        customerId,
        policyId,
      },
    });

    // Authenticate with Nomba
    const accessToken = await getNombaAccessToken();

    // Create checkout
    const response = await fetch(
      "https://api.nomba.com/v1/checkout/order",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          accountId: process.env.NOMBA_ACCOUNT_ID!,
        },
        body: JSON.stringify({
          order: {
            amount: Number(amount).toFixed(2),
            currency: "NGN",
            customerEmail: customer.email,
            customerId: customer.id,
            orderReference: payment.id,
            callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/payments/callback`,
          },
        }),
      }
    );

    const result = await response.json();

    console.log("Nomba Response");
    console.log(JSON.stringify(result, null, 2));

    if (!response.ok) {
      return NextResponse.json(
        {
          error: result,
        },
        {
          status: response.status,
        }
      );
    }

    await prisma.payment.update({
      where: {
        id: payment.id,
      },
      data: {
        checkoutLink: result.data.checkoutLink,
        orderReference: result.data.orderReference,
      },
    });

    return NextResponse.json({
      checkoutLink: result.data.checkoutLink,
      paymentId: payment.id,
      orderReference: result.data.orderReference,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Unable to create checkout.",
      },
      {
        status: 500,
      }
    );
  }
}