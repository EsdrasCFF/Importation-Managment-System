import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImportProcessDataTable } from "@/features/import-processes/components/import-process-data-table";
import { ImportProcessFilters } from "@/features/import-processes/components/import-process-filters";
import { Package, Plus, Filter } from "lucide-react";
import Link from "next/link";

export default function ImportProcessesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Import Processes
          </h2>
          <p className="text-muted-foreground">
            Manage and track all your import processes in one place
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/import-processes/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Import Process
            </Button>
          </Link>
        </div>
      </div>

      <ImportProcessFilters />

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Processes</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="delayed">Delayed</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>All Import Processes</CardTitle>
              <CardDescription>
                View and manage all your import processes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ImportProcessDataTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Active Import Processes</CardTitle>
              <CardDescription>
                Currently active import processes across all phases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ImportProcessDataTable filter="active" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Completed Import Processes</CardTitle>
              <CardDescription>
                Successfully completed import processes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ImportProcessDataTable filter="completed" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="delayed" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Delayed Import Processes</CardTitle>
              <CardDescription>
                Import processes that are behind schedule
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ImportProcessDataTable filter="delayed" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
