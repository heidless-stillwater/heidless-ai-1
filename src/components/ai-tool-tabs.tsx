"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Placeholder } from "@/app/ai-tools/placeholder";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

interface AiToolTabsProps {
  tools: string[];
  defaultTool?: string;
  contentMap: Record<string, ReactNode>;
  gap?: string;
  tabsListClassName?: string;
}

export function AiToolTabs({
  tools,
  defaultTool,
  contentMap,
  gap = "mb-2.5", // 10px
  tabsListClassName,
}: AiToolTabsProps) {
  const effectiveDefaultTool = defaultTool && tools.includes(defaultTool) ? defaultTool : tools[0];

  return (
    <Tabs defaultValue={effectiveDefaultTool} className="w-full">
      <ScrollArea className={cn("w-full whitespace-nowrap rounded", tabsListClassName)}>
        <TabsList className="w-max">
          {tools.map((tool) => (
            <TabsTrigger key={tool} value={tool}>
              {tool}
            </TabsTrigger>
          ))}
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className={cn(gap)} />
      {tools.map((tool) => (
        <TabsContent key={tool} value={tool} className="mt-0">
          {contentMap[tool] || <Placeholder toolName={tool} />}
        </TabsContent>
      ))}
    </Tabs>
  );
}
