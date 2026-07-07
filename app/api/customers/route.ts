import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const customers = await prisma.customer.findMany({
    include: {
      policies: true,
      payments: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(customers);
}

export async function POST(req: Request) {
  const body = await req.json();

  const customer = await prisma.customer.create({
    data: {
      name: body.name,
      email: body.email,
      phone: body.phone,
    },
  });

  return NextResponse.json(customer);
}