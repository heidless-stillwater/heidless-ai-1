"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  BrainCircuit,
  Dumbbell,
  Globe,
  Landmark,
  Lightbulb,
  Stethoscope,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

const toolSections = [
  {
    id: "web-consultancy",
    title: "Web Consultancy",
    icon: Globe,
    tabs: [
      "AI-powered chat",
      "AI Powered Brief",
      "AI Expertise",
      "AI Content Generator",
      "AI Color Palette Generator",
      "AI SEO Optimizer",
      "AI Layout Suggestions",
      "AI Competitor Analysis",
      "AI Performance Optimizer",
      "AI Image Optimizer",
      "AI Accessibility Checker",
      "AI Code Generator",
    ],
    defaultTab: "AI-powered chat",
    styles: {
      tabsList: "mb-[10px]",
    },
  },
  {
    id: "accountancy",
    title: "Accountancy",
    icon: Landmark,
    tabs: [
      "ChatBot",
      "Expense Categorization",
      "AI Financial Reports",
      "Client Q&A",
      "Tax Compliance",
      "Invoice Processing",
      "Cash Flow Forecast",
      "Anomaly Detection",
      "Predictive Analysis",
    ],
    defaultTab: "Expense Categorization",
    styles: {
      tabsList: "max-w-full mb-[10px]",
    },
  },
  {
    id: "fast-food-shop",
    title: "Fast Food Shop",
    icon: UtensilsCrossed,
    tabs: [
      "24/7 Customer Chatbot",
      "Customer Service",
      "Order Management",
      "Special Recommender",
      "Personalized Recommendations",
      "Menu Optimizer",
      "Marketing Assistant",
      "Review Analyzer",
      "Inventory Management",
      "Order Prediction",
      "Customer Sentiment Analysis",
      "Drive-Thru Optimization",
      "Automated Quality Control",
      "Voice Order Taking",
      "Predictive Maintenance",
      "Dynamic Pricing",
      "Waste Reduction Management",
      "Employee Scheduling Optimization",
    ],
    defaultTab: "24/7 Customer Chatbot",
    styles: {
      tabsList: "max-w-[calc(100%-10px)] mb-[20px]",
    },
  },
  {
    id: "dental-practice",
    title: "Dental Practice",
    icon: Stethoscope,
    tabs: [
      "Diagnostic Assistance",
      "Automated Appointment Scheduling",
      "Patient Communication Bots",
      "Predictive Maintenance for Equipment",
      "Insurance Claim Processing",
      "Voice-Activated Charting",
      "Patient Risk Assessment",
      "Supply Inventory Management",
      "Marketing Personalization",
    ],
    defaultTab: "Diagnostic Assistance",
    styles: {
      tabsList: "mb-[10px]",
    },
  },
  {
    id: "personal-trainer",
    title: "Personal Trainer",
    icon: Dumbbell,
    tabs: ["AI-powered chat", "AI Powered Brief"],
    defaultTab: "AI-powered chat",
    styles: {
      tabsList: "max-w-[calc(100%-100px)] mb-[10px]",
    },
  },
  {
    id: "life-coach",
    title: "Life Coach",
    icon: BrainCircuit,
    tabs: ["AI-powered chat", "AI Powered Brief"],
    defaultTab: "AI-powered chat",
    styles: {
      tabsList: "max-w-[calc(100%-100px)] mb-[20px]",
    },
  },
];

interface ToolSectionProps {
  id: string;
  title: string;
  icon: LucideIcon;
  tabs: string[];
  defaultTab: string;
  styles: {
    tabsList: string;
  };
}

const ToolSection = ({ section }: { section: ToolSectionProps }) => (
  <section id={section.id} className="pt-16 -mt-16">
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-3xl flex items-center gap-4">
          <section.icon className="h-8 w-8 text-primary" />
          {section.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={section.defaultTab} className="w-full">
          <TabsList className={cn("flex-wrap h-auto", section.styles.tabsList)}>
            {section.tabs.map((tab) => (
              <TabsTrigger key={tab} value={tab}>
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
          {section.tabs.map((tab) => (
            <TabsContent key={tab} value={tab}>
              <Card className="bg-secondary">
                <CardHeader>
                  <CardTitle>{tab}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    This is a placeholder for the "{tab}" AI function. A fully
                    developed feature would be implemented here, providing
                    interactive tools for your users.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  </section>
);

export function AiToolsClient() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-20 lg:py-24">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl">
          AI Tools For Your Industry
        </h1>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
          Discover how our AI-powered solutions can be tailored to meet the
          unique needs of your business.
        </p>
      </div>

      <div className="flex justify-center mb-12">
        <div className="flex flex-wrap justify-center gap-2 max-w-[calc(100%-100px)]">
          {toolSections.map((section) => (
            <Button asChild key={section.id} variant="outline" className="px-2.5 w-auto">
              <Link href={`#${section.id}`}>{section.title}</Link>
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-12">
        {toolSections.map((section) => (
          <ToolSection key={section.id} section={section} />
        ))}
      </div>
    </div>
  );
}
