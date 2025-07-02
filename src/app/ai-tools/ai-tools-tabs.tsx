"use client";

import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
    MessageCircle,
    FileText,
    BrainCircuit,
    PenSquare,
    Palette,
    TrendingUp,
    LayoutTemplate,
    BarChart3,
    Gauge,
    Image as ImageIcon,
    PersonStanding,
    Code,
    type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  MessageCircle,
  FileText,
  BrainCircuit,
  PenSquare,
  Palette,
  TrendingUp,
  LayoutTemplate,
  BarChart3,
  Gauge,
  Image: ImageIcon,
  PersonStanding,
  Code,
};


export interface AiTool {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface AiToolsTabsProps {
  tools: AiTool[];
  defaultValue: string;
  listClassName?: string;
}

export function AiToolsTabs({ tools, defaultValue, listClassName }: AiToolsTabsProps) {
  return (
    <Tabs defaultValue={defaultValue} className="w-full">
      <TabsList className={cn("grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6 h-auto flex-wrap justify-start", listClassName)}>
        {tools.map((tool) => (
          <TabsTrigger key={tool.id} value={tool.id} className="flex-col h-auto py-3 gap-2">
            {React.createElement(iconMap[tool.icon], { className: "h-6 w-6" })}
            <span>{tool.name}</span>
          </TabsTrigger>
        ))}
      </TabsList>
      {tools.map((tool) => (
        <TabsContent key={tool.id} value={tool.id}>
          <div className="p-6 border rounded-lg mt-4">
            <h3 className="text-xl font-headline font-semibold mb-2">{tool.name}</h3>
            <p className="text-muted-foreground">{tool.description}</p>
            <div className="mt-6">
                {/* Placeholder for the actual tool component */}
                <div className="flex items-center justify-center h-48 bg-secondary rounded-md">
                    <p className="text-muted-foreground">{tool.name} Component coming soon...</p>
                </div>
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
