'use server';
/**
 * @fileOverview A flow for generating expert explanations on web-related topics.
 *
 * - generateExpertise - A function that handles generating the expert explanation.
 * - ExpertiseOutput - The return type for the generateExpertise function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { ExpertiseInputSchema, type ExpertiseInput } from '@/lib/schemas';

const ExpertiseOutputSchema = z.object({
  title: z.string().describe("A clear, concise title for the explanation."),
  explanation: z.string().describe('A detailed, expert-level explanation of the topic.'),
  keyPoints: z.array(z.string()).describe('A bulleted list of the most important takeaways.'),
  furtherReading: z.array(z.object({
    title: z.string().describe("The title of the resource."),
    url: z.string().url().describe("A URL to a relevant article or resource for further reading.")
  })).describe("A list of suggested resources for deeper understanding.")
});
export type ExpertiseOutput = z.infer<typeof ExpertiseOutputSchema>;

export async function generateExpertise(input: ExpertiseInput): Promise<ExpertiseOutput> {
  return generateExpertiseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateExpertisePrompt',
  input: { schema: ExpertiseInputSchema },
  output: { schema: ExpertiseOutputSchema },
  prompt: `You are a world-class principal engineer and web technology consultant. A user has a question about a specific topic. Your task is to provide a clear, comprehensive, and expert explanation.

  The user's topic/question is: {{{topic}}}

  Based on this, generate a response with the following sections:
  1.  **Title**: A clear title for the topic.
  2.  **Explanation**: A detailed but easy-to-understand explanation. Break down complex concepts into simpler parts. Use analogies if helpful.
  3.  **Key Points**: Summarize the most critical points in a bulleted list.
  4.  **Further Reading**: Provide 2-3 links to high-quality, authoritative articles or documentation for users who want to learn more.

  Format your response according to the output schema. Ensure your tone is helpful, authoritative, and encouraging.
  `,
});

const generateExpertiseFlow = ai.defineFlow(
  {
    name: 'generateExpertiseFlow',
    inputSchema: ExpertiseInputSchema,
    outputSchema: ExpertiseOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
