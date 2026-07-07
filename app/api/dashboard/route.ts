import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [
      activePolicies,
      customers,
      pendingClaims,
      premiumAggregate,
    ] = await Promise.all([
      prisma.policy.count({
        where: {
          status: "ACTIVE",
        },
      }),

      prisma.customer.count(),

      prisma.claim.count({
        where: {
          status: "OPEN",
        },
      }),

      prisma.payment.aggregate({
        where: {
          status: "PAID",
        },
        _sum: {
          amount: true,
        },
      }),
    ]);

    return NextResponse.json({
      activePolicies,
      customers,
      pendingClaims,
      premiumCollected:
        premiumAggregate._sum.amount ?? 0,
    });
  } catch (e) {
    console.error(e);

    return NextResponse.json(
      { error: "Failed to load dashboard" },
      { status: 500 }
    );
  }
}