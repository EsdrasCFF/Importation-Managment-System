"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye } from "lucide-react";
import Link from "next/link";

// Mock data - in a real app, this would come from the database
const mockImports = [
  {
    id: "imp-001",
    reference: "PI-20250501-001",
    supplier: "Shanghai Textiles Co.",
    status: "active",
    currentPhase: 1,
    totalValue: 45000,
    createdAt: new Date("2025-05-01"),
  },
  {
    id: "imp-002",
    reference: "PI-20250428-002",
    supplier: "Guangzhou Electronics Ltd.",
    status: "active",
    currentPhase: 2,
    totalValue: 78500,
    createdAt: new Date("2025-04-28"),
  },
  {
    id: "imp-003",
    reference: "PI-20250425-003",
    supplier: "Mumbai Textiles Exports",
    status: "active",
    currentPhase: 3,
    totalValue: 32600,
    createdAt: new Date("2025-04-25"),
  },
  {
    id: "imp-004",
    reference: "PI-20250422-004",
    supplier: "Jakarta Home Goods Inc.",
    status: "active",
    currentPhase: 4,
    totalValue: 21450,
    createdAt: new Date("2025-04-22"),
  },
  {
    id: "imp-005",
    reference: "PI-20250420-005",
    supplier: "Vietnam Manufacturing Ltd.",
    status: "active",
    currentPhase: 5,
    totalValue: 56800,
    createdAt: new Date("2025-04-20"),
  },
  {
    id: "imp-006",
    reference: "PI-20250418-006",
    supplier: "Taiwan Tech Components",
    status: "completed",
    currentPhase: 5,
    totalValue: 94200,
    createdAt: new Date("2025-04-18"),
  },
];

type Import = typeof mockImports[0];

const getPhaseLabel = (phase: number) => {
  switch(phase) {
    case 1: return "Proforma Invoice";
    case 2: return "Freight Forwarding";
    case 3: return "Shipping Documentation";
    case 4: return "Customs Clearance";
    case 5: return "Cost Closing";
    default: return "Unknown";
  }
};

const getStatusBadge = (status: string, phase: number) => {
  if (status === "completed") {
    return <Badge className="bg-green-500">Completed</Badge>;
  }
  
  if (status === "cancelled") {
    return <Badge variant="destructive">Cancelled</Badge>;
  }
  
  return (
    <Badge className="bg-blue-500">
      Phase {phase}: {getPhaseLabel(phase)}
    </Badge>
  );
};

const columns: ColumnDef<Import>[] = [
  {
    accessorKey: "reference",
    header: ({ column }) => (
      <div
        className="flex items-center cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Reference
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
  },
  {
    accessorKey: "supplier",
    header: "Supplier",
  },
  {
    accessorKey: "totalValue",
    header: ({ column }) => (
      <div
        className="flex items-center cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Total Value
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => formatCurrency(row.original.totalValue),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <div
        className="flex items-center cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Created
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => formatDate(row.original.createdAt),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => getStatusBadge(row.original.status, row.original.currentPhase),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Link href={`/import-processes/${row.original.id}`}>
        <Button variant="ghost" size="icon">
          <Eye className="h-4 w-4" />
        </Button>
      </Link>
    ),
  },
];

export function RecentImportsTable() {
  return <DataTable columns={columns} data={mockImports} searchKey="reference" searchPlaceholder="Search references..." />;
}