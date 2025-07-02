'use server';
/**
 * @fileOverview An AI flow for providing food waste reduction strategies.
 *
 * - reduceWaste - A function that analyzes perishable inventory and suggests waste reduction tactics.
 * - WasteReductionInput - The input type for the reduceWaste function.
 * - WasteReductionOutput - The return type for the reduceWaste function.
 */

import {ai} from '@/ai/genkit';
import { wasteReductionInputSchema, wasteReductionOutputSchema, type WasteReductionInput, type WasteReductionOutput } from '@/lib/schemas';

export async function reduceWaste(input: WasteReductionInput): Promise<WasteReductionOutput> {
  return wasteReductionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'wasteReductionPrompt',
  input: {schema: wasteReductionInputSchema},
  output: {schema: wasteReductionOutputSchema},
  prompt: `You are a sustainability consultant specializing in food waste reduction for the fast-food industry. You will be given a list of perishable items and how many days are left until they expire.

Your task is to analyze this list and provide actionable strategies to minimize waste.

For each item expiring in 3 days or less, provide a creative suggestion for how to use it up quickly (e.g., "Feature in a 'Fresh & Fast' daily special," "Create a signature sauce," or "Use for a delicious staff meal incentive"), along with your reasoning.

Also, provide a list of 3-5 general, proactive strategies the restaurant can implement to reduce food waste in the long term (e.g., "Implement a 'first-in, first-out' (FIFO) system," "Conduct regular waste audits," "Optimize portion sizes").

Here is the inventory data:
{{{processedInventoryData}}}

Provide a helpful and encouraging analysis.`,
});

const wasteReductionFlow = ai.defineFlow(
  {
    name: 'wasteReductionFlow',
    inputSchema: wasteReductionInputSchema,
    outputSchema: wasteReductionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
