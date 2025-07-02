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

// Schema for UI state
export const chatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string(),
});

// Schema for the chat form
export const chatFormSchema = z.object({
  message: z.string().min(1, { message: "Message cannot be empty." }),
});
export type ChatFormValues = z.infer<typeof chatFormSchema>;

// Schema for the Accountancy Chat AI flow (server-side)
export const accountancyChatInputSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "model"]),
      content: z.string(),
    })
  ),
});
export type AccountancyChatInput = z.infer<typeof accountancyChatInputSchema>;

export const accountancyChatOutputSchema = z.object({
  response: z.string().describe("The chatbot's response."),
});
export type AccountancyChatOutput = z.infer<typeof accountancyChatOutputSchema>;
