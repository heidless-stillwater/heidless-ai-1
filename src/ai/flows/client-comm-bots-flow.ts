'use server';
/**
 * @fileOverview A client communication bot for a web consultancy.
 *
 * - generateBotResponse - A function that handles generating a response to a client's message.
 * - ClientBotInput - The input type for the generateBotResponse function.
 * - ClientBotOutput - The return type for the generateBotResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const ClientBotInputSchema = z.object({
  message: z.string().describe('The client message to the bot.'),
});
export type ClientBotInput = z.infer<typeof ClientBotInputSchema>;

// Internal output schema for the flow, ensuring a robust JSON object response from the AI
const ClientBotFlowOutputSchema = z.object({
  response: z.string().describe("The bot's response to the client."),
});

// The final output type that the client-side component expects is a simple string.
export type ClientBotOutput = string;

// This is the exported function that the client component calls.
// It orchestrates the call to the internal flow and transforms the data.
export async function generateBotResponse(message: string): Promise<ClientBotOutput> {
  const result = await clientCommBotFlow({ message });
  return result.response;
}

const prompt = ai.definePrompt({
  name: 'clientCommBotPrompt',
  input: {schema: ClientBotInputSchema},
  // We instruct the model to return an object with a 'response' property.
  output: {schema: ClientBotFlowOutputSchema},
  prompt: `You are a friendly and professional AI assistant for 'Heidless Hub', a modern web design agency.
Your role is to answer prospective client questions about the agency's services.

Here is some information about Heidless Hub:
- Services: Web Design & Development, Branding & Identity, SEO & Digital Marketing, E-commerce Solutions, Headless CMS Integration.
- Strengths: Building stunning, high-performance websites with a focus on modern technology like Next.js. We use AI to streamline processes and pass savings to clients.
- Pricing:
  - Brochure Plan (£399): Single-page site, 1 AI function.
  - Pro Plan (£599): Up to 5 pages, 3 AI functions.
  - Premium Plan (£999): Up to 10 pages, e-commerce, 5 AI functions.
- Contact: Users can get in touch via the contact page on the website.

Based on the client's message below, provide a helpful and concise response. Keep your answers brief and to the point. Encourage them to visit the relevant pages (services, pricing, contact) for more details.

Client message: {{{message}}}`,
});

// This is the internal Genkit flow. It is not exported.
const clientCommBotFlow = ai.defineFlow(
  {
    name: 'clientCommBotFlow',
    inputSchema: ClientBotInputSchema,
    outputSchema: ClientBotFlowOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    // The prompt now returns an object { response: '...' } or null.
    // The framework will throw if it's null, but asking for a JSON object makes this less likely.
    return output!;
  }
);