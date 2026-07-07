'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import type { NewBusinessData } from "../page";

interface CustomerStepProps {
  data: NewBusinessData;
  setData: React.Dispatch<React.SetStateAction<NewBusinessData>>;
  onNext: () => void;
}

export function CustomerStep({
  data,
  setData,
  onNext,
}: CustomerStepProps) 
{
  async function handleContinue() {
    try {
      const res = await fetch("/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.customer.name,
          email: data.customer.email,
          phone: data.customer.phone,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create customer");
      }

      const customer = await res.json();

      setData((prev) => ({
        ...prev,
        customerId: customer.id,
      }));

      onNext();
    } catch (err) {
      console.error(err);
      alert("Unable to create customer.");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Step 1 — Customer Details
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">

        <Input
          placeholder="Full Name"
          value={data.customer.name}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              customer: {
                ...prev.customer,
                name: e.target.value,
              },
            }))
          }
        />

        <Input
          placeholder="Email Address"
          value={data.customer.email}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              customer: {
                ...prev.customer,
                email: e.target.value,
              },
            }))
          }
        />

        <Input
          placeholder="Phone Number"
          value={data.customer.phone}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              customer: {
                ...prev.customer,
                phone: e.target.value,
              },
            }))
          }
        />

        <Input
          placeholder="Company (optional)"
          value={data.customer.company}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              customer: {
                ...prev.customer,
                company: e.target.value,
              },
            }))
          }
        />

        <div className="flex justify-end">
          <Button onClick={handleContinue}>
            Continue
          </Button>
        </div>

      </CardContent>
    </Card>
  );
}