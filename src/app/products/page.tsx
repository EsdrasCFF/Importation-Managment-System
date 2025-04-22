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
import { ProductsDataTable } from "@/features/products/components/products-data-table";

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground">
            Manage all products from your suppliers
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/products/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>
            Complete list of products from all suppliers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductsDataTable />
        </CardContent>
      </Card>
    </div>
  );
}
