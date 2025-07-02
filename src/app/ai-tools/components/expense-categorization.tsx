"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  expenseCategorizationFormSchema,
  type ExpenseCategorizationFormValues,
  type ExpenseCategorizationOutput,
} from "@/lib/schemas";
import { categorizeExpense } from "@/ai/flows/expense-categorization-flow";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ExpenseCategorization() {
  const [isPending, startTransition] = React.useTransition();
  const [result, setResult] = React.useState<ExpenseCategorizationOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<ExpenseCategorizationFormValues>({
    resolver: zodResolver(expenseCategorizationFormSchema),
    defaultValues: {
      description: "",
      amount: undefined, // Use undefined for empty number field
    },
  });

  const onSubmit = (values: ExpenseCategorizationFormValues) => {
    setResult(null);
    startTransition(async () => {
      try {
        const response = await categorizeExpense(values);
        setResult(response);
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "Failed to categorize expense. Please try again.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-xl">Categorize an Expense</CardTitle>
          <CardDescription>
            Enter an expense description and amount, and our AI will suggest a category.
          </CardDescription>
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
                      <Textarea
                        placeholder="e.g., Monthly subscription for design software"
                        {...field}
                      />
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
                      <Input type="number" placeholder="e.g., 49.99" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Categorizing...
                  </>
                ) : (
                  "Categorize Expense"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center">
        {isPending && (
          <div className="flex flex-col items-center gap-4 text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-muted-foreground">Our AI accountant is on the case...</p>
          </div>
        )}

        {!isPending && result && (
          <Card className="w-full bg-secondary">
             <CardHeader>
              <div className="flex items-center gap-3">
                 <Sparkles className="h-8 w-8 text-primary" />
                 <CardTitle className="font-headline text-xl">Suggested Category</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">Category</p>
                    <p className="text-2xl font-bold font-headline">{result.category}</p>
                </div>
                 <div>
                    <p className="text-sm font-medium text-muted-foreground">Reasoning</p>
                    <p className="text-muted-foreground">{result.reasoning}</p>
                </div>
            </CardContent>
          </Card>
        )}
         {!isPending && !result && (
             <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
                <p>Your categorized expense will appear here.</p>
             </div>
         )}
      </div>
    </div>
  );
}
