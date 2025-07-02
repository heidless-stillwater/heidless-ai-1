import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction } from "lucide-react";

export function PlaceholderTool({ toolName }: { toolName: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center border-2 border-dashed rounded-lg h-96 bg-secondary/30">
      <Construction className="w-16 h-16 mb-4 text-muted-foreground" />
      <h2 className="text-2xl font-bold tracking-tight font-headline">{toolName}</h2>
      <p className="text-muted-foreground">This tool is currently under construction.</p>
      <p className="mt-2 text-sm text-muted-foreground">Check back soon for updates!</p>
    </div>
  );
}
