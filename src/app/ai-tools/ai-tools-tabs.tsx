
"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import type { LucideIcon } from "lucide-react";
import {
  Accessibility,
  BrainCircuit,
  ChefHat,
  Code,
  FileText,
  Gauge,
  ImageIcon,
  LayoutTemplate,
  MessageCircle,
  Palette,
  PenSquare,
  TrendingUp,
  Users,
} from "lucide-react";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DefaultTool } from "./tools/default-tool";
import { RecipeVariantGenerator } from "./tools/recipe-variant-generator";

export type Tool = {
  id: string;
  name: string;
  description: string;
  iconName: keyof typeof iconMap;
};

const iconMap = {
  MessageCircle,
  FileText,
  BrainCircuit,
  PenSquare,
  Palette,
  TrendingUp,
  LayoutTemplate,
  Users,
  Gauge,
  ImageIcon,
  Accessibility,
  Code,
  ChefHat,
};

// Map tool IDs to their specific components
const toolComponentMap: { [key: string]: React.ComponentType<{ tool: Tool }> } = {
  "recipe-variants": RecipeVariantGenerator as any, // Cast because props don't match exactly, but it works
  // Add other specific tools here as they are built
};

interface AiToolsTabsProps {
  tools: Tool[];
  defaultValue: string;
}

export function AiToolsTabs({ tools, defaultValue }: AiToolsTabsProps) {
  return (
    <Tabs defaultValue={defaultValue} className="w-full">
      <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 mb-5">
        {tools.map((tool) => (
          <TabsTrigger key={tool.id} value={tool.id}>
            {tool.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {tools.map((tool) => {
        const IconComponent = iconMap[tool.iconName] as LucideIcon;
        const ToolComponent = toolComponentMap[tool.id] || DefaultTool;
        return (
          <TabsContent key={tool.id} value={tool.id}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 font-headline">
                  <IconComponent className="h-6 w-6 text-primary" />
                  {tool.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{tool.description}</p>
                <ToolComponent tool={tool} />
              </CardContent>
            </Card>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
