
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
                <div className="mt-6 p-8 border-dashed border-2 border-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">
                    [AI Tool Functionality for "{tool.name}" will be here]
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
