
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, LifeBuoy, BookOpen } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-20 lg:py-24">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Choose a plan that fits your needs
        </h1>
        <p className="max-w-[900px] mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Simple, transparent pricing. We use AI to streamline our process. This saves us time & costs. We pass those savings on to you.
        </p>
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
      
      <div className="mt-20 space-y-12">
        <h2 className="text-3xl font-headline font-bold tracking-tighter text-center sm:text-4xl">Plan Details</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="flex flex-col">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <BookOpen className="h-8 w-8 text-primary" />
                        <CardTitle className="font-headline text-2xl">The Brochure Plan: Your Digital Starting Point</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <p>
                        The Brochure Plan is the perfect entry point for small businesses, freelancers, and individuals looking to establish a professional online presence. Think of it as your digital business card—a single, beautifully designed page that tells your story, showcases your services, and gives customers a way to connect with you.
                    </p>
                    <p>
                        While it's a single-page site, it's packed with power. We build it on the same high-performance, mobile-first foundation as our larger sites, ensuring a fast, seamless experience for your visitors on any device. It provides an excellent, scalable foundation that can grow with your business.
                    </p>
                    <h4 className="font-semibold text-card-foreground pt-2">What's included?</h4>
                    <ul className="space-y-2">
                        <li className="flex items-start"><Check className="mr-2 h-4 w-4 mt-1 flex-shrink-0 text-primary" />A custom-designed single-page website.</li>
                        <li className="flex items-start"><Check className="mr-2 h-4 w-4 mt-1 flex-shrink-0 text-primary" />One unique AI-powered function to add value to your service.</li>
                        <li className="flex items-start"><Check className="mr-2 h-4 w-4 mt-1 flex-shrink-0 text-primary" />Contact form integration to capture leads.</li>
                        <li className="flex items-start"><Check className="mr-2 h-4 w-4 mt-1 flex-shrink-0 text-primary" />Basic SEO setup to get you started on search engines.</li>
                    </ul>
                </CardContent>
            </Card>
            <Card className="flex flex-col">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <LifeBuoy className="h-8 w-8 text-primary" />
                        <CardTitle className="font-headline text-2xl">Support & After-Care Plans</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <p>
                        Launching your website is just the beginning. Our Support & After-Care plans are designed to give you peace of mind, ensuring your website remains secure, up-to-date, and performing at its best. We handle the technical details so you can focus on running your business.
                    </p>
                    <p>
                        From regular backups and security scans to performance monitoring and content updates, we've got you covered. We offer different tiers of support to match your needs, whether you just need the essentials covered or require more frequent updates and priority assistance. A well-maintained website is crucial for retaining visitors and protecting your investment.
                    </p>
                    <h4 className="font-semibold text-card-foreground pt-2">Key services include:</h4>
                    <ul className="space-y-2">
                        <li className="flex items-start"><Check className="mr-2 h-4 w-4 mt-1 flex-shrink-0 text-primary" />Continuous security monitoring and updates.</li>
                        <li className="flex items-start"><Check className="mr-2 h-4 w-4 mt-1 flex-shrink-0 text-primary" />Regular software and plugin updates.</li>
                        <li className="flex items-start"><Check className="mr-2 h-4 w-4 mt-1 flex-shrink-0 text-primary" />Performance checks and optimization.</li>
                        <li className="flex items-start"><Check className="mr-2 h-4 w-4 mt-1 flex-shrink-0 text-primary" />Dedicated support for any questions or issues.</li>
                    </ul>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
