"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Edit,
  MoreHorizontal,
  PackageOpen,
  Trash2,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
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

// Mock data - in a real app, this would come from the database
const mockSuppliers = [
  {
    id: "sup1",
    name: "Shanghai Textiles Co.",
    corporateName: "Shanghai Textiles International Ltd.",
    country: "China",
    leadTime: 45,
    productCount: 12,
  },
  {
    id: "sup2",
    name: "Guangzhou Electronics Ltd.",
    corporateName: "Guangzhou Electronics Manufacturing Corp.",
    country: "China",
    leadTime: 30,
    productCount: 24,
  },
  {
    id: "sup3",
    name: "Mumbai Textiles Exports",
    corporateName: "Mumbai Textiles Exports Private Ltd.",
    country: "India",
    leadTime: 60,
    productCount: 8,
  },
  {
    id: "sup4",
    name: "Jakarta Home Goods Inc.",
    corporateName: "PT Jakarta Home Goods International",
    country: "Indonesia",
    leadTime: 40,
    productCount: 18,
  },
  {
    id: "sup5",
    name: "Vietnam Manufacturing Ltd.",
    corporateName: "Vietnam Manufacturing and Export Co.",
    country: "Vietnam",
    leadTime: 35,
    productCount: 15,
  },
  {
    id: "sup6",
    name: "Taiwan Tech Components",
    corporateName: "Taiwan Technology Components Co. Ltd.",
    country: "Taiwan",
    leadTime: 25,
    productCount: 32,
  },
  {
    id: "sup7",
    name: "Seoul Electronics Co.",
    corporateName: "Seoul Electronics Manufacturing Corp.",
    country: "South Korea",
    leadTime: 20,
    productCount: 28,
  },
  {
    id: "sup8",
    name: "Tokyo Trading Ltd.",
    corporateName: "Tokyo International Trading Corporation",
    country: "Japan",
    leadTime: 15,
    productCount: 22,
  },
];

type Supplier = (typeof mockSuppliers)[0];

const columns: ColumnDef<Supplier>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <div
        className="flex items-center cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "corporateName",
    header: "Corporate Name",
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => (
      <div className="flex items-center">
        <Badge variant="outline">{row.getValue("country")}</Badge>
      </div>
    ),
  },
  {
    accessorKey: "leadTime",
    header: ({ column }) => (
      <div
        className="flex items-center cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Lead Time (days)
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
  },
  {
    accessorKey: "productCount",
    header: ({ column }) => (
      <div
        className="flex items-center cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Products
        <ArrowUpDown className="ml-2 h-4 w-4" />
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
            <Link
              href={`/suppliers/${row.original.id}`}
              className="flex w-full"
            >
              View Details
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={`/suppliers/${row.original.id}/edit`}
              className="flex w-full"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={`/suppliers/${row.original.id}/products`}
              className="flex w-full"
            >
              <PackageOpen className="mr-2 h-4 w-4" />
              View Products
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

export function SuppliersDataTable() {
  return (
    <DataTable
      columns={columns}
      data={mockSuppliers}
      searchKey="name"
      searchPlaceholder="Search suppliers..."
    />
  );
}
