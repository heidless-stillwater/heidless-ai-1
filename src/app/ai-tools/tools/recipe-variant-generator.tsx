"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  generateRecipeVariants,
  type RecipeVariantInput,
  type RecipeVariantOutput,
} from "@/ai/flows/recipe-variant-flow";
import { RecipeVariantInputSchema } from "@/ai/flows/recipe-variant-flow";
import React from "react";
import { useToast } from "@/hooks/use-toast";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Loader2 } from "lucide-react";

export function RecipeVariantGenerator() {
  const [isPending, startTransition] = React.useTransition();
  const [result, setResult] = React.useState<RecipeVariantOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<RecipeVariantInput>({
    resolver: zodResolver(RecipeVariantInputSchema),
    defaultValues: {
      recipeName: "",
      ingredients: "",
      instructions: "",
    },
  });

  const onSubmit = (values: RecipeVariantInput) => {
    setResult(null);
    startTransition(async () => {
      try {
        const response = await generateRecipeVariants(values);
        setResult(response);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to generate recipe variants. Please try again.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
      <div>
        <h3 className="text-xl font-headline font-semibold mb-4">
          Enter Your Recipe
        </h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="recipeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipe Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Classic Chocolate Chip Cookies" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ingredients"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ingredients</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List all ingredients with quantities, one per line."
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instructions</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide the step-by-step instructions for your recipe."
                      className="min-h-[200px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
                </>
              ) : (
                "Generate Variations"
              )}
            </Button>
          </form>
        </Form>
      </div>
      <div>
        <h3 className="text-xl font-headline font-semibold mb-4">
          Generated Variants
        </h3>
        <div className="border-dashed border-2 border-muted rounded-lg p-6 min-h-[500px]">
          {isPending && !result && (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin mb-4" />
              <p>Our AI chef is cooking up some ideas...</p>
            </div>
          )}
          {!isPending && !result && (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground text-center">
                Your creative recipe variations will appear here.
              </p>
            </div>
          )}
          {result && (
            <Accordion type="single" collapsible className="w-full">
              {result.variants.map((variant, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
                    {variant.variantName}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground italic">
                        {variant.description}
                      </p>
                      <div>
                        <h4 className="font-semibold mb-2">New Ingredients:</h4>
                        <pre className="text-sm bg-muted p-3 rounded-md whitespace-pre-wrap font-body">
                          {variant.newIngredients}
                        </pre>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">New Instructions:</h4>
                         <pre className="text-sm bg-muted p-3 rounded-md whitespace-pre-wrap font-body">
                          {variant.newInstructions}
                        </pre>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </div>
    </div>
  );
}
