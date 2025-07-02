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
  description: z.string().min(3, { message: "Description must be at least 3 characters." }),
});

export type ExpenseCategorizationInput = z.infer<typeof expenseCategorizationInputSchema>;

export const expenseCategorizationOutputSchema = z.object({
  category: z.string().describe("The accounting category for the expense."),
  confidence: z.number().min(0).max(100).describe("The confidence score of the categorization, from 0 to 100."),
  explanation: z.string().describe("A brief explanation for the chosen category."),
});

export type ExpenseCategorizationOutput = z.infer<typeof expenseCategorizationOutputSchema>;

export const inventoryManagementInputSchema = z.object({
  inventoryData: z.string().min(3, { message: "Inventory data must be provided." }).describe("A string containing inventory data in CSV format (item,quantity)."),
});
export type InventoryManagementInput = z.infer<typeof inventoryManagementInputSchema>;

const inventoryItemSchema = z.object({
    name: z.string().describe("The name of the inventory item."),
    currentQuantity: z.number().describe("The current quantity of the item."),
    suggestion: z.string().describe("The suggestion for this item (e.g., reorder quantity or a promotional idea)."),
    reasoning: z.string().describe("A brief explanation for the suggestion."),
});

export const inventoryManagementOutputSchema = z.object({
    lowStockItems: z.array(inventoryItemSchema).describe("A list of items that are running low and need to be reordered."),
    overstockedItems: z.array(inventoryItemSchema).describe("A list of items that are overstocked and may require promotional efforts."),
});
export type InventoryManagementOutput = z.infer<typeof inventoryManagementOutputSchema>;
