"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TodoFiltersProps {
  currentFilter: "all" | "active" | "completed";
  onFilterChange: (filter: "all" | "active" | "completed") => void;
}

export const TodoFilters = ({ currentFilter, onFilterChange }: TodoFiltersProps) => {
  const filters = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "completed", label: "Completed" },
  ] as const;

  return (
    <div className="flex gap-2 mb-4">
      {filters.map((filter) => (
        <Button
          key={filter.key}
          variant="ghost"
          size="sm"
          onClick={() => onFilterChange(filter.key)}
          className={cn(
            "text-sm transition-all duration-200 hover:scale-105",
            currentFilter === filter.key 
              ? "bg-primary text-primary-foreground" 
              : "hover:bg-accent"
          )}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
};