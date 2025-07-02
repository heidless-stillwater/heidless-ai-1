
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  webConsultancyTools,
  fastFoodTools,
  dentalPracticeTools,
  accountancyTools,
  personalTrainerTools,
  lifeCoachTools,
} from "./tool-definitions";
import { AiToolsTabs } from "./ai-tools-tabs";

const sections = [
  { id: "web-consultancy", title: "Web Consultancy", tools: webConsultancyTools, default: "chat" },
  { id: "fast-food", title: "Fast Food Shop", tools: fastFoodTools, default: "chat" },
  { id: "dental-practice", title: "Dental Practice", tools: dentalPracticeTools, default: "chat" },
  { id: "accountancy", title: "Accountancy", tools: accountancyTools, default: "chat" },
  { id: "personal-trainer", title: "Personal Trainer", tools: personalTrainerTools, default: "chat" },
  { id: "life-coach", title: "Life Coach", tools: lifeCoachTools, default: "chat" },
];

export default function AiToolsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-20 lg:py-24">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl">
          AI-Powered Business Tools
        </h1>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
          Explore our suite of AI tools, tailored to supercharge your specific business needs.
        </p>
      </div>

      <div className="mb-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {sections.map(section => (
                  <Button key={section.id} asChild variant="outline">
                      <Link href={`#${section.id}`}>{section.title}</Link>
                  </Button>
              ))}
          </div>
      </div>

      <div className="space-y-20">
        {sections.map(section => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="text-3xl font-headline font-bold mb-6">{section.title}</h2>
              <AiToolsTabs tools={section.tools} defaultValue={section.default} />
            </section>
        ))}
      </div>
    </div>
  );
}
