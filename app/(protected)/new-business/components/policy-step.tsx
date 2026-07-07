'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface PolicyStepProps {
  onNext: () => void;
  onBack: () => void;
}

export function PolicyStep({
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

        <Input placeholder="Insurer" />

        <Input placeholder="Product" />

        <Input placeholder="Premium Amount" />

        <Input type="date" />

        <Input type="date" />

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