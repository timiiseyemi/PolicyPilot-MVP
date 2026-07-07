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
}: CustomerStepProps) {
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
          <Button onClick={onNext}>
            Continue
          </Button>
        </div>

      </CardContent>
    </Card>
  );
}