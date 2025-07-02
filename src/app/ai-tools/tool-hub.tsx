import { AiToolTabs } from "@/components/ai-tool-tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Briefcase,
  ChefHat,
  HeartPulse,
  User,
  Brain,
  Building,
} from "lucide-react";

const toolConfig = {
  "Web Consultancy": {
    icon: Briefcase,
    tools: [
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
    gap: "10px",
  },
  Accountancy: {
    icon: Building,
    tools: [
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
    gap: "10px",
  },
  "Fast Food Shop": {
    icon: ChefHat,
    tools: [
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
    gap: "20px",
  },
  "Dental Practice": {
    icon: HeartPulse,
    tools: [
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
    gap: "10px",
  },
  "Personal Trainer": {
    icon: User,
    tools: ["AI-powered chat", "AI Powered Brief"],
    gap: "10px",
  },
  "Life Coach": {
    icon: Brain,
    tools: ["AI-powered chat", "AI Powered Brief"],
    gap: "20px",
  },
};

type SectionName = keyof typeof toolConfig;

export function ToolHub({ section, tool }: { section: SectionName; tool?: string }) {
  const config = toolConfig[section];
  const defaultTool = tool || config.tools[0];

  const SectionIcon = config.icon;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <SectionIcon className="h-8 w-8 text-primary" />
          <CardTitle className="font-headline text-3xl">{section}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <AiToolTabs
          tools={config.tools}
          defaultTool={defaultTool}
          section={section}
          style={{ marginBottom: config.gap }}
        />
      </CardContent>
    </Card>
  );
}
