import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot } from "lucide-react";

interface PlaceholderProps {
  toolName: string;
}

export function Placeholder({ toolName }: PlaceholderProps) {
  return (
    <Card className="border-dashed">
      <CardHeader className="text-center">
        <div className="mx-auto bg-muted rounded-full p-3 w-fit">
          <Bot className="h-8 w-8 text-muted-foreground" />
        </div>
        <CardTitle className="mt-4">{toolName}</CardTitle>
        <CardDescription>This tool is under construction. Check back soon!</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center items-center h-40">
          <p className="text-muted-foreground">Coming Soon</p>
        </div>
      </CardContent>
    </Card>
  );
}
