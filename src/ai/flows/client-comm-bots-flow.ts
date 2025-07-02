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

const ClientBotInputSchema = z.string().describe('The client message to the bot.');
export type ClientBotInput = z.infer<typeof ClientBotInputSchema>;

const ClientBotOutputSchema = z.string().describe('The bot\'s response to the client.');
export type ClientBotOutput = z.infer<typeof ClientBotOutputSchema>;

export async function generateBotResponse(input: ClientBotInput): Promise<ClientBotOutput> {
  return clientCommBotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'clientCommBotPrompt',
  input: {schema: ClientBotInputSchema},
  output: {schema: ClientBotOutputSchema},
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

Client message: {{{prompt}}}`,
});

const clientCommBotFlow = ai.defineFlow(
  {
    name: 'clientCommBotFlow',
    inputSchema: ClientBotInputSchema,
    outputSchema: ClientBotOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
