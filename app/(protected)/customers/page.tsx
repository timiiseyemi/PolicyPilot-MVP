import Link from "next/link";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CustomersTable } from "./components/customers-table";

export default function CustomersPage() {
  return (
    <Container>
      <div className="py-8 space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Customers
            </h1>

            <p className="text-muted-foreground mt-2">
              Manage customers, policies and relationships.
            </p>
          </div>

          <Link href="/new-business">
            <Button className="w-full lg:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Add Customer
            </Button>
          </Link>
        </div>

        <CustomersTable />
      </div>
    </Container>
  );
}