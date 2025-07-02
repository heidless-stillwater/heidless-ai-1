'use server';
/**
 * @fileOverview An expense categorization AI agent.
 *
 * - categorizeExpense - A function that handles the expense categorization process.
 */

import { ai } from '@/ai/genkit';
import { expenseCategorizationInputSchema, expenseCategorizationOutputSchema, type ExpenseCategorizationInput, type ExpenseCategorizationOutput } from '@/lib/schemas';

export async function categorizeExpense(input: ExpenseCategorizationInput): Promise<ExpenseCategorizationOutput> {
  return expenseCategorizationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'expenseCategorizationPrompt',
  input: { schema: expenseCategorizationInputSchema },
  output: { schema: expenseCategorizationOutputSchema },
  prompt: `You are an expert accountant. Your task is to categorize a given expense based on its description and amount.

Provide a standard business expense category and a brief reasoning for your choice.

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
      throw new Error('Failed to categorize expense. The AI model did not return an output.');
    }
    return output;
  }
);