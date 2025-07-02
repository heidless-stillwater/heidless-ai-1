import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction } from "lucide-react";

export function Placeholder({ toolName }: { toolName: string }) {
  return (
    <Card className="flex items-center justify-center min-h-[300px]">
      <CardContent className="text-center p-6">
        <Construction className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <CardTitle className="font-headline text-2xl">{toolName}</CardTitle>
        <CardDescription className="mt-2">
          This tool is currently under construction. Check back soon!
        </CardDescription>
      </CardContent>
    </Card>
  );
}
