import { AiToolTabs } from "@/components/ai-tool-tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExpenseCategorization } from "./accountancy/expense-categorization";

const sections = [
  { id: "web-consultancy", name: "Web Consultancy" },
  { id: "accountancy", name: "Accountancy" },
  { id: "fast-food-shop", name: "Fast Food Shop" },
  { id: "dental-practice", name: "Dental Practice" },
  { id: "personal-trainer", name: "Personal Trainer" },
  { id: "life-coach", name: "Life Coach" },
];

const webConsultancyTools = ["AI-powered chat", "AI Powered Brief", "AI Expertise", "AI Content Generator", "AI Color Palette Generator", "AI SEO Optimizer", "AI Layout Suggestions", "AI Competitor Analysis", "AI Performance Optimizer", "AI Image Optimizer", "AI Accessibility Checker", "AI Code Generator"];
const accountancyTools = ["ChatBot", "Expense Categorization", "AI Financial Reports", "Client Q&A", "Tax Compliance", "Invoice Processing", "Cash Flow Forecast", "Anomaly Detection", "Predictive Analysis"];
const fastFoodTools = ["24/7 Customer Chatbot", "Customer Service", "Order Management", "Special Recommender", "Personalized Recommendations", "Menu Optimizer", "Marketing Assistant", "Review Analyzer", "Inventory Management", "Order Prediction", "Customer Sentiment Analysis", "Drive-Thru Optimization", "Automated Quality Control", "Voice Order Taking", "Predictive Maintenance", "Dynamic Pricing", "Waste Reduction Management", "Employee Scheduling Optimization"];
const dentalTools = ["Diagnostic Assistance", "Automated Appointment Scheduling", "Patient Communication Bots", "Predictive Maintenance for Equipment", "Insurance Claim Processing", "Voice-Activated Charting", "Patient Risk Assessment", "Supply Inventory Management", "Marketing Personalization"];
const personalTrainerTools = ["AI-powered chat", "AI Powered Brief"];
const lifeCoachTools = ["AI-powered chat", "AI Powered Brief"];

export default function AiToolsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-20 lg:py-24">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl">
          AI Tools
        </h1>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
          Explore our suite of AI-powered tools designed to streamline workflows for various professions.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-[calc(100%-100px)] mx-auto">
        {sections.map((section) => (
          <Button key={section.id} variant="outline" asChild className="px-2.5">
            <a href={`#${section.id}`}>{section.name}</a>
          </Button>
        ))}
      </div>

      <div className="space-y-20">
        <section id="web-consultancy" className="scroll-mt-20">
          <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl mb-6">Web Consultancy</h2>
          <AiToolTabs tools={webConsultancyTools} contentMap={{}} gap="mb-2.5" tabsListClassName="max-w-[calc(100vw-100px)] mx-auto" />
        </section>

        <section id="accountancy" className="scroll-mt-20">
          <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl mb-6">Accountancy</h2>
          <AiToolTabs
            tools={accountancyTools}
            defaultTool="Expense Categorization"
            contentMap={{
              "Expense Categorization": <ExpenseCategorization />,
            }}
            gap="mb-2.5"
            tabsListClassName="max-w-[calc(100vw-100px)] mx-auto"
          />
        </section>

        <section id="fast-food-shop" className="scroll-mt-20">
          <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl mb-6">Fast Food Shop</h2>
          <AiToolTabs tools={fastFoodTools} contentMap={{}} gap="mb-5" tabsListClassName="max-w-[calc(100vw-100px)] mx-auto" />
        </section>

        <section id="dental-practice" className="scroll-mt-20">
          <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl mb-6">Dental Practice</h2>
          <AiToolTabs tools={dentalTools} contentMap={{}} gap="mb-2.5" />
        </section>

        <section id="personal-trainer" className="scroll-mt-20">
          <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl mb-6">Personal Trainer</h2>
          <AiToolTabs tools={personalTrainerTools} contentMap={{}} gap="mb-2.5" tabsListClassName="max-w-[calc(100vw-100px)] mx-auto" />
        </section>

        <section id="life-coach" className="scroll-mt-20">
          <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl mb-6">Life Coach</h2>
          <AiToolTabs tools={lifeCoachTools} contentMap={{}} gap="mb-5" tabsListClassName="max-w-[calc(100vw-100px)] mx-auto" />
        </section>
      </div>
    </div>
  );
}
