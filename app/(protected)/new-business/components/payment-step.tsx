'use client';

import { CreditCard } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { NewBusinessData } from "../page";

interface PaymentStepProps {
  data: NewBusinessData;
  onBack: () => void;
}

export function PaymentStep({
  data,
  onBack,
}: PaymentStepProps) {
  return (
    <Card>

      <CardHeader>

        <CardTitle>
          Step 3 — Payment
        </CardTitle>

      </CardHeader>

      <CardContent className="space-y-6">

        <div className="rounded-xl border p-5 space-y-3">

          <div className="flex justify-between">
            <span>Customer</span>
            <strong>{data.customer.name || "-"}</strong>
          </div>

          <div className="flex justify-between">
            <span>Email</span>
            <strong>{data.customer.email || "-"}</strong>
          </div>

          <div className="flex justify-between">
            <span>Insurer</span>
            <strong>{data.policy.insurer || "-"}</strong>
          </div>

          <div className="flex justify-between">
            <span>Policy</span>
            <strong>{data.policy.product || "-"}</strong>
          </div>

          <div className="flex justify-between">
            <span>Premium</span>
            <strong>
              {data.policy.premium
                ? `₦${data.policy.premium}`
                : "-"}
            </strong>
          </div>

        </div>

        <div className="flex justify-between">

          <Button
            variant="outline"
            onClick={onBack}
          >
            Back
          </Button>

          <Button
  onClick={async () => {

    const res = await fetch(
      "/api/payments/create-checkout",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      }
    );

    const result = await res.json();

    if (result.checkoutLink) {
      window.location.href =
        result.checkoutLink;
    }
  }}
>

  <CreditCard className="mr-2 h-4 w-4" />

  Generate Nomba Checkout

</Button>

        </div>

      </CardContent>

    </Card>
  );
}