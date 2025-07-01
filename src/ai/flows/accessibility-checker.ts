'use server';
/**
 * @fileOverview A flow for checking web page accessibility using AI.
 *
 * - generateAccessibilityReport - A function that handles the accessibility analysis.
 * - AccessibilityReportOutput - The return type for the generateAccessibilityReport function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { AccessibilityCheckerInputSchema, type AccessibilityCheckerInput } from '@/lib/schemas';

const AccessibilityIssueSchema = z.object({
  issue: z.string().describe("A concise description of the accessibility issue found."),
  severity: z.enum(['High', 'Medium', 'Low']).describe("The estimated severity of the issue's impact on users."),
  wcagGuideline: z.string().describe("The relevant WCAG 2.1 guideline (e.g., '1.1.1 Non-text Content')."),
  recommendation: z.string().describe("A specific, actionable recommendation to fix the issue."),
});

const AccessibilityReportOutputSchema = z.object({
  overallScore: z.number().min(0).max(100).describe("An estimated accessibility score from 0 to 100, where 100 is perfectly accessible."),
  summary: z.string().describe("A brief summary of the page's overall accessibility status."),
  issues: z.array(AccessibilityIssueSchema).describe("A list of identified accessibility issues."),
});
export type AccessibilityReportOutput = z.infer<typeof AccessibilityReportOutputSchema>;

export async function generateAccessibilityReport(input: AccessibilityCheckerInput): Promise<AccessibilityReportOutput> {
  return accessibilityCheckerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'accessibilityCheckerPrompt',
  input: { schema: AccessibilityCheckerInputSchema },
  output: { schema: AccessibilityReportOutputSchema },
  prompt: `You are a world-class web accessibility expert (a11y). Your task is to analyze the HTML content of a web page and provide a comprehensive accessibility report based on WCAG 2.1 AA guidelines.

  Analyze the following HTML content, focusing on common accessibility failures:
  - Missing or uninformative alt text for images.
  - Lack of proper heading structure (H1, H2, etc.).
  - Insufficient color contrast (you can't see the real colors, but you can check for inline styles and comment on them).
  - Missing form labels or incorrect associations.
  - Unclear link text (e.g., "click here").
  - Lack of ARIA attributes where necessary for complex components.
  - Keyboard accessibility issues (e.g., missing focus indicators, non-interactive elements used as buttons).

  HTML content:
  \`\`\`html
  {{{pageContent}}}
  \`\`\`

  Based on your analysis, provide the following:
  1.  **Overall Score**: An accessibility score from 0 to 100.
  2.  **Summary**: A high-level summary of the findings.
  3.  **Issues**: A detailed list of issues. For each issue, provide:
      - **Issue**: A clear description of what's wrong.
      - **Severity**: The potential impact ('High', 'Medium', or 'Low').
      - **WCAG Guideline**: The specific WCAG 2.1 guideline it violates.
      - **Recommendation**: Clear, actionable advice on how to fix it.

  Prioritize high-severity issues. If no issues are found, return an empty array for issues, a score of 100, and a positive summary. Format your response strictly according to the output schema.
  `,
});

const accessibilityCheckerFlow = ai.defineFlow(
  {
    name: 'accessibilityCheckerFlow',
    inputSchema: AccessibilityCheckerInputSchema,
    outputSchema: AccessibilityReportOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
