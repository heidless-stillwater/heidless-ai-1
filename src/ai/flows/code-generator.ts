'use server';
/**
 * @fileOverview A flow for generating React component code using AI.
 *
 * - generateCode - A function that handles the code generation.
 * - CodeGeneratorOutput - The return type for the generateCode function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { CodeGeneratorInputSchema, type CodeGeneratorInput } from '@/lib/schemas';

const CodeGeneratorOutputSchema = z.object({
    code: z.string().describe("The generated React component code as a string, including necessary imports. It should be a single file's content."),
});
export type CodeGeneratorOutput = z.infer<typeof CodeGeneratorOutputSchema>;


export async function generateCode(input: CodeGeneratorInput): Promise<CodeGeneratorOutput> {
  return codeGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'codeGeneratorPrompt',
  input: { schema: CodeGeneratorInputSchema },
  output: { schema: CodeGeneratorOutputSchema },
  prompt: `You are an expert Next.js and React developer. Your task is to generate the code for a single React component based on the user's prompt.

  **Guidelines:**
  - The component must be a client component ('use client').
  - Use TypeScript.
  - Use functional components and hooks.
  - Use \`shadcn/ui\` components whenever possible. The available components are in \`@/components/ui\`.
  - Use Tailwind CSS for styling. Do not use inline styles.
  - Import icons from \`lucide-react\`.
  - The generated code should be a complete, self-contained component file, including all necessary imports.
  - Do NOT include any explanations, just the raw code inside the 'code' field.

  **User's Prompt:**
  {{{prompt}}}

  Generate the React component code now.
  `,
});

const codeGeneratorFlow = ai.defineFlow(
  {
    name: 'codeGeneratorFlow',
    inputSchema: CodeGeneratorInputSchema,
    outputSchema: CodeGeneratorOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
