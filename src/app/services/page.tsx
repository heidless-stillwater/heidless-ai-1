import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Layers, Megaphone, PenTool, ShoppingCart, TrendingUp } from "lucide-react";

const serviceData = [
  {
    title: "Web Design & Development",
    description: "We create visually stunning and highly functional websites tailored to your brand. Our team covers everything from initial UI/UX wireframes to a fully responsive, pixel-perfect website. We specialize in modern frameworks like Next.js for optimal performance."
  },
  {
    title: "Branding & Identity",
    description: "A strong brand is unforgettable. We'll work with you to develop a compelling brand identity, including logo design, color palettes, typography, and style guides that resonate with your audience and create a lasting impression."
  },
  {
    title: "SEO & Content Strategy",
    description: "Get discovered by the right audience. Our SEO experts implement cutting-edge strategies to improve your search engine rankings, drive organic traffic, and increase visibility. We also help craft content that engages and converts."
  },
  {
    title: "E-commerce Solutions",
    description: "Ready to sell online? We build robust and scalable e-commerce platforms with seamless payment integrations, intuitive product management, and a user-friendly shopping experience to maximize your sales."
  },
  {
    title: "Headless CMS Integration",
    description: "Take control of your content. We integrate powerful headless CMS solutions like Sanity, Contentful, or Strapi, allowing your team to easily manage and update website content without needing a developer."
  },
  {
    title: "Digital Marketing",
    description: "Expand your reach and engage your customers. We create and manage data-driven digital marketing campaigns across various channels, including social media, email marketing, and PPC advertising to grow your business."
  }
];

// Helper component to render the correct icon
function ServiceIcon({ title }: { title: string }) {
  switch (title) {
    case "Web Design & Development":
      return <PenTool className="h-6 w-6 text-primary" />;
    case "Branding & Identity":
      return <Layers className="h-6 w-6 text-primary" />;
    case "SEO & Content Strategy":
      return <TrendingUp className="h-6 w-6 text-primary" />;
    case "E-commerce Solutions":
      return <ShoppingCart className="h-6 w-6 text-primary" />;
    case "Headless CMS Integration":
      return <Code className="h-6 w-6 text-primary" />;
    case "Digital Marketing":
      return <Megaphone className="h-6 w-6 text-primary" />;
    default:
      return null;
  }
}

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-20 lg:py-24">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Our Services
        </h1>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
          We provide a full spectrum of digital services to build, launch, and grow your online presence.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {serviceData.map((service) => (
            <Card key={service.title} className="flex flex-col hover:border-primary transition-colors">
              <CardHeader className="flex flex-row items-center gap-4 pb-4">
                <div className="bg-primary/10 p-3 rounded-md">
                  <ServiceIcon title={service.title} />
                </div>
                <CardTitle className="font-headline">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
