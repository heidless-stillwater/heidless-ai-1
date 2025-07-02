import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, PenTool, TrendingUp, ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 max-w-[95%] mx-auto">
        <section className="w-full py-20 md:py-32 lg:py-40 xl:py-48 text-center" id="hero">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-1 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-4">
                  <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                    Crafting Digital Excellence
                  </h1>
                  <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
                    Heidless Hub is a modern web agency specializing in creating stunning, high-performance websites that
                    drive results.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                  <Button asChild size="lg" className="group">
                    <Link href="/contact">
                      Get in Touch <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">Our Services</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We offer a comprehensive suite of services to bring your digital vision to life.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 mt-12">
              <Card className="hover:shadow-lg hover:shadow-primary/20 transition-shadow">
                <CardHeader className="items-center">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <PenTool className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="mt-4 font-headline">Web Design & Development</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription>
                    Creating beautiful, intuitive, and high-performing websites from scratch. We handle everything from UI/UX design to full-stack development.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg hover:shadow-primary/20 transition-shadow">
                <CardHeader className="items-center">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <Code className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="mt-4 font-headline">Branding & Identity</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription>
                    We help you build a strong brand identity that resonates with your target audience and sets you apart from the competition.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg hover:shadow-primary/20 transition-shadow">
                <CardHeader className="items-center">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="mt-4 font-headline">SEO & Digital Marketing</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription>
                    Boost your online visibility and drive organic traffic with our expert SEO strategies and digital marketing campaigns.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
             <div className="text-center mt-12">
                <Button asChild variant="outline">
                  <Link href="/services">Learn More About Our Services</Link>
                </Button>
              </div>
          </div>
        </section>

        <section id="portfolio" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">Our Portfolio</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Check out some of the amazing projects we've delivered for our clients.
                </p>
              </div>
            </div>
            <div className="mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-2 mt-12">
              <Card className="overflow-hidden group">
                <Image
                  alt="Project 1"
                  className="mx-auto aspect-video overflow-hidden rounded-t-lg object-cover object-center transition-transform group-hover:scale-105"
                  height="310"
                  src="https://placehold.co/550x310.png"
                  width="550"
                  data-ai-hint="corporate website"
                />
                <CardContent className="p-6">
                  <CardTitle className="font-headline text-xl mb-2">Corporate Website Redesign</CardTitle>
                  <CardDescription>A complete overhaul of a B2B company's online presence, focusing on lead generation.</CardDescription>
                </CardContent>
              </Card>
              <Card className="overflow-hidden group">
                <Image
                  alt="Project 2"
                  className="mx-auto aspect-video overflow-hidden rounded-t-lg object-cover object-center transition-transform group-hover:scale-105"
                  height="310"
                  src="https://placehold.co/550x310.png"
                  width="550"
                  data-ai-hint="e-commerce platform"
                />
                <CardContent className="p-6">
                  <CardTitle className="font-headline text-xl mb-2">E-commerce Platform</CardTitle>
                  <CardDescription>A custom-built e-commerce solution for a fashion brand, with a focus on user experience.</CardDescription>
                </CardContent>
              </Card>
            </div>
            <div className="text-center mt-12">
                <Button asChild variant="outline">
                  <Link href="/portfolio">View Full Portfolio</Link>
                </Button>
              </div>
          </div>
        </section>

        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Pricing Plans</div>
                <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">Choose a plan that fits your needs</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Simple, transparent pricing to get your project off the ground.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-1 md:grid-cols-3 md:gap-12 mt-12">
              <Card>
                <CardHeader className="text-center pb-4">
                  <CardTitle className="font-headline text-2xl">Standard</CardTitle>
                  <CardDescription>Perfect for individuals and small projects.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                  <div className="text-center">
                    <span className="text-4xl font-bold">$49</span>
                    <span className="text-muted-foreground">/mo</span>
                  </div>
                  <ul className="grid gap-3 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      Custom Website (up to 5 pages)
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      Basic SEO Setup
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      Mobile-Responsive Design
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      Standard Email Support
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full">Choose Plan</Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary shadow-lg shadow-primary/20 relative">
                <Badge variant="default" className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>
                <CardHeader className="text-center pb-4">
                  <CardTitle className="font-headline text-2xl">Pro</CardTitle>
                  <CardDescription>Ideal for growing businesses and startups.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                  <div className="text-center">
                    <span className="text-4xl font-bold">$99</span>
                    <span className="text-muted-foreground">/mo</span>
                  </div>
                  <ul className="grid gap-3 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      Custom Website (up to 15 pages)
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      Advanced SEO Optimization
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      Headless CMS Integration
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      Priority Phone & Email Support
                    </li>
                  </ul>
                  <Button className="w-full">Choose Plan</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center pb-4">
                  <CardTitle className="font-headline text-2xl">Premium</CardTitle>
                  <CardDescription>For large-scale enterprise solutions.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                  <div className="text-center">
                    <span className="text-4xl font-bold">$199</span>
                    <span className="text-muted-foreground">/mo</span>
                  </div>
                  <ul className="grid gap-3 text-sm text-muted-foreground">
                     <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      Unlimited Pages & Features
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      Full-scale SEO & Marketing Suite
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      E-commerce & Custom Integrations
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      Dedicated Account Manager
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full">Choose Plan</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="contact-cta" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-headline font-bold tracking-tighter md:text-4xl/tight">Ready to start your project?</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Let's work together to create something amazing. Contact us today to discuss your ideas.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
               <Button asChild size="lg" className="group">
                    <Link href="/contact">
                      Contact Us <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
