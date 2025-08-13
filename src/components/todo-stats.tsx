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
      <Card className="stat-card satisfying-click">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Total</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{total}</div>
        </CardContent>
      </Card>
      <Card className="stat-card satisfying-click">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Active</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{active}</div>
        </CardContent>
      </Card>
      <Card className="stat-card satisfying-click">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Completed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{completed}</div>
        </CardContent>
      </Card>
    </div>
  );
};