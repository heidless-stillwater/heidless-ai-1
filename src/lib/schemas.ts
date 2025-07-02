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

export const expenseCategorizationInputSchema = z.object({
    description: z.string().min(3, {
        message: "Expense description must be at least 3 characters.",
    }),
    amount: z.coerce.number().positive({
        message: "Please enter a valid positive number for the amount.",
    }),
});

export type ExpenseCategorizationInput = z.infer<typeof expenseCategorizationInputSchema>;

export const expenseCategorizationOutputSchema = z.object({
    category: z.string().describe("The suggested expense category."),
    reason: z.string().describe("A brief explanation for the suggested category."),
});

export type ExpenseCategorizationOutput = z.infer<typeof expenseCategorizationOutputSchema>;


export const TransactionSchema = z.object({
    date: z.string().describe("The date of the transaction in YYYY-MM-DD format."),
    description: z.string().describe("A description of the transaction."),
    amount: z.number().describe("The transaction amount. Positive for income, negative for expenses."),
});
export type Transaction = z.infer<typeof TransactionSchema>;

export const FinancialReportInputSchema = z.object({
    transactions: z.array(TransactionSchema).describe("A list of financial transactions."),
});
export type FinancialReportInput = z.infer<typeof FinancialReportInputSchema>;


export const ProfitAndLossSchema = z.object({
    totalIncome: z.number().describe("The total income from all transactions."),
    totalExpenses: z.number().describe("The total expenses from all transactions."),
    netProfit: z.number().describe("The net profit or loss (income - expenses)."),
});

export const FinancialReportOutputSchema = z.object({
    summary: z.string().describe("A high-level summary of the financial report."),
    profitAndLoss: ProfitAndLossSchema,
    keyInsights: z.array(z.string()).describe("A list of key insights or observations from the data."),
});
export type FinancialReportOutput = z.infer<typeof FinancialReportOutputSchema>;
