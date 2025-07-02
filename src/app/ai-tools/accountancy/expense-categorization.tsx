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
import { Textarea } from "@/components/ui/textarea";

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
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Categorize an Expense</CardTitle>
          <CardDescription>Enter an expense description and amount, and the AI will suggest a category.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expense Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., 'Client lunch meeting at The Cafe'" {...field} />
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
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 45.50" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} />
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
        </CardContent>
      </Card>
      
      <div>
        {isPending && <div className="flex items-center justify-center h-full"><p>Thinking...</p></div>}
        {error && <p className="text-destructive">Error: {error}</p>}
        {result && (
          <Card>
            <CardHeader>
              <CardTitle>Suggested Category</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">Category:</h3>
                <p>{result.category}</p>
              </div>
              <div>
                <h3 className="font-semibold">Reasoning:</h3>
                <p className="text-muted-foreground">{result.reasoning}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
