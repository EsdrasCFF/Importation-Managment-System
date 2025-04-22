import { Plus } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SuppliersDataTable } from "@/features/suppliers/components/suppliers-data-table";

export default function SuppliersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Suppliers</h2>
          <p className="text-muted-foreground">
            Manage your suppliers and their products
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/suppliers/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Supplier
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Suppliers</CardTitle>
          <CardDescription>View and manage all your suppliers</CardDescription>
        </CardHeader>
        <CardContent>
          <SuppliersDataTable />
        </CardContent>
      </Card>
    </div>
  );
}
