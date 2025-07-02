import { AiToolsTabs } from "./ai-tools-tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const webConsultancyTools = [
  { id: "chat", name: "AI Chat", description: "Engage with our AI assistant for instant support and answers to your web-related questions.", iconName: "MessageSquare" },
  { id: "brief", name: "AI Brief", description: "Generate a comprehensive project brief by answering a few simple questions. Let our AI kickstart your project.", iconName: "FileText" },
  { id: "expertise", name: "AI Expertise", description: "Get expert advice and insights on your industry, target audience, and digital strategy.", iconName: "BrainCircuit" },
  { id: "content", name: "AI Content", description: "Create compelling, SEO-friendly content for your website, from blog posts to product descriptions.", iconName: "PenSquare" },
  { id: "palette", name: "AI Palette", description: "Generate a professional color palette that perfectly matches your brand's identity and message.", iconName: "Palette" },
  { id: "seo", name: "AI SEO", description: "Analyze your website and get actionable recommendations to improve your search engine ranking.", iconName: "TrendingUp" },
  { id: "layout", name: "AI Layout", description: "Receive intelligent layout suggestions to optimize user experience and conversion rates.", iconName: "LayoutGrid" },
  { id: "competitor", name: "AI Competitor", description: "Analyze your competitors' online presence to identify opportunities and stay ahead.", iconName: "Users" },
  { id: "performance", name: "AI Performance", description: "Optimize your website's speed and performance with AI-driven analysis and suggestions.", iconName: "Gauge" },
  { id: "image", name: "AI Image", description: "Automatically optimize your images for the web to improve loading times without sacrificing quality.", iconName: "Image" },
  { id: "accessibility", name: "AI Accessibility", description: "Check your website for accessibility issues and get guidance on how to fix them.", iconName: "Accessibility" },
  { id: "code", name: "AI Code", description: "Generate boilerplate code snippets for common web components and functionalities.", iconName: "Code" },
];

const commercialTools = [
    { id: "chat", name: "AI Chat", description: "Engage with our AI assistant for instant support and answers to your business questions.", iconName: "MessageSquare" },
    { id: "brief", name: "AI Brief", description: "Generate a comprehensive project brief for your business needs by answering a few simple questions.", iconName: "FileText" },
];


export default function AiToolsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-20 lg:py-24">
      <div className="text-center space-y-4 mb-16">
        <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl">
          AI-Powered Tools
        </h1>
        <p className="max-w-[800px] mx-auto text-muted-foreground md:text-xl">
          Leverage the power of Artificial Intelligence to streamline your workflow, enhance your creativity, and boost your productivity.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16 max-w-5xl mx-auto">
        <Button asChild variant="outline" size="lg" className="w-full">
            <Link href="#web-consultancy">Web Consultancy</Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="w-full">
            <Link href="#fast-food">Fast Food Shop</Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="w-full">
            <Link href="#dental-practice">Dental Practice</Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="w-full">
            <Link href="#accountancy">Accountancy</Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="w-full">
            <Link href="#personal-trainer">Personal Trainer</Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="w-full">
            <Link href="#life-coach">Life Coach</Link>
        </Button>
      </div>


      <div className="space-y-20">
        <section id="web-consultancy">
          <h2 className="text-3xl font-headline font-bold mb-6 text-center">Web Consultancy</h2>
          <AiToolsTabs tools={webConsultancyTools} defaultValue="chat" />
        </section>

        <section id="fast-food">
           <h2 className="text-3xl font-headline font-bold mb-6 text-center">Fast Food Shop</h2>
           <AiToolsTabs tools={commercialTools} defaultValue="chat" />
        </section>

        <section id="dental-practice">
            <h2 className="text-3xl font-headline font-bold mb-6 text-center">Dental Practice</h2>
            <AiToolsTabs tools={commercialTools} defaultValue="chat" />
        </section>

        <section id="accountancy">
            <h2 className="text-3xl font-headline font-bold mb-6 text-center">Accountancy</h2>
            <AiToolsTabs tools={commercialTools} defaultValue="chat" />
        </section>

        <section id="personal-trainer">
            <h2 className="text-3xl font-headline font-bold mb-6 text-center">Personal Trainer</h2>
            <AiToolsTabs tools={commercialTools} defaultValue="chat" />
        </section>
        
        <section id="life-coach">
            <h2 className="text-3xl font-headline font-bold mb-6 text-center">Life Coach</h2>
            <AiToolsTabs tools={commercialTools} defaultValue="chat" />
        </section>

      </div>
    </div>
  );
}
