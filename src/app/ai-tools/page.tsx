import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AiToolTabs } from "@/components/ai-tool-tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const webConsultancyTools = [
  "AI-powered chat", "AI Powered Brief", "AI Expertise", "AI Content Generator", 
  "AI Color Palette Generator", "AI SEO Optimizer", "AI Layout Suggestions", 
  "AI Competitor Analysis", "AI Performance Optimizer", "AI Image Optimizer", 
  "AI Accessibility Checker", "AI Code Generator"
];

const accountancyTools = [
  "ChatBot", "Expense Categorization", "AI Financial Reports", "Client Q&A",
  "Tax Compliance", "Invoice Processing", "Cash Flow Forecast", "Anomaly Detection",
  "Predictive Analysis"
];

const fastFoodTools = [
  "24/7 Customer Chatbot", "Special Recommender", "Personalized Recommendations", "Menu Optimizer", 
  "Marketing Assistant", "Review Analyzer", "Inventory Management", "Order Prediction", 
  "Customer Sentiment Analysis", "Drive-Thru Optimization", "Automated Quality Control", 
  "Voice Order Taking", "Predictive Maintenance", "Dynamic Pricing", "Waste Reduction Management", 
  "Employee Scheduling Optimization"
];

const dentalTools = ["AI-powered chat", "AI Powered Brief"];
const personalTrainerTools = ["AI-powered chat", "AI Powered Brief"];
const lifeCoachTools = ["AI-powered chat", "AI Powered Brief"];

export default function AiToolsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-20 lg:py-24">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl">
          AI Tools for Your Business
        </h1>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
          Explore our suite of AI-powered tools designed to streamline your workflow and boost productivity.
        </p>
      </div>

      <div className="flex justify-center flex-wrap gap-4 mb-12">
        <Button asChild variant="outline">
          <Link href="#web-consultancy">Web Consultancy</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="#accountancy">Accountancy</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="#fast-food">Fast Food Shop</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="#dental">Dental Practice</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="#personal-trainer">Personal Trainer</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="#life-coach">Life Coach</Link>
        </Button>
      </div>

      <div className="space-y-20">
        <section id="web-consultancy">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Web Consultancy Tools</CardTitle>
              <CardDescription>AI-powered assistants for modern web professionals.</CardDescription>
            </CardHeader>
            <CardContent>
              <AiToolTabs tools={webConsultancyTools} defaultTool="AI-powered chat" section="web-consultancy" />
            </CardContent>
          </Card>
        </section>

        <section id="accountancy">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Accountancy Tools</CardTitle>
              <CardDescription>Streamline your financial tasks with intelligent automation.</CardDescription>
            </CardHeader>
            <CardContent>
              <AiToolTabs tools={accountancyTools} defaultTool="Expense Categorization" section="accountancy" />
            </CardContent>
          </Card>
        </section>

        <section id="fast-food">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Fast Food Shop Tools</CardTitle>
              <CardDescription>Optimize your restaurant operations from kitchen to customer.</CardDescription>
            </CardHeader>
            <CardContent>
              <AiToolTabs tools={fastFoodTools} defaultTool="24/7 Customer Chatbot" section="fast-food" style={{ marginBottom: '20px' }} />
            </CardContent>
          </Card>
        </section>

        <section id="dental">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Dental Practice Tools</CardTitle>
              <CardDescription>AI assistants for a smarter dental office.</CardDescription>
            </CardHeader>
            <CardContent>
              <AiToolTabs tools={dentalTools} defaultTool="AI-powered chat" section="dental" />
            </CardContent>
          </Card>
        </section>

        <section id="personal-trainer">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Personal Trainer Tools</CardTitle>
              <CardDescription>Enhance your coaching with AI-driven insights.</CardDescription>
            </CardHeader>
            <CardContent>
              <AiToolTabs tools={personalTrainerTools} defaultTool="AI-powered chat" section="personal-trainer" />
            </CardContent>
          </Card>
        </section>

        <section id="life-coach">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Life Coach Tools</CardTitle>
              <CardDescription>Empower your practice with intelligent tools.</CardDescription>
            </CardHeader>
            <CardContent>
              <AiToolTabs tools={lifeCoachTools} defaultTool="AI-powered chat" section="life-coach" style={{ marginBottom: '20px' }}/>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
