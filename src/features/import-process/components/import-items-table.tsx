"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { formatCurrency } from "@/lib/utils/format";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, MoreHorizontal, Trash2 } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Item {
  id: string;
  product: {
    id: string;
    code: string;
    description: string;
    price: number;
  };
  quantity: number;
  totalPrice: number;
}

interface ImportItemsTableProps {
  items: Item[];
}

export function ImportItemsTable({ items }: ImportItemsTableProps) {
  const columns: ColumnDef<Item>[] = [
    {
      accessorKey: "product.code",
      header: "Code",
      cell: ({ row }) => <div className="font-medium">{row.original.product.code}</div>,
    },
    {
      accessorKey: "product.description",
      header: "Description",
      cell: ({ row }) => <div>{row.original.product.description}</div>,
    },
    {
      accessorKey: "product.price",
      header: ({ column }) => (
        <div
          className="flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Unit Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
      cell: ({ row }) => formatCurrency(row.original.product.price),
    },
    {
      accessorKey: "quantity",
      header: ({ column }) => (
        <div
          className="flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quantity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
    },
    {
      accessorKey: "totalPrice",
      header: ({ column }) => (
        <div
          className="flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
      cell: ({ row }) => formatCurrency(row.original.totalPrice),
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
              <Link href={`/products/${row.original.product.id}`} className="flex w-full">
                View Product Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit Quantity
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <DataTable columns={columns} data={items} />
      
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground">
            Total Items: <span className="font-medium">{items.length}</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">
            Total Value: <span className="font-medium">
              {formatCurrency(items.reduce((sum, item) => sum + item.totalPrice, 0))}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}