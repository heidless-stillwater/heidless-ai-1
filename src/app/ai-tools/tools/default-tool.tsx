"use client";

import type { Tool } from "../ai-tools-tabs";

interface DefaultToolProps {
  tool: Tool;
}

export function DefaultTool({ tool }: DefaultToolProps) {
  return (
    <div className="mt-6 p-8 border-dashed border-2 border-muted rounded-lg text-center">
      <p className="text-sm text-muted-foreground">
        [AI Tool Functionality for "{tool.name}" will be here]
      </p>
    </div>
  );
}
