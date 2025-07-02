"use client";

import {
  Calculator,
  LayoutTemplate,
  Pizza,
  Stethoscope,
  Dumbbell,
  BrainCircuit,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const toolSections: {
  id: string;
  title: string;
  icon: LucideIcon;
  tools: string[];
  defaultTab?: string;
  tabsListContainerClassName?: string;
  tabsListClassName?: string;
}[] = [
  {
    id: "web-consultancy",
    title: "Web Consultancy",
    icon: LayoutTemplate,
    tools: [
      "AI-powered chat", "AI Powered Brief", "AI Expertise", "AI Content Generator",
      "AI Color Palette Generator", "AI SEO Optimizer", "AI Layout Suggestions",
      "AI Competitor Analysis", "AI Performance Optimizer", "AI Image Optimizer",
      "AI Accessibility Checker", "AI Code Generator"
    ],
    tabsListClassName: "mb-2.5",
  },
  {
    id: "accountancy",
    title: "Accountancy",
    icon: Calculator,
    tools: [
      "ChatBot", "Expense Categorization", "AI Financial Reports", "Client Q&A",
      "Tax Compliance", "Invoice Processing", "Cash Flow Forecast", "Anomaly Detection",
      "Predictive Analysis"
    ],
    defaultTab: "Expense Categorization",
    tabsListClassName: "mb-2.5",
  },
  {
    id: "fast-food-shop",
    title: "Fast Food Shop",
    icon: Pizza,
    tools: [
      "24/7 Customer Chatbot", "Customer Service", "Order Management",
      "Special Recommender", "Personalized Recommendations", "Menu Optimizer",
      "Marketing Assistant", "Review Analyzer", "Inventory Management",
      "Order Prediction", "Customer Sentiment Analysis", "Drive-Thru Optimization",
      "Automated Quality Control", "Voice Order Taking", "Predictive Maintenance",
      "Dynamic Pricing", "Waste Reduction Management", "Employee Scheduling Optimization"
    ],
    tabsListContainerClassName: "max-w-[calc(100%-10px)]",
    tabsListClassName: "mb-5",
  },
  {
    id: "dental-practice",
    title: "Dental Practice",
    icon: Stethoscope,
    tools: [
      "Diagnostic Assistance", "Automated Appointment Scheduling",
      "Patient Communication Bots", "Predictive Maintenance for Equipment",
      "Insurance Claim Processing", "Voice-Activated Charting",
      "Patient Risk Assessment", "Supply Inventory Management", "Marketing Personalization"
    ],
    tabsListClassName: "mb-2.5",
  },
  {
    id: "personal-trainer",
    title: "Personal Trainer",
    icon: Dumbbell,
    tools: ["AI-powered chat", "AI Powered Brief"],
    tabsListContainerClassName: "max-w-[calc(100%-100px)]",
    tabsListClassName: "mb-2.5",
  },
  {
    id: "life-coach",
    title: "Life Coach",
    icon: BrainCircuit,
    tools: ["AI-powered chat", "AI Powered Brief"],
    tabsListContainerClassName: "max-w-[calc(100%-100px)]",
    tabsListClassName: "mb-5",
  },
];

const anchorLinks = [
  { id: "web-consultancy", title: "Web Consultancy" },
  { id: "fast-food-shop", title: "Fast Food Shop" },
  { id: "dental-practice", title: "Dental Practice" },
];

export default function AiToolsClient() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="flex justify-center flex-wrap gap-2 mb-12 max-w-[calc(100%-100px)] mx-auto">
        {anchorLinks.map((link) => (
          <Button key={link.id} variant="outline" asChild>
            <a href={`#${link.id}`}>{link.title}</a>
          </Button>
        ))}
      </div>

      <div className="space-y-16">
        {toolSections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-20">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 font-headline text-3xl">
                  <section.icon className="h-8 w-8 text-primary" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue={section.defaultTab || section.tools[0]}>
                  <div className={section.tabsListContainerClassName}>
                    <TabsList className={cn("h-auto flex-wrap justify-start", section.tabsListClassName)}>
                      {section.tools.map((tool) => (
                        <TabsTrigger key={tool} value={tool}>{tool}</TabsTrigger>
                      ))}
                    </TabsList>
                  </div>
                  {section.tools.map((tool) => (
                    <TabsContent key={tool} value={tool}>
                      <Card className="border-dashed">
                        <CardHeader>
                          <CardTitle>{tool}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>
                            This is a placeholder for the "{tool}" AI function.
                            Functionality will be implemented here.
                          </p>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </section>
        ))}
      </div>
    </div>
  );
}
