'use server';
/**
 * @fileOverview An expense categorization AI agent.
 *
 * - categorizeExpenses - A function that handles the expense categorization process.
 * - CategorizedExpenses - The return type for the categorizeExpenses function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const ExpenseItemSchema = z.object({
  description: z.string().describe('The description of the expense item.'),
  amount: z.number().describe('The cost of the expense item.'),
});

const CategorizedExpensesSchema = z.object({
  office_supplies: z.array(ExpenseItemSchema).describe('Expenses related to office supplies.'),
  travel: z.array(ExpenseItemSchema).describe('Expenses related to business travel.'),
  food_and_drink: z.array(ExpenseItemSchema).describe('Expenses for meals and beverages.'),
  software_and_subscriptions: z.array(ExpenseItemSchema).describe('Recurring software and subscription costs.'),
  utilities: z.array(ExpenseItemSchema).describe('Expenses for utilities like electricity, water, internet.'),
  marketing: z.array(ExpenseItemSchema).describe('Expenses related to marketing and advertising.'),
  other: z.array(ExpenseItemSchema).describe('Any other miscellaneous business expenses.'),
});
export type CategorizedExpenses = z.infer<typeof CategorizedExpensesSchema>;

export async function categorizeExpenses(input: string): Promise<CategorizedExpenses> {
  return expenseCategorizationFlow(input);
}

const expenseCategorizationFlow = ai.defineFlow(
  {
    name: 'expenseCategorizationFlow',
    inputSchema: z.string(),
    outputSchema: CategorizedExpensesSchema,
  },
  async (prompt) => {
    const { output } = await ai.generate({
      prompt: `You are an expert accountant. Categorize the following list of expenses. The user will provide a list of expenses, one per line. Parse each line to identify the description and the amount. Categorize each expense into one of the following categories: office_supplies, travel, food_and_drink, software_and_subscriptions, utilities, marketing, or other. Provide the output in the requested JSON format.

Expenses:
${prompt}`,
      output: {
        schema: CategorizedExpensesSchema,
      },
      config: {
        temperature: 0.1,
      },
    });

    return output!;
  }
);
