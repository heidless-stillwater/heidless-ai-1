'use server';
/**
 * @fileOverview A Genkit flow for generating creative recipe variations.
 *
 * - generateRecipeVariants - A function that takes a recipe and generates variations.
 * - RecipeVariantInput - The input type for the generateRecipeVariants function.
 * - RecipeVariantOutput - The return type for the generateRecipeVariants function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const RecipeVariantInputSchema = z.object({
  recipeName: z.string().describe('The name of the original recipe.'),
  ingredients: z.string().describe('The list of ingredients for the original recipe.'),
  instructions: z.string().describe('The cooking instructions for the original recipe.'),
});
export type RecipeVariantInput = z.infer<typeof RecipeVariantInputSchema>;

const RecipeVariantOutputSchema = z.object({
  variants: z.array(
    z.object({
      variantName: z.string().describe('A creative and appealing name for the new recipe variation.'),
      description: z.string().describe('A short, enticing description of this new recipe variant.'),
      newIngredients: z.string().describe('The full list of ingredients required for this new variant, including quantities.'),
      newInstructions: z.string().describe('The complete, step-by-step cooking instructions for this new variant.'),
    })
  ).describe('An array of 3 to 5 creative variations of the provided recipe.'),
});
export type RecipeVariantOutput = z.infer<typeof RecipeVariantOutputSchema>;

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
