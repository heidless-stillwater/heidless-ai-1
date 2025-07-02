
"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { expenseCategorizationSchema, type ExpenseCategorizationValues, type CategorizedExpenses } from '@/lib/schemas';
import { categorizeExpenses } from '@/ai/flows/expense-flow';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from '@/components/ui/table';
import { Loader2, Wand2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function ExpenseCategorizer() {
    const [result, setResult] = React.useState<CategorizedExpenses | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const { toast } = useToast();

    const form = useForm<ExpenseCategorizationValues>({
        resolver: zodResolver(expenseCategorizationSchema),
        defaultValues: {
            expenses: "",
        },
    });

    const onSubmit = async (values: ExpenseCategorizationValues) => {
        setIsLoading(true);
        setResult(null);
        try {
            const response = await categorizeExpenses(values);
            setResult(response);
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to categorize expenses. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="border-2 border-primary/50 shadow-lg shadow-primary/10">
            <CardHeader>
                <CardTitle>AI Expense Categorizer</CardTitle>
                <CardDescription>
                    Enter your expenses below, one per line (e.g., &quot;Coffee with client £4.50&quot;). Our AI will automatically categorize them for you.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="expenses"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Expenses List</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="e.g.&#10;Train ticket to London £120&#10;Team lunch £85.50&#10;New office chair £250"
                                            className="min-h-[150px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Categorizing...
                                </>
                            ) : (
                                <>
                                    <Wand2 className="mr-2 h-4 w-4" />
                                    Categorize Expenses
                                </>
                            )}
                        </Button>
                    </form>
                </Form>

                {isLoading && (
                    <div className="mt-8 text-center">
                        <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                        <p className="mt-2 text-muted-foreground">Analyzing your expenses...</p>
                    </div>
                )}

                {result && (
                    <div className="mt-8 space-y-8">
                        <h3 className="text-2xl font-headline font-bold text-center">Categorization Result</h3>
                        {result.categorizedExpenses.map((category) => (
                            <Card key={category.category}>
                                <CardHeader className='pb-2'>
                                    <div className="flex justify-between items-center">
                                      <CardTitle className='font-headline text-xl'>{category.category}</CardTitle>
                                      <Badge variant="secondary">Total: £{category.total.toFixed(2)}</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Description</TableHead>
                                                <TableHead>Notes</TableHead>
                                                <TableHead className="text-right">Amount</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {category.items.map((item, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{item.description}</TableCell>
                                                    <TableCell className='text-muted-foreground italic'>{item.notes}</TableCell>
                                                    <TableCell className="text-right font-medium">£{item.amount.toFixed(2)}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        ))}
                         <div className="text-right font-bold text-xl font-headline">
                            Grand Total: £{result.grandTotal.toFixed(2)}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
