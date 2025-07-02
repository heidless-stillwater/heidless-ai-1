
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
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
    </div>
  );
}
