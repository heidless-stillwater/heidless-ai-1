"use client";

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

function toKebabCase(str: string) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}

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
  const searchParams = useSearchParams();
  const activeTool = searchParams.get('tool') || toKebabCase(defaultTool);
  const activeToolFullName = tools.find(t => toKebabCase(t) === activeTool) || defaultTool;

  return (
    <div style={style}>
        <Tabs value={toKebabCase(activeToolFullName)} className="w-full">
            <ScrollArea className="w-full whitespace-nowrap">
                <TabsList>
                {tools.map((tool) => (
                    <TabsTrigger key={tool} value={toKebabCase(tool)} asChild>
                    <Link href={`/ai-tools?section=${section}&tool=${toKebabCase(tool)}`} scroll={false}>
                        {tool}
                    </Link>
                    </TabsTrigger>
                ))}
                </TabsList>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </Tabs>
    </div>
  );
}
