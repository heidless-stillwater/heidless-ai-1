'use server';
/**
 * @fileOverview A financial report generation AI agent.
 *
 * - generateFinancialReport - A function that handles the financial report generation process.
 * - GenerateFinancialReportInput - The input type for the generateFinancialReport function.
 * - GenerateFinancialReportOutput - The return type for the generateFinancialReport function.
 */

import {ai} from '@/ai/genkit';
import {
  generateFinancialReportInputSchema,
  generateFinancialReportOutputSchema,
} from '@/lib/schemas';
import type {
  GenerateFinancialReportInput,
  GenerateFinancialReportOutput,
} from '@/lib/schemas';

export async function generateFinancialReport(
  input: GenerateFinancialReportInput
): Promise<GenerateFinancialReportOutput> {
  return financialReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'financialReportPrompt',
  input: {schema: generateFinancialReportInputSchema},
  output: {schema: generateFinancialReportOutputSchema},
  prompt: `You are an expert accountant AI. You are given a set of financial transactions in CSV format.
Your task is to analyze these transactions and generate a concise financial report.

The report should include:
1.  A brief summary of the overall financial health.
2.  A simple Profit and Loss (P&L) statement (Income - Expenses = Net Profit/Loss).
3.  Three key insights or observations based on the data provided.

Here is the transaction data:
\`\`\`csv
{{{transactions}}}
\`\`\`
`,
});

const financialReportFlow = ai.defineFlow(
  {
    name: 'financialReportFlow',
    inputSchema: generateFinancialReportInputSchema,
    outputSchema: generateFinancialReportOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
