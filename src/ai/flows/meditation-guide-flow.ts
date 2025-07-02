'use server';
/**
 * @fileOverview A mindfulness and meditation guide generator.
 *
 * - generateMeditationGuide - A function that generates a meditation script.
 * - MeditationGuideInput - The input type for the generateMeditationGuide function.
 * - MeditationGuideOutput - The return type for the generateMeditationGuide function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const MeditationGuideInputSchema = z.object({
  topic: z.string().describe('The topic for the meditation (e.g., stress relief, focus).'),
  duration: z.number().min(1).max(30).describe('The desired duration of the meditation in minutes.'),
});
export type MeditationGuideInput = z.infer<typeof MeditationGuideInputSchema>;

const MeditationGuideOutputSchema = z.object({
  title: z.string().describe('A suitable title for the meditation guide.'),
  script: z.array(z.string()).describe('The meditation script, broken down into paragraphs or steps.'),
});
export type MeditationGuideOutput = z.infer<typeof MeditationGuideOutputSchema>;

export async function generateMeditationGuide(input: MeditationGuideInput): Promise<MeditationGuideOutput> {
  return meditationGuideFlow(input);
}

const prompt = ai.definePrompt({
  name: 'meditationGuidePrompt',
  input: {schema: MeditationGuideInputSchema},
  output: {schema: MeditationGuideOutputSchema},
  prompt: `You are a life coach specializing in mindfulness. Generate a guided meditation script based on the user's request.
The script should be appropriate for the specified duration. Break the script down into a series of paragraphs or steps.

Topic: {{{topic}}}
Duration: {{{duration}}} minutes`,
});

const meditationGuideFlow = ai.defineFlow(
  {
    name: 'meditationGuideFlow',
    inputSchema: MeditationGuideInputSchema,
    outputSchema: MeditationGuideOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
