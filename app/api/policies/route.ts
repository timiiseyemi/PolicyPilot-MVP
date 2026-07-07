import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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
      product: body.product,
      premium: body.premium,
      status: "Pending",
      renewalDate: new Date(body.renewalDate),
      customerId: body.customerId,
    },
  });

  return NextResponse.json(policy);
}