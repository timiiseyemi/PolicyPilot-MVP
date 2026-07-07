import prisma from "@/lib/prisma";
import {
  PaymentStatus,
  PolicyStatus,
  RenewalStatus,
} from "@prisma/client";

export async function markPaymentSuccessful(
  orderReference: string,
  transactionReference: string,
) {
  
 const payment = await prisma.payment.findUnique({
  where: {
    orderReference,
  },
});

  if (!payment) {
    throw new Error("Payment not found.");
  }

  if (payment.status === PaymentStatus.PAID) {
    return payment;
  }

  return prisma.$transaction(async (tx) => {
    const updatedPayment = await tx.payment.update({
      where: {
        id: payment.id,
      },
      data: {
        status: PaymentStatus.PAID,
        paidAt: new Date(),
        transactionReference,
      },
    });

    await tx.policy.update({
      where: {
        id: payment.policyId,
      },
      data: {
        status: PolicyStatus.ACTIVE,
      },
    });

    const policy = await tx.policy.findUnique({
      where: {
        id: payment.policyId,
      },
    });

    if (policy) {
      const existingRenewal = await tx.renewal.findFirst({
        where: {
          policyId: policy.id,
        },
      });

      if (!existingRenewal) {
        await tx.renewal.create({
          data: {
            policyId: policy.id,
            dueDate: policy.endDate,
            status: RenewalStatus.DUE,
          },
        });
      }
    }

    return updatedPayment;
  });
}