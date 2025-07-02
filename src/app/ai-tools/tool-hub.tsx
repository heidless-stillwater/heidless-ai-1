"use client";

import { AiToolTabs } from "@/components/ai-tool-tabs";
import { Placeholder } from "./placeholder";
import { ExpenseCategorization } from "./accountancy/expense-categorization";
import { InventoryManagement } from "./fast-food/inventory-management";
import { WasteReductionManagement } from "./fast-food/waste-reduction-management";

const webConsultancyTools = [
  "AI-powered chat", "AI Powered Brief", "AI Expertise", "AI Content Generator",
  "AI Color Palette Generator", "AI SEO Optimizer", "AI Layout Suggestions",
  "AI Competitor Analysis", "AI Performance Optimizer", "AI Image Optimizer",
  "AI Accessibility Checker", "AI Code Generator"
];

const accountancyTools = [
  "ChatBot", "Expense Categorization", "AI Financial Reports", "Client Q&A",
  "Tax Compliance", "Invoice Processing", "Cash Flow Forecast",
  "Anomaly Detection", "Predictive Analysis"
];

const fastFoodTools = [
    "24/7 Customer Chatbot", "Customer Service", "Order Management", "Special Recommender", "Personalized Recommendations",
    "Menu Optimizer", "Marketing Assistant", "Review Analyzer", "Inventory Management", "Order Prediction",
    "Customer Sentiment Analysis", "Drive-Thru Optimization", "Automated Quality Control", "Voice Order Taking",
    "Predictive Maintenance", "Dynamic Pricing", "Waste Reduction Management", "Employee Scheduling Optimization"
];

const dentalPracticeTools = [
    "Diagnostic Assistance", "Automated Appointment Scheduling", "Patient Communication Bots",
    "Predictive Maintenance for Equipment", "Insurance Claim Processing", "Voice-Activated Charting",
    "Patient Risk Assessment", "Supply Inventory Management", "Marketing Personalization"
];

const personalTrainerTools = ["AI-powered chat", "AI Powered Brief"];
const lifeCoachTools = ["AI-powered chat", "AI Powered Brief"];

function toKebabCase(str: string) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}

function renderTool(section: string, tool: string) {
    const toolSlug = toKebabCase(tool);

    if (section === 'accountancy' && toolSlug === 'expense-categorization') {
        return <ExpenseCategorization />;
    }
     if (section === 'fast-food' && toolSlug === 'inventory-management') {
        return <InventoryManagement />;
    }
    if (section === 'fast-food' && toolSlug === 'waste-reduction-management') {
        return <WasteReductionManagement />;
    }
    
    return <Placeholder toolName={tool} />;
}

export function ToolHub({ section, tool }: { section: string; tool?: string }) {
  let tools: string[] = [];
  let defaultTool = "";
  let gapStyle = { marginBottom: '10px' };

  switch (section) {
    case "web-consultancy":
      tools = webConsultancyTools;
      defaultTool = "AI-powered chat";
      break;
    case "accountancy":
      tools = accountancyTools;
      defaultTool = "Expense Categorization";
      break;
    case "fast-food":
      tools = fastFoodTools;
      defaultTool = "24/7 Customer Chatbot";
      gapStyle = { marginBottom: '20px' };
      break;
    case "dental-practice":
      tools = dentalPracticeTools;
      defaultTool = "Diagnostic Assistance";
      break;
    case "personal-trainer":
      tools = personalTrainerTools;
      defaultTool = "AI-powered chat";
      break;
    case "life-coach":
      tools = lifeCoachTools;
      defaultTool = "AI-powered chat";
      gapStyle = { marginBottom: '20px' };
      break;
    default:
      return <Placeholder toolName="Tool Section" />;
  }
  
  const activeToolName = tool ? tools.find(t => toKebabCase(t) === tool) || defaultTool : defaultTool;

  return (
    <div>
      <AiToolTabs
        tools={tools}
        defaultTool={activeToolName}
        section={section}
        style={gapStyle}
      />
      {renderTool(section, activeToolName)}
    </div>
  );
}
