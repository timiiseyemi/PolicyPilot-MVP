'use client';

import { useState } from "react";
import { Container } from "@/components/common/container";

import { CustomerStep } from "./components/customer-step";
import { PolicyStep } from "./components/policy-step";
import { PaymentStep } from "./components/payment-step";

export interface NewBusinessData {
  customer: {
    id?: string;
    name: string;
    email: string;
    phone: string;
    company: string;
  };

  policy: {
    id?: string;
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

  const createCustomer = async () => {
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
    customer: {
      ...prev.customer,
      id: customer.id,
    },
  }));

  return customer;
};

const createPolicy = async () => {
  const policyNumber =
    "POL-" + Date.now().toString().slice(-6);

  const res = await fetch("/api/policies", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      customerId: data.customer.id,

      policyNumber,

      insurer: data.policy.insurer,

      product: data.policy.product,

      premium: Number(data.policy.premium),

      startDate: data.policy.startDate,

      endDate: data.policy.endDate,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to create policy");
  }

  const policy = await res.json();

  setData((prev) => ({
    ...prev,
    policy: {
      ...prev.policy,
      id: policy.id,
    },
  }));

  return policy;
};

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
  onNext={async () => {
    await createCustomer();
    setStep(2);
  }}
/>
        )}

        {step === 2 && (
          <PolicyStep
            data={data}
            setData={setData}
            onBack={() => setStep(1)}
            onNext={async () => {
              await createPolicy();
              setStep(3);
            }}
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