import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Bot,
  FileText,
  Sparkles,
  Palette,
  LineChart,
  Layout,
  Users,
  Rocket,
  Image as ImageIcon,
  PersonStanding,
  Code,
  BrainCircuit,
} from "lucide-react";

const aiTools = [
  {
    value: "chat",
    title: "AI-Powered Chat",
    icon: Bot,
    description: "Engage with our AI assistant for instant support and answers.",
    content: "AI Chat placeholder content. Here you would find an interactive chat interface.",
  },
  {
    value: "brief",
    title: "AI Powered Brief",
    icon: FileText,
    description: "Generate a detailed project brief based on your initial ideas.",
    content: "AI Brief generator placeholder content. Users could input ideas and get a structured brief.",
  },
  {
    value: "expertise",
    title: "AI Expertise",
    icon: BrainCircuit,
    description: "Get expert advice and insights tailored to your industry.",
    content: "AI Expertise placeholder content. Ask questions and get AI-driven expert advice.",
  },
  {
    value: "content-generator",
    title: "AI Content Generator",
    icon: Sparkles,
    description: "Create engaging marketing copy, blog posts, and more.",
    content: "AI Content Generator placeholder content. Input a topic and get back generated content.",
  },
  {
    value: "color-palette",
    title: "AI Color Palette Generator",
    icon: Palette,
    description: "Discover unique and harmonious color schemes for your brand.",
    content: "AI Color Palette Generator placeholder content. Describe a mood and get a color palette.",
  },
  {
    value: "seo-optimizer",
    title: "AI SEO Optimizer",
    icon: LineChart,
    description: "Analyze and improve your content for better search engine rankings.",
    content: "AI SEO Optimizer placeholder content. Paste your text and get optimization suggestions.",
  },
  {
    value: "layout-suggestions",
    title: "AI Layout Suggestions",
    icon: Layout,
    description: "Get creative and effective layout ideas for your website.",
    content: "AI Layout Suggestions placeholder content. Get layout mockups based on your content.",
  },
  {
    value: "competitor-analysis",
    title: "AI Competitor Analysis",
    icon: Users,
    description: "Gain insights into your competitors' strategies and performance.",
    content: "AI Competitor Analysis placeholder content. Enter a competitor URL to get an analysis.",
  },
  {
    value: "performance-optimizer",
    title: "AI Performance Optimizer",
    icon: Rocket,
    description: "Identify and fix performance bottlenecks on your website.",
    content: "AI Performance Optimizer placeholder content. Analyze your site for performance improvements.",
  },
  {
    value: "image-optimizer",
    title: "AI Image Optimizer",
    icon: ImageIcon,
    description: "Automatically compress and resize images for faster load times.",
    content: "AI Image Optimizer placeholder content. Upload an image to optimize it.",
  },
  {
    value: "accessibility-checker",
    title: "AI Accessibility Checker",
    icon: PersonStanding,
    description: "Ensure your website is accessible to all users, including those with disabilities.",
    content: "AI Accessibility Checker placeholder content. Scan your site for accessibility issues.",
  },
  {
    value: "code-generator",
    title: "AI Code Generator",
    icon: Code,
    description: "Generate boilerplate code and components to speed up development.",
    content: "AI Code Generator placeholder content. Describe a component and get the code.",
  },
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

      <Tabs defaultValue={aiTools[0].value} className="w-full">
        <TabsList className="flex flex-wrap h-auto justify-center gap-1">
          {aiTools.map((tool) => (
            <TabsTrigger key={tool.value} value={tool.value}>
              <tool.icon className="mr-2 h-4 w-4" />
              {tool.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {aiTools.map((tool) => (
          <TabsContent key={tool.value} value={tool.value} className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <tool.icon className="mr-2 h-5 w-5" />
                  <span>{tool.title}</span>
                </CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-6 bg-secondary rounded-md">
                    <p className="text-muted-foreground">{tool.content}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
