"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Accessibility,
  BrainCircuit,
  Code,
  FileText,
  Gauge,
  Image as ImageIcon,
  LayoutGrid,
  MessageSquare,
  Palette,
  PenSquare,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

type Tool = {
  id: string;
  name: string;
  description: string;
  iconName: string;
};

const iconMap: { [key: string]: LucideIcon } = {
  MessageSquare,
  FileText,
  BrainCircuit,
  PenSquare,
  Palette,
  TrendingUp,
  LayoutGrid,
  Users,
  Gauge,
  Image: ImageIcon,
  Accessibility,
  Code,
};

function ToolIcon({ name }: { name: string }) {
  const Icon = iconMap[name];
  return Icon ? <Icon className="mr-2 h-5 w-5 flex-shrink-0" /> : null;
}

export function AiToolsTabs({ tools, defaultValue }: { tools: Tool[], defaultValue: string }) {
  return (
    <Tabs defaultValue={defaultValue} className="w-full">
      <TabsList className="mb-5 grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 h-auto flex-wrap justify-start">
        {tools.map((tool) => (
          <TabsTrigger key={tool.id} value={tool.id} className="w-full flex-1 text-center justify-center">
             <ToolIcon name={tool.iconName} /> <span>{tool.name}</span>
          </TabsTrigger>
        ))}
      </TabsList>
      {tools.map((tool) => (
        <TabsContent key={tool.id} value={tool.id}>
          <div className="rounded-lg border bg-card text-card-foreground p-6 min-h-[200px] flex flex-col justify-center items-center">
            <div className="bg-primary/10 p-4 rounded-full">
              <ToolIcon name={tool.iconName} />
            </div>
            <h3 className="text-xl font-headline font-semibold mt-4">{tool.name}</h3>
            <p className="mt-2 text-muted-foreground text-center max-w-md">{tool.description}</p>
             <p className="mt-4 text-sm text-primary animate-pulse">Coming soon...</p>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
