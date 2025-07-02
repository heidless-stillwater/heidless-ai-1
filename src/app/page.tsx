import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, PenTool, TrendingUp, ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";

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
                <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">Choose a plan that fits your needs</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                 Simple, transparent pricing. We use AI to streamline our process. This saves us time & costs. We pass those savings on to you.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 pt-12 md:grid-cols-2 lg:grid-cols-4">
              {/* Brochure Tier */}
              <Card className="flex flex-col">
                <CardHeader className="pb-4">
                  <CardTitle className="font-headline">Brochure</CardTitle>
                  <CardDescription>Perfect for Small Businesses and Individuals</CardDescription>
                  <div className="text-4xl font-bold font-headline pt-4">£399 <span className="text-lg font-normal text-muted-foreground">one-time</span></div>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start"><Check className="mr-2 h-4 w-4 mt-1 flex-shrink-0 text-primary" />Secure your foot-hold on the Web</li>
                    <li className="flex items-start"><Check className="mr-2 h-4 w-4 mt-1 flex-shrink-0 text-primary" />Excellent Foundation for your Web Presence</li>
                    <li className="flex items-start"><Check className="mr-2 h-4 w-4 mt-1 flex-shrink-0 text-primary" />Single Page Application</li>
                    <li className="flex items-start"><Check className="mr-2 h-4 w-4 mt-1 flex-shrink-0 text-primary" />Mobile-Responsive Design</li>
                    <li className="flex items-start"><Check className="mr-2 h-4 w-4 mt-1 flex-shrink-0 text-primary" />1 AI Function tailored to your Profession/Service</li>
                    <li className="flex items-start"><Check className="mr-2 h-4 w-4 mt-1 flex-shrink-0 text-primary" />First Year 'standard' Support Plan included</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full" variant="outline">
                    <Link href="/contact">Get Started</Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Pro Tier */}
              <Card className="flex flex-col border-primary relative">
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>
                <CardHeader className="pb-4">
                  <CardTitle className="font-headline">Pro</CardTitle>
                  <CardDescription>Optimal for Small Businesses and Individuals</CardDescription>
                  <div className="text-4xl font-bold font-headline pt-4">£599 <span className="text-lg font-normal text-muted-foreground">one-time</span></div>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start"><Check className="mr-2 h-4 w-4 mt-1 flex-shrink-0 text-primary" />Everything in Brochure Plan</li>
                    <li className="flex items-start"><Check className="mr-2 h-4 w-4 mt-1 flex-shrink-0 text-primary" />Up to 5 pages allowing you to expand on your offering</li>
                    <li className="flex items-start"><Check className="mr-2 h-4 w-4 mt-1 flex-shrink-0 text-primary" />3 AI Functions tailored to your Profession/Service</li>
                    <li className="flex items-start"><Check className="mr-2 h-4 w-4 mt-1 flex-shrink-0 text-primary" />First Year 'standard' Support Plan included</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/contact">Choose Pro</Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Premium Tier */}
              <Card className="flex flex-col">
                <CardHeader className="pb-4">
                  <CardTitle className="font-headline">Premium</CardTitle>
                  <CardDescription>For businesses ready to scale and sell online.</CardDescription>
                  <div className="text-4xl font-bold font-headline pt-4">£999 <span className="text-lg font-normal text-muted-foreground">one-time</span></div>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start"><Check className="mr-2 h-4 w-4 mt-1 flex-shrink-0 text-primary" />Everything in Pro Plan</li>
                    <li className="flex items-start"><Check className="mr-2 h-4 w-4 mt-1 flex-shrink-0 text-primary" />Up to 10 pages</li>
                    <li className="flex items-start"><Check className="mr-2 h-4 w-4 mt-1 flex-shrink-0 text-primary" />E-commerce Integration</li>
                    <li className="flex items-start"><Check className="mr-2 h-4 w-4 mt-1 flex-shrink-0 text-primary" />5 AI Functions</li>
                    <li className="flex items-start"><Check className="mr-2 h-4 w-4 mt-1 flex-shrink-0 text-primary" />Advanced SEO & Analytics</li>
                    <li className="flex items-start"><Check className="mr-2 h-4 w-4 mt-1 flex-shrink-0 text-primary" />First Year 'premium' Support Plan included</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full" variant="outline">
                    <Link href="/contact">Go Premium</Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Support Tier */}
              <Card className="flex flex-col">
                <CardHeader className="pb-4">
                  <CardTitle className="font-headline">Support/After-Care</CardTitle>
                  <CardDescription>Keep your site secure, updated, and fresh.</CardDescription>
                  <div className="text-4xl font-bold font-headline pt-4">From £49 <span className="text-lg font-normal text-muted-foreground">/month</span></div>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start"><Check className="mr-2 h-4 w-4 mt-1 flex-shrink-0 text-primary" />Ongoing Maintenance</li>
                    <li className="flex items-start"><Check className="mr-2 h-4 w-4 mt-1 flex-shrink-0 text-primary" />Security & Plugin Updates</li>
                    <li className="flex items-start"><Check className="mr-2 h-4 w-4 mt-1 flex-shrink-0 text-primary" />Monthly Performance Reports</li>
                    <li className="flex items-start"><Check className="mr-2 h-4 w-4 mt-1 flex-shrink-0 text-primary" />Content Update Credits</li>
                    <li className="flex items-start"><Check className="mr-2 h-4 w-4 mt-1 flex-shrink-0 text-primary" />Priority Support</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full" variant="outline">
                    <Link href="/contact">Learn More</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section id="ai-tools-cta" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-headline font-bold tracking-tighter md:text-4xl/tight">
                Explore Our Industry-Specific AI Tools
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We've developed a suite of AI-powered tools to streamline operations for various businesses. Sign in to explore how we can help you.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
                <Button asChild size="lg" className="group">
                    <Link href="/ai-tools">
                        Explore AI Tools <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </Button>
            </div>
          </div>
        </section>

        <section id="contact-cta" className="w-full py-12 md:py-24 lg:py-32">
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
