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

interface PolicyStepProps {
  data: NewBusinessData;
  setData: React.Dispatch<React.SetStateAction<NewBusinessData>>;
  onNext: () => void;
  onBack: () => void;
}

export function PolicyStep({
  data,
  setData,
  onNext,
  onBack,
}: PolicyStepProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Step 2 — Policy Details
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">

        <Input
          placeholder="Insurer"
          value={data.policy.insurer}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              policy: {
                ...prev.policy,
                insurer: e.target.value,
              },
            }))
          }
        />

        <Input
          placeholder="Product"
          value={data.policy.product}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              policy: {
                ...prev.policy,
                product: e.target.value,
              },
            }))
          }
        />

        <Input
          placeholder="Premium Amount"
          value={data.policy.premium}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              policy: {
                ...prev.policy,
                premium: e.target.value,
              },
            }))
          }
        />

        <Input
          type="date"
          value={data.policy.startDate}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              policy: {
                ...prev.policy,
                startDate: e.target.value,
              },
            }))
          }
        />

        <Input
          type="date"
          value={data.policy.endDate}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              policy: {
                ...prev.policy,
                endDate: e.target.value,
              },
            }))
          }
        />

        <div className="flex justify-between">

          <Button
            variant="outline"
            onClick={onBack}
          >
            Back
          </Button>

          <Button onClick={onNext}>
            Continue
          </Button>

        </div>

      </CardContent>
    </Card>
  );
}