"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ChevronDown, Filter, X } from "lucide-react";
import { useState } from "react";

export function ImportProcessFilters() {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<string>("");
  const [supplier, setSupplier] = useState<string>("");
  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleApplyFilters = () => {
    const newFilters: string[] = [];

    if (phase) newFilters.push(`Phase: ${phase}`);
    if (supplier) newFilters.push(`Supplier: ${supplier}`);
    if (dateFrom && dateTo)
      newFilters.push(
        `Date: ${format(dateFrom, "MMM dd, yyyy")} - ${format(dateTo, "MMM dd, yyyy")}`,
      );

    setActiveFilters(newFilters);
    setOpen(false);
  };

  const handleClearFilters = () => {
    setPhase("");
    setSupplier("");
    setDateFrom(undefined);
    setDateTo(undefined);
    setActiveFilters([]);
  };

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter));

    if (filter.startsWith("Phase:")) setPhase("");
    if (filter.startsWith("Supplier:")) setSupplier("");
    if (filter.startsWith("Date:")) {
      setDateFrom(undefined);
      setDateTo(undefined);
    }
  };

  // Mock data - in a real app this would come from an API
  const mockSuppliers = [
    { id: "sup1", name: "Shanghai Textiles Co." },
    { id: "sup2", name: "Guangzhou Electronics Ltd." },
    { id: "sup3", name: "Mumbai Textiles Exports" },
    { id: "sup4", name: "Jakarta Home Goods Inc." },
    { id: "sup5", name: "Vietnam Manufacturing Ltd." },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full max-w-md p-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Phase</h4>
                <Select value={phase} onValueChange={setPhase}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select phase" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Phases</SelectItem>
                    <SelectItem value="1">Phase 1: Proforma Invoice</SelectItem>
                    <SelectItem value="2">
                      Phase 2: Freight Forwarding
                    </SelectItem>
                    <SelectItem value="3">
                      Phase 3: Shipping Documentation
                    </SelectItem>
                    <SelectItem value="4">
                      Phase 4: Customs Clearance
                    </SelectItem>
                    <SelectItem value="5">Phase 5: Cost Closing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Supplier</h4>
                <Select value={supplier} onValueChange={setSupplier}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Suppliers</SelectItem>
                    {mockSuppliers.map((supplier) => (
                      <SelectItem key={supplier.id} value={supplier.id}>
                        {supplier.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">From Date</h4>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dateFrom && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateFrom ? format(dateFrom, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dateFrom}
                        onSelect={setDateFrom}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">To Date</h4>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dateTo && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateTo ? format(dateTo, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dateTo}
                        onSelect={setDateTo}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={handleClearFilters}>
                  Clear
                </Button>
                <Button onClick={handleApplyFilters}>Apply Filters</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {activeFilters.length > 0 && (
          <Button variant="ghost" onClick={handleClearFilters}>
            Clear all filters
          </Button>
        )}
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="flex items-center gap-1 px-3 py-1"
            >
              {filter}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => removeFilter(filter)}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

// Import Badge component
import { Badge } from "@/components/ui/badge";
