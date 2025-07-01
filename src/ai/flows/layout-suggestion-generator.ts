'use server';
/**
 * @fileOverview A flow for generating UI layout suggestions for a web page.
 *
 * - generateLayoutSuggestions - A function that handles generating layout suggestions.
 * - LayoutSuggestionOutput - The return type for the generateLayoutSuggestions function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { LayoutSuggestionInputSchema, type LayoutSuggestionInput } from '@/lib/schemas';

const LayoutSuggestionSchema = z.object({
  title: z.string().describe("A concise title for the layout suggestion (e.g., 'Split Screen Hero')."),
  description: z.string().describe("A detailed description of the layout, explaining its strengths and best use cases."),
  components: z.array(z.string()).describe("A list of key components or elements that make up this layout (e.g., 'Large hero image', 'Call-to-action button', 'Feature grid').")
});

const LayoutSuggestionOutputSchema = z.object({
  suggestions: z.array(LayoutSuggestionSchema).describe("A list of 2-3 layout suggestions.")
});
export type LayoutSuggestionOutput = z.infer<typeof LayoutSuggestionOutputSchema>;

export async function generateLayoutSuggestions(input: LayoutSuggestionInput): Promise<LayoutSuggestionOutput> {
  return generateLayoutSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLayoutSuggestionsPrompt',
  input: { schema: LayoutSuggestionInputSchema },
  output: { schema: LayoutSuggestionOutputSchema },
  prompt: `You are an expert UI/UX designer and web architect. Your task is to propose creative and effective layout ideas for a web page based on user requirements.

  User Requirements:
  - Page Type: {{{pageType}}}
  - Page Description: {{{pageDescription}}}

  Based on these requirements, generate 2-3 distinct layout suggestions. For each suggestion, provide:
  1.  **Title**: A clear, descriptive title for the layout concept (e.g., "Centered Focus Layout", "Asymmetrical Grid").
  2.  **Description**: A paragraph explaining the layout, its benefits, and why it's a good fit for the user's content and goals.
  3.  **Components**: A list of key structural components that would be part of this layout (e.g., "Full-width hero banner", "Three-column feature list", "Sticky navigation bar").

  Focus on structure and arrangement of elements, not on specific colors or fonts. The suggestions should be practical and follow modern web design principles.

  Format your response according to the output schema.
  `,
});

const generateLayoutSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateLayoutSuggestionsFlow',
    inputSchema: LayoutSuggestionInputSchema,
    outputSchema: LayoutSuggestionOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
