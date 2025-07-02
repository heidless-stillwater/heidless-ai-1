"use client";

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  mealRecommendationInputSchema,
  type MealRecommendationInput,
  type MealRecommendationOutput,
} from '@/lib/schemas';
import { getMealRecommendation } from '@/ai/flows/recommendations-flow';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Bot, Sparkles } from 'lucide-react';

const occasions = ['Quick Lunch', 'Dinner with Friends', 'Late-night Snack', 'Healthy Option', 'A Treat'];
const flavors = ['Spicy', 'Savory', 'Sweet', 'Cheesy', 'Tangy', 'Smoky'];
const dietaryOptions = [
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'gluten-free', label: 'Gluten-Free' },
  { id: 'low-carb', label: 'Low-Carb' },
];


export function RecommendationsAI() {
  const [isPending, startTransition] = React.useTransition();
  const [result, setResult] = React.useState<MealRecommendationOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<MealRecommendationInput>({
    resolver: zodResolver(mealRecommendationInputSchema),
    defaultValues: {
      occasion: '',
      flavorProfile: '',
      dietaryNeeds: [],
      notes: '',
    },
  });

  const onSubmit = (values: MealRecommendationInput) => {
    setResult(null);
    startTransition(async () => {
      try {
        const response = await getMealRecommendation(values);
        setResult(response);
      } catch (error) {
        console.error('Failed to get recommendation:', error);
        toast({
          title: 'Error',
          description: 'An unexpected error occurred. Please try again.',
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Meal Recommender AI</CardTitle>
          <CardDescription>
            Tell the AI what you're looking for, and it will suggest a custom meal.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="occasion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What's the occasion?</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an occasion" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {occasions.map((o) => (
                          <SelectItem key={o} value={o}>
                            {o}
                          </SelectItem>
                        ))}
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
                          <SelectValue placeholder="Select a flavor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {flavors.map((f) => (
                          <SelectItem key={f} value={f}>
                            {f}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dietaryNeeds"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel>Any dietary needs?</FormLabel>
                    </div>
                    {dietaryOptions.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="dietaryNeeds"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
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
              
               <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Other Notes</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 'extra cheese', 'no onions'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isPending}>
                {isPending ? 'Getting Recommendation...' : 'Ask the Chef AI'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center">
        {isPending ? (
          <div className="text-center">
            <Bot className="h-12 w-12 mx-auto animate-spin text-primary" />
            <p className="mt-4 text-muted-foreground">The chef is thinking...</p>
          </div>
        ) : result ? (
          <Card className="w-full bg-secondary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                <span>Chef's Recommendation</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-2xl font-headline font-bold">{result.mealName}</h3>
                <p className="text-muted-foreground mt-1">{result.description}</p>
              </div>
              <div>
                <h4 className="font-semibold">Main Ingredients:</h4>
                <p className="text-muted-foreground">{result.ingredients}</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
            <p>Your meal recommendation will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
