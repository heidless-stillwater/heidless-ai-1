'use server';
/**
 * @fileOverview A flow for generating web performance optimization suggestions.
 *
 * - generatePerformanceSuggestions - A function that handles the performance analysis.
 * - PerformanceOptimizerOutput - The return type for the generatePerformanceSuggestions function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { PerformanceOptimizerInputSchema, type PerformanceOptimizerInput } from '@/lib/schemas';

const SuggestionSchema = z.object({
  category: z.string().describe("The category of the suggestion (e.g., 'Image Optimization', 'JavaScript', 'CSS', 'Rendering')."),
  impact: z.enum(['High', 'Medium', 'Low']).describe("The estimated performance impact of addressing this suggestion."),
  suggestion: z.string().describe("A specific, actionable suggestion to improve performance."),
  explanation: z.string().describe("A brief explanation of why this suggestion is important."),
});

const PerformanceOptimizerOutputSchema = z.object({
  overallScore: z.number().min(0).max(100).describe("An estimated performance score from 0 to 100 based on the analysis."),
  suggestions: z.array(SuggestionSchema).describe("A list of performance optimization suggestions."),
});
export type PerformanceOptimizerOutput = z.infer<typeof PerformanceOptimizerOutputSchema>;

export async function generatePerformanceSuggestions(input: PerformanceOptimizerInput): Promise<PerformanceOptimizerOutput> {
  return performanceOptimizerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'performanceOptimizerPrompt',
  input: { schema: PerformanceOptimizerInputSchema },
  output: { schema: PerformanceOptimizerOutputSchema },
  prompt: `You are a world-class web performance engineer, similar to the team that created Google's PageSpeed Insights. Your task is to analyze the HTML content of a web page and provide actionable performance optimization recommendations.

  Analyze the following HTML content, paying close attention to common performance bottlenecks:
  - Asset loading (blocking CSS/JS)
  - Image loading (formats, sizes, lazy loading)
  - Font loading strategies
  - Unused or inefficient CSS/JS
  - DOM size and complexity
  - Critical Rendering Path optimization

  HTML content:
  \`\`\`html
  {{{pageContent}}}
  \`\`\`

  Based on your analysis, provide the following:
  1.  **Overall Score**: Provide a performance score between 0 and 100, where 100 is a perfectly optimized page.
  2.  **Suggestions**: Generate a list of specific, actionable suggestions. For each suggestion, provide:
      - **Category**: The area of performance it relates to (e.g., 'Image Optimization', 'JavaScript', 'CSS').
      - **Impact**: The potential performance impact ('High', 'Medium', or 'Low').
      - **Suggestion**: A clear, concise recommendation.
      - **Explanation**: A short explanation of the problem and why the suggestion helps.

  Prioritize high-impact suggestions. Format your response strictly according to the output schema.
  `,
});

const performanceOptimizerFlow = ai.defineFlow(
  {
    name: 'performanceOptimizerFlow',
    inputSchema: PerformanceOptimizerInputSchema,
    outputSchema: PerformanceOptimizerOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
