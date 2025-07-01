'use server';
/**
 * @fileOverview A flow for generating a color palette for the website theme.
 *
 * - generateColorPalette - A function that handles the color palette generation.
 * - ColorPaletteOutput - The return type for the generateColorPalette function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { ColorPaletteInputSchema, type ColorPaletteInput } from '@/lib/schemas';

const ColorPaletteOutputSchema = z.object({
  background: z.string().describe("The HSL value for the main background color, e.g., '240 10% 3.9%'"),
  foreground: z.string().describe("The HSL value for the main foreground (text) color, e.g., '0 0% 98%'"),
  card: z.string().describe("The HSL value for card backgrounds, e.g., '240 4.8% 9.5%'"),
  cardForeground: z.string().describe("The HSL value for card foreground (text) color, e.g., '0 0% 98%'"),
  popover: z.string().describe("The HSL value for popover backgrounds, e.g., '240 10% 3.9%'"),
  popoverForeground: z.string().describe("The HSL value for popover foreground (text) color, e.g., '0 0% 98%'"),
  primary: z.string().describe("The HSL value for the primary accent color, e.g., '210 50% 60%'"),
  primaryForeground: z.string().describe("The HSL value for text on primary-colored elements, e.g., '210 40% 9.8%'"),
  secondary: z.string().describe("The HSL value for the secondary accent color, e.g., '240 3.7% 15.9%'"),
  secondaryForeground: z.string().describe("The HSL value for text on secondary-colored elements, e.g., '0 0% 98%'"),
  muted: z.string().describe("The HSL value for muted elements, e.g., '240 3.7% 15.9%'"),
  mutedForeground: z.string().describe("The HSL value for muted foreground (text) color, e.g., '240 5% 64.9%'"),
  accent: z.string().describe("The HSL value for accent elements, e.g., '240 3.7% 15.9%'"),
  accentForeground: z.string().describe("The HSL value for accent foreground (text) color, e.g., '0 0% 98%'"),
  destructive: z.string().describe("The HSL value for destructive elements (e.g., error states), e.g., '0 62.8% 30.6%'"),
  destructiveForeground: z.string().describe("The HSL value for text on destructive elements, e.g., '0 0% 98%'"),
  border: z.string().describe("The HSL value for borders, e.g., '240 3.7% 15.9%'"),
  input: z.string().describe("The HSL value for input backgrounds, e.g., '240 3.7% 15.9%'"),
  ring: z.string().describe("The HSL value for focus rings, e.g., '210 50% 60%'"),
});

export type ColorPaletteOutput = z.infer<typeof ColorPaletteOutputSchema>;

export async function generateColorPalette(input: ColorPaletteInput): Promise<ColorPaletteOutput> {
  return generateColorPaletteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateColorPalettePrompt',
  input: { schema: ColorPaletteInputSchema },
  output: { schema: ColorPaletteOutputSchema },
  prompt: `You are an expert UI/UX designer specializing in color theory and web aesthetics. Your task is to generate a complete color palette for a website's theme based on a user's description.

The palette should be harmonious, accessible, and suitable for a dark-themed website.

Provide values for all fields in the output schema. The values must be strings representing HSL values without the 'hsl()' wrapper. For example, for a color hsl(240, 10%, 3.9%), the value should be '240 10% 3.9%'.

Ensure high contrast ratios, especially between background/foreground and primary/primaryForeground pairs. The primary color should be distinct and vibrant.

User's description: {{{description}}}

Generate the full HSL color palette.
`,
});

const generateColorPaletteFlow = ai.defineFlow(
  {
    name: 'generateColorPaletteFlow',
    inputSchema: ColorPaletteInputSchema,
    outputSchema: ColorPaletteOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
