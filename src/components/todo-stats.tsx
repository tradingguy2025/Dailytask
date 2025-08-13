"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TodoStatsProps {
  total: number;
  completed: number;
  active: number;
}

export const TodoStats = ({ total, completed, active }: TodoStatsProps) => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <Card className="neon-glow transition-all duration-300 hover:scale-105">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold transition-colors duration-200">{total}</div>
        </CardContent>
      </Card>
      <Card className="neon-glow transition-all duration-300 hover:scale-105">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Active</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600 transition-colors duration-200">{active}</div>
        </CardContent>
      </Card>
      <Card className="neon-glow transition-all duration-300 hover:scale-105">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Completed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600 transition-colors duration-200">{completed}</div>
        </CardContent>
      </Card>
    </div>
  );
};