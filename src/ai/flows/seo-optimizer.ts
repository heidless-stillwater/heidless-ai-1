'use server';
/**
 * @fileOverview A flow for generating SEO suggestions for a web page.
 *
 * - generateSeoSuggestions - A function that handles the SEO suggestion generation.
 * - SeoOptimizerOutput - The return type for the generateSeoSuggestions function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { SeoOptimizerInputSchema, type SeoOptimizerInput } from '@/lib/schemas';

const SeoOptimizerOutputSchema = z.object({
  suggestedTitle: z.string().describe("An SEO-optimized title tag recommendation (50-60 characters)."),
  suggestedMetaDescription: z.string().describe("An SEO-optimized meta description (150-160 characters)."),
  suggestedKeywords: z.array(z.string()).describe("A list of 5-10 relevant keywords."),
  contentAnalysis: z.string().describe("A brief analysis of the content with suggestions for improvement (e.g., headings, keyword density, image alt tags)."),
});
export type SeoOptimizerOutput = z.infer<typeof SeoOptimizerOutputSchema>;

export async function generateSeoSuggestions(input: SeoOptimizerInput): Promise<SeoOptimizerOutput> {
  return seoOptimizerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'seoOptimizerPrompt',
  input: { schema: SeoOptimizerInputSchema },
  output: { schema: SeoOptimizerOutputSchema },
  prompt: `You are an expert SEO specialist. Your task is to analyze the HTML content of a web page and provide actionable SEO recommendations.

  Analyze the following HTML content:
  \`\`\`html
  {{{pageContent}}}
  \`\`\`

  Based on your analysis, provide the following:
  1.  **Suggested Title**: Create a compelling, SEO-friendly title tag, ideally between 50-60 characters.
  2.  **Suggested Meta Description**: Write an engaging meta description, ideally between 150-160 characters, that includes a call-to-action.
  3.  **Suggested Keywords**: Identify a list of 5-10 relevant primary and secondary keywords.
  4.  **Content Analysis**: Provide a brief analysis of the page's on-page SEO. Comment on heading structure (H1, H2s), keyword usage, and opportunities for improvement. Mention if important elements like image alt tags are missing.

  Format your response according to the output schema.
  `,
});

const seoOptimizerFlow = ai.defineFlow(
  {
    name: 'seoOptimizerFlow',
    inputSchema: SeoOptimizerInputSchema,
    outputSchema: SeoOptimizerOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
