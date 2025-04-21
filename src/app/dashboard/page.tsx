import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Package,
  Anchor,
  Plane,
  FileText,
  ShieldCheck,
  Calculator,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { ImportStatusCard } from "@/features/dashboard/components/import-status-card";
import { PhaseDistributionChart } from "@/features/dashboard/components/phase-distribution-chart";
import { UpcomingTasksCard } from "@/features/dashboard/components/upcoming-tasks-card";
import { RecentImportsTable } from "@/features/dashboard/components/recent-imports-table";

export default function DashboardPage() {
  // Mock data - in a real app, this would come from the API
  const statCards = [
    {
      title: "Active Imports",
      value: "24",
      change: "+2 from last month",
      trend: "up",
      icon: Package,
      color: "text-blue-500",
    },
    {
      title: "Sea Shipments",
      value: "18",
      change: "75% of active imports",
      trend: "up",
      icon: Anchor,
      color: "text-cyan-500",
    },
    {
      title: "Air Shipments",
      value: "6",
      change: "25% of active imports",
      trend: "up",
      icon: Plane,
      color: "text-orange-500",
    },
    {
      title: "Delayed Processes",
      value: "3",
      change: "12.5% of all imports",
      trend: "down",
      icon: AlertCircle,
      color: "text-red-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your import operations.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/import-processes/new">
            <div className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4">
              <Package className="mr-2 h-4 w-4" />
              New Import Process
            </div>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <div className={`${card.color} bg-primary/10 p-2 rounded-full`}>
                <card.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                {card.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-green-500" />
                ) : (
                  <TrendingUp className="h-3 w-3 text-red-500 rotate-180" />
                )}
                {card.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ImportStatusCard />
        <PhaseDistributionChart />
        <UpcomingTasksCard />
      </div>

      <div className="grid gap-4 md:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Recent Import Processes</CardTitle>
            <CardDescription>
              Overview of your latest import processes and their current status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentImportsTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
