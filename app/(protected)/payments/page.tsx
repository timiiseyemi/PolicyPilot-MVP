'use client';

import { useState } from "react";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function PaymentsPage() {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [policyId, setPolicyId] = useState("");
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");

const [product, setProduct] = useState("");

const [insurer, setInsurer] = useState("");

const [startDate, setStartDate] = useState("");

const [endDate, setEndDate] = useState("");

  const [loading, setLoading] = useState(false);
  const [checkoutLink, setCheckoutLink] = useState("");

  async function generateCheckout() {
    try {
      setLoading(true);

      const res = await fetch("/api/payments/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
  customerName,
  customerEmail,
  phone,

  product,
  insurer,

  amount,

  startDate,
  endDate,
}),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }

      setCheckoutLink(data.checkoutLink);
    } catch (err) {
      console.error(err);
      alert("Unable to generate checkout.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <div className="py-8 max-w-3xl mx-auto space-y-6">

        <div>
          <h1 className="text-3xl font-bold">
            New Business & Premium Collection
          </h1>

          <p className="text-muted-foreground mt-2">
            Register a customer, create a policy and generate a secure Nomba payment link.
          </p>
        </div>

        <Card>

          <CardHeader>

            <CardTitle>
              Payment Details
            </CardTitle>

          </CardHeader>

          <CardContent className="space-y-5">

            <Input
  placeholder="Customer Name"
  value={customerName}
  onChange={(e) => setCustomerName(e.target.value)}
/>

<Input
  placeholder="Customer Email"
  value={customerEmail}
  onChange={(e) => setCustomerEmail(e.target.value)}
/>

<Input
  placeholder="Phone Number"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
/>
<Input
  placeholder="Product (Motor Insurance)"
  value={product}
  onChange={(e) => setProduct(e.target.value)}
/>

<Input
  placeholder="Insurer (Leadway)"
  value={insurer}
  onChange={(e) => setInsurer(e.target.value)}
/>

<Input
  type="date"
  value={startDate}
  onChange={(e) => setStartDate(e.target.value)}
/>

<Input
  type="date"
  value={endDate}
  onChange={(e) => setEndDate(e.target.value)}
/>

<Input
  placeholder="Premium Amount"
  value={amount}
  onChange={(e) => setAmount(e.target.value)}
/>

            <Button
              onClick={generateCheckout}
              disabled={loading}
            >
              {loading
                ? "Generating..."
                : "Generate Nomba Checkout"}
            </Button>

          </CardContent>

        </Card>

        {checkoutLink && (
          <Card>

            <CardHeader>

              <CardTitle>
                Checkout Ready
              </CardTitle>

            </CardHeader>

            <CardContent className="space-y-4">

              <div className="rounded-lg border bg-muted p-4 break-all">
                {checkoutLink}
              </div>

              <Button
                onClick={() => window.open(checkoutLink, "_blank")}
              >
                Open Checkout
              </Button>

            </CardContent>

          </Card>
        )}

      </div>
    </Container>
  );
}