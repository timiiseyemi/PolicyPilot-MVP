import { notFound } from "next/navigation";

import { Container } from "@/components/common/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import prisma from "@/lib/prisma";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function TransactionDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  const payment = await prisma.payment.findUnique({
    where: {
      id,
    },
    include: {
      customer: true,
      policy: true,
    },
  });

  if (!payment) {
    notFound();
  }

  return (
    <Container>
      <div className="py-8 max-w-4xl mx-auto space-y-6">

        <div>
          <h1 className="text-3xl font-bold">
            Transaction Details
          </h1>

          <p className="text-muted-foreground mt-2">
            Review premium payment information.
          </p>
        </div>

        <Card>

          <CardHeader>
            <CardTitle>
              Payment Information
            </CardTitle>
          </CardHeader>

          <CardContent className="grid grid-cols-2 gap-6">

            <div>
              <p className="text-sm text-muted-foreground">
                Customer
              </p>

              <p className="font-medium">
                {payment.customer.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Email
              </p>

              <p className="font-medium">
                {payment.customer.email}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Policy Number
              </p>

              <p className="font-medium">
                {payment.policy.policyNumber}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Product
              </p>

              <p className="font-medium">
                {payment.policy.product}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Amount
              </p>

              <p className="font-medium">
                ₦{payment.amount.toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Status
              </p>

              <p className="font-medium">
                {payment.status}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Order Reference
              </p>

              <p className="font-medium break-all">
                {payment.orderReference ?? "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Transaction Reference
              </p>

              <p className="font-medium break-all">
                {payment.transactionReference ?? "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Payment Method
              </p>

              <p className="font-medium">
                {payment.paymentMethod ?? "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Paid At
              </p>

              <p className="font-medium">
                {payment.paidAt
                  ? new Date(payment.paidAt).toLocaleString()
                  : "-"}
              </p>
            </div>

          </CardContent>

        </Card>

      </div>
    </Container>
  );
}