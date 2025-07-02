import { AiToolsTabs, type AITool } from "./ai-tools-tabs";
import {
  MessageSquare,
  FileText,
  BrainCircuit,
  PenSquare,
  Palette,
  TrendingUp,
  LayoutTemplate,
  Users,
  Gauge,
  ImageIcon,
  Accessibility,
  Code,
} from "lucide-react";

const webConsultancyTools: AITool[] = [
  { id: 'chat', name: 'AI Chat', description: 'Get instant answers and guidance on your web projects.', icon: MessageSquare },
  { id: 'brief', name: 'AI Brief', description: 'Generate a comprehensive project brief based on your ideas.', icon: FileText },
  { id: 'expertise', name: 'AI Expertise', description: 'Tap into specialized knowledge for your industry.', icon: BrainCircuit, comingSoon: true },
  { id: 'content', name: 'Content Generator', description: 'Create engaging copy and content for your website.', icon: PenSquare },
  { id: 'palette', name: 'Color Palette Generator', description: 'Discover beautiful, accessible color schemes.', icon: Palette },
  { id: 'seo', name: 'SEO Optimizer', description: 'Analyze and improve your on-page SEO.', icon: TrendingUp, comingSoon: true },
  { id: 'layout', name: 'Layout Suggestions', description: 'Get AI-powered recommendations for page layouts.', icon: LayoutTemplate, comingSoon: true },
  { id: 'competitor', name: 'Competitor Analysis', description: 'Analyze your competitors\' online presence.', icon: Users, comingSoon: true },
  { id: 'performance', name: 'Performance Optimizer', description: 'Get tips to improve your site\'s speed.', icon: Gauge, comingSoon: true },
  { id: 'image', name: 'Image Optimizer', description: 'Compress and format images for the web.', icon: ImageIcon },
  { id: 'accessibility', name: 'Accessibility Checker', description: 'Audit your site for accessibility issues.', icon: Accessibility, comingSoon: true },
  { id: 'code', name: 'Code Generator', description: 'Generate boilerplate code for common components.', icon: Code },
];

const fastFoodTools: AITool[] = [
  { id: 'chat-ff', name: 'AI Chat', description: 'Instant support for restaurant-specific queries.', icon: MessageSquare },
  { id: 'brief-ff', name: 'AI Brief', description: 'Generate briefs for marketing campaigns or new menu items.', icon: FileText, comingSoon: true },
];

export default function AiToolsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-20 lg:py-24">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl">
          AI-Powered Tools
        </h1>
        <p className="max-w-[800px] mx-auto text-muted-foreground md:text-xl">
          Leverage our suite of specialized AI tools to streamline your workflow, enhance creativity, and optimize your web projects.
        </p>
      </div>

      <div className="space-y-16">
        <section id="web-consultancy">
          <h2 className="text-3xl font-headline font-bold mb-6">Web Consultancy Tools</h2>
          <AiToolsTabs tools={webConsultancyTools} defaultValue="chat" />
        </section>

        <section id="fast-food">
          <h2 className="text-3xl font-headline font-bold mb-6">Commercial: Fast Food</h2>
          <AiToolsTabs tools={fastFoodTools} defaultValue="chat-ff" />
        </section>
      </div>
    </div>
  );
}
