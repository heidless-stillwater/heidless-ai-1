'use server';
/**
 * @fileOverview An AI flow for categorizing expenses.
 *
 * - categorizeExpense - A function that categorizes an expense based on its description.
 * - ExpenseCategorizationInput - The input type for the categorizeExpense function.
 * - ExpenseCategorizationOutput - The return type for the categorizeExpense function.
 */

import {ai} from '@/ai/genkit';
import { expenseCategorizationInputSchema, expenseCategorizationOutputSchema, type ExpenseCategorizationInput, type ExpenseCategorizationOutput } from '@/lib/schemas';

export async function categorizeExpense(input: ExpenseCategorizationInput): Promise<ExpenseCategorizationOutput> {
  return categorizeExpenseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'categorizeExpensePrompt',
  input: {schema: expenseCategorizationInputSchema},
  output: {schema: expenseCategorizationOutputSchema},
  prompt: `You are an expert accountant. Your task is to categorize an expense based on its description.

  Analyze the following expense description and determine the most appropriate accounting category.

  Expense Description: {{{description}}}

  Possible categories include:
  - Office Supplies
  - Meals & Entertainment
  - Travel
  - Software & Subscriptions
  - Utilities
  - Rent & Lease
  - Marketing & Advertising
  - Professional Services
  - Other

  Provide a confidence score (0-100) for your categorization and a brief explanation for your choice.
  If the category is ambiguous, choose the most likely one and explain why in your reasoning.`,
});

const categorizeExpenseFlow = ai.defineFlow(
  {
    name: 'categorizeExpenseFlow',
    inputSchema: expenseCategorizationInputSchema,
    outputSchema: expenseCategorizationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
