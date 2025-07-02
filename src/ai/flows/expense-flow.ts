'use server';
/**
 * @fileOverview An expense categorization AI agent.
 *
 * - categorizeExpenses - A function that handles the expense categorization process.
 * - ExpenseCategorizationValues - The input type for the categorizeExpenses function.
 * - CategorizedExpenses - The return type for the categorizeExpenses function.
 */

import { ai } from '@/ai/genkit';
import { expenseCategorizationSchema, categorizedExpensesSchema } from '@/lib/schemas';
import { z } from 'zod';

export async function categorizeExpenses(
  input: z.infer<typeof expenseCategorizationSchema>
): Promise<z.infer<typeof categorizedExpensesSchema>> {
  const result = await categorizeExpensesFlow(input);
  return result;
}

const prompt = ai.definePrompt({
  name: 'expenseCategorizerPrompt',
  input: { schema: expenseCategorizationSchema },
  output: { schema: categorizedExpensesSchema },
  prompt: `You are an expert accountant. A user will provide a list of expenses. Your task is to analyze this list, categorize each expense, and return a structured JSON object.

- Each expense item should have a description and an amount.
- For each category you identify, you must calculate the total amount for that category.
- You must also calculate the grand total of all expenses.
- If an expense line item is ambiguous, use your best judgment to categorize it and add a note explaining your reasoning if necessary.

Here are the expenses:
{{{expenses}}}
`,
});

const categorizeExpensesFlow = ai.defineFlow(
  {
    name: 'categorizeExpensesFlow',
    inputSchema: expenseCategorizationSchema,
    outputSchema: categorizedExpensesSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
        throw new Error("The AI model did not return a response.");
    }
    return output;
  }
);
