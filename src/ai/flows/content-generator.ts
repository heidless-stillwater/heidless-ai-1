'use server';
/**
 * @fileOverview A flow for generating various types of content using AI.
 *
 * - generateContent - The main function to generate content.
 * - ContentGeneratorOutput - The return type for the generateContent function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { ContentGeneratorInputSchema, type ContentGeneratorInput } from '@/lib/schemas';

const ContentGeneratorOutputSchema = z.object({
  title: z.string().optional().describe('A suggested title for the content. This may not be applicable for all content types like tweets.'),
  content: z.string().describe('The generated content body.'),
});
export type ContentGeneratorOutput = z.infer<typeof ContentGeneratorOutputSchema>;

export async function generateContent(input: ContentGeneratorInput): Promise<ContentGeneratorOutput> {
  return generateContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateContentPrompt',
  input: { schema: ContentGeneratorInputSchema },
  output: { schema: ContentGeneratorOutputSchema },
  prompt: `You are an expert content creator and copywriter. Your task is to generate high-quality content based on the user's specifications.

  User's specifications:
  - Content Type: {{{contentType}}}
  - Topic: {{{topic}}}
  - Tone of Voice: {{{tone}}}
  - Target Audience: {{{targetAudience}}}

  Based on these specifications, generate the content.
  - If the content type is 'Blog Post' or 'Marketing Email', generate a suitable title. For other types, the title can be omitted.
  - The content should be well-written, engaging, and tailored to the specified audience and tone.
  
  Format your response according to the output schema.
  `,
});

const generateContentFlow = ai.defineFlow(
  {
    name: 'generateContentFlow',
    inputSchema: ContentGeneratorInputSchema,
    outputSchema: ContentGeneratorOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
