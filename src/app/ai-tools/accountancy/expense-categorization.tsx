"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { expenseCategorizationInputSchema, type ExpenseCategorizationInput, type ExpenseCategorizationOutput } from "@/lib/schemas";
import { categorizeExpense } from "@/ai/flows/expense-categorization-flow";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ExpenseCategorization() {
  const [isPending, startTransition] = React.useTransition();
  const [result, setResult] = React.useState<ExpenseCategorizationOutput | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const form = useForm<ExpenseCategorizationInput>({
    resolver: zodResolver(expenseCategorizationInputSchema),
    defaultValues: {
      description: "",
    },
  });

  const onSubmit = (values: ExpenseCategorizationInput) => {
    setResult(null);
    setError(null);
    startTransition(async () => {
      try {
        const response = await categorizeExpense(values);
        setResult(response);
      } catch (e: any) {
        setError(e.message || "An unexpected error occurred.");
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense Categorization</CardTitle>
        <CardDescription>Enter an expense description to automatically categorize it.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expense Description</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 'Team lunch at The Grand Bistro'" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? "Categorizing..." : "Categorize Expense"}
            </Button>
          </form>
        </Form>

        {error && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-destructive">Error</h3>
            <p className="text-destructive">{error}</p>
          </div>
        )}

        {result && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Categorization Result</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <p className="font-semibold">Category:</p>
                <Badge>{result.category}</Badge>
              </div>
               <div className="flex items-center gap-2">
                <p className="font-semibold">Confidence:</p>
                <Badge variant={result.confidence > 80 ? "default" : "secondary"}>{result.confidence}%</Badge>
              </div>
              <p className="text-sm text-muted-foreground pt-2">{result.explanation}</p>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
