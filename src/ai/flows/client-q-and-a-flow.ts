'use server';
/**
 * @fileOverview A client Q&A AI agent for accountants.
 *
 * - answerClientQuestion - A function that handles answering client questions.
 * - AnswerClientQuestionInput - The input type for the answerClientQuestion function.
 * - AnswerClientQuestionOutput - The return type for the answerClientQuestion function.
 */

import {ai} from '@/ai/genkit';
import {
  answerClientQuestionInputSchema,
  answerClientQuestionOutputSchema,
} from '@/lib/schemas';
import type {
  AnswerClientQuestionInput,
  AnswerClientQuestionOutput,
} from '@/lib/schemas';
import {z} from 'zod';

export async function answerClientQuestion(
  input: AnswerClientQuestionInput
): Promise<AnswerClientQuestionOutput> {
  return clientQnAFlow(input);
}

const prompt = ai.definePrompt({
  name: 'clientQnAPrompt',
  input: {schema: answerClientQuestionInputSchema},
  output: {schema: answerClientQuestionOutputSchema},
  prompt: `You are an expert accountant. A client has asked the following question. Provide a clear, concise, and professional answer.

Question: {{{question}}}`,
});

const clientQnAFlow = ai.defineFlow(
  {
    name: 'clientQnAFlow',
    inputSchema: answerClientQuestionInputSchema,
    outputSchema: answerClientQuestionOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
