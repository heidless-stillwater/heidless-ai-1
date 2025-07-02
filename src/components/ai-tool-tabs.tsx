
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToolHub } from "@/app/ai-tools/tool-hub";
import React from "react";

interface AiToolTabsProps {
  tools: string[];
  defaultTool: string;
  section: string;
  style?: React.CSSProperties;
}

export function AiToolTabs({ tools, defaultTool, section, style }: AiToolTabsProps) {
  return (
    <Tabs defaultValue={defaultTool} className="w-full">
      <TabsList className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 h-auto mb-4" style={style}>
        {tools.map((tool) => (
          <TabsTrigger key={tool} value={tool} className="w-full">
            {tool}
          </TabsTrigger>
        ))}
      </TabsList>
      {tools.map((tool) => (
        <TabsContent key={tool} value={tool}>
          <ToolHub tool={tool} section={section} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
