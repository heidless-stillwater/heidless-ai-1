"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { recommendationsInputSchema, type RecommendationsInput, type RecommendationsOutput } from "@/lib/schemas";
import { getMealRecommendation } from "@/ai/flows/recommendations-flow";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { UtensilsCrossed } from "lucide-react";

const dietaryOptions = [
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'gluten-free', label: 'Gluten-Free' },
];

export function RecommendationsAI() {
  const [isPending, startTransition] = React.useTransition();
  const [result, setResult] = React.useState<RecommendationsOutput | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const form = useForm<RecommendationsInput>({
    resolver: zodResolver(recommendationsInputSchema),
    defaultValues: {
      occasion: "any",
      flavorProfile: "any",
      dietaryRestrictions: [],
    },
  });

  const onSubmit = (values: RecommendationsInput) => {
    setResult(null);
    setError(null);
    startTransition(async () => {
      try {
        const response = await getMealRecommendation(values);
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
          <CardTitle>Meal Recommender</CardTitle>
          <CardDescription>Tell us your preferences, and our AI chef will recommend the perfect meal for you.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="occasion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Occasion</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an occasion" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="lunch">Lunch</SelectItem>
                        <SelectItem value="dinner">Dinner</SelectItem>
                        <SelectItem value="snack">Snack</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="flavorProfile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Flavor Profile</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a flavor profile" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="spicy">Spicy</SelectItem>
                        <SelectItem value="savory">Savory</SelectItem>
                        <SelectItem value="sweet">Sweet</SelectItem>
                        <SelectItem value="light">Light</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dietaryRestrictions"
                render={() => (
                  <FormItem>
                     <div className="mb-4">
                        <FormLabel>Dietary Restrictions</FormLabel>
                     </div>
                    {dietaryOptions.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="dietaryRestrictions"
                        render={({ field }) => {
                          return (
                            <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...(field.value || []), item.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending}>
                {isPending ? "Thinking..." : "Get Recommendation"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <div>
        {isPending && <div className="flex items-center justify-center h-full"><p>Our chef is thinking...</p></div>}
        {error && <p className="text-destructive">Error: {error}</p>}
        {result && (
          <Card className="bg-secondary">
            <CardHeader className="items-center text-center">
                <div className="p-4 rounded-full bg-primary/10">
                    <UtensilsCrossed className="h-10 w-10 text-primary" />
                </div>
              <CardTitle>Chef's Recommendation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg text-primary">{result.mealName}</h3>
                <p className="text-muted-foreground italic">{result.description}</p>
              </div>
              <div className="pt-2">
                <h3 className="font-semibold">Why you'll love it:</h3>
                <p className="text-muted-foreground">{result.reasoning}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
