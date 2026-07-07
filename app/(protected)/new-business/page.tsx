'use client';

import { useState } from "react";
import { Container } from "@/components/common/container";

import { CustomerStep } from "./components/customer-step";
import { PolicyStep } from "./components/policy-step";
import { PaymentStep } from "./components/payment-step";

export interface NewBusinessData {
  customer: {
    name: string;
    email: string;
    phone: string;
    company: string;
  };

  policy: {
    insurer: string;
    product: string;
    premium: string;
    startDate: string;
    endDate: string;
  };
}

export default function NewBusinessPage() {
  const [step, setStep] = useState(1);

  const [data, setData] = useState<NewBusinessData>({
    customer: {
      name: "",
      email: "",
      phone: "",
      company: "",
    },

    policy: {
      insurer: "",
      product: "",
      premium: "",
      startDate: "",
      endDate: "",
    },
  });

  return (
    <Container>
      <div className="max-w-5xl mx-auto py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">
            New Business
          </h1>

          <p className="text-muted-foreground mt-2">
            Create customer → Issue policy → Collect premium.
          </p>
        </div>

        {step === 1 && (
          <CustomerStep
            data={data}
            setData={setData}
            onNext={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <PolicyStep
            data={data}
            setData={setData}
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
          />
        )}

        {step === 3 && (
          <PaymentStep
            data={data}
            onBack={() => setStep(2)}
          />
        )}
      </div>
    </Container>
  );
}