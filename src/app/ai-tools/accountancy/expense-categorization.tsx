"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { expenseCategorizationInputSchema, type ExpenseCategorizationInput, type ExpenseCategorizationOutput } from "@/lib/schemas";
import { categorizeExpense } from "@/ai/flows/expense-categorization-flow";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Bot } from "lucide-react";

const sampleData = `Date,Description,Amount
2023-10-01,Google Workspace Subscription,-12.00
2023-10-02,Client Payment - Project X,5000.00
2023-10-03,Office Lunch,-45.50
2023-10-05,Facebook Ads,-250.00
2023-10-07,Staples - Office Supplies,-78.90`;

export function ExpenseCategorization() {
  const [isPending, startTransition] = React.useTransition();
  const [result, setResult] = React.useState<ExpenseCategorizationOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<ExpenseCategorizationInput>({
    resolver: zodResolver(expenseCategorizationInputSchema),
    defaultValues: {
      transactions: "",
    },
  });

  const onSubmit = (values: ExpenseCategorizationInput) => {
    setResult(null);
    startTransition(async () => {
      try {
        const response = await categorizeExpense(values);
        setResult(response);
      } catch (error) {
        console.error("Failed to categorize expenses:", error);
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      }
    });
  };

  const handleUseSampleData = () => {
    form.setValue("transactions", sampleData);
  };

  const getConfidenceBadgeVariant = (confidence: 'Low' | 'Medium' | 'High') => {
    switch (confidence) {
      case 'High':
        return 'default';
      case 'Medium':
        return 'secondary';
      case 'Low':
        return 'outline';
      default:
        return 'destructive';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Expense Categorizer</CardTitle>
          <CardDescription>
            Paste your transactions in CSV format (including a header row) and the AI will categorize them for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="transactions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transaction Data (CSV)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Date,Description,Amount..."
                        className="min-h-[150px] font-mono text-xs"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2">
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Categorizing..." : "Categorize Expenses"}
                </Button>
                <Button type="button" variant="secondary" onClick={handleUseSampleData} disabled={isPending}>
                  Use Sample Data
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isPending && (
        <div className="flex items-center justify-center rounded-lg border p-8">
            <Bot className="h-8 w-8 animate-spin" />
            <p className="ml-2">The AI is analyzing your transactions...</p>
        </div>
      )}

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Categorized Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Original Transaction</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Confidence</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.categorizedTransactions.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.originalTransaction}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant={getConfidenceBadgeVariant(item.confidence)}>{item.confidence}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
