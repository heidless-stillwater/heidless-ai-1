"use client";

import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { type FinancialReportOutput, type Transaction } from "@/lib/schemas";
import { generateFinancialReport } from "@/ai/flows/financial-report-flow";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  data: z.string().min(10, "Please enter at least one transaction."),
});

type FormValues = z.infer<typeof formSchema>;

const sampleData = `2023-01-05,Client Payment,1500.00
2023-01-07,Office Supplies,-50.25
2023-01-10,Software Subscription,-29.99
2023-01-15,Client Payment,2000.00
2023-01-20,Lunch Meeting,-75.50
2023-01-25,Freelancer Payment,-500.00
2023-01-28,Internet Bill,-60.00`;

export function FinancialReports() {
  const [isPending, startTransition] = React.useTransition();
  const [report, setReport] = React.useState<FinancialReportOutput | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      data: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    setReport(null);
    setError(null);
    startTransition(async () => {
      try {
        const lines = values.data.trim().split('\n');
        const transactions: Transaction[] = lines.map(line => {
          const [date, description, amount] = line.split(',');
          if (!date || !description || isNaN(parseFloat(amount))) {
            throw new Error(`Invalid data format on line: "${line}"`);
          }
          return { date: date.trim(), description: description.trim(), amount: parseFloat(amount) };
        });

        const response = await generateFinancialReport({ transactions });
        setReport(response);
      } catch (e: any) {
        setError(e.message || "An unexpected error occurred.");
      }
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Generate a Financial Report</CardTitle>
          <CardDescription>
            Paste your transaction data as CSV (date,description,amount), one transaction per line. Income should be a positive amount, expenses negative.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="data"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transaction Data (CSV)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="2023-01-05,Client Payment,1500.00" className="min-h-[150px] font-mono text-xs" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-wrap gap-2">
                 <Button type="submit" disabled={isPending}>
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Generate Report
                </Button>
                <Button type="button" variant="outline" onClick={() => form.setValue('data', sampleData)}>
                    Load Sample Data
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {isPending && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="mr-2 h-8 w-8 animate-spin text-primary" />
          <p>AI is analyzing your data...</p>
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

      {report && (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Report Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{report.summary}</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Profit & Loss Statement</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Metric</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>Total Income</TableCell>
                                <TableCell className="text-right text-green-500">£{report.profitAndLoss.totalIncome.toFixed(2)}</TableCell>
                            </TableRow>
                             <TableRow>
                                <TableCell>Total Expenses</TableCell>
                                <TableCell className="text-right text-red-500">£{Math.abs(report.profitAndLoss.totalExpenses).toFixed(2)}</TableCell>
                            </TableRow>
                            <TableRow className="font-bold">
                                <TableCell>Net Profit</TableCell>
                                <TableCell className={`text-right ${report.profitAndLoss.netProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    £{report.profitAndLoss.netProfit.toFixed(2)}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Key Insights</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc space-y-2 pl-5">
                        {report.keyInsights.map((insight, index) => (
                            <li key={index}>{insight}</li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
      )}
    </div>
  );
}
