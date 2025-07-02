'use server';
/**
 * @fileOverview A Genkit flow for generating creative recipe variations.
 *
 * - generateRecipeVariants - A function that takes a recipe and generates variations.
 */

import { ai } from '@/ai/genkit';
import {
  RecipeVariantInputSchema,
  type RecipeVariantInput,
  RecipeVariantOutputSchema,
  type RecipeVariantOutput,
} from '@/lib/schemas';

export async function generateRecipeVariants(input: RecipeVariantInput): Promise<RecipeVariantOutput> {
  return recipeVariantFlow(input);
}

const recipeVariantPrompt = ai.definePrompt({
  name: 'recipeVariantPrompt',
  input: { schema: RecipeVariantInputSchema },
  output: { schema: RecipeVariantOutputSchema },
  prompt: `You are a world-renowned creative chef. A user has provided you with a recipe and wants you to generate 3 to 5 exciting and delicious variations.

For each variation, provide a new name, a short description, and the updated list of ingredients and instructions. Ensure the variations are distinct and interesting.

Original Recipe Name: {{{recipeName}}}

Original Ingredients:
{{{ingredients}}}

Original Instructions:
{{{instructions}}}

Generate your creative variations based on this recipe.`,
});

const recipeVariantFlow = ai.defineFlow(
  {
    name: 'recipeVariantFlow',
    inputSchema: RecipeVariantInputSchema,
    outputSchema: RecipeVariantOutputSchema,
  },
  async (input) => {
    const { output } = await recipeVariantPrompt(input);
    if (!output) {
      throw new Error('Failed to generate recipe variants.');
    }
    return output;
  }
);
