import { Container } from "@/components/common/container";
import prisma from "@/lib/prisma";
import TransactionsTable from "@/components/payments/transactions-table";

export default async function TransactionsPage() {
  const payments = await prisma.payment.findMany({
    include: {
      customer: true,
      policy: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <Container>
      <div className="py-8 space-y-6">

        <div>

          <h1 className="text-3xl font-bold">
            Transactions
          </h1>

          <p className="text-muted-foreground mt-2">
            View and manage all premium payment transactions.
          </p>

        </div>

        <TransactionsTable
          payments={payments}
        />

      </div>
    </Container>
  );
}