'use server';
/**
 * @fileOverview An expense categorization AI agent.
 *
 * - categorizeExpense - A function that handles the expense categorization process.
 */

import {ai} from '@/ai/genkit';
import {
  expenseCategorizationInputSchema,
  expenseCategorizationOutputSchema,
} from '@/lib/schemas';
import type {
  ExpenseCategorizationInput,
  ExpenseCategorizationOutput,
} from '@/lib/schemas';

export async function categorizeExpense(
  input: ExpenseCategorizationInput
): Promise<ExpenseCategorizationOutput> {
  return expenseCategorizationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'expenseCategorizationPrompt',
  input: {schema: expenseCategorizationInputSchema},
  output: {schema: expenseCategorizationOutputSchema},
  prompt: `You are an expert accountant. You will be given a list of financial transactions in CSV format.
Your task is to analyze each transaction and categorize it into one of the following standard business expense categories:

- Cost of Goods Sold (COGS)
- Salaries and Wages
- Rent and Utilities
- Marketing and Advertising
- Office Supplies
- Travel and Entertainment
- Professional Services (Legal, Consulting)
- Software and Subscriptions
- Insurance
- Taxes
- Depreciation and Amortization
- Miscellaneous

For each transaction, provide the category and a confidence score (Low, Medium, High) for your categorization.

Here is the transaction data:
\`\`\`csv
{{{transactions}}}
\`\`\`
`,
});

const expenseCategorizationFlow = ai.defineFlow(
  {
    name: 'expenseCategorizationFlow',
    inputSchema: expenseCategorizationInputSchema,
    outputSchema: expenseCategorizationOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
