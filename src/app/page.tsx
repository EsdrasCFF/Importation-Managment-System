import { Button } from "@/components/ui/button";
import { ChevronRight, Package } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-16rem)]">
      <div className="text-center space-y-6 max-w-3xl px-4">
        <div className="p-3 inline-flex rounded-full bg-primary/10 text-primary mb-4">
          <Package className="h-10 w-10" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          ImportFlow
        </h1>
        <p className="text-xl text-muted-foreground">
          A comprehensive system to manage your company's importation processes,
          from Proforma Invoice to Cost Closing.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Link href="/dashboard">
            <Button size="lg" className="w-full sm:w-auto">
              Go to Dashboard
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/import-processes/new">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Start New Import Process
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
