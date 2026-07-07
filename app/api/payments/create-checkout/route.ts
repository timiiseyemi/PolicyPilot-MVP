import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getNombaAccessToken } from "@/lib/nomba";

export async function POST(req: Request) {
  try {
    const {
      customerName,
      customerEmail,
      phone,
      product,
      insurer,
      amount,
      startDate,
      endDate,
    } = await req.json();

    // 1. Find or create customer
    let customer = await prisma.customer.findUnique({
      where: {
        email: customerEmail,
      },
    });

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          name: customerName,
          email: customerEmail,
          phone,
        },
      });
    }

    // 2. Create Policy
    const policy = await prisma.policy.create({
      data: {
        policyNumber: `POL-${Date.now()}`,
        product,
        insurer,
        premium: Number(amount),
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status: "DRAFT",
        customerId: customer.id,
      },
    });

    // 3. Create Payment
    const payment = await prisma.payment.create({
      data: {
        amount: Number(amount),
        status: "PENDING",
        customerId: customer.id,
        policyId: policy.id,
      },
    });

    // 4. Authenticate with Nomba
    const accessToken = await getNombaAccessToken();

    // 5. Create Checkout
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
            customerEmail,
            customerId: customer.id,
            orderReference: payment.id,
            callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/payments/callback`,
          },
        }),
      }
    );
const result = await response.json();

console.log("Checkout Response:");
console.log(JSON.stringify(result, null, 2));

if (result.code !== "00") {
  return NextResponse.json(
    {
      error: result.description,
    },
    {
      status: 400,
    }
  );
}

    // 6. Save Nomba details
    await prisma.payment.update({
      where: {
        id: payment.id,
      },
      data: {
        checkoutLink: result.data.checkoutLink,
        orderReference: result.data.orderReference,
      },
    });

    // 7. Return checkout
    return NextResponse.json({
      checkoutLink: result.data.checkoutLink,
      orderReference: result.data.orderReference,
      paymentId: payment.id,
      customerId: customer.id,
      policyId: policy.id,
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