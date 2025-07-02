
"use client";

import React from "react";
import {
  Accessibility,
  Banknote,
  BarChart,
  Bot,
  BrainCircuit,
  Briefcase,
  Calendar,
  ClipboardList,
  Clock,
  Code,
  Eye,
  FileImage,
  FileText,
  FlaskConical,
  HeartPulse,
  LayoutGrid,
  Lightbulb,
  LineChart,
  Megaphone,
  Mic,
  Package,
  Palette,
  Phone,
  Receipt,
  Scaling,
  Search,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Smile,
  Sparkles,
  Speedometer,
  Store,
  Stethoscope,
  ThumbsUp,
  Ticket,
  Trash2,
  Truck,
  User,
  UserCheck,
  UserCog,
  UserRound,
  Users,
  Wallet,
  Wrench,
  ZoomIn,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const Icon = ({ name }: { name: string }) => {
  switch (name) {
    case "Web Consultancy":
      return <Briefcase className="h-8 w-8" />;
    case "Fast Food Shop":
      return <Store className="h-8 w-8" />;
    case "Dental Practice":
      return <Stethoscope className="h-8 w-8" />;
    case "Accountancy":
      return <Wallet className="h-8 w-8" />;
    case "Personal Trainer":
      return <HeartPulse className="h-8 w-8" />;
    case "Life Coach":
      return <Smile className="h-8 w-8" />;
    default:
      return <Bot className="h-8 w-8" />;
  }
};

const sections = [
  {
    name: "Web Consultancy",
    id: "web-consultancy",
    description: "AI tools to help web design agencies and freelancers.",
    tools: [
      { name: "AI-powered chat", icon: Bot },
      { name: "AI Powered Brief", icon: FileText },
      { name: "AI Expertise", icon: BrainCircuit },
      { name: "AI Content Generator", icon: Sparkles },
      { name: "AI Color Palette Generator", icon: Palette },
      { name: "AI SEO Optimizer", icon: Search },
      { name: "AI Layout Suggestions", icon: LayoutGrid },
      { name: "AI Competitor Analysis", icon: Users },
      { name: "AI Performance Optimizer", icon: Speedometer },
      { name: "AI Image Optimizer", icon: FileImage },
      { name: "AI Accessibility Checker", icon: Accessibility },
      { name: "AI Code Generator", icon: Code },
    ],
  },
  {
    name: "Accountancy",
    id: "accountancy",
    description: "Streamline your accounting tasks with AI precision.",
    defaultTab: "Expense Categorization",
    tools: [
      { name: "ChatBot", icon: Bot },
      { name: "Expense Categorization", icon: ClipboardList },
      { name: "AI Financial Reports", icon: FileText },
      { name: "Client Q&A", icon: Users },
      { name: "Tax Compliance", icon: ShieldCheck },
      { name: "Invoice Processing", icon: Receipt },
      { name: "Cash Flow Forecast", icon: LineChart },
      { name: "Anomaly Detection", icon: ZoomIn },
      { name: "Predictive Analysis", icon: BarChart },
    ],
  },
  {
    name: "Fast Food Shop",
    id: "fast-food-shop",
    description: "Optimize your fast food business with our AI suite.",
    tools: [
      { name: "24/7 Customer Chatbot", icon: Bot },
      { name: "Customer Service", icon: Users },
      { name: "Order Management", icon: ShoppingCart },
      { name: "Special Recommender", icon: Lightbulb },
      { name: "Personalized Recommendations", icon: UserCog },
      { name: "Menu Optimizer", icon: Wrench },
      { name: "Marketing Assistant", icon: Megaphone },
      { name: "Review Analyzer", icon: Eye },
      { name: "Inventory Management", icon: Package },
      { name: "Order Prediction", icon: Clock },
      { name: "Customer Sentiment Analysis", icon: UserCheck },
      { name: "Drive-Thru Optimization", icon: Truck },
      { name: "Automated Quality Control", icon: ShieldCheck },
      { name: "Voice Order Taking", icon: Mic },
      { name: "Predictive Maintenance", icon: Settings },
      { name: "Dynamic Pricing", icon: Banknote },
      { name: "Waste Reduction Management", icon: Trash2 },
      { name: "Employee Scheduling Optimization", icon: Calendar },
    ],
  },
  {
    name: "Dental Practice",
    id: "dental-practice",
    description: "Enhance your dental practice with AI-powered tools.",
    tools: [
      { name: "Diagnostic Assistance", icon: Stethoscope },
      { name: "Automated Appointment Scheduling", icon: Calendar },
      { name: "Patient Communication Bots", icon: Bot },
      { name: "Predictive Maintenance for Equipment", icon: Wrench },
      { name: "Insurance Claim Processing", icon: Receipt },
      { name: "Voice-Activated Charting", icon: Mic },
      { name: "Patient Risk Assessment", icon: User },
      { name: "Supply Inventory Management", icon: Package },
      { name: "Marketing Personalization", icon: Sparkles },
    ],
  },
  {
    name: "Personal Trainer",
    id: "personal-trainer",
    description: "AI assistants for personal trainers.",
    tools: [
      { name: "AI-powered chat", icon: Bot },
      { name: "AI Powered Brief", icon: FileText },
    ],
  },
  {
    name: "Life Coach",
    id: "life-coach",
    description: "Support your life coaching practice with AI.",
    tools: [
      { name: "AI-powered chat", icon: Bot },
      { name: "AI Powered Brief", icon: FileText },
    ],
  },
];

const ToolContentPlaceholder = ({ toolName }: { toolName: string }) => (
  <Card>
    <CardHeader>
      <CardTitle>Coming Soon: {toolName}</CardTitle>
    </CardHeader>
    <CardContent>
      <p>
        This tool is currently under development. Check back soon for exciting
        new features!
      </p>
    </CardContent>
  </Card>
);

const ExpenseCategorizer = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>AI Expense Categorizer</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Functionality for this tool will be implemented here.</p>
            </CardContent>
        </Card>
    )
}

export default function AiToolsClient() {
  const buttonSections = sections.filter(s => ["Web Consultancy", "Fast Food Shop", "Dental Practice"].includes(s.name));

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <header className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl">
          AI-Powered Business Tools
        </h1>
        <p className="max-w-[800px] mx-auto text-muted-foreground md:text-xl">
          Explore our suite of AI tools tailored for various industries. Click a
          category below or scroll to discover how we can help your business.
        </p>
      </header>

      <div className="flex justify-center mb-12">
          <div className="flex flex-wrap justify-center gap-2 max-w-full">
              {buttonSections.map((section) => (
                  <Button key={section.id} variant="outline" asChild>
                  <Link href={`#${section.id}`}>{section.name}</Link>
                  </Button>
              ))}
          </div>
      </div>


      <div className="space-y-20">
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-24"
          >
            <div className="flex items-center gap-4 mb-4">
                <div className="bg-primary/10 p-3 rounded-md">
                    <Icon name={section.name} />
                </div>
                <div>
                    <h2 className="text-3xl font-headline font-bold">{section.name}</h2>
                    <p className="text-muted-foreground">{section.description}</p>
                </div>
            </div>

            <Tabs defaultValue={section.defaultTab || section.tools[0].name} className="w-full">
              <ScrollArea className="w-full whitespace-nowrap">
                <TabsList className="mb-2.5 inline-flex h-auto w-max">
                  {section.tools.map((tool) => (
                    <TabsTrigger key={tool.name} value={tool.name} className="flex-shrink-0">
                      <tool.icon className="w-4 h-4 mr-2" />
                      {tool.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
              
              <div
                className={cn(
                    "mt-2.5",
                    section.name === "Web Consultancy" && "mt-[10px]",
                    section.name === "Accountancy" && "mt-[10px]",
                    section.name === "Fast Food Shop" && "mt-[20px]",
                    section.name === "Dental Practice" && "mt-[10px]",
                    section.name === "Personal Trainer" && "mt-[10px]",
                    section.name === "Life Coach" && "mt-[20px]"
                )}
              >
                {section.tools.map((tool) => (
                  <TabsContent key={tool.name} value={tool.name}>
                    <ToolContentPlaceholder toolName={tool.name} />
                  </TabsContent>
                ))}
              </div>
            </Tabs>
          </section>
        ))}
      </div>
    </div>
  );
}

    