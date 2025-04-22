"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils/format";
import {
  CalendarCheck2,
  Anchor,
  FileText,
  ShieldCheck,
  Truck,
} from "lucide-react";
import Link from "next/link";

// Mock data - in a real app, this would come from an API call
const mockTasks = [
  {
    id: "1",
    title: "Approve BL for Shanghai Textiles",
    date: new Date("2025-05-10"),
    importProcess: "PI-20250501-001",
    icon: FileText,
    phase: 2,
  },
  {
    id: "2",
    title: "Request Import License for Mumbai Textiles",
    date: new Date("2025-05-12"),
    importProcess: "PI-20250425-003",
    icon: ShieldCheck,
    phase: 3,
  },
  {
    id: "3",
    title: "Cargo pickup for Jakarta Home Goods",
    date: new Date("2025-05-15"),
    importProcess: "PI-20250422-004",
    icon: Truck,
    phase: 4,
  },
  {
    id: "4",
    title: "Cost closing for Vietnam Manufacturing",
    date: new Date("2025-05-18"),
    importProcess: "PI-20250420-005",
    icon: CalendarCheck2,
    phase: 5,
  },
];

const getIconColorByPhase = (phase: number) => {
  switch (phase) {
    case 1:
      return "text-blue-500";
    case 2:
      return "text-cyan-500";
    case 3:
      return "text-teal-500";
    case 4:
      return "text-orange-500";
    case 5:
      return "text-violet-500";
    default:
      return "text-gray-500";
  }
};

export function UpcomingTasksCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Tasks</CardTitle>
        <CardDescription>Tasks scheduled for the next days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-start gap-3 p-3 rounded-lg border hover:bg-accent/50 transition-colors"
            >
              <div className={`mt-0.5 ${getIconColorByPhase(task.phase)}`}>
                <task.icon className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <Link href={`/import-processes/${task.id}`}>
                  <p className="font-medium leading-none hover:underline">
                    {task.title}
                  </p>
                </Link>
                <div className="flex flex-col sm:flex-row sm:items-center text-xs text-muted-foreground gap-1 sm:gap-3">
                  <span>Due: {formatDate(task.date)}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>Ref: {task.importProcess}</span>
                </div>
              </div>
              <div className="ml-auto text-xs font-medium rounded-full px-2 py-1 bg-primary/10 text-primary">
                Phase {task.phase}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Link
            href="/tasks"
            className="text-sm text-primary font-medium hover:underline"
          >
            View all tasks
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
