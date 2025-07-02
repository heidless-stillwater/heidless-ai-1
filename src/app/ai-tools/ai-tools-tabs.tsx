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
import { ChatInterface } from "./chat/chat-interface";

export interface AITool {
  id: string;
  name: string;
  description: string;
  icon: string;
  comingSoon?: boolean;
}

interface AiToolsTabsProps {
  tools: AITool[];
  defaultValue: string;
}

const iconMap: { [key: string]: LucideIcon } = {
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
};

const AIToolIcon = ({ name, className }: { name: string; className?: string }) => {
  const Icon = iconMap[name];
  if (!Icon) return null;
  return <Icon className={className} />;
};


export function AiToolsTabs({ tools, defaultValue }: AiToolsTabsProps) {
  return (
    <Tabs defaultValue={defaultValue} className="w-full">
      <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {tools.map((tool) => (
          <TabsTrigger key={tool.id} value={tool.id} disabled={tool.comingSoon}>
            <AIToolIcon name={tool.icon} className="mr-2 h-4 w-4" />
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
                  <AIToolIcon name={tool.icon} className="h-6 w-6" />
                  {tool.name}
                </CardTitle>
                {tool.comingSoon && <Badge>Coming Soon</Badge>}
              </div>
              <CardDescription>{tool.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {tool.id === 'chat' ? (
                <ChatInterface />
              ) : (
                <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed bg-muted">
                  <p className="text-muted-foreground">
                    [AI Tool Interface for {tool.name} will be here]
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}
