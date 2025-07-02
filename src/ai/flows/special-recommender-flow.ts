'use server';
/**
 * @fileOverview A special meal recommendation AI agent for a fast food shop.
 *
 * - getSpecialMealRecommendation - A function that provides premium meal recommendations.
 * - SpecialMealRecommendationInput - The input type for the getSpecialMealRecommendation function.
 * - SpecialMealRecommendationOutput - The return type for the getSpecialMealRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {
  specialMealRecommendationInputSchema,
  specialMealRecommendationOutputSchema,
} from '@/lib/schemas';
import type {
  SpecialMealRecommendationInput,
  SpecialMealRecommendationOutput,
} from '@/lib/schemas';

export async function getSpecialMealRecommendation(
  input: SpecialMealRecommendationInput
): Promise<SpecialMealRecommendationOutput> {
  return specialRecommenderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'specialRecommenderPrompt',
  input: {schema: specialMealRecommendationInputSchema},
  output: {schema: specialMealRecommendationOutputSchema},
  prompt: `You are the Executive Chef of a gourmet fast-food restaurant. A customer is looking for something truly special, not on the regular menu.
Based on their preferences, create a unique, premium, off-menu meal just for them.

Customer Preferences:
- Occasion: {{{occasion}}}
- Flavor Profile: {{{flavorProfile}}}
- Dietary Needs: {{#if dietaryNeeds}}{{#each dietaryNeeds}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}None specified{{/if}}
- Other notes: {{{notes}}}

Provide a creative name for the special meal, a compelling description highlighting its unique qualities, a list of its main (and perhaps premium) ingredients, and a short, personal reason why you, the chef, created this particular special for them.`,
});

const specialRecommenderFlow = ai.defineFlow(
  {
    name: 'specialRecommenderFlow',
    inputSchema: specialMealRecommendationInputSchema,
    outputSchema: specialMealRecommendationOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
