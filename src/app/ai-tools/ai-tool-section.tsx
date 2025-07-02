import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AiToolSectionProps {
  id: string;
  title: string;
  tabs: string[];
  defaultTab?: string;
  gap: string;
}

export function AiToolSection({ id, title, tabs, defaultTab, gap }: AiToolSectionProps) {
  const defaultValue = defaultTab && tabs.includes(defaultTab) ? defaultTab : tabs[0];

  return (
    <section id={id} className="scroll-mt-20">
      <h2 className="text-3xl font-headline font-bold mb-6">{title}</h2>
      <Tabs defaultValue={defaultValue} className="w-full">
        <TabsList className={`h-auto flex-wrap justify-start ${gap}`}>
          {tabs.map((tab) => (
            <TabsTrigger key={tab} value={tab}>{tab}</TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab} value={tab}>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{tab}</h3>
                <p className="text-muted-foreground">
                  Interactive component for the {tab} tool will be available here soon.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
