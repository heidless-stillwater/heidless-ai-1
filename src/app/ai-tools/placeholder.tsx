import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot } from "lucide-react";

export function Placeholder({ toolName }: { toolName: string }) {
  return (
    <Card className="border-dashed">
      <CardHeader className="text-center">
        <div className="mx-auto bg-secondary rounded-full p-3 w-max mb-2">
            <Bot className="h-8 w-8 text-muted-foreground" />
        </div>
        <CardTitle className="font-headline text-xl">{toolName}</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-muted-foreground">
          This AI tool is coming soon. Stay tuned for updates!
        </p>
      </CardContent>
    </Card>
  );
}
