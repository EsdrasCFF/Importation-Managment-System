"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

// In a real app, this data would come from an API call
const mockData = [
  { name: "Phase 1: PI", value: 8, color: "#3b82f6" },
  { name: "Phase 2: Freight", value: 5, color: "#06b6d4" },
  { name: "Phase 3: Docs", value: 4, color: "#14b8a6" },
  { name: "Phase 4: Customs", value: 5, color: "#f97316" },
  { name: "Phase 5: Cost", value: 2, color: "#8b5cf6" },
];

export function PhaseDistributionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Phase Distribution</CardTitle>
        <CardDescription>
          Visual breakdown of imports by current phase
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={mockData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                labelLine={false}
              >
                {mockData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`${value} imports`, "Count"]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
