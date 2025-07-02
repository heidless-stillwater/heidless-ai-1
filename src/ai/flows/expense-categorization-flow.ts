'use server';
/**
 * @fileOverview An expense categorization AI agent.
 *
 * - categorizeExpense - A function that handles the expense categorization process.
 */

import { ai } from '@/ai/genkit';
import {
  expenseCategorizationInputSchema,
  type ExpenseCategorizationInput,
  expenseCategorizationOutputSchema,
  type ExpenseCategorizationOutput,
} from '@/lib/schemas';
import { z } from 'genkit';

const prompt = ai.definePrompt({
  name: 'expenseCategorizationPrompt',
  input: { schema: expenseCategorizationInputSchema },
  output: { schema: expenseCategorizationOutputSchema },
  prompt: `You are an expert accountant. Your task is to categorize expenses based on their description and amount.
For the given expense, provide a suitable category and a brief reasoning for your choice.

Example:
Description: "Monthly subscription for accounting software"
Amount: 50
Category: "Software & Subscriptions"
Reasoning: "The expense is for accounting software, which falls under the Software & Subscriptions category."

Expense Description: {{{description}}}
Amount: {{{amount}}}
`,
});

const expenseCategorizationFlow = ai.defineFlow(
  {
    name: 'expenseCategorizationFlow',
    inputSchema: expenseCategorizationInputSchema,
    outputSchema: expenseCategorizationOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('Failed to get a response from the AI model.');
    }
    return output;
  }
);

export async function categorizeExpense(
  input: ExpenseCategorizationInput
): Promise<ExpenseCategorizationOutput> {
  return expenseCategorizationFlow(input);
}
