"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { cn } from "@/lib/utils";
import { DollarSign, Plus, CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Payment {
  id: string;
  amount: number;
  date: Date;
  installment: number;
}

interface PaymentsSectionProps {
  payments: Payment[];
  totalValue: number;
  paymentStatus: string;
  paymentProgress: number;
  importId: string;
}

export function PaymentsSection({ 
  payments, 
  totalValue, 
  paymentStatus, 
  paymentProgress,
  importId
}: PaymentsSectionProps) {
  const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const remaining = totalValue - totalPaid;
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case "complete": return "text-green-500";
      case "partial": return "text-amber-500";
      case "pending": return "text-red-500";
      default: return "";
    }
  };
  
  const paymentMethods = ['Bank Transfer', 'Wire Transfer', 'Letter of Credit'];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payment Summary</CardTitle>
          <CardDescription>
            Overview of payments for this import process
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Value</p>
              <p className="text-lg font-medium">{formatCurrency(totalValue)}</p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-sm text-muted-foreground">Payment Status</p>
              <p className={cn(
                "text-lg font-medium",
                getStatusColor(paymentStatus)
              )}>
                {paymentStatus === "complete" ? "Paid" : 
                 paymentStatus === "partial" ? "Partially Paid" : "Pending"}
              </p>
            </div>
          </div>
          
          <div className="pt-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">
                {formatCurrency(totalPaid)} of {formatCurrency(totalValue)} paid
              </span>
              <span className="text-sm font-medium">
                {paymentProgress}%
              </span>
            </div>
            <Progress value={paymentProgress} className="h-2" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="border rounded-lg p-4 space-y-1">
              <p className="text-sm text-muted-foreground">Paid Amount</p>
              <p className="text-lg font-medium text-green-500">{formatCurrency(totalPaid)}</p>
              <p className="text-xs text-muted-foreground">
                {payments.length} payment(s) received
              </p>
            </div>
            <div className="border rounded-lg p-4 space-y-1">
              <p className="text-sm text-muted-foreground">Remaining Amount</p>
              <p className="text-lg font-medium text-amber-500">{formatCurrency(remaining)}</p>
              <p className="text-xs text-muted-foreground">
                {3 - payments.length} installment(s) remaining
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>
              List of payments made for this import process
            </CardDescription>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Record Payment
          </Button>
        </CardHeader>
        <CardContent>
          {payments.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              No payments recorded yet.
            </div>
          ) : (
            <div className="space-y-4">
              {payments.map((payment) => (
                <div 
                  key={payment.id}
                  className="flex items-center gap-4 p-4 border rounded-lg"
                >
                  <div className="p-2 rounded-full bg-green-100 dark:bg-green-900">
                    <DollarSign className="h-5 w-5 text-green-600 dark:text-green-300" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="font-medium">
                        Installment {payment.installment}
                      </p>
                      <p className="font-medium">
                        {formatCurrency(payment.amount)}
                      </p>
                    </div>
                    <div className="flex justify-between text-sm">
                      <p className="text-muted-foreground">
                        Paid on {formatDate(payment.date)}
                      </p>
                      <p className="text-muted-foreground">
                        Method: Bank Transfer
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {payments.length < 3 && (
                <div 
                  className="flex items-center gap-4 p-4 border border-dashed rounded-lg"
                >
                  <div className="p-2 rounded-full bg-muted">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="font-medium">
                        Installment {payments.length + 1}
                      </p>
                      <p className="font-medium">
                        {formatCurrency(remaining < totalValue / 3 ? remaining : totalValue / 3)}
                      </p>
                    </div>
                    <div className="flex justify-between text-sm">
                      <p className="text-muted-foreground">
                        Payment pending
                      </p>
                      <Badge variant="outline">
                        Scheduled
                      </Badge>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}