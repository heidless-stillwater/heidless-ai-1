"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { inventoryManagementInputSchema, type InventoryManagementInput, type InventoryManagementOutput } from "@/lib/schemas";
import { manageInventory } from "@/ai/flows/inventory-management-flow";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle, PackageCheck } from "lucide-react";

export function InventoryManagement() {
  const [isPending, startTransition] = React.useTransition();
  const [result, setResult] = React.useState<InventoryManagementOutput | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const form = useForm<InventoryManagementInput>({
    resolver: zodResolver(inventoryManagementInputSchema),
    defaultValues: {
      inventoryData: "",
    },
  });

  const onSubmit = (values: InventoryManagementInput) => {
    setResult(null);
    setError(null);
    startTransition(async () => {
      try {
        const response = await manageInventory(values);
        setResult(response);
      } catch (e: any) {
        setError(e.message || "An unexpected error occurred.");
      }
    });
  };
  
  const setSampleData = () => {
    const sampleData = `Buns,20
Beef Patties,15
Lettuce Heads,5
Tomatoes,50
Cheese Slices,150
Potatoes,200
Soda Syrup,2
Fries, 12`;
    form.setValue("inventoryData", sampleData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Management AI</CardTitle>
        <CardDescription>Enter your inventory data (item,quantity) to get reorder and usage suggestions.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="inventoryData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Inventory Data (CSV Format)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Buns,50\nBeef Patties,40\n..."
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
                {isPending ? "Analyzing..." : "Analyze Inventory"}
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
            {result.lowStockItems && result.lowStockItems.length > 0 && (
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                    <CardTitle className="text-destructive">Low Stock Alerts</CardTitle>
                  </div>
                  <CardDescription>These items are running low and may need to be reordered soon.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead className="text-center">Current Qty</TableHead>
                        <TableHead>Suggestion</TableHead>
                        <TableHead>Reasoning</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {result.lowStockItems.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell className="text-center">{item.currentQuantity}</TableCell>
                          <TableCell>{item.suggestion}</TableCell>
                          <TableCell className="text-muted-foreground">{item.reasoning}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}

            {result.overstockedItems && result.overstockedItems.length > 0 && (
               <Card>
                <CardHeader>
                   <div className="flex items-center gap-2">
                    <PackageCheck className="h-5 w-5 text-yellow-500" />
                    <CardTitle className="text-yellow-500">Overstock Warnings</CardTitle>
                  </div>
                  <CardDescription>Consider using these items in promotions to reduce potential waste.</CardDescription>
                </CardHeader>
                <CardContent>
                   <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead className="text-center">Current Qty</TableHead>
                        <TableHead>Suggestion</TableHead>
                        <TableHead>Reasoning</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {result.overstockedItems.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell className="text-center">{item.currentQuantity}</TableCell>
                          <TableCell>{item.suggestion}</TableCell>
                          <TableCell className="text-muted-foreground">{item.reasoning}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
            
            {result.lowStockItems?.length === 0 && result.overstockedItems?.length === 0 && (
               <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Inventory Status: Optimal</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>No immediate inventory issues detected. Stock levels appear to be within normal operational range.</p>
                </CardContent>
              </Card>
            )}

          </div>
        )}
      </CardContent>
    </Card>
  );
}
