import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const projects = [
  {
    title: "Fintech Startup Website",
    description: "A sleek, modern website for a new fintech startup, designed to build trust and attract investors. Features interactive charts and secure data visualization.",
    image: "https://placehold.co/600x400.png",
    hint: "finance website",
    tags: ["Next.js", "TypeScript", "Vercel", "Fintech"]
  },
  {
    title: "E-commerce Fashion Hub",
    description: "A high-traffic e-commerce platform for a popular fashion brand. Optimized for performance and mobile experience, with a custom checkout flow.",
    image: "https://placehold.co/600x400.png",
    hint: "fashion e-commerce",
    tags: ["Shopify", "React", "Headless", "E-commerce"]
  },
  {
    title: "SaaS Analytics Dashboard",
    description: "A complex web application for a SaaS company, providing users with powerful data analytics and reporting tools. Built for scale and reliability.",
    image: "https://placehold.co/600x400.png",
    hint: "analytics dashboard",
    tags: ["React", "D3.js", "Node.js", "SaaS"]
  },
  {
    title: "Creative Agency Portfolio",
    description: "A visually-driven portfolio website for a creative agency, showcasing their work with immersive animations and a unique layout.",
    image: "https://placehold.co/600x400.png",
    hint: "creative portfolio",
    tags: ["GSAP", "Three.js", "WebGL", "Portfolio"]
  },
  {
    title: "Non-Profit Organization Hub",
    description: "A community-focused website for a non-profit, designed to increase donations and volunteer engagement through compelling storytelling.",
    image: "https://placehold.co/600x400.png",
    hint: "non-profit community",
    tags: ["Contentful", "Next.js", "Donations", "Community"]
  },
  {
    title: "Mobile App Landing Page",
    description: "A high-converting landing page for a new mobile app, designed to maximize downloads and user acquisition through A/B tested design.",
    image: "https://placehold.co/600x400.png",
    hint: "mobile app",
    tags: ["React", "Framer Motion", "Landing Page", "Mobile"]
  }
]

export default function PortfolioPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-20 lg:py-24">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Our Work
        </h1>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
          We take pride in our work. Explore a selection of projects that showcase our skills and creativity.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.title} className="overflow-hidden group flex flex-col">
            <div className="overflow-hidden">
              <Image
                alt={project.title}
                className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
                height={400}
                src={project.image}
                width={600}
                data-ai-hint={project.hint}
              />
            </div>
            <CardContent className="p-6 flex flex-col flex-1">
              <CardTitle className="font-headline text-xl mb-2">{project.title}</CardTitle>
              <CardDescription className="flex-1">{project.description}</CardDescription>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
