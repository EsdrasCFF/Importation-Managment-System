"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  FileText,
  Anchor,
  Package,
  ShieldCheck,
  Calculator,
  Clock,
  FileCheck,
  Landmark,
  ClipboardCheck,
  ListChecks,
  FileBarChart,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { ImportGeneralInfo } from "@/features/import-processes/components/import-general-info";
import { ImportItemsTable } from "@/features/import-processes/components/import-items-table";
import { PaymentsSection } from "@/features/import-processes/components/payments-section";
import { PhaseTimeline } from "@/features/import-processes/components/phase-timeline";

interface ImportProcessPageProps {
  params: {
    id: string;
  };
}

export default function ImportProcessPage({ params }: ImportProcessPageProps) {
  // In a real app, this would come from API
  const importProcess = {
    id: params.id,
    reference: "PI-20250501-001",
    supplier: {
      id: "sup1",
      name: "Shanghai Textiles Co.",
      country: "China",
    },
    status: "active",
    currentPhase: 2,
    totalValue: 45000,
    createdAt: new Date("2025-05-01"),
    cargoReadyDate: new Date("2025-05-08"),
    isDelayed: false,
    paymentStatus: "partial", // complete, partial, pending
    paymentProgress: 66, // percentage
    paymentTotal: 45000,
    paymentPaid: 30000,
    items: [
      {
        id: "item-001",
        product: {
          id: "prod-001",
          code: "TX-102",
          description: "Cotton Fabric - White",
          price: 12.5,
        },
        quantity: 2000,
        totalPrice: 25000,
      },
      {
        id: "item-002",
        product: {
          id: "prod-002",
          code: "TX-103",
          description: "Cotton Fabric - Black",
          price: 13.75,
        },
        quantity: 1454,
        totalPrice: 20000,
      },
    ],
    payments: [
      {
        id: "pay-001",
        amount: 15000,
        date: new Date("2025-05-02"),
        installment: 1,
      },
      {
        id: "pay-002",
        amount: 15000,
        date: new Date("2025-05-05"),
        installment: 2,
      },
    ],
  };

  const phaseIcons = [FileText, Anchor, FileCheck, ShieldCheck, Calculator];

  const getPhaseLabel = (phase: number) => {
    switch (phase) {
      case 1:
        return "Proforma Invoice";
      case 2:
        return "Freight Forwarding";
      case 3:
        return "Shipping Documentation";
      case 4:
        return "Customs Clearance";
      case 5:
        return "Cost Closing";
      default:
        return "Unknown";
    }
  };

  const getStatusBadge = (
    status: string,
    phase: number,
    isDelayed: boolean
  ) => {
    if (status === "completed") {
      return <Badge className="bg-green-500">Completed</Badge>;
    }

    if (status === "cancelled") {
      return <Badge variant="destructive">Cancelled</Badge>;
    }

    if (isDelayed) {
      return <Badge variant="destructive">Delayed</Badge>;
    }

    return (
      <Badge className="bg-blue-500">
        Phase {phase}: {getPhaseLabel(phase)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div className="flex items-center space-x-2">
          <Link href="/import-processes">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              {importProcess.reference}
              {getStatusBadge(
                importProcess.status,
                importProcess.currentPhase,
                importProcess.isDelayed
              )}
            </h2>
            <p className="text-muted-foreground">
              Import process from {importProcess.supplier.name}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/import-processes/${params.id}/edit`}>
            <Button variant="outline">Edit Process</Button>
          </Link>
          <Link href={`/import-processes/${params.id}/timeline`}>
            <Button>View Timeline</Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <div className="space-y-6 md:col-span-5">
          <Card>
            <CardContent className="pt-6">
              <PhaseTimeline currentPhase={importProcess.currentPhase} />
            </CardContent>
          </Card>

          <Tabs defaultValue="general" className="space-y-4">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:w-[600px]">
              <TabsTrigger value="general" className="flex items-center gap-2">
                <ClipboardCheck className="h-4 w-4" />
                General
              </TabsTrigger>
              <TabsTrigger value="items" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Items
              </TabsTrigger>
              <TabsTrigger value="payments" className="flex items-center gap-2">
                <Landmark className="h-4 w-4" />
                Payments
              </TabsTrigger>
              <TabsTrigger
                value="documents"
                className="flex items-center gap-2"
              >
                <ListChecks className="h-4 w-4" />
                Documents
              </TabsTrigger>
            </TabsList>
            <TabsContent value="general" className="space-y-4">
              <ImportGeneralInfo importProcess={importProcess} />
            </TabsContent>
            <TabsContent value="items" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Import Items</CardTitle>
                  <CardDescription>
                    Products included in this import process
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ImportItemsTable items={importProcess.items} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="payments" className="space-y-4">
              <PaymentsSection
                payments={importProcess.payments}
                totalValue={importProcess.totalValue}
                paymentStatus={importProcess.paymentStatus}
                paymentProgress={importProcess.paymentProgress}
                importId={importProcess.id}
              />
            </TabsContent>
            <TabsContent value="documents" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Documents</CardTitle>
                  <CardDescription>
                    All documents related to this import process
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    No documents uploaded yet. You can add documents for each
                    phase.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                Payment Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">
                    {formatCurrency(importProcess.paymentPaid)} of{" "}
                    {formatCurrency(importProcess.paymentTotal)}
                  </span>
                  <Badge
                    variant={
                      importProcess.paymentStatus === "complete"
                        ? "default"
                        : "outline"
                    }
                    className={
                      importProcess.paymentStatus === "complete"
                        ? "bg-green-500"
                        : ""
                    }
                  >
                    {importProcess.paymentStatus === "complete"
                      ? "Paid"
                      : importProcess.paymentStatus === "partial"
                      ? "Partially Paid"
                      : "Pending"}
                  </Badge>
                </div>
                <Progress
                  value={importProcess.paymentProgress}
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                Current Phase
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
                  {/* {phaseIcons[importProcess.currentPhase - 1] && (
                    <phaseIcons[importProcess.currentPhase - 1] className="h-5 w-5 text-blue-700 dark:text-blue-300" />
                  )} */}
                </div>
                <div>
                  <div className="font-medium">
                    Phase {importProcess.currentPhase}:{" "}
                    {getPhaseLabel(importProcess.currentPhase)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Started on {formatDate(new Date())}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <h4 className="text-sm font-medium mb-2">Next steps:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm">
                    <Clock className="h-4 w-4 mt-0.5 text-blue-500" />
                    <span>Request quotations from freight forwarders</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <Clock className="h-4 w-4 mt-0.5 text-blue-500" />
                    <span>Define the freight forwarder</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <Clock className="h-4 w-4 mt-0.5 text-blue-500" />
                    <span>Approve BL (Bill of Lading)</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Key Dates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Creation Date</span>
                  <span className="text-sm font-medium">
                    {formatDate(importProcess.createdAt)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Cargo Ready Date</span>
                  <span className="text-sm font-medium">
                    {formatDate(importProcess.cargoReadyDate)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Estimated Arrival</span>
                  <span className="text-sm font-medium">Not defined</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full flex justify-between items-center"
                >
                  <span className="flex items-center">
                    <FileBarChart className="mr-2 h-4 w-4" />
                    Process Summary
                  </span>
                  <Badge variant="outline">PDF</Badge>
                </Button>
                <Button
                  variant="outline"
                  className="w-full flex justify-between items-center"
                >
                  <span className="flex items-center">
                    <FileBarChart className="mr-2 h-4 w-4" />
                    Costs Breakdown
                  </span>
                  <Badge variant="outline">PDF</Badge>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
