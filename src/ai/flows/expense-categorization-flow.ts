'use server';
/**
 * @fileOverview An expense categorization AI agent.
 *
 * - categorizeExpense - A function that handles the expense categorization process.
 * - ExpenseCategorizationInput - The input type for the categorizeExpense function.
 * - ExpenseCategorizationOutput - The return type for the categorizeExpense function.
 */

import { ai } from '@/ai/genkit';
import {
  expenseCategorizationInputSchema,
  expenseCategorizationOutputSchema,
  type ExpenseCategorizationInput,
  type ExpenseCategorizationOutput,
} from '@/lib/schemas';

export async function categorizeExpense(
  input: ExpenseCategorizationInput
): Promise<ExpenseCategorizationOutput> {
  return categorizeExpenseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'categorizeExpensePrompt',
  input: { schema: expenseCategorizationInputSchema },
  output: { schema: expenseCategorizationOutputSchema },
  prompt: `You are an expert accountant. Categorize the following expense based on its description and amount. Provide a standard expense category (e.g., "Office Supplies", "Travel", "Software", "Meals & Entertainment") and a brief reason for your choice.

  Expense Description: {{{description}}}
  Amount: £{{{amount}}}
  `,
});

const categorizeExpenseFlow = ai.defineFlow(
  {
    name: 'categorizeExpenseFlow',
    inputSchema: expenseCategorizationInputSchema,
    outputSchema: expenseCategorizationOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('Failed to categorize expense.');
    }
    return output;
  }
);
