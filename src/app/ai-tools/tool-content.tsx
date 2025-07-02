"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExpenseCategorization } from './accountancy/expense-categorization';

// Other component imports will be added here as they are built.

type Tool = {
  id: string;
  name: string;
  component?: string;
};

type ToolContentProps = {
  tools: Tool[];
  defaultTab: string;
  gapClass: string;
};

// Map component names to actual components
const componentMap: { [key: string]: React.ComponentType } = {
  ExpenseCategorization: ExpenseCategorization,
  // Add other components here as they are built, e.g.,
  // FinancialReports: FinancialReports,
  // ClientQA: ClientQA,
};

export function ToolContent({ tools, defaultTab, gapClass }: ToolContentProps) {
  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <TabsList className={`flex-wrap h-auto justify-center ${gapClass}`}>
        {tools.map((tool) => (
          <TabsTrigger key={tool.id} value={tool.id}>
            {tool.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {tools.map((tool) => (
        <TabsContent key={tool.id} value={tool.id} className="mt-0">
           <div className="p-6 border rounded-lg">
            {tool.component && componentMap[tool.component] ? (
              React.createElement(componentMap[tool.component])
            ) : (
              <p>Content for {tool.name} will be available soon.</p>
            )}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
