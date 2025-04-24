"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export default function Home() {
  const [revenue, setRevenue] = useState<number | null>(null);
  const [expenses, setExpenses] = useState<number | null>(null);
  const profit = revenue !== null && expenses !== null ? revenue - expenses : null;

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Financial Dashboard */}
        <Card>
          <CardHeader>
            <CardTitle>Financial Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Total Revenue
              </label>
              <Input
                type="number"
                placeholder="Enter total revenue"
                onChange={(e) => setRevenue(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Total Expenses
              </label>
              <Input
                type="number"
                placeholder="Enter total expenses"
                onChange={(e) => setExpenses(Number(e.target.value))}
              />
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Profit
              </label>
              <div className={cn("rounded-md border bg-secondary px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", profit !== null && profit > 0 ? "text-profit" : "text-loss")}>
                {profit !== null ? currencyFormatter.format(profit) : "Enter revenue and expenses"}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appointment Calendar */}
        <Card>
          <CardHeader>
            <CardTitle>Appointment Calendar</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Calendar />
            <div className="mt-4">
              <Button>Add Appointment</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
