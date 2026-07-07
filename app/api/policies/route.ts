import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { PolicyStatus } from "@prisma/client";

export async function GET() {
  const policies = await prisma.policy.findMany({
    include: {
      customer: true,
      payments: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(policies);
}

export async function POST(req: Request) {
  const body = await req.json();

  const policy = await prisma.policy.create({
    data: {
      policyNumber: body.policyNumber,

      customerId: body.customerId,

      product: body.product,

      insurer: body.insurer,

      premium: Number(body.premium),

      startDate: new Date(body.startDate),

      endDate: new Date(body.endDate),

      status: PolicyStatus.ACTIVE,
    },
  });

  return NextResponse.json(policy);
}