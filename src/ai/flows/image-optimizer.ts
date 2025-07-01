'use server';
/**
 * @fileOverview A flow for analyzing an image and providing optimization suggestions.
 *
 * - generateImageOptimizationSuggestions - A function that handles image analysis.
 * - ImageOptimizerOutput - The return type for the generateImageOptimizationSuggestions function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { ImageOptimizerInputSchema, type ImageOptimizerInput } from '@/lib/schemas';

const ImageOptimizerOutputSchema = z.object({
  suggestedAltText: z.string().describe("A concise, descriptive alt text for the image, optimized for accessibility and SEO."),
  analysis: z.object({
    currentFormat: z.string().describe("The detected format of the image (e.g., JPEG, PNG)."),
    currentDimensions: z.string().describe("The current dimensions of the image in pixels (e.g., '1920x1080')."),
    currentFileSize: z.string().describe("An estimate of the image file size based on the data provided (e.g., '1.2 MB', '250 KB')."),
  }),
  recommendations: z.object({
    suggestedFormat: z.string().describe("The recommended image format for web use (e.g., WebP, AVIF)."),
    suggestedQuality: z.string().describe("A suggested quality setting for compression (e.g., '80% for JPEG/WebP')."),
    potentialSavings: z.string().describe("An estimated percentage of file size reduction."),
  }),
  technicalFeedback: z.string().describe("Additional technical feedback, such as whether the image is suitable for web use, if it contains unnecessary metadata, or if its dimensions are excessively large."),
});
export type ImageOptimizerOutput = z.infer<typeof ImageOptimizerOutputSchema>;

export async function generateImageOptimizationSuggestions(input: ImageOptimizerInput): Promise<ImageOptimizerOutput> {
  return imageOptimizerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'imageOptimizerPrompt',
  input: { schema: ImageOptimizerInputSchema },
  output: { schema: ImageOptimizerOutputSchema },
  prompt: `You are an expert in web performance and accessibility. Your task is to analyze an image and provide optimization suggestions.

  The user has uploaded an image named '{{{filename}}}'.
  Image data: {{media url=imageDataUri}}

  Based on the image provided, perform the following analysis:
  1.  **Alt Text**: Write a concise and descriptive alt text for the image that is good for both accessibility and SEO.
  2.  **Analysis**:
      - Determine the current image format from its data URI.
      - Extract the image dimensions.
      - Estimate its file size based on the base64 string length. (A rough estimate is fine, e.g., (length * 3/4) / 1024 KB).
  3.  **Recommendations**:
      - Suggest the best modern web format (like WebP or AVIF) for this image.
      - Recommend a suitable quality/compression level.
      - Estimate the potential file size savings as a percentage.
  4.  **Technical Feedback**: Provide any other relevant feedback. For example, are the dimensions too large for a typical website? Does the image seem overly complex?

  Format your response strictly according to the output schema.
  `,
});

const imageOptimizerFlow = ai.defineFlow(
  {
    name: 'imageOptimizerFlow',
    inputSchema: ImageOptimizerInputSchema,
    outputSchema: ImageOptimizerOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
