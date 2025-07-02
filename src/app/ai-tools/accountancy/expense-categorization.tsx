'use client';

import React from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  categorizeExpenses,
  type ExpenseCategorizationOutput,
} from '@/ai/flows/expense-categorization-flow';
import {
  expenseCategorizationSchema,
  type ExpenseCategorizationValues,
} from '@/lib/schemas';
import {useToast} from '@/hooks/use-toast';

import {Button} from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Textarea} from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {LoaderCircle} from 'lucide-react';

export function ExpenseCategorization() {
  const [isPending, startTransition] = React.useTransition();
  const [result, setResult] =
    React.useState<ExpenseCategorizationOutput | null>(null);
  const {toast} = useToast();

  const form = useForm<ExpenseCategorizationValues>({
    resolver: zodResolver(expenseCategorizationSchema),
    defaultValues: {
      expenses:
        'Starbucks - £4.50\nTrain ticket to London - £120.50\nAdobe Photoshop Subscription - £19.99\nNew office chair from Amazon - £150',
    },
  });

  const onSubmit = (values: ExpenseCategorizationValues) => {
    setResult(null);
    startTransition(async () => {
      try {
        const response = await categorizeExpenses(values);
        setResult(response);
      } catch (error) {
        console.error('Failed to categorize expenses:', error);
        toast({
          title: 'Error',
          description: 'Could not process your expenses. Please try again.',
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">
            Expense Categorization AI
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="expenses"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Your Expenses</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Coffee with client - $5.50, Taxi to airport - $45.00"
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter each expense on a new line or separated by commas.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <>
                    <LoaderCircle className="animate-spin" /> Analyzing...
                  </>
                ) : (
                  'Categorize Expenses'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isPending && !result && (
        <div className="flex justify-center items-center rounded-lg border bg-card text-card-foreground shadow-sm p-6 min-h-[200px]">
          <div className="text-center space-y-2">
            <LoaderCircle className="mx-auto h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">
              Our AI accountant is on the case...
            </p>
          </div>
        </div>
      )}

      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">
              Categorized Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.categorizedExpenses.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{item.category}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      £{item.amount.toFixed(2)}
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
