"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function PaymentCallbackPage() {
  const searchParams = useSearchParams();

  const [message, setMessage] = useState("Verifying payment...");

  useEffect(() => {
    async function verifyPayment() {
      const orderReference = searchParams.get("orderReference");

      if (!orderReference) {
        setMessage("No order reference found.");
        return;
      }

      try {
        const response = await fetch("/api/payments/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderReference,
          }),
        });

        const result = await response.json();

        if (result.success) {
          setMessage("✅ Payment verified successfully!");
        } else {
          setMessage("Payment is still processing...");
        }
      } catch (error) {
        console.error(error);
        setMessage("Verification failed.");
      }
    }

    verifyPayment();
  }, [searchParams]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="rounded-lg border p-8 shadow">
        <h1 className="mb-4 text-2xl font-bold">Payment Status</h1>
        <p>{message}</p>
      </div>
    </div>
  );
}