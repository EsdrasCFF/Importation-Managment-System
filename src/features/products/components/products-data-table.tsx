"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, MoreHorizontal, Trash2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatCurrency } from "@/lib/utils/format";

// Mock data - in a real app, this would come from the database
const mockProducts = [
  {
    id: "prod-001",
    code: "TX-102",
    description: "Cotton Fabric - White",
    price: 12.5,
    supplier: {
      id: "sup1",
      name: "Shanghai Textiles Co.",
      country: "China",
    },
  },
  {
    id: "prod-002",
    code: "TX-103",
    description: "Cotton Fabric - Black",
    price: 13.75,
    supplier: {
      id: "sup1",
      name: "Shanghai Textiles Co.",
      country: "China",
    },
  },
  {
    id: "prod-003",
    code: "EL-201",
    description: "LED Display 24-inch",
    price: 87.2,
    supplier: {
      id: "sup2",
      name: "Guangzhou Electronics Ltd.",
      country: "China",
    },
  },
  {
    id: "prod-004",
    code: "EL-202",
    description: "Circuit Board A1",
    price: 22.45,
    supplier: {
      id: "sup2",
      name: "Guangzhou Electronics Ltd.",
      country: "China",
    },
  },
  {
    id: "prod-005",
    code: "TX-301",
    description: "Silk Fabric - Red",
    price: 28.9,
    supplier: {
      id: "sup3",
      name: "Mumbai Textiles Exports",
      country: "India",
    },
  },
  {
    id: "prod-006",
    code: "HG-101",
    description: "Ceramic Vase - Large",
    price: 18.55,
    supplier: {
      id: "sup4",
      name: "Jakarta Home Goods Inc.",
      country: "Indonesia",
    },
  },
  {
    id: "prod-007",
    code: "MN-201",
    description: "Wooden Chair - Oak",
    price: 45.8,
    supplier: {
      id: "sup5",
      name: "Vietnam Manufacturing Ltd.",
      country: "Vietnam",
    },
  },
  {
    id: "prod-008",
    code: "TC-101",
    description: "Processor Unit A12",
    price: 124.5,
    supplier: {
      id: "sup6",
      name: "Taiwan Tech Components",
      country: "Taiwan",
    },
  },
];

type Product = (typeof mockProducts)[0];

const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <div
        className="flex items-center cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Description
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <div
        className="flex items-center cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Price
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => formatCurrency(row.getValue("price")),
  },
  {
    accessorKey: "supplier.name",
    header: "Supplier",
    cell: ({ row }) => (
      <div>
        <div>{row.original.supplier.name}</div>
        <div className="text-xs text-muted-foreground">
          {row.original.supplier.country}
        </div>
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={`/products/${row.original.id}`} className="flex w-full">
              View Details
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={`/products/${row.original.id}/edit`}
              className="flex w-full"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

export function ProductsDataTable() {
  return (
    <DataTable
      columns={columns}
      data={mockProducts}
      searchKey="description"
      searchPlaceholder="Search products..."
    />
  );
}
