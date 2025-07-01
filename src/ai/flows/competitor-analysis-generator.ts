'use server';
/**
 * @fileOverview A flow for generating a competitor analysis using AI.
 *
 * - generateCompetitorAnalysis - A function that handles competitor analysis generation.
 * - CompetitorAnalysisOutput - The return type for the generateCompetitorAnalysis function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { CompetitorAnalysisInputSchema, type CompetitorAnalysisInput } from '@/lib/schemas';

const CompetitorAnalysisOutputSchema = z.object({
  summary: z.string().describe("A high-level summary of the competitor's strategy and market position."),
  strengths: z.array(z.string()).describe("A list of the competitor's key strengths (e.g., strong brand, large user base)."),
  weaknesses: z.array(z.string()).describe("A list of the competitor's potential weaknesses (e.g., outdated design, poor mobile experience)."),
  opportunities: z.array(z.string()).describe("A list of strategic opportunities for a new player to outperform this competitor."),
  keyMarketingChannels: z.array(z.string()).describe("A list of likely marketing channels the competitor uses (e.g., 'Content Marketing', 'Social Media Ads')."),
});
export type CompetitorAnalysisOutput = z.infer<typeof CompetitorAnalysisOutputSchema>;

export async function generateCompetitorAnalysis(input: CompetitorAnalysisInput): Promise<CompetitorAnalysisOutput> {
  return generateCompetitorAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCompetitorAnalysisPrompt',
  input: { schema: CompetitorAnalysisInputSchema },
  output: { schema: CompetitorAnalysisOutputSchema },
  prompt: `You are a senior business strategist and marketing analyst. Your task is to provide a comprehensive analysis of a competitor based on their name and industry.

  Competitor Information:
  - Competitor Name: {{{competitorName}}}
  - Industry: {{{industry}}}

  Based on your general knowledge of this company and industry, generate a competitor analysis with the following sections:
  1.  **Summary**: A brief overview of the competitor's position in the market.
  2.  **Strengths**: Identify their key strengths. What do they do well?
  3.  **Weaknesses**: Identify their potential weaknesses or areas where they are vulnerable.
  4.  **Opportunities**: What are the strategic opportunities for a new or existing business to compete against them? What gaps in the market could be exploited?
  5.  **Key Marketing Channels**: Based on their business model and industry, what are the most likely marketing channels they are using to attract customers?

  Provide a concise and actionable analysis. Format your response according to the output schema.
  `,
});

const generateCompetitorAnalysisFlow = ai.defineFlow(
  {
    name: 'generateCompetitorAnalysisFlow',
    inputSchema: CompetitorAnalysisInputSchema,
    outputSchema: CompetitorAnalysisOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
