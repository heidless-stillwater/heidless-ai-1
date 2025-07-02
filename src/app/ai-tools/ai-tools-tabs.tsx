"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  MessageSquare,
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
  type LucideIcon,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface AITool {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  comingSoon?: boolean;
}

interface AiToolsTabsProps {
  tools: AITool[];
  defaultValue: string;
}

export function AiToolsTabs({ tools, defaultValue }: AiToolsTabsProps) {
  return (
    <Tabs defaultValue={defaultValue} className="w-full">
      <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {tools.map((tool) => (
          <TabsTrigger key={tool.id} value={tool.id}>
            <tool.icon className="mr-2 h-4 w-4" />
            {tool.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {tools.map((tool) => (
        <TabsContent key={tool.id} value={tool.id}>
          <Card className="mt-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-headline flex items-center gap-2 text-2xl">
                  <tool.icon className="h-6 w-6" />
                  {tool.name}
                </CardTitle>
                {tool.comingSoon && <Badge>Coming Soon</Badge>}
              </div>
              <CardDescription>{tool.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed bg-muted">
                <p className="text-muted-foreground">
                  [AI Tool Interface for {tool.name} will be here]
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}
