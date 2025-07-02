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

export const expenseCategorizationInputSchema = z.object({
  description: z.string().min(5, { message: "Description must be at least 5 characters." }).describe("The description of the expense."),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, { message: "Please enter a valid amount." }).describe("The amount of the expense."),
});

export type ExpenseCategorizationInput = z.infer<typeof expenseCategorizationInputSchema>;

export const expenseCategorizationOutputSchema = z.object({
  category: z.string().describe("The main category of the expense."),
  subcategory: z.string().describe("A more specific sub-category for the expense."),
  justification: z.string().describe("A brief explanation for the chosen category and sub-category."),
});

export type ExpenseCategorizationOutput = z.infer<typeof expenseCategorizationOutputSchema>;
