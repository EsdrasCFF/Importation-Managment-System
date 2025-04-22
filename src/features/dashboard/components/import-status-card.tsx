"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  FileText,
  ShieldCheck,
  Calculator,
  Package,
  Anchor,
} from "lucide-react";

// In a real app, this data would come from an API call
const mockPhaseData = [
  {
    phase: 1,
    name: "Proforma Invoice",
    count: 8,
    icon: FileText,
    color: "bg-blue-500",
  },
  {
    phase: 2,
    name: "Freight Forwarding",
    count: 5,
    icon: Anchor,
    color: "bg-cyan-500",
  },
  {
    phase: 3,
    name: "Shipping Documentation",
    count: 4,
    icon: FileText,
    color: "bg-teal-500",
  },
  {
    phase: 4,
    name: "Customs Clearance",
    count: 5,
    icon: ShieldCheck,
    color: "bg-orange-500",
  },
  {
    phase: 5,
    name: "Cost Closing",
    count: 2,
    icon: Calculator,
    color: "bg-violet-500",
  },
];

const totalImports = mockPhaseData.reduce((sum, item) => sum + item.count, 0);

export function ImportStatusCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Import Process Status</CardTitle>
        <CardDescription>
          Current distribution of import processes by phase
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockPhaseData.map((phase) => (
            <div key={phase.phase} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-full ${phase.color}`}>
                    <phase.icon className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="text-sm font-medium">
                    Phase {phase.phase}: {phase.name}
                  </span>
                </div>
                <span className="text-sm font-medium">{phase.count}</span>
              </div>
              <Progress
                value={(phase.count / totalImports) * 100}
                className={`h-2 ${phase.color.replace(
                  "bg-",
                  "bg-opacity-70 bg-",
                )} border`}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
