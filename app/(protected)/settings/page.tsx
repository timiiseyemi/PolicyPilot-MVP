import { Container } from "@/components/common/container";

export default function SettingsPage() {
  return (
    <Container>
      <div className="py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-2">
            Manage application and account settings.
          </p>
        </div>

        <div className="rounded-xl border p-10 text-center">
          Module under development.
        </div>
      </div>
    </Container>
  );
}
