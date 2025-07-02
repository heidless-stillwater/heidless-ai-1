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

export const expenseCategorizationSchema = z.object({
  expenses: z.string().min(3, { message: "Please enter at least one expense." })
    .describe('A list of expenses, one per line. Each line can contain the description and amount.'),
});

export type ExpenseCategorizationValues = z.infer<typeof expenseCategorizationSchema>;

export const categorizedExpensesSchema = z.object({
  categorizedExpenses: z
    .array(
      z.object({
        category: z.string().describe("The category of the expenses (e.g., 'Office Supplies', 'Travel', 'Utilities')."),
        items: z.array(
          z.object({
            description: z.string().describe('The description of the expense item.'),
            amount: z.number().describe('The monetary value of the expense item.'),
            notes: z.string().optional().describe('Any relevant notes about the expense.'),
          })
        ).describe('A list of expense items belonging to this category.'),
        total: z.number().describe('The sum of all expense amounts in this category.'),
      })
    )
    .describe('An array of expense categories, each containing a list of items.'),
    grandTotal: z.number().describe('The sum total of all expenses across all categories.'),
});

export type CategorizedExpenses = z.infer<typeof categorizedExpensesSchema>;
