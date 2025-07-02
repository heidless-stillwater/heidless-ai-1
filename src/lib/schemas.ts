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

export const expenseCategorizationSchema = z.object({
  expenses: z.string().min(3, {
    message: "Please enter at least one expense.",
  }),
});

export type ExpenseCategorizationValues = z.infer<typeof expenseCategorizationSchema>;
