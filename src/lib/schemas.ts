import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const RecipeVariantInputSchema = z.object({
  recipeName: z.string().describe('The name of the original recipe.'),
  ingredients: z.string().describe('The list of ingredients for the original recipe.'),
  instructions: z.string().describe('The cooking instructions for the original recipe.'),
});
export type RecipeVariantInput = z.infer<typeof RecipeVariantInputSchema>;

export const RecipeVariantOutputSchema = z.object({
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