"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToolContent } from "./tool-content";

interface AiToolSectionProps {
  sectionId: string;
  title: string;
  tools: string[];
  defaultTab?: string;
  gapClass?: string;
}

export function AiToolSection({ sectionId, title, tools, defaultTab, gapClass = 'mb-2.5' }: AiToolSectionProps) {
  const defaultValue = defaultTab && tools.includes(defaultTab) ? defaultTab : tools[0];

  return (
    <section id={sectionId} className="py-12 scroll-mt-20">
      <h2 className="text-3xl font-bold font-headline mb-6">{title}</h2>
      <Tabs defaultValue={defaultValue} className="w-full">
        <TabsList className="flex-wrap h-auto">
          {tools.map((tool) => (
            <TabsTrigger key={tool} value={tool} className="flex-shrink-0">
              {tool}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className={gapClass} />
        {tools.map((tool) => (
          <TabsContent key={tool} value={tool}>
            <ToolContent toolName={tool} />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
