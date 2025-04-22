"use client";

import { cn } from "@/lib/utils";
import {
  FileText,
  Anchor,
  FileCheck,
  ShieldCheck,
  Calculator,
  Check,
} from "lucide-react";

interface PhaseTimelineProps {
  currentPhase: number;
}

export function PhaseTimeline({ currentPhase }: PhaseTimelineProps) {
  const phases = [
    {
      number: 1,
      name: "Proforma Invoice",
      icon: FileText,
      description: "Payment and PI preparation",
    },
    {
      number: 2,
      name: "Freight Forwarding",
      icon: Anchor,
      description: "Quotation and shipping details",
    },
    {
      number: 3,
      name: "Documentation",
      icon: FileCheck,
      description: "Import license and certificates",
    },
    {
      number: 4,
      name: "Customs Clearance",
      icon: ShieldCheck,
      description: "DI registration and release",
    },
    {
      number: 5,
      name: "Cost Closing",
      icon: Calculator,
      description: "Finalize costs and taxes",
    },
  ];

  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        {phases.map((phase, index) => {
          const isActive = phase.number === currentPhase;
          const isComplete = phase.number < currentPhase;
          const isFirst = index === 0;
          const isLast = index === phases.length - 1;

          return (
            <div
              key={phase.number}
              className="relative flex flex-col items-center"
            >
              {/* Progress line */}
              {!isFirst && (
                <div
                  className={cn(
                    "absolute top-5 h-0.5 w-full right-1/2 -z-10",
                    isComplete ? "bg-primary" : "bg-muted",
                  )}
                />
              )}

              {!isLast && (
                <div
                  className={cn(
                    "absolute top-5 h-0.5 w-full left-1/2 -z-10",
                    isComplete || isActive ? "bg-primary" : "bg-muted",
                  )}
                />
              )}

              {/* Icon */}
              <div
                className={cn(
                  "relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2",
                  isActive && "border-primary bg-primary/10",
                  isComplete &&
                    "border-primary bg-primary text-primary-foreground",
                  !isActive && !isComplete && "border-muted bg-background",
                )}
              >
                {isComplete ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <phase.icon
                    className={cn(
                      "h-5 w-5",
                      isActive && "text-primary",
                      !isActive && !isComplete && "text-muted-foreground",
                    )}
                  />
                )}
              </div>

              {/* Text */}
              <div className="mt-2 text-center">
                <p
                  className={cn(
                    "text-xs font-medium",
                    isActive && "text-primary",
                    isComplete && "text-primary",
                    !isActive && !isComplete && "text-muted-foreground",
                  )}
                >
                  Phase {phase.number}
                </p>
                <p
                  className={cn(
                    "text-sm font-medium",
                    isActive && "text-primary",
                    isComplete && "text-primary",
                    !isActive && !isComplete && "text-muted-foreground",
                  )}
                >
                  {phase.name}
                </p>
                <p className="text-xs text-muted-foreground max-w-[120px] hidden md:block">
                  {phase.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
