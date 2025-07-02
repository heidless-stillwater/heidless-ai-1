'use server';
/**
 * @fileOverview A financial report generation AI agent.
 *
 * - generateFinancialReport - A function that handles the financial report generation process.
 * - FinancialReportInput - The input type for the generateFinancialReport function.
 * - FinancialReportOutput - The return type for the generateFinancialReport function.
 */

import { ai } from '@/ai/genkit';
import {
  FinancialReportInputSchema,
  FinancialReportOutputSchema,
  type FinancialReportInput,
  type FinancialReportOutput,
} from '@/lib/schemas';
import { z } from 'zod';


export async function generateFinancialReport(
  input: FinancialReportInput
): Promise<FinancialReportOutput> {
  return generateFinancialReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFinancialReportPrompt',
  input: { schema: FinancialReportInputSchema },
  output: { schema: FinancialReportOutputSchema },
  prompt: `You are an expert accountant. Analyze the following list of transactions and generate a comprehensive financial report.

  The report should include:
  1.  A high-level summary of the financial period.
  2.  A simple Profit and Loss statement, calculating total income, total expenses, and net profit.
  3.  A list of key insights or actionable observations based on the data provided.

  Here is the transaction data in JSON format:
  {{{json transactions}}}
  `,
});

const generateFinancialReportFlow = ai.defineFlow(
  {
    name: 'generateFinancialReportFlow',
    inputSchema: FinancialReportInputSchema,
    outputSchema: FinancialReportOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate financial report.');
    }
    return output;
  }
);
