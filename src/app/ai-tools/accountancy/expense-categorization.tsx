"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { expenseCategorizationInputSchema, type ExpenseCategorizationInput, type ExpenseCategorizationOutput } from "@/lib/schemas";
import { categorizeExpense } from "@/ai/flows/expense-categorization-flow";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Loader2 } from "lucide-react";

export function ExpenseCategorization() {
  const [isPending, startTransition] = React.useTransition();
  const [result, setResult] = React.useState<ExpenseCategorizationOutput | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const form = useForm<ExpenseCategorizationInput>({
    resolver: zodResolver(expenseCategorizationInputSchema),
    defaultValues: {
      description: "",
      amount: "",
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
          <CardDescription>Enter expense details below to get an AI-powered category suggestion.</CardDescription>
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
                      <Textarea placeholder="e.g., 'Client lunch meeting at The Cafe' or 'Monthly subscription for design software'" {...field} />
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
                      <Input type="text" placeholder="e.g., 45.50" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</> : "Categorize Expense"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {result && (
          <Card className="bg-secondary">
            <CardHeader>
              <CardTitle>AI Suggestion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Category</h3>
                <Badge>{result.category}</Badge>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Sub-category</h3>
                <Badge variant="outline">{result.subcategory}</Badge>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Justification</h3>
                <p className="text-sm text-muted-foreground">{result.justification}</p>
              </div>
            </CardContent>
          </Card>
        )}
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {!result && !error && (
          <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertTitle>Waiting for input</AlertTitle>
            <AlertDescription>
              Your AI-generated expense category will appear here once you submit the form.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
