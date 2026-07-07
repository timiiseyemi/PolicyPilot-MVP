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
  try {
    const body = await req.json();

    console.log("Incoming customer:", body);

    const existing = await prisma.customer.findUnique({
      where: {
        email: body.email,
      },
    });

    if (existing) {
      return NextResponse.json(existing);
    }

    const customer = await prisma.customer.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone || null,
      },
    });

    return NextResponse.json(customer);
  } catch (error) {
    console.error("CUSTOMER API ERROR:");
    console.error(error);

    return NextResponse.json(
      {
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}