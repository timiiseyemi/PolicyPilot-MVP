import { Container } from "@/components/common/container";

export default function PaymentSuccessPage() {
  return (
    <Container>
      <div className="py-16 text-center space-y-4">
        <h1 className="text-3xl font-bold">
          Payment Processing...
        </h1>

        <p className="text-muted-foreground">
          Verifying your payment with Nomba.
        </p>
      </div>
    </Container>
  );
}