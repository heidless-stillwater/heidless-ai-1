"use client";

import { Placeholder } from "./placeholder";
import { ExpenseCategorization } from "./accountancy/expense-categorization";
import { InventoryManagement } from "./fast-food/inventory-management";

interface ToolHubProps {
  tool: string;
  section: string;
}

export function ToolHub({ tool, section }: ToolHubProps) {
  if (section === "accountancy" && tool === "Expense Categorization") {
    return <ExpenseCategorization />;
  }
  
  if (section === "fast-food" && tool === "Inventory Management") {
    return <InventoryManagement />;
  }

  // Add other tools here as they are built
  // Example:
  // if (section === "fast-food" && tool === "Personalized Recommendations") {
  //   return <PersonalizedRecommendations />;
  // }

  return <Placeholder toolName={tool} />;
}
