"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TimePeriodFiltersProps {
  currentPeriod: "daily" | "weekly" | "monthly";
  onPeriodChange: (period: "daily" | "weekly" | "monthly") => void;
}

export const TimePeriodFilters = ({ currentPeriod, onPeriodChange }: TimePeriodFiltersProps) => {
  const periods = [
    { key: "daily", label: "Daily" },
    { key: "weekly", label: "Weekly" },
    { key: "monthly", label: "Monthly" },
  ] as const;

  return (
    <div className="flex gap-2 mb-4">
      {periods.map((period) => (
        <Button
          key={period.key}
          variant="ghost"
          size="sm"
          onClick={() => onPeriodChange(period.key)}
          className={cn(
            "text-sm transition-all duration-200 hover:scale-105",
            currentPeriod === period.key 
              ? "bg-primary text-primary-foreground" 
              : "hover:bg-accent"
          )}
        >
          {period.label}
        </Button>
      ))}
    </div>
  );
};