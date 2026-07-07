import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PoliciesTable } from "./components/policies-table";
import Link from "next/link";

export default function PoliciesPage() {
  return (
    <Container>
      <div className="py-8 space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Policies
            </h1>

            <p className="text-muted-foreground mt-2">
              Manage insurance policies across all insurers from one place.
            </p>
          </div>

          <Button asChild className="w-full lg:w-auto">
  <Link href="/new-business">
    <Plus className="mr-2 h-4 w-4" />
    New Policy
  </Link>
</Button>
        </div>

        {/* Policies Table */}
        <PoliciesTable />
      </div>
    </Container>
  );
}