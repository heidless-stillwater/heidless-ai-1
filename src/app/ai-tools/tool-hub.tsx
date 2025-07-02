"use client";

import { Placeholder } from "./placeholder";
import { ExpenseCategorization } from "./accountancy/expense-categorization";

interface ToolHubProps {
  tool: string;
  section: string;
}

export function ToolHub({ tool, section }: ToolHubProps) {
  if (section === "accountancy" && tool === "Expense Categorization") {
    return <ExpenseCategorization />;
  }

  // Add other tools here as they are built
  // Example:
  // if (section === "fast-food" && tool === "Personalized Recommendations") {
  //   return <PersonalizedRecommendations />;
  // }

  return <Placeholder toolName={tool} />;
}
