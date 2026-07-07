import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { PaymentStatus } from "@prisma/client";

export async function GET() {
  const payments = await prisma.payment.findMany({
    include: {
      customer: true,
      policy: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(payments);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const payment = await prisma.payment.create({
      data: {
        amount: Number(body.amount),

        status: PaymentStatus.PENDING,

        customerId: body.customerId,

        policyId: body.policyId,

        paymentMethod: body.paymentMethod ?? null,

        checkoutLink: body.checkoutLink ?? null,

        orderReference: body.orderReference ?? null,

        transactionReference: body.transactionReference ?? null,
      },
    });

    return NextResponse.json(payment);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to create payment.",
      },
      {
        status: 500,
      }
    );
  }
}