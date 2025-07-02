'use server';
/**
 * @fileOverview An AI flow for categorizing expenses.
 *
 * - categorizeExpense - A function that handles the expense categorization.
 * - ExpenseCategorizationInput - The input type for the flow.
 * - ExpenseCategorizationOutput - The return type for the flow.
 */

import { ai } from '@/ai/genkit';
import { expenseCategorizationInputSchema, expenseCategorizationOutputSchema } from '@/lib/schemas';
import type { ExpenseCategorizationInput, ExpenseCategorizationOutput } from '@/lib/schemas';

// Export the wrapper function for the client to call
export async function categorizeExpense(input: ExpenseCategorizationInput): Promise<ExpenseCategorizationOutput> {
  return expenseCategorizationFlow(input);
}

const expenseCategorizationFlow = ai.defineFlow(
  {
    name: 'expenseCategorizationFlow',
    inputSchema: expenseCategorizationInputSchema,
    outputSchema: expenseCategorizationOutputSchema,
  },
  async (input) => {
    const prompt = `You are an expert accountant. Based on the following expense details, categorize it into one of the standard business expense categories (e.g., 'Meals & Entertainment', 'Office Supplies', 'Travel', 'Software', 'Utilities', 'Marketing', 'Salaries', 'Rent', 'Other'). Provide a brief reasoning for your choice.

Expense Description: "${input.description}"
Amount: ${input.amount}

Provide the output in the specified JSON format.
`;

    const llmResponse = await ai.generate({
      prompt: prompt,
      model: 'googleai/gemini-2.0-flash',
      output: {
        schema: expenseCategorizationOutputSchema,
      },
    });

    return llmResponse.output!;
  }
);
