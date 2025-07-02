import { ToolHub } from "./tool-hub";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Briefcase,
  ChefHat,
  HeartPulse,
  User,
  Brain,
  Building,
} from "lucide-react";

const sections = [
  {
    id: "web-consultancy",
    name: "Web Consultancy",
    icon: Briefcase,
  },
  {
    id: "accountancy",
    name: "Accountancy",
    icon: Building,
  },
  {
    id: "fast-food-shop",
    name: "Fast Food Shop",
    icon: ChefHat,
  },
  {
    id: "dental-practice",
    name: "Dental Practice",
    icon: HeartPulse,
  },
  {
    id: "personal-trainer",
    name: "Personal Trainer",
    icon: User,
  },
  {
    id: "life-coach",
    name: "Life Coach",
    icon: Brain,
  },
];

export default function AiToolsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-20 lg:py-24">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl">
          AI Tool Hub
        </h1>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
          Explore our suite of AI-powered tools tailored for your profession.
        </p>
      </div>

      <div className="sticky top-16 z-30 bg-background/80 backdrop-blur-sm py-4 mb-8 flex justify-center">
        <div className="flex flex-wrap items-center justify-center gap-2 rounded-full bg-secondary p-2 max-w-[calc(100%-100px)]">
          {sections.map((section) => (
            <Button key={section.id} asChild variant="ghost" className="rounded-full px-3 py-1 h-auto text-sm">
              <Link href={`#${section.id}`}>
                <section.icon className="mr-2 h-4 w-4" />
                {section.name}
              </Link>
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-20">
        <section id="web-consultancy" className="scroll-mt-24">
          <ToolHub section="Web Consultancy" />
        </section>
        <section id="accountancy" className="scroll-mt-24">
          <ToolHub section="Accountancy" tool="Expense Categorization" />
        </section>
        <section id="fast-food-shop" className="scroll-mt-24">
          <ToolHub section="Fast Food Shop" />
        </section>
        <section id="dental-practice" className="scroll-mt-24">
          <ToolHub section="Dental Practice" />
        </section>
        <section id="personal-trainer" className="scroll-mt-24">
          <ToolHub section="Personal Trainer" />
        </section>
        <section id="life-coach" className="scroll-mt-24">
          <ToolHub section="Life Coach" />
        </section>
      </div>
    </div>
  );
}
