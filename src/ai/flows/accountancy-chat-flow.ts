'use server';
/**
 * @fileOverview An accountancy chatbot AI agent.
 *
 * - accountancyChat - A function that handles the chat process.
 */

import { ai } from '@/ai/genkit';
import { accountancyChatInputSchema, accountancyChatOutputSchema, type AccountancyChatInput, type AccountancyChatOutput } from '@/lib/schemas';

export async function accountancyChat(input: AccountancyChatInput): Promise<AccountancyChatOutput> {
  return accountancyChatFlow(input);
}

const accountancyChatFlow = ai.defineFlow(
  {
    name: 'accountancyChatFlow',
    inputSchema: accountancyChatInputSchema,
    outputSchema: accountancyChatOutputSchema,
  },
  async (input) => {
    const llmResponse = await ai.generate({
        prompt: `You are an expert accountant chatbot. Your role is to provide helpful and accurate information about accountancy topics. Answer the user's latest query based on the provided history. Be helpful and friendly.`,
        history: input.messages,
    });

    const responseText = llmResponse.text;
    if (!responseText) {
        throw new Error("Failed to get a response from the AI model.");
    }
    
    return { response: responseText };
  }
);
