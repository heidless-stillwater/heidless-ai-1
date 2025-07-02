'use server';
/**
 * @fileOverview An AI flow for categorizing business expenses.
 *
 * - categorizeExpense - A function that handles the expense categorization process.
 * - ExpenseCategorizationInput - The input type for the categorizeExpense function.
 * - ExpenseCategorizationOutput - The return type for the categorizeExpense function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { expenseCategorizationInputSchema, expenseCategorizationOutputSchema } from '@/lib/schemas';

export type ExpenseCategorizationInput = z.infer<typeof expenseCategorizationInputSchema>;
export type ExpenseCategorizationOutput = z.infer<typeof expenseCategorizationOutputSchema>;

export async function categorizeExpense(input: ExpenseCategorizationInput): Promise<ExpenseCategorizationOutput> {
  return categorizeExpenseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'categorizeExpensePrompt',
  input: {schema: expenseCategorizationInputSchema},
  output: {schema: expenseCategorizationOutputSchema},
  prompt: `You are an expert accountant. Your task is to categorize a business expense based on the provided details.
  
  Analyze the expense description and amount, then determine the most appropriate category and sub-category from standard business accounting practices. Provide a brief justification for your choice.

  Expense Description: {{{description}}}
  Amount: {{{amount}}}
  `,
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
