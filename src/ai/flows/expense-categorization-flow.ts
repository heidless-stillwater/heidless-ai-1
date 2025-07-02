'use server';
/**
 * @fileOverview An AI flow for categorizing financial expenses.
 *
 * - categorizeExpenses - A function that takes a raw list of expenses and returns them categorized.
 * - ExpenseCategorizationInput - The input type for the categorizeExpenses function.
 * - ExpenseCategorizationOutput - The return type for the categorizeExpenses function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExpenseCategorizationInputSchema = z.object({
  expenses: z
    .string()
    .describe(
      'A string containing a list of expenses, with each expense on a new line or separated by commas.'
    ),
});
export type ExpenseCategorizationInput = z.infer<
  typeof ExpenseCategorizationInputSchema
>;

const CategorizedExpenseSchema = z.object({
  description: z.string().describe('The original description of the expense.'),
  category: z
    .string()
    .describe(
      'The business category for the expense (e.g., "Office Supplies", "Travel", "Software", "Utilities").'
    ),
  amount: z.number().describe('The numerical amount of the expense.'),
});

const ExpenseCategorizationOutputSchema = z.object({
  categorizedExpenses: z
    .array(CategorizedExpenseSchema)
    .describe('An array of categorized expense objects.'),
});
export type ExpenseCategorizationOutput = z.infer<
  typeof ExpenseCategorizationOutputSchema
>;

export async function categorizeExpenses(
  input: ExpenseCategorizationInput
): Promise<ExpenseCategorizationOutput> {
  return expenseCategorizationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'expenseCategorizationPrompt',
  input: {schema: ExpenseCategorizationInputSchema},
  output: {schema: ExpenseCategorizationOutputSchema},
  prompt: `You are an expert accountant. Your task is to analyze a list of raw expense data, identify the description, amount, and assign a relevant business category to each expense.

The user will provide a list of expenses. Parse each line to extract the transaction details.

Here are the expenses:
{{{expenses}}}

Please process these and return a structured list of categorized expenses.
`,
});

const expenseCategorizationFlow = ai.defineFlow(
  {
    name: 'expenseCategorizationFlow',
    inputSchema: ExpenseCategorizationInputSchema,
    outputSchema: ExpenseCategorizationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
