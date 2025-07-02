import { Card, CardContent } from "@/components/ui/card";
import { Bot } from "lucide-react";

export function Placeholder({ toolName }: { toolName: string }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center justify-center text-center space-y-4 min-h-[300px] bg-muted/50 rounded-lg p-8">
            <div className="bg-primary/10 p-4 rounded-full">
                <Bot className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl font-headline">{toolName}</h2>
            <p className="text-muted-foreground max-w-md">
                This tool is currently under development. Stay tuned for updates!
            </p>
        </div>
      </CardContent>
    </Card>
  );
}
