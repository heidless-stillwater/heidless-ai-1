"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Code,
  Briefcase,
  UtensilsCrossed,
  Stethoscope,
  HeartPulse,
  BrainCircuit,
  Bot,
  FileCode,
  Bug,
  TestTube,
  FileScan,
  FileText,
  Palette,
  LineChart,
  Network,
  BarChart,
  FileImage,
  Accessibility,
  Receipt,
  PiggyBank,
  Landmark,
  ShieldCheck,
  Calculator,
  ScanText,
  Lightbulb,
  MessageSquare,
  ClipboardList,
  User,
  Star,
  Salad,
  PieChart,
  Mails,
  Search,
  Cog,
  Truck,
  Shield,
  Voicemail,
  Wrench,
  CircleDollarSign,
  Trash,
  CalendarDays,
  Heart,
  Dumbbell,
  Clipboard,
  Activity,
  Brain,
  Goal,
  Sparkles,
  MessageCircle,
  Clock,
  BookOpen,
} from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";


const sections = [
  {
    id: "web-consultancy",
    title: "Web Consultancy",
    icon: Briefcase,
    tools: [
      { name: "Client Communication Bots", icon: Bot },
      { name: "Automated Code Generation", icon: FileCode },
      { name: "Bug Detection & Fixing", icon: Bug },
      { name: "Code Review Assistance", icon: FileScan },
      { name: "Automated Testing", icon: TestTube },
      { name: "Project Scoping & Estimation", icon: FileText },
      { name: "Technical Documentation Generation", icon: FileText },
      { name: "SEO Optimization Analysis", icon: LineChart },
      { name: "Performance Optimization Suggestions", icon: Network },
      { name: "Security Vulnerability Scanning", icon: ShieldCheck },
      { name: "AI Powered Brief", icon: Lightbulb },
      { name: "AI Expertise", icon: BrainCircuit },
      { name: "AI Content Generator", icon: Mails },
      { name: "AI Color Palette Generator", icon: Palette },
      { name: "AI SEO Optimizer", icon: Search },
      { name: "AI Layout Suggestions", icon: Cog },
      { name: "AI Competitor Analysis", icon: BarChart },
      { name: "AI Performance Optimizer", icon: Rocket },
      { name: "AI Image Optimizer", icon: FileImage },
      { name: "AI Accessibility Checker", icon: Accessibility },
      { name: "AI Code Generator", icon: Code },
    ],
    tabStyle: "mb-[10px]",
    sectionStyle: "",
  },
  {
    id: "accountancy",
    title: "Accountancy",
    icon: Calculator,
    defaultTab: "Expense Categorization",
    tools: [
      { name: "Client Communication Bots", icon: Bot },
      { name: "Automated Data Entry", icon: ScanText },
      { name: "Fraud Detection", icon: Shield },
      { name: "Reconciliation Automation", icon: Landmark },
      { name: "Predictive Analytics", icon: LineChart },
      { name: "Tax Compliance Automation", icon: PiggyBank },
      { name: "Audit Automation", icon: FileScan },
      { name: "Expense Categorization", icon: Receipt },
      { name: "Financial Report Generation", icon: FileText },
      { name: "Client Q&A", icon: MessageSquare },
      { name: "Invoice Processing", icon: FileCode },
      { name: "Cash Flow Forecast", icon: BarChart },
      { name: "Anomaly Detection", icon: Bug },
    ],
    tabStyle: "w-full mb-[10px]",
    sectionStyle: "",
  },
  {
    id: "fast-food-shop",
    title: "Fast Food Shop",
    icon: UtensilsCrossed,
    tools: [
      { name: "24/7 Customer Chatbot", icon: Bot },
      { name: "Customer Service", icon: User },
      { name: "Order Management", icon: ClipboardList },
      { name: "Special Recommender", icon: Star },
      { name: "Personalized Recommendations", icon: Lightbulb },
      { name: "Menu Optimizer", icon: Salad },
      { name: "Marketing Assistant", icon: Mails },
      { name: "Review Analyzer", icon: Search },
      { name: "Inventory Management", icon: Cog },
      { name: "Order Prediction", icon: PieChart },
      { name: "Customer Sentiment Analysis", icon: MessageSquare },
      { name: "Drive-Thru Optimization", icon: Truck },
      { name: "Automated Quality Control", icon: ShieldCheck },
      { name: "Voice Order Taking", icon: Voicemail },
      { name: "Predictive Maintenance", icon: Wrench },
      { name: "Dynamic Pricing", icon: CircleDollarSign },
      { name: "Waste Reduction Management", icon: Trash },
      { name: "Employee Scheduling Optimization", icon: CalendarDays },
    ],
    tabStyle: "max-w-[calc(100vw-10px)] mb-5",
    sectionStyle: "",
  },
  {
    id: "dental-practice",
    title: "Dental Practice",
    icon: Stethoscope,
    tools: [
      { name: "Diagnostic Assistance", icon: Search },
      { name: "Automated Appointment Scheduling", icon: CalendarDays },
      { name: "Patient Communication Bots", icon: Bot },
      { name: "Predictive Maintenance for Equipment", icon: Wrench },
      { name: "Insurance Claim Processing", icon: FileCode },
      { name: "Voice-Activated Charting", icon: Voicemail },
      { name: "Patient Risk Assessment", icon: ShieldCheck },
      { name: "Supply Inventory Management", icon: Cog },
      { name: "Marketing Personalization", icon: Mails },
    ],
    tabStyle: "max-w-[calc(100vw-100px)] mb-[10px]",
    sectionStyle: "",
  },
  {
    id: "fitness-coach",
    title: "Fitness Coach",
    icon: HeartPulse,
    tools: [
      { name: "Client Engagement Bots", icon: Bot },
      { name: "Personalized Workout Plans", icon: Dumbbell },
      { name: "Nutrition Guidance", icon: Salad },
      { name: "Form Correction", icon: Activity },
      { name: "Progress Tracking & Analysis", icon: BarChart },
      { name: "Injury Risk Assessment", icon: ShieldCheck },
      { name: "Recovery Optimization", icon: Heart },
      { name: "Goal Setting & Adjustment", icon: Goal },
      { name: "Behavioral Coaching", icon: Brain },
      { name: "Market Trend Analysis", icon: LineChart },
    ],
    tabStyle: "max-w-[calc(100vw-100px)] mb-[10px]",
    sectionStyle: "",
  },
  {
    id: "life-coach",
    title: "Life Coach",
    icon: BrainCircuit,
    tools: [
      { name: "Personalized Goal Setting", icon: Goal },
      { name: "Progress Tracking & Visualization", icon: BarChart },
      { name: "Habit Formation & Breaking", icon: Sparkles },
      { name: "Emotional Intelligence Development", icon: Brain },
      { name: "Decision-Making Support", icon: Lightbulb },
      { name: "Communication Skills Enhancement", icon: MessageCircle },
      { name: "Stress Management Techniques", icon: Heart },
      { name: "Time Management & Productivity", icon: Clock },
      { name: "Mindfulness & Meditation Guides", icon: User },
      { name: "Resource Recommendation Engine", icon: BookOpen },
    ],
    tabStyle: "max-w-[calc(100vw-100px)] mb-5",
    sectionStyle: "",
  },
];

function PlaceholderContent({
  icon: Icon,
  title,
}: {
  icon: React.ElementType;
  title: string;
}) {
  return (
    <Card className="flex-1">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 p-3 rounded-md">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="font-headline">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          This is a placeholder for the "{title}" AI tool. The actual
          functionality would be implemented here, providing a unique and
          valuable service to clients in this industry.
        </p>
      </CardContent>
    </Card>
  );
}

export function AiToolsClient() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const yOffset = -80; // Account for sticky navbar
      const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Industry-Specific AI Tools
        </h1>
        <p className="max-w-[800px] mx-auto text-muted-foreground md:text-xl">
          Explore our suite of AI-powered tools, custom-tailored to enhance
          productivity and innovation across various sectors.
        </p>
      </div>

      <div className="sticky top-16 bg-background/90 backdrop-blur-sm z-10 py-4 mb-8">
         <div className="flex flex-wrap items-center justify-center gap-2 max-w-[calc(100%-100px)] mx-auto">
          {sections.map((section) => (
            <Button key={section.id} variant="outline" asChild className="px-[5px]">
              <Link href={`#${section.id}`} onClick={(e) => handleScroll(e, section.id)}>
                {section.title}
              </Link>
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-24">
        {sections.map((section) => (
          <section key={section.id} id={section.id} className={cn("scroll-mt-24", section.sectionStyle)}>
            <div className="flex items-center gap-4 mb-8">
              <section.icon className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-headline font-bold">
                {section.title}
              </h2>
            </div>
            <Tabs defaultValue={section.defaultTab || section.tools[0].name} className="w-full">
              <TabsList className={cn("flex-wrap h-auto", section.tabStyle)}>
                 <div className="flex flex-wrap justify-start">
                  {section.tools.map((tool) => (
                    <TabsTrigger key={tool.name} value={tool.name} className="m-1">
                      {tool.name}
                    </TabsTrigger>
                  ))}
                 </div>
              </TabsList>
              
              {section.tools.map((tool) => (
                <TabsContent key={tool.name} value={tool.name}>
                  <PlaceholderContent icon={tool.icon} title={tool.name} />
                </TabsContent>
              ))}
            </Tabs>
          </section>
        ))}
      </div>
    </div>
  );
}
const Rocket = Heart; // Placeholder
