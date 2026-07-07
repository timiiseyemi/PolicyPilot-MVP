import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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
  const body = await req.json();

  const payment = await prisma.payment.create({
    data: {
      amount: body.amount,
      status: "Pending",
      customerId: body.customerId,
      policyId: body.policyId,
    },
  });

  return NextResponse.json(payment);
}