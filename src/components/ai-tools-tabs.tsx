
"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  BrainCircuit,
  Bot,
  FileText,
  Palette,
  LineChart,
  LayoutTemplate,
  Users,
  BarChart,
  Rocket,
  Image as ImageIcon,
  Accessibility,
  Code,
  CookingPot,
  HeartPulse,
  Scale,
  Smile,
  BookUser,
} from "lucide-react";

type Tool = {
  id: string;
  name: string;
  icon: string;
  description: string;
};

const iconMap: { [key: string]: React.ElementType } = {
  Bot,
  FileText,
  BrainCircuit,
  Palette,
  LineChart,
  LayoutTemplate,
  Users,
  BarChart,
  Rocket,
  ImageIcon,
  Accessibility,
  Code,
  CookingPot,
  HeartPulse,
  Scale,
  Smile,
  BookUser,
};

export function AiToolsTabs({ tools, defaultValue }: { tools: Tool[], defaultValue: string }) {
  return (
    <Tabs defaultValue={defaultValue} className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 h-auto">
        {tools.map((tool) => {
          const IconComponent = iconMap[tool.icon];
          return (
            <TabsTrigger key={tool.id} value={tool.id} className="flex flex-col sm:flex-row items-center gap-2 p-3 h-auto">
              {IconComponent && <IconComponent className="h-5 w-5" />}
              <span>{tool.name}</span>
            </TabsTrigger>
          );
        })}
      </TabsList>
      <div className="pt-5">
        {tools.map((tool) => (
          <TabsContent key={tool.id} value={tool.id}>
            <div className="rounded-xl border bg-card text-card-foreground shadow p-6 min-h-[200px]">
              <h3 className="text-2xl font-headline font-bold mb-2">{tool.name}</h3>
              <p className="text-muted-foreground mb-4">{tool.description}</p>
              <p className="text-center text-muted-foreground mt-8">
                [AI Tool Component for {tool.name} will be here]
              </p>
            </div>
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
}
