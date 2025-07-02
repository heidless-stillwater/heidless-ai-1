'use server';
/**
 * @fileOverview A simple chat flow.
 *
 * - chat - A function that takes a message and returns a response.
 */

import {ai} from '@/ai/genkit';
import { type ChatInput, ChatInputSchema, type ChatOutput, ChatOutputSchema } from '@/lib/schemas';

export async function chat(message: ChatInput): Promise<ChatOutput> {
  return chatFlow(message);
}

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (prompt) => {
    const llmResponse = await ai.generate({
      prompt: `You are a helpful web development assistant named Heidless. Respond to the user's query about web consultancy. Be friendly, helpful, and concise.

User query: ${prompt}`,
      model: 'googleai/gemini-2.0-flash',
    });

    return llmResponse.text;
  }
);
