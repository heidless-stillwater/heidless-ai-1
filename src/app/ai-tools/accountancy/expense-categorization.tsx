"use client";

import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import type { CategorizedExpenses } from "@/ai/flows/expense-categorization-flow";
import { categorizeExpensesAction } from "./actions";

export function ExpenseCategorization() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<CategorizedExpenses | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expenses, setExpenses] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult(null);
    setError(null);

    startTransition(async () => {
      const { data, error } = await categorizeExpensesAction(expenses);
      if (error) {
        setError(error);
      } else {
        setResult(data);
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Expense Categorization</CardTitle>
        <CardDescription>
          Enter a list of your expenses, one per line. The AI will categorize them for you.
          Try pasting something like: <br />
          <code className="text-xs bg-muted p-1 rounded">Starbucks Coffee - 5.45</code><br/>
          <code className="text-xs bg-muted p-1 rounded">Monthly Adobe Subscription - 29.99</code><br/>
          <code className="text-xs bg-muted p-1 rounded">Train ticket to London - 75.00</code>
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Textarea
            placeholder="e.g., Office supplies - 50.25"
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
            rows={8}
            disabled={isPending}
            required
          />
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Categorizing..." : "Categorize Expenses"}
          </Button>
        </CardFooter>
      </form>

      {error && (
        <CardContent>
           <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
      )}

      {result && (
        <CardContent>
          <h3 className="font-headline text-lg mb-4">Categorized Expenses</h3>
          <div className="space-y-4">
            {Object.entries(result).map(([category, items]) => (
              items.length > 0 && (
                <div key={category}>
                  <h4 className="font-semibold capitalize mb-2">{category.replace(/_/g, " ")}</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {items.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.description}</TableCell>
                          <TableCell className="text-right">{item.amount.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
