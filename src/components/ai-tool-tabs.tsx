'use client';

import React from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Placeholder } from '@/app/ai-tools/placeholder';
import { ExpenseCategorization } from '@/app/ai-tools/accountancy/expense-categorization';

// A simple mapping to convert tool names from strings to component names
const toolComponentMap: { [key: string]: React.ComponentType<any> } = {
  'Expense Categorization': ExpenseCategorization,
  // Add other implemented tools here
};

export function AiToolTabs({
  tools,
  defaultTool,
  section,
  style,
}: {
  tools: string[];
  defaultTool: string;
  section: string;
  style?: React.CSSProperties;
}) {
  return (
    <Tabs defaultValue={defaultTool} className="w-full">
      <div className="overflow-x-auto pb-2">
        <TabsList style={style}>
          {tools.map(toolName => (
            <TabsTrigger key={toolName} value={toolName}>
              {toolName}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {tools.map(toolName => {
        const ToolComponent = toolComponentMap[toolName];
        return (
          <TabsContent key={toolName} value={toolName}>
            {ToolComponent ? (
              <ToolComponent />
            ) : (
              <Placeholder toolName={toolName} />
            )}
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
