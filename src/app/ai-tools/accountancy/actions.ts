"use server";

import { categorizeExpenses, type CategorizedExpenses } from "@/ai/flows/expense-categorization-flow";

export async function categorizeExpensesAction(
  expenses: string
): Promise<{ data: CategorizedExpenses | null; error: string | null }> {
  if (!expenses.trim()) {
    return { data: null, error: "Please enter a list of expenses." };
  }
  try {
    const result = await categorizeExpenses(expenses);
    return { data: result, error: null };
  } catch (e: any) {
    console.error(e);
    return { data: null, error: e.message || "An unexpected error occurred." };
  }
}
