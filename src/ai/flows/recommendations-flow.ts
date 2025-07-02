'use server';
/**
 * @fileOverview An AI flow for recommending fast food meals.
 *
 * - getMealRecommendation - A function that handles the meal recommendation.
 * - RecommendationsInput - The input type for the flow.
 * - RecommendationsOutput - The return type for the flow.
 */

import { ai } from '@/ai/genkit';
import { recommendationsInputSchema, recommendationsOutputSchema } from '@/lib/schemas';
import type { RecommendationsInput, RecommendationsOutput } from '@/lib/schemas';

// Export the wrapper function for the client to call
export async function getMealRecommendation(input: RecommendationsInput): Promise<RecommendationsOutput> {
  return recommendationsFlow(input);
}

const recommendationsFlow = ai.defineFlow(
  {
    name: 'recommendationsFlow',
    inputSchema: recommendationsInputSchema,
    outputSchema: recommendationsOutputSchema,
  },
  async (input) => {
    const prompt = `You are a friendly and creative chef at a virtual fast food restaurant. Your goal is to recommend the perfect meal to a customer based on their preferences.

Customer Preferences:
- Occasion: ${input.occasion}
- Desired Flavor Profile: ${input.flavorProfile}
- Dietary Restrictions: ${input.dietaryRestrictions.length > 0 ? input.dietaryRestrictions.join(', ') : 'None'}

Based on these preferences, create a unique and appealing meal recommendation. Be creative with the meal name and description! Explain why your recommendation is a great fit for them.

Our menu includes burgers, wraps, salads, loaded fries, and milkshakes. You can create variations of these.

Provide the output in the specified JSON format.
`;

    const llmResponse = await ai.generate({
      prompt: prompt,
      model: 'googleai/gemini-2.0-flash',
      output: {
        schema: recommendationsOutputSchema,
      },
    });

    return llmResponse.output!;
  }
);
