'use server';
/**
 * @fileOverview An AI agent that answers client questions about accountancy.
 *
 * - answerClientQuestion - A function that handles answering a client's question.
 * - ClientQAInput - The input type for the answerClientQuestion function.
 * - ClientQAOutput - The return type for the answerClientQuestion function.
 */

import { ai } from '@/ai/genkit';
import {
  clientQAInputSchema,
  clientQAOutputSchema,
  type ClientQAInput,
  type ClientQAOutput,
} from '@/lib/schemas';

export async function answerClientQuestion(
  input: ClientQAInput
): Promise<ClientQAOutput> {
  return clientQAFlow(input);
}

const prompt = ai.definePrompt({
  name: 'clientQAPrompt',
  input: { schema: clientQAInputSchema },
  output: { schema: clientQAOutputSchema },
  prompt: `You are an expert accountant providing clear and helpful answers to client questions. The user is one of your clients. Answer the following question concisely and professionally.

  Client's Question: {{{question}}}
  `,
});

const clientQAFlow = ai.defineFlow(
  {
    name: 'clientQAFlow',
    inputSchema: clientQAInputSchema,
    outputSchema: clientQAOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate an answer.');
    }
    return output;
  }
);
