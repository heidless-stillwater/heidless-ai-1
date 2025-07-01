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

export const BriefInputSchema = z.object({
  projectName: z.string().min(3, "Project name must be at least 3 characters.").describe('The name of the project.'),
  projectGoals: z.string().min(10, "Project goals must be at least 10 characters.").describe('The primary goals of the project.'),
  targetAudience: z.string().min(10, "Target audience must be at least 10 characters.").describe('The target audience for the project.'),
  keyFeatures: z.string().min(10, "Key features must be at least 10 characters.").describe('A list or description of the key features required.'),
  competitors: z.string().optional().describe('Any known competitors.'),
});
export type BriefInput = z.infer<typeof BriefInputSchema>;

export const ExpertiseInputSchema = z.object({
  topic: z.string().min(10, "Your question must be at least 10 characters long.").describe('The topic or question for the AI expert to explain.'),
});
export type ExpertiseInput = z.infer<typeof ExpertiseInputSchema>;

export const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

export const ChatInputSchema = z.object({
  history: z.array(ChatMessageSchema),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

export const ContentGeneratorInputSchema = z.object({
  topic: z.string().min(3, "Topic must be at least 3 characters.").describe('The main subject of the content.'),
  contentType: z.enum(['Blog Post', 'Social Media Post', 'Marketing Email', 'Product Description']).describe('The desired format of the content.'),
  tone: z.enum(['Professional', 'Casual', 'Witty', 'Persuasive', 'Informative']).describe('The desired tone of voice for the content.'),
  targetAudience: z.string().min(3, "Target audience must be at least 3 characters.").describe('The intended audience for the content.'),
});
export type ContentGeneratorInput = z.infer<typeof ContentGeneratorInputSchema>;

export const ColorPaletteInputSchema = z.object({
  description: z.string().min(10, "Description must be at least 10 characters.").describe('A description of the desired theme or mood for the color palette (e.g., "A calming, minimalist theme for a yoga studio").'),
});
export type ColorPaletteInput = z.infer<typeof ColorPaletteInputSchema>;

export const SeoOptimizerInputSchema = z.object({
  pageContent: z.string().min(50, "Page content must be at least 50 characters.").describe('The full HTML content of a web page.'),
});
export type SeoOptimizerInput = z.infer<typeof SeoOptimizerInputSchema>;

export const LayoutSuggestionInputSchema = z.object({
  pageDescription: z.string().min(20, "Please provide a more detailed description (at least 20 characters).").describe('A detailed description of the content and purpose of the web page.'),
  pageType: z.enum(['Landing Page', 'Blog Post', 'Portfolio', 'Contact Page', 'About Us']).describe('The type of page for which layouts are being suggested.'),
});
export type LayoutSuggestionInput = z.infer<typeof LayoutSuggestionInputSchema>;

export const CompetitorAnalysisInputSchema = z.object({
  competitorName: z.string().min(2, "Competitor name must be at least 2 characters.").describe("The name of the competitor's company or website."),
  industry: z.string().min(3, "Industry must be at least 3 characters.").describe("The industry the competitor operates in (e.g., 'e-commerce', 'SaaS', 'fashion')."),
});
export type CompetitorAnalysisInput = z.infer<typeof CompetitorAnalysisInputSchema>;

export const ImageOptimizerInputSchema = z.object({
  imageDataUri: z.string().describe("A data URI of the image to be optimized. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
  filename: z.string().describe("The original filename of the image."),
});
export type ImageOptimizerInput = z.infer<typeof ImageOptimizerInputSchema>;

export const PerformanceOptimizerInputSchema = z.object({
  pageContent: z.string().min(50, "Page content must be at least 50 characters.").describe('The full HTML content of a web page to analyze for performance.'),
});
export type PerformanceOptimizerInput = z.infer<typeof PerformanceOptimizerInputSchema>;

export const AccessibilityCheckerInputSchema = z.object({
  pageContent: z.string().min(50, "Page content must be at least 50 characters.").describe('The full HTML content of a web page to analyze for accessibility.'),
});
export type AccessibilityCheckerInput = z.infer<typeof AccessibilityCheckerInputSchema>;

export const CodeGeneratorInputSchema = z.object({
  prompt: z.string().min(10, "Prompt must be at least 10 characters.").describe('A detailed description of the React component to generate.'),
});
export type CodeGeneratorInput = z.infer<typeof CodeGeneratorInputSchema>;
