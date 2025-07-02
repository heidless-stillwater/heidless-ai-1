import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AIToolSection } from "./components/ai-tool-section";
import { Briefcase, Utensils, Calculator, Dumbbell, BrainCircuit } from 'lucide-react';
import { DentalIcon } from "./components/icons";
import { ExpenseCategorization } from "./components/expense-categorization";

const sections = [
  {
    id: "web-consultancy",
    title: "Web Consultancy",
    icon: <Briefcase className="h-8 w-8" />,
    tools: [
      { name: "AI-powered chat" },
      { name: "AI Powered Brief" },
      { name: "AI Expertise" },
      { name: "AI Content Generator" },
      { name: "AI Color Palette Generator" },
      { name: "AI SEO Optimizer" },
      { name: "AI Layout Suggestions" },
      { name: "AI Competitor Analysis" },
      { name: "AI Performance Optimizer" },
      { name: "AI Image Optimizer" },
      { name: "AI Accessibility Checker" },
      { name: "AI Code Generator" },
    ],
  },
  {
    id: "fast-food-shop",
    title: "Fast Food Shop",
    icon: <Utensils className="h-8 w-8" />,
    tools: [
      { name: "AI-powered chat" },
      { name: "AI Recipe Variant Generator" },
    ],
  },
  {
    id: "dental-practice",
    title: "Dental Practice",
    icon: <DentalIcon className="h-8 w-8" />,
    tools: [
      { name: "AI-powered chat" },
      { name: "AI Powered Brief" },
    ],
  },
    {
    id: "accountancy",
    title: "Accountancy",
    icon: <Calculator className="h-8 w-8" />,
    tools: [
      { name: "AI-powered chat" },
      { name: "Expense Categorization", component: <ExpenseCategorization /> },
    ],
  },
  {
    id: "personal-trainer",
    title: "Personal Trainer",
    icon: <Dumbbell className="h-8 w-8" />,
    tools: [
      { name: "AI-powered chat" },
      { name: "AI Powered Brief" },
    ],
  },
  {
    id: "life-coach",
    title: "Life Coach",
    icon: <BrainCircuit className="h-8 w-8" />,
    tools: [
      { name: "AI-powered chat" },
      { name: "AI Powered Brief" },
    ],
  },
];


export default function AIToolsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-20 lg:py-24">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl">
          AI Tools
        </h1>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
          Explore our suite of AI-powered tools tailored for various industries.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {sections.map((section) => (
           <Button key={section.id} asChild variant="outline" className="w-fit px-3">
             <Link href={`#${section.id}`}>{section.title}</Link>
           </Button>
        ))}
      </div>

      <div className="space-y-16">
        {sections.map((section) => (
          <AIToolSection
            key={section.id}
            id={section.id}
            title={section.title}
            icon={section.icon}
            tools={section.tools}
          />
        ))}
      </div>
    </div>
  );
}
