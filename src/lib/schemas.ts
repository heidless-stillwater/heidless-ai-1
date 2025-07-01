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