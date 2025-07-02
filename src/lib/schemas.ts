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

// Schema for the Expense Categorization AI flow (server-side)
export const expenseCategorizationInputSchema = z.object({
  description: z.string().describe("The description of the expense transaction."),
  amount: z.number().describe("The monetary amount of the expense."),
});
export type ExpenseCategorizationInput = z.infer<typeof expenseCategorizationInputSchema>;

export const expenseCategorizationOutputSchema = z.object({
  category: z.string().describe("The suggested expense category (e.g., Office Supplies, Travel, Utilities)."),
  reasoning: z.string().describe("A brief explanation for why the expense was placed in this category."),
});
export type ExpenseCategorizationOutput = z.infer<typeof expenseCategorizationOutputSchema>;

// Schema for the Expense Categorization form (client-side)
export const expenseCategorizationFormSchema = z.object({
    description: z.string().min(3, {
        message: "Please enter a description of at least 3 characters.",
    }),
    amount: z.coerce.number().positive({
        message: "Please enter a positive amount.",
    }),
});
export type ExpenseCategorizationFormValues = z.infer<typeof expenseCategorizationFormSchema>;