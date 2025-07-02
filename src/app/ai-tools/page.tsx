
import { AiToolsTabs } from "@/components/ai-tools-tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  BrainCircuit,
  Bot,
  FileText,
  Palette,
  LineChart,
  LayoutTemplate,
  Users,
  BarChart,
  Rocket,
  Image as ImageIcon,
  Accessibility,
  Code,
  CookingPot,
  HeartPulse,
  Scale,
  Smile,
  BookUser,
} from "lucide-react";

const sectionLinks = [
  { href: "#web-consultancy", label: "Web Consultancy", icon: BrainCircuit },
  { href: "#fast-food", label: "Fast Food Shop", icon: CookingPot },
  { href: "#dental-practice", label: "Dental Practice", icon: Smile },
  { href: "#accountancy", label: "Accountancy", icon: Scale },
  { href: "#personal-trainer", label: "Personal Trainer", icon: HeartPulse },
  { href: "#life-coach", label: "Life Coach", icon: BookUser },
];

const webConsultancyTools = [
  { id: "chat", name: "AI Chat", icon: "Bot", description: "Get instant answers and support from our AI assistant." },
  { id: "brief", name: "AI Powered Brief", icon: "FileText", description: "Generate a detailed project brief based on your ideas." },
  { id: "expertise", name: "AI Expertise", icon: "BrainCircuit", description: "Tap into AI-driven insights and industry expertise." },
  { id: "content", name: "AI Content Generator", icon: "FileText", description: "Create engaging content for your website or marketing." },
  { id: "palette", name: "AI Color Palette Generator", icon: "Palette", description: "Discover unique color palettes tailored to your brand." },
  { id: "seo", name: "AI SEO Optimizer", icon: "LineChart", description: "Optimize your content for search engines and improve rankings." },
  { id: "layout", name: "AI Layout Suggestions", icon: "LayoutTemplate", description: "Get AI-powered suggestions for your website layout." },
  { id: "competitor", name: "AI Competitor Analysis", icon: "Users", description: "Analyze your competitors' strategies and find opportunities." },
  { id: "performance", name: "AI Performance Optimizer", icon: "Rocket", description: "Improve your website's speed and performance." },
  { id: "image", name: "AI Image Optimizer", icon: "ImageIcon", description: "Optimize your images for the web without losing quality." },
  { id: "accessibility", name: "AI Accessibility Checker", icon: "Accessibility", description: "Ensure your website is accessible to everyone." },
  { id: "code", name: "AI Code Generator", icon: "Code", description: "Generate code snippets for your web projects." },
];

const fastFoodTools = [
  { id: "chat", name: "AI Chat", icon: "Bot", description: "Get instant answers and support for your fast food business." },
  { id: "recipe", name: "AI Recipe Variant Generator", icon: "CookingPot", description: "Generate creative variations of your recipes to delight customers." },
];

const dentalTools = [
  { id: "chat", name: "AI Chat", icon: "Bot", description: "Engage with an AI assistant for your dental practice needs." },
  { id: "brief", name: "AI Powered Brief", icon: "FileText", description: "Generate briefs for marketing campaigns or patient communications." },
];

const accountancyTools = [
  { id: "chat", name: "AI Chat", icon: "Bot", description: "An AI assistant for financial questions and accountancy tasks." },
  { id: "brief", name: "AI Powered Brief", icon: "FileText", description: "Draft financial reports or client communication briefs with AI." },
];

const personalTrainerTools = [
  { id: "chat", name: "AI Chat", icon: "Bot", description: "Your AI partner for fitness and nutrition planning." },
  { id: "brief", name: "AI Powered Brief", icon: "FileText", description: "Create personalized workout and meal plan briefs for clients." },
];

const lifeCoachTools = [
  { id: "chat", name: "AI Chat", icon: "Bot", description: "An AI tool to assist with life coaching strategies and client management." },
  { id: "brief", name: "AI Powered Brief", icon: "FileText", description: "Generate session outlines and development plan briefs with AI." },
];

export default function AiToolsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-20 lg:py-24">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl">
          AI-Powered Business Tools
        </h1>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
          Explore our suite of specialized AI tools designed to enhance your business operations.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
        {sectionLinks.map(link => (
          <Button key={link.href} variant="outline" asChild className="px-5 py-2">
            <Link href={link.href} className="flex items-center gap-2">
              <link.icon className="h-4 w-4" />
              <span>{link.label}</span>
            </Link>
          </Button>
        ))}
      </div>

      <div className="space-y-20">
        <section id="web-consultancy">
          <h2 className="text-3xl font-headline font-bold mb-6">Web Consultancy Tools</h2>
          <AiToolsTabs tools={webConsultancyTools} defaultValue="chat" />
        </section>

        <section id="fast-food">
          <h2 className="text-3xl font-headline font-bold mb-6">Fast Food Shop Tools</h2>
          <AiToolsTabs tools={fastFoodTools} defaultValue="chat" />
        </section>

        <section id="dental-practice">
          <h2 className="text-3xl font-headline font-bold mb-6">Dental Practice Tools</h2>
          <AiToolsTabs tools={dentalTools} defaultValue="chat" />
        </section>

        <section id="accountancy">
          <h2 className="text-3xl font-headline font-bold mb-6">Accountancy Tools</h2>
          <AiToolsTabs tools={accountancyTools} defaultValue="chat" />
        </section>

        <section id="personal-trainer">
          <h2 className="text-3xl font-headline font-bold mb-6">Personal Trainer Tools</h2>
          <AiToolsTabs tools={personalTrainerTools} defaultValue="chat" />
        </section>
        
        <section id="life-coach">
          <h2 className="text-3xl font-headline font-bold mb-6">Life Coach Tools</h2>
          <AiToolsTabs tools={lifeCoachTools} defaultValue="chat" />
        </section>
      </div>
    </div>
  );
}
