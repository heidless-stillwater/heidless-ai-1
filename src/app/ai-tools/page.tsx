
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ToolHub } from "./tool-hub";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Utensils, HeartPulse } from "lucide-react";

const sections = [
  { id: "web-consultancy", name: "Web Consultancy", icon: Code },
  { id: "accountancy", name: "Accountancy", icon: Code },
  { id: "fast-food", name: "Fast Food Shop", icon: Utensils },
  { id: "dental-practice", name: "Dental Practice", icon: HeartPulse },
  { id: "personal-trainer", name: "Personal Trainer", icon: HeartPulse },
  { id: "life-coach", name: "Life Coach", icon: HeartPulse },
];

export default function AiToolsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const section = typeof searchParams.section === "string" ? searchParams.section : "web-consultancy";
  const tool = typeof searchParams.tool === "string" ? searchParams.tool : undefined;

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16 lg:py-20">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl">
          AI Tools
        </h1>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
          Explore AI-powered solutions tailored for your profession.
        </p>
      </div>

      <div className="flex justify-center flex-wrap gap-2 mb-12">
        {sections.map((sec) => (
          <Button
            key={sec.id}
            variant={section === sec.id ? "default" : "outline"}
            asChild
            style={{ width: 'auto', paddingLeft: '15px', paddingRight: '15px' }}
          >
            <Link href={`/ai-tools?section=${sec.id}`} scroll={false}>
              {sec.name}
            </Link>
          </Button>
        ))}
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <ToolHub section={section} tool={tool} />
      </Suspense>
    </div>
  );
}
