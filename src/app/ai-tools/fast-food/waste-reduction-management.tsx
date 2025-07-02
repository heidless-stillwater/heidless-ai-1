"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format, addDays, differenceInCalendarDays, parse } from "date-fns";
import { reduceWaste } from "@/ai/flows/waste-reduction-flow";
import type { WasteReductionOutput } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, Lightbulb, ChefHat } from "lucide-react";

// Local schema for form validation
const formSchema = z.object({
  inventoryData: z.string().min(10, "Please enter some inventory data."),
});
type FormValues = z.infer<typeof formSchema>;

export function WasteReductionManagement() {
  const [isPending, startTransition] = React.useTransition();
  const [result, setResult] = React.useState<WasteReductionOutput | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inventoryData: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    setResult(null);
    setError(null);
    startTransition(async () => {
      try {
        const today = new Date();
        const lines = values.inventoryData.split('\n').filter(line => line.trim() !== '');
        
        const processedItems = lines.map(line => {
          const [name, purchaseDateStr, expirationDateStr, quantity] = line.split(',').map(s => s.trim());
          if (!name || !expirationDateStr) return null;
          
          const expirationDate = parse(expirationDateStr, 'yyyy-MM-dd', new Date());
          if (isNaN(expirationDate.getTime())) return null;

          const daysRemaining = differenceInCalendarDays(expirationDate, today);
          return { name, daysRemaining, quantity };
        }).filter(item => item !== null);

        if(processedItems.length === 0) {
            setError("Could not parse any valid items from the data. Please use the format: item,purchase_date,expiration_date,quantity");
            return;
        }

        const processedInventoryData = processedItems.map(item => `${item!.name} (Qty: ${item!.quantity}): ${item!.daysRemaining} days remaining`).join('\n');

        const response = await reduceWaste({ processedInventoryData });
        setResult(response);
      } catch (e: any) {
        setError(e.message || "An unexpected error occurred.");
      }
    });
  };

  const setSampleData = () => {
    const today = new Date();
    const sampleData = [
      `Lettuce Heads,${format(addDays(today, -5), 'yyyy-MM-dd')},${format(addDays(today, 1), 'yyyy-MM-dd')},10`,
      `Tomatoes (kg),${format(addDays(today, -3), 'yyyy-MM-dd')},${format(addDays(today, 2), 'yyyy-MM-dd')},15`,
      `Ground Beef (kg),${format(addDays(today, -1), 'yyyy-MM-dd')},${format(addDays(today, 0), 'yyyy-MM-dd')},5`,
      `Avocados,${format(addDays(today, -2), 'yyyy-MM-dd')},${format(addDays(today, 3), 'yyyy-MM-dd')},20`,
      `Milk (liters),${format(addDays(today, -4), 'yyyy-MM-dd')},${format(addDays(today, 5), 'yyyy-MM-dd')},8`,
    ].join('\n');
    form.setValue("inventoryData", sampleData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Waste Reduction AI</CardTitle>
        <CardDescription>Enter perishable inventory to get smart suggestions for reducing waste.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="inventoryData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Perishable Inventory Data (CSV)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Format: item,purchase_date,expiration_date,quantity&#10;e.g., Lettuce,2024-07-20,2024-07-25,10"
                      className="min-h-[150px] font-mono"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-2">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Analyzing..." : "Get Suggestions"}
              </Button>
               <Button type="button" variant="outline" onClick={setSampleData}>
                Use Sample Data
              </Button>
            </div>
          </form>
        </Form>

        {error && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-destructive">Error</h3>
            <p className="text-destructive">{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-6 space-y-6">
            {result.urgentItems && result.urgentItems.length > 0 && (
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    <CardTitle className="text-destructive">Urgent Items</CardTitle>
                  </div>
                  <CardDescription>Act fast! These items are nearing expiration. Here's how to use them.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead className="text-center">Days Left</TableHead>
                        <TableHead>Suggestion</TableHead>
                        <TableHead>Reasoning</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {result.urgentItems.map((item, index) => (
                        <TableRow key={index} className={item.daysRemaining <= 1 ? "bg-destructive/10" : ""}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell className="text-center font-bold">{item.daysRemaining}</TableCell>
                          <TableCell>{item.suggestion}</TableCell>
                          <TableCell className="text-muted-foreground">{item.reasoning}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}

            {result.proactiveStrategies && result.proactiveStrategies.length > 0 && (
               <Card>
                <CardHeader>
                   <div className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    <CardTitle className="text-yellow-500">Proactive Strategies</CardTitle>
                  </div>
                  <CardDescription>Implement these long-term strategies to reduce waste and save money.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        {result.proactiveStrategies.map((strategy, index) => (
                            <li key={index}>{strategy}</li>
                        ))}
                    </ul>
                </CardContent>
              </Card>
            )}
            
            {result.urgentItems?.length === 0 && (
               <Card className="mt-6">
                 <CardHeader>
                    <div className="flex items-center gap-2">
                      <ChefHat className="h-5 w-5 text-primary" />
                      <CardTitle>Inventory Looks Good!</CardTitle>
                    </div>
                  </CardHeader>
                <CardContent>
                  <p>No perishable items require urgent attention. Keep up the great inventory management!</p>
                </CardContent>
              </Card>
            )}

          </div>
        )}
      </CardContent>
    </Card>
  );
}
