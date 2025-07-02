import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ExpenseCategorizationTool } from "./expense-categorization-tool";

const toolsData = {
  webConsultancy: {
    name: 'Web Consultancy',
    id: 'web-consultancy',
    gap: '10px',
    wrap: true,
    maxWidth: true,
    tools: [
      'AI-powered Chat', 'AI Powered Brief', 'AI Expertise', 'AI Content Generator', 'AI Color Palette Generator', 
      'AI SEO Optimizer', 'AI Layout Suggestions', 'AI Competitor Analysis', 'AI Performance Optimizer', 'AI Image Optimizer', 
      'AI Accessibility Checker', 'AI Code Generator'
    ]
  },
  accountancy: {
    name: 'Accountancy',
    id: 'accountancy',
    gap: '10px',
    wrap: true,
    maxWidth: true,
    defaultTab: 'expense-categorization',
    tools: [
      'ChatBot', 'Expense Categorization', 'AI Financial Reports', 'Client Q&A', 'Tax Compliance', 'Invoice Processing', 
      'Cash Flow Forecast', 'Anomaly Detection', 'Predictive Analysis'
    ]
  },
  fastFoodShop: {
    name: 'Fast Food Shop',
    id: 'fast-food-shop',
    gap: '20px',
    wrap: true,
    maxWidth: true,
    tools: [
      '24/7 Customer Chatbot', 'Customer Service', 'Order Management', 'Special Recommender', 'Personalized Recommendations', 
      'Menu Optimizer', 'Marketing Assistant', 'Review Analyzer', 'Inventory Management', 'Order Prediction', 
      'Customer Sentiment Analysis', 'Drive-Thru Optimization', 'Automated Quality Control', 'Voice Order Taking', 
      'Predictive Maintenance', 'Dynamic Pricing', 'Waste Reduction Management', 'Employee Scheduling Optimization'
    ]
  },
  dentalPractice: {
    name: 'Dental Practice',
    id: 'dental-practice',
    gap: '10px',
    wrap: false,
    maxWidth: false,
    tools: [
      'Diagnostic Assistance', 'Automated Appointment Scheduling', 'Patient Communication Bots', 
      'Predictive Maintenance for Equipment', 'Insurance Claim Processing', 'Voice-Activated Charting', 
      'Patient Risk Assessment', 'Supply Inventory Management', 'Marketing Personalization'
    ]
  },
  personalTrainer: {
    name: 'Personal Trainer',
    id: 'personal-trainer',
    gap: '10px',
    wrap: true,
    maxWidth: true,
    tools: ['AI-powered Chat', 'AI Powered Brief']
  },
  lifeCoach: {
    name: 'Life Coach',
    id: 'life-coach',
    gap: '20px',
    wrap: true,
    maxWidth: true,
    tools: ['AI-powered Chat', 'AI Powered Brief']
  },
};

const topNavButtons = [
  { name: 'Web Consultancy', id: 'web-consultancy' },
  { name: 'Fast Food Shop', id: 'fast-food-shop' },
  { name: 'Dental Practice', id: 'dental-practice' },
];

function ToolSection({ section }: { section: typeof toolsData[keyof typeof toolsData] }) {
  const toSlug = (s: string) => s.toLowerCase().replace(/\s+/g, '-');

  return (
    <section id={section.id} className="py-12 scroll-mt-24">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">
          {section.name} AI Tools
        </h2>
        <Tabs defaultValue={section.defaultTab || toSlug(section.tools[0])} className="w-full">
          <TabsList className={cn(
            "relative",
            section.wrap ? "h-auto flex-wrap justify-center" : "grid w-full grid-cols-3",
            section.maxWidth ? "max-w-[calc(100%-50px)] mx-auto" : ""
          )}>
            {section.tools.map((tool) => (
              <TabsTrigger key={toSlug(tool)} value={toSlug(tool)}>{tool}</TabsTrigger>
            ))}
          </TabsList>
          <div style={{ height: section.gap }} />
          {section.tools.map((tool) => (
            <TabsContent key={toSlug(tool)} value={toSlug(tool)}>
              <Card>
                <CardHeader>
                  <CardTitle>{tool}</CardTitle>
                </CardHeader>
                <CardContent>
                   {toSlug(tool) === 'expense-categorization' ? (
                    <ExpenseCategorizationTool />
                  ) : (
                    <p>
                      This is a placeholder for the {tool} tool. Functionality for this tool will be implemented soon.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

export default function AiToolsPage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 py-6 text-center">
        <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl">
          AI Tools for Your Business
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
          Select a profession to see our tailored AI-powered solutions.
        </p>
      </header>

      <nav className="sticky top-16 bg-background/95 backdrop-blur z-10 py-4 border-b border-border">
          <div className="container max-w-[calc(100%-100px)] mx-auto flex flex-wrap items-center justify-center gap-2">
            {topNavButtons.map((button) => (
              <Button key={button.id} variant="secondary" asChild className="px-[5px]">
                <Link href={`#${button.id}`}>{button.name}</Link>
              </Button>
            ))}
          </div>
      </nav>

      <main>
        {Object.values(toolsData).map(section => (
          <ToolSection key={section.id} section={section} />
        ))}
      </main>
    </div>
  );
}
