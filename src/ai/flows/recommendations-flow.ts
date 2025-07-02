'use server';
/**
 * @fileOverview A meal recommendation AI agent for a fast food shop.
 *
 * - getMealRecommendation - A function that provides meal recommendations.
 * - MealRecommendationInput - The input type for the getMealRecommendation function.
 * - MealRecommendationOutput - The return type for the getMealRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {
  mealRecommendationInputSchema,
  mealRecommendationOutputSchema,
} from '@/lib/schemas';
import type {
  MealRecommendationInput,
  MealRecommendationOutput,
} from '@/lib/schemas';

export async function getMealRecommendation(
  input: MealRecommendationInput
): Promise<MealRecommendationOutput> {
  return recommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendationsPrompt',
  input: {schema: mealRecommendationInputSchema},
  output: {schema: mealRecommendationOutputSchema},
  prompt: `You are a creative chef for a fast-food restaurant. A customer is asking for a meal recommendation.
Based on their preferences, suggest a creative and appealing meal.

Customer Preferences:
- Occasion: {{{occasion}}}
- Flavor Profile: {{{flavorProfile}}}
- Dietary Needs: {{#if dietaryNeeds}}{{#each dietaryNeeds}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}None specified{{/if}}
- Other notes: {{{notes}}}

Provide a name for the meal, a short, enticing description, and a list of main ingredients.`,
});

const recommendationsFlow = ai.defineFlow(
  {
    name: 'recommendationsFlow',
    inputSchema: mealRecommendationInputSchema,
    outputSchema: mealRecommendationOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
