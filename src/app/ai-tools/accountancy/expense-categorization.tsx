"use client";

import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { expenseCategorizationInputSchema, type ExpenseCategorizationInput, type ExpenseCategorizationOutput } from "@/lib/schemas";
import { categorizeExpense } from "@/ai/flows/expense-categorization-flow";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export function ExpenseCategorization() {
  const [isPending, startTransition] = React.useTransition();
  const [result, setResult] = React.useState<ExpenseCategorizationOutput | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const form = useForm<ExpenseCategorizationInput>({
    resolver: zodResolver(expenseCategorizationInputSchema),
    defaultValues: {
      description: "",
      amount: 0,
    },
  });

  const onSubmit: SubmitHandler<ExpenseCategorizationInput> = (values) => {
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
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expense Description</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Office coffee supplies" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount (£)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Categorize Expense
          </Button>
        </form>
      </Form>
      {isPending && (
        <div className="flex items-center justify-center">
          <Loader2 className="mr-2 h-8 w-8 animate-spin text-primary" />
          <p>AI is thinking...</p>
        </div>
      )}
      {error && (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}
      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Suggested Category</CardTitle>
            <CardDescription>{result.reason}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold font-headline text-primary">{result.category}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
