import { AiToolSection } from "./ai-tool-section";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const sections = [
  { id: 'web-consultancy', name: 'Web Consultancy'},
  { id: 'accountancy', name: 'Accountancy'},
  { id: 'fast-food-shop', name: 'Fast Food Shop'},
  { id: 'dental-practice', name: 'Dental Practice'},
  { id: 'personal-trainer', name: 'Personal Trainer'},
  { id: 'life-coach', name: 'Life Coach'},
];

const toolData = {
  'Web Consultancy': {
    tools: [
      'AI-powered chat', 'AI Powered Brief', 'AI Expertise', 'AI Content Generator', 
      'AI Color Palette Generator', 'AI SEO Optimizer', 'AI Layout Suggestions', 
      'AI Competitor Analysis', 'AI Performance Optimizer', 'AI Image Optimizer', 
      'AI Accessibility Checker', 'AI Code Generator'
    ],
    gap: 'mb-2.5' // 10px
  },
  'Accountancy': {
    tools: [
      'ChatBot', 'Expense Categorization', 'AI Financial Reports', 'Client Q&A', 'Tax Compliance', 
      'Invoice Processing', 'Cash Flow Forecast', 'Anomaly Detection', 'Predictive Analysis'
    ],
    defaultTab: 'Expense Categorization',
    gap: 'mb-2.5' // 10px
  },
  'Fast Food Shop': {
    tools: [
      'Recommendatons AI', 'Special Recommender', 'Menu Optimizer AI', '24/7 Customer Chatbot AI', 
      'Marketing Assistant AI', 'Review Analyzer AI', 'Inventory Management AI'
    ],
    gap: 'mb-5' // 20px
  },
  'Dental Practice': {
    tools: ['AI-powered chat', 'AI Powered Brief'],
    gap: 'mb-2.5' // 10px
  },
  'Personal Trainer': {
    tools: ['AI-powered chat', 'AI Powered Brief'],
    gap: 'mb-2.5' // 10px
  },
  'Life Coach': {
    tools: ['AI-powered chat', 'AI Powered Brief'],
    gap: 'mb-5' // 20px
  }
};


export default function AiToolsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl">
          AI Tools
        </h1>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
          Explore our suite of AI-powered tools tailored for various professions.
        </p>
      </div>

      <div className="flex justify-center flex-wrap gap-2 mb-12">
        {sections.map(section => (
          <Button key={section.id} variant="outline" asChild>
            <Link href={`#${section.id}`} className="px-[10px]">{section.name}</Link>
          </Button>
        ))}
      </div>
      
      <div className="space-y-16">
        {sections.map(section => (
          <AiToolSection 
            key={section.id}
            sectionId={section.id}
            title={section.name}
            tools={toolData[section.name as keyof typeof toolData].tools}
            defaultTab={toolData[section.name as keyof typeof toolData].defaultTab}
            gapClass={toolData[section.name as keyof typeof toolData].gap}
          />
        ))}
      </div>
    </div>
  );
}
