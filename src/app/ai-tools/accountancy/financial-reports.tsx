"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateFinancialReportInputSchema, type GenerateFinancialReportInput, type GenerateFinancialReportOutput } from "@/lib/schemas";
import { generateFinancialReport } from "@/ai/flows/financial-report-flow";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Bot } from "lucide-react";

const sampleData = `Date,Description,Amount
2023-10-01,Google Workspace Subscription,-12.00
2023-10-02,Client Payment - Project X,5000.00
2023-10-03,Office Lunch,-45.50
2023-10-05,Facebook Ads,-250.00
2023-10-07,Staples - Office Supplies,-78.90
2023-10-10,Client Payment - Project Y,3500.00
2023-10-15,WeWork Monthly Rent,-800.00
2023-10-20,Upwork Freelancer Payment,-1200.00`;

export function FinancialReports() {
  const [isPending, startTransition] = React.useTransition();
  const [result, setResult] = React.useState<GenerateFinancialReportOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<GenerateFinancialReportInput>({
    resolver: zodResolver(generateFinancialReportInputSchema),
    defaultValues: {
      transactions: "",
    },
  });

  const onSubmit = (values: GenerateFinancialReportInput) => {
    setResult(null);
    startTransition(async () => {
      try {
        const response = await generateFinancialReport(values);
        setResult(response);
      } catch (error) {
        console.error("Failed to generate report:", error);
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Financial Reporter</CardTitle>
          <CardDescription>
            Paste your transactions in CSV format and the AI will generate a summary report for you.
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
                  {isPending ? "Generating..." : "Generate Report"}
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
            <p className="ml-2">The AI is analyzing your data...</p>
        </div>
      )}

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>AI Financial Report</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Summary</h3>
              <p className="text-muted-foreground">{result.summary}</p>
            </div>
            <Separator/>
            <div>
              <h3 className="font-semibold text-lg mb-2">Profit & Loss</h3>
              <pre className="p-4 bg-muted rounded-md text-sm whitespace-pre-wrap">{result.pnlStatement}</pre>
            </div>
            <Separator/>
            <div>
              <h3 className="font-semibold text-lg mb-2">Key Insights</h3>
              <pre className="p-4 bg-muted rounded-md text-sm whitespace-pre-wrap">{result.insights}</pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
