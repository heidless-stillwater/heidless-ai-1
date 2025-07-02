import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

// Schema for Expense Categorization AI Tool
export const expenseCategorizationInputSchema = z.object({
  description: z.string().min(3, "Please enter a more detailed description."),
  amount: z.number().positive("Please enter a positive amount."),
});

export type ExpenseCategorizationInput = z.infer<typeof expenseCategorizationInputSchema>;

export const expenseCategorizationOutputSchema = z.object({
  category: z.string().describe("The suggested expense category."),
  reasoning: z.string().describe("The reasoning behind the suggested category."),
});

export type ExpenseCategorizationOutput = z.infer<typeof expenseCategorizationOutputSchema>;

// Schemas for Fast Food Recommendations AI Tool
export const recommendationsInputSchema = z.object({
  occasion: z.enum(['any', 'lunch', 'dinner', 'snack']).default('any'),
  flavorProfile: z.enum(['any', 'spicy', 'savory', 'sweet', 'light']).default('any'),
  dietaryRestrictions: z.array(z.string()).default([]),
});

export type RecommendationsInput = z.infer<typeof recommendationsInputSchema>;

export const recommendationsOutputSchema = z.object({
  mealName: z.string().describe("The name of the recommended meal."),
  description: z.string().describe("A brief, enticing description of the meal."),
  reasoning: z.string().describe("The reasoning for why this meal was recommended based on the user's preferences."),
});

export type RecommendationsOutput = z.infer<typeof recommendationsOutputSchema>;
