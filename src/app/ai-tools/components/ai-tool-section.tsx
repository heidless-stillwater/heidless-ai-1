import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type AIToolSectionProps = {
  id: string;
  title: string;
  icon: React.ReactNode;
  tools: string[];
};

export function AIToolSection({ id, title, icon, tools }: AIToolSectionProps) {
    const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-');

  return (
    <section id={id} className="scroll-mt-20">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="text-primary">{icon}</div>
            <CardTitle className="font-headline text-3xl">{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={slugify(tools[0])} className="w-full">
            <TabsList className="flex flex-wrap h-auto justify-start">
              {tools.map((tool) => (
                <TabsTrigger key={slugify(tool)} value={slugify(tool)}>{tool}</TabsTrigger>
              ))}
            </TabsList>
            <div className="pt-[20px]">
              {tools.map((tool) => (
                <TabsContent key={slugify(tool)} value={slugify(tool)}>
                  <div className="p-6 border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">{tool}</h3>
                    <p className="text-muted-foreground">
                      Placeholder content for the {tool} tool. The interface and functionality for this tool will be implemented here.
                    </p>
                  </div>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
}
