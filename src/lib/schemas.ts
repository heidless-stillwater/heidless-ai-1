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


// Schema for Expense Categorization AI
export const expenseCategorizationInputSchema = z.object({
  transactions: z.string().min(10, {
    message: "Please provide some transaction data.",
  }).describe("A string of transactions in CSV format."),
});
export type ExpenseCategorizationInput = z.infer<typeof expenseCategorizationInputSchema>;

export const expenseCategorizationOutputSchema = z.object({
  categorizedTransactions: z.array(z.object({
    originalTransaction: z.string().describe("The original, unchanged transaction line from the input."),
    category: z.string().describe("The suggested expense category for the transaction."),
    confidence: z.enum(['Low', 'Medium', 'High']).describe("The confidence level of the categorization."),
  })),
});
export type ExpenseCategorizationOutput = z.infer<typeof expenseCategorizationOutputSchema>;


// Schema for Financial Report AI
export const generateFinancialReportInputSchema = z.object({
    transactions: z.string().min(10, {
        message: "Please provide some transaction data.",
    }).describe("A string of transactions in CSV format, including a header."),
});
export type GenerateFinancialReportInput = z.infer<typeof generateFinancialReportInputSchema>;

export const generateFinancialReportOutputSchema = z.object({
    summary: z.string().describe("A brief, high-level summary of the financial health based on the transactions."),
    pnlStatement: z.string().describe("A simple Profit and Loss (P&L) statement derived from the data."),
    insights: z.string().describe("A list of three key, actionable insights or observations from the transaction data."),
});
export type GenerateFinancialReportOutput = z.infer<typeof generateFinancialReportOutputSchema>;

// Schema for Client Q&A AI
export const answerClientQuestionInputSchema = z.object({
    question: z.string().min(10, {
        message: "Please enter a question.",
    }).describe("A question from a client to an accountant."),
});
export type AnswerClientQuestionInput = z.infer<typeof answerClientQuestionInputSchema>;

export const answerClientQuestionOutputSchema = z.object({
    answer: z.string().describe("A clear, professional answer to the client's question."),
});
export type AnswerClientQuestionOutput = z.infer<typeof answerClientQuestionOutputSchema>;

// Schema for Recommendations AI
export const mealRecommendationInputSchema = z.object({
  occasion: z.string().min(1, { message: "Please select an occasion." }),
  flavorProfile: z.string().min(1, { message: "Please select a flavor." }),
  dietaryNeeds: z.array(z.string()).optional(),
  notes: z.string().optional(),
});
export type MealRecommendationInput = z.infer<typeof mealRecommendationInputSchema>;

export const mealRecommendationOutputSchema = z.object({
    mealName: z.string().describe("A creative and catchy name for the recommended meal."),
    description: z.string().describe("A short, enticing description of the meal."),
    ingredients: z.string().describe("A comma-separated list of the main ingredients in the meal."),
});
export type MealRecommendationOutput = z.infer<typeof mealRecommendationOutputSchema>;
