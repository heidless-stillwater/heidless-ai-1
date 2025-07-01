'use server';
/**
 * @fileOverview A flow for handling conversational chat.
 *
 * - continueChat - A function that continues a chat conversation.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { ChatInputSchema, type ChatInput } from '@/lib/schemas';

// This is the exported function the client will call.
export async function continueChat(input: ChatInput): Promise<string> {
  return chatFlow(input);
}

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: z.string(),
  },
  async ({ history }) => {
    const response = await ai.generate({
        // The system prompt defines the persona of the AI.
        prompt: 'You are a helpful and friendly AI assistant for a web design agency called Heidless Hub. Your name is Heidless Helper. Keep your responses concise and helpful.',
        // The history is the conversational context.
        history: history.map((msg) => ({ role: msg.role, content: [{ text: msg.content }] })),
    });

    // Return the text from the response.
    return response.text;
  }
);
