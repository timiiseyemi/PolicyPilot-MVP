"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Payment {
  id: string;
  amount: number;
  status: string;
  paymentMethod: string | null;
  createdAt: Date | string;

  customer: {
    name: string;
    email: string;
  };

  policy: {
    policyNumber: string;
    product: string;
  };
}

interface TransactionsTableProps {
  payments: Payment[];
}

export default function TransactionsTable({
  payments,
}: TransactionsTableProps) {
  if (payments.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground">
          No transactions found.
        </CardContent>
      </Card>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-green-100 text-green-700";

      case "PENDING":
        return "bg-yellow-100 text-yellow-700";

      case "FAILED":
        return "bg-red-100 text-red-700";

      case "REFUNDED":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-gray-100";
    }
  };

  return (
    <Card>

      <CardHeader>

        <CardTitle>
          Transactions
        </CardTitle>

      </CardHeader>

      <CardContent className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b text-left">

              <th className="py-3">Customer</th>

              <th>Policy</th>

              <th>Amount</th>

              <th>Status</th>

              <th>Date</th>

              <th></th>

            </tr>

          </thead>

          <tbody>

            {payments.map((payment) => (

              <tr
                key={payment.id}
                className="border-b"
              >
                <td className="py-4">

                  <div className="font-medium">
                    {payment.customer.name}
                  </div>

                  <div className="text-sm text-muted-foreground">
                    {payment.customer.email}
                  </div>

                </td>

                <td>
                  {payment.policy.policyNumber}
                </td>

                <td>
                  ₦{payment.amount.toLocaleString()}
                </td>

                <td>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(payment.status)}`}
                  >
                    {payment.status}
                  </span>

                </td>

                <td>
                  {new Date(
                    payment.createdAt
                  ).toLocaleDateString()}
                </td>

                <td>

                  <Link
                    href={`/payments/transactions/${payment.id}`}
                    className="text-primary font-medium"
                  >
                    View
                  </Link>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </CardContent>

    </Card>
  );
}