import { AiToolsTabs, type AiTool } from "./ai-tools-tabs";

const webConsultancyTools: AiTool[] = [
  { id: "chat", name: "AI Chat", description: "Engage with our AI assistant for instant support and answers to your questions.", icon: "MessageCircle" },
  { id: "brief", name: "AI Powered Brief", description: "Generate a comprehensive project brief based on your requirements.", icon: "FileText" },
  { id: "expertise", name: "AI Expertise", description: "Get expert opinions and suggestions for your web projects.", icon: "BrainCircuit" },
  { id: "content-generator", name: "AI Content Generator", description: "Create high-quality content for your website, from blog posts to product descriptions.", icon: "PenSquare" },
  { id: "color-palette", name: "AI Color Palette Generator", description: "Generate beautiful and harmonious color palettes for your brand.", icon: "Palette" },
  { id: "seo-optimizer", name: "AI SEO Optimizer", description: "Analyze and optimize your content for better search engine rankings.", icon: "TrendingUp" },
  { id: "layout-suggestions", name: "AI Layout Suggestions", description: "Get AI-powered recommendations for your website layout and structure.", icon: "LayoutTemplate" },
  { id: "competitor-analysis", name: "AI Competitor Analysis", description: "Analyze your competitors' websites and strategies to gain a competitive edge.", icon: "BarChart3" },
  { id: "performance-optimizer", name: "AI Performance Optimizer", description: "Identify and fix performance bottlenecks on your website.", icon: "Gauge" },
  { id: "image-optimizer", name: "AI Image Optimizer", description: "Automatically optimize your images for the web without losing quality.", icon: "Image" },
  { id: "accessibility-checker", name: "AI Accessibility Checker", description: "Ensure your website is accessible to everyone with our AI-powered checker.", icon: "PersonStanding" },
  { id: "code-generator", name: "AI Code Generator", description: "Generate boilerplate code and components to speed up your development process.", icon: "Code" },
];

const fastFoodTools: AiTool[] = [
    { id: "chat", name: "AI Chat", description: "Engage with our AI assistant for instant support and answers to your questions.", icon: "MessageCircle" },
    { id: "brief", name: "AI Powered Brief", description: "Generate a comprehensive project brief based on your requirements.", icon: "FileText" },
];


export default function AiToolsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-20 lg:py-24">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl">
          AI-Powered Tools
        </h1>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
          Leverage our suite of intelligent tools to streamline your workflow and enhance your projects.
        </p>
      </div>
      <div className="space-y-16">
        <section id="web-consultancy">
          <h2 className="text-3xl font-headline font-bold mb-6">Web Consultancy Tools</h2>
          <AiToolsTabs tools={webConsultancyTools} defaultValue="chat" listClassName="mb-[30px]" />
        </section>

        <section id="fast-food">
          <h2 className="text-3xl font-headline font-bold mb-6">Commercial: Fast Food</h2>
          <AiToolsTabs tools={fastFoodTools} defaultValue="chat" />
        </section>
      </div>
    </div>
  );
}
