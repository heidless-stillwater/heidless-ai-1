'use server';
/**
 * @fileOverview A flow for generating a project brief using AI.
 *
 * - generateBrief - A function that handles the project brief generation.
 * - BriefOutput - The return type for the generateBrief function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { BriefInputSchema, type BriefInput } from '@/lib/schemas';

const BriefOutputSchema = z.object({
  title: z.string().describe('The title of the project brief.'),
  overview: z.string().describe('A brief overview of the project.'),
  goals: z.array(z.string()).describe('A list of specific, measurable project goals.'),
  targetAudience: z.string().describe('A description of the target audience profile.'),
  keyFeatures: z.array(z.string()).describe('A bulleted list of the key features.'),
  timeline: z.string().describe('A suggested high-level timeline for the project (e.g., 4-6 weeks).'),
  nextSteps: z.array(z.string()).describe('A list of recommended next steps.'),
});
export type BriefOutput = z.infer<typeof BriefOutputSchema>;

export async function generateBrief(input: BriefInput): Promise<BriefOutput> {
  return generateBriefFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBriefPrompt',
  input: { schema: BriefInputSchema },
  output: { schema: BriefOutputSchema },
  prompt: `You are an expert project manager at a top-tier web design agency. Your task is to generate a comprehensive and professional project brief based on the user's initial input. The brief should be well-structured, clear, and actionable.

  Use the following information provided by the user:
  - Project Name: {{{projectName}}}
  - Project Goals: {{{projectGoals}}}
  - Target Audience: {{{targetAudience}}}
  - Key Features: {{{keyFeatures}}}
  {{#if competitors}}- Competitors: {{{competitors}}}{{/if}}

  Based on this input, generate the project brief with the following sections:
  1.  **Title**: Create a clear title, like "Project Brief: [Project Name]".
  2.  **Overview**: Write a concise summary of the project.
  3.  **Goals**: List the primary objectives. Convert the user's input into specific, measurable goals.
  4.  **Target Audience**: Describe the target audience profile.
  5.  **Key Features**: List the essential features required for the project.
  6.  **Timeline**: Suggest a realistic high-level timeline for a project of this scope.
  7.  **Next Steps**: Propose a list of immediate next steps to get the project started.

  Format your response according to the output schema.
  `,
});

const generateBriefFlow = ai.defineFlow(
  {
    name: 'generateBriefFlow',
    inputSchema: BriefInputSchema,
    outputSchema: BriefOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);