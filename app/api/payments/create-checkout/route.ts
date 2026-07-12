import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createNombaCheckoutOrder } from "@/services/nomba/checkout";

export async function POST(req: Request) {
  try {
    const {
      customerId,
      policyId,
      amount,
    } = await req.json();

    console.log(`[Payment Creation Started] Customer: ${customerId}, Policy: ${policyId}, Amount: ${amount}`);

    // Find customer
    const customer = await prisma.customer.findUnique({
      where: {
        id: customerId,
      },
    });

    if (!customer) {
      console.error(`[Payment Creation Failed] Customer not found: ${customerId}`);
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
      console.error(`[Payment Creation Failed] Policy not found: ${policyId}`);
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

    console.log(`[Payment Created] ID: ${payment.id}`);

    // Create checkout
    const checkoutData = await createNombaCheckoutOrder({
      order: {
        amount: Number(amount).toFixed(2),
        currency: "NGN",
        customerEmail: customer.email || "",
        customerId: customer.id,
        orderReference: payment.id,
        callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/payments/callback`,
      },
    });

    console.log(`[Checkout Generated] OrderReference: ${checkoutData.orderReference}`);

    await prisma.payment.update({
      where: {
        id: payment.id,
      },
      data: {
        checkoutLink: checkoutData.checkoutLink,
        orderReference: checkoutData.orderReference,
      },
    });

    console.log(`[Payment Updated] OrderReference stored for Payment: ${payment.id}`);

    return NextResponse.json({
      checkoutLink: checkoutData.checkoutLink,
      paymentId: payment.id,
      orderReference: checkoutData.orderReference,
    });

  } catch (error) {
    console.error("[Payment Creation Failed]", error);

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