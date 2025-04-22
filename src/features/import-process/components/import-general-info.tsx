"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ImportGeneralInfoProps {
  importProcess: any; // Type would be more specific in a real app
}

export function ImportGeneralInfo({ importProcess }: ImportGeneralInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>General Information</CardTitle>
        <CardDescription>
          Overview of the import process details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Import Details</h4>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                <dt className="text-sm text-muted-foreground">Reference</dt>
                <dd className="text-sm font-medium text-right">{importProcess.reference}</dd>
                
                <dt className="text-sm text-muted-foreground">Created</dt>
                <dd className="text-sm font-medium text-right">{formatDate(importProcess.createdAt)}</dd>
                
                <dt className="text-sm text-muted-foreground">Total Value</dt>
                <dd className="text-sm font-medium text-right">{formatCurrency(importProcess.totalValue)}</dd>
                
                <dt className="text-sm text-muted-foreground">Item Count</dt>
                <dd className="text-sm font-medium text-right">{importProcess.items.length}</dd>
                
                <dt className="text-sm text-muted-foreground">Cargo Ready</dt>
                <dd className="text-sm font-medium text-right">{formatDate(importProcess.cargoReadyDate)}</dd>
              </dl>
            </div>
            
            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium mb-2">Payment Information</h4>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                <dt className="text-sm text-muted-foreground">Payment Status</dt>
                <dd className={cn(
                  "text-sm font-medium text-right",
                  importProcess.paymentStatus === "complete" && "text-green-500",
                  importProcess.paymentStatus === "partial" && "text-amber-500",
                  importProcess.paymentStatus === "pending" && "text-red-500"
                )}>
                  {importProcess.paymentStatus === "complete" ? "Paid" : 
                   importProcess.paymentStatus === "partial" ? "Partially Paid" : "Pending"}
                </dd>
                
                <dt className="text-sm text-muted-foreground">Paid Amount</dt>
                <dd className="text-sm font-medium text-right">{formatCurrency(importProcess.paymentPaid)}</dd>
                
                <dt className="text-sm text-muted-foreground">Remaining</dt>
                <dd className="text-sm font-medium text-right">{formatCurrency(importProcess.totalValue - importProcess.paymentPaid)}</dd>
                
                <dt className="text-sm text-muted-foreground">Installments</dt>
                <dd className="text-sm font-medium text-right">{importProcess.payments.length} of 3</dd>
              </dl>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Supplier Information</h4>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                <dt className="text-sm text-muted-foreground">Supplier</dt>
                <dd className="text-sm font-medium text-right">
                  <Link href={`/suppliers/${importProcess.supplier.id}`} className="hover:underline text-primary">
                    {importProcess.supplier.name}
                  </Link>
                </dd>
                
                <dt className="text-sm text-muted-foreground">Country</dt>
                <dd className="text-sm font-medium text-right">{importProcess.supplier.country}</dd>
              </dl>
            </div>
            
            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium mb-2">Shipping & Documents</h4>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                <dt className="text-sm text-muted-foreground">Shipping Method</dt>
                <dd className="text-sm font-medium text-right">Sea Freight</dd>
                
                <dt className="text-sm text-muted-foreground">Freight Forwarder</dt>
                <dd className="text-sm font-medium text-right">Not defined yet</dd>
                
                <dt className="text-sm text-muted-foreground">Import License</dt>
                <dd className="text-sm font-medium text-right">Required</dd>
                
                <dt className="text-sm text-muted-foreground">LI Status</dt>
                <dd className="text-sm font-medium text-right">Not requested</dd>
              </dl>
            </div>
            
            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium mb-2">Customs & Taxes</h4>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                <dt className="text-sm text-muted-foreground">DI Registration</dt>
                <dd className="text-sm font-medium text-right">Pending</dd>
                
                <dt className="text-sm text-muted-foreground">Exchange Rate</dt>
                <dd className="text-sm font-medium text-right">Not defined</dd>
                
                <dt className="text-sm text-muted-foreground">Total Taxes</dt>
                <dd className="text-sm font-medium text-right">Not calculated</dd>
              </dl>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}