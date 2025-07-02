"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  specialMealRecommendationInputSchema,
  type SpecialMealRecommendationInput,
  type SpecialMealRecommendationOutput,
} from '@/lib/schemas';
import { getSpecialMealRecommendation } from '@/ai/flows/special-recommender-flow';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
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
import { ChefHat, Sparkles } from 'lucide-react';

const occasions = ['Quick Lunch', 'Dinner with Friends', 'Late-night Snack', 'Healthy Option', 'A Treat', 'Something Adventurous'];
const flavors = ['Spicy', 'Savory', 'Sweet', 'Cheesy', 'Tangy', 'Smoky', 'Umami', 'Herbaceous'];
const dietaryOptions = [
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'gluten-free', label: 'Gluten-Free' },
  { id: 'low-carb', label: 'Low-Carb' },
  { id: 'vegan', label: 'Vegan' },
];


export function SpecialRecommender() {
  const [isPending, startTransition] = React.useTransition();
  const [result, setResult] = React.useState<SpecialMealRecommendationOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<SpecialMealRecommendationInput>({
    resolver: zodResolver(specialMealRecommendationInputSchema),
    defaultValues: {
      occasion: '',
      flavorProfile: '',
      dietaryNeeds: [],
      notes: '',
    },
  });

  const onSubmit = (values: SpecialMealRecommendationInput) => {
    setResult(null);
    startTransition(async () => {
      try {
        const response = await getSpecialMealRecommendation(values);
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
          <CardTitle>Executive Chef's Special Recommender</CardTitle>
          <CardDescription>
            Challenge the Executive Chef AI to create a unique, off-menu special just for you.
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
                    <FormLabel>Desired Flavor Profile</FormLabel>
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
                    <FormLabel>Any other requests for the chef?</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 'make it extra crispy', 'surprise me'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isPending}>
                {isPending ? 'Crafting your special...' : 'Challenge the Chef'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center">
        {isPending ? (
          <div className="text-center">
            <ChefHat className="h-12 w-12 mx-auto animate-spin text-primary" />
            <p className="mt-4 text-muted-foreground">The chef is creating your special...</p>
          </div>
        ) : result ? (
          <Card className="w-full bg-secondary border-primary/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                <span>Your Off-Menu Special</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-2xl font-headline font-bold">{result.mealName}</h3>
                <p className="text-muted-foreground mt-1 italic">"{result.description}"</p>
              </div>
              <div>
                <h4 className="font-semibold">Main Ingredients:</h4>
                <p className="text-muted-foreground">{result.ingredients}</p>
              </div>
               <div>
                <h4 className="font-semibold">A note from the Chef:</h4>
                <p className="text-muted-foreground">{result.reason}</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
            <p>Your one-of-a-kind meal will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
