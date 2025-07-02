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
    description: z.string().min(3, {
        message: "Expense description must be at least 3 characters.",
    }),
    amount: z.coerce.number().positive({
        message: "Please enter a valid positive number for the amount.",
    }),
});

export type ExpenseCategorizationInput = z.infer<typeof expenseCategorizationInputSchema>;

export const expenseCategorizationOutputSchema = z.object({
    category: z.string().describe("The suggested expense category."),
    reason: z.string().describe("A brief explanation for the suggested category."),
});

export type ExpenseCategorizationOutput = z.infer<typeof expenseCategorizationOutputSchema>;
