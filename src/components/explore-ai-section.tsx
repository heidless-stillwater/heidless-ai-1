"use client";

import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ExploreAISection() {
  return (
    <section id="explore-ai" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-headline font-bold tracking-tighter md:text-4xl/tight">Explore Our AI Tools</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
            We offer a broad range of AI Tools specific to your Business & personal requirements. Sign in to unlock your potential.
          </p>
        </div>
        <div className="mx-auto w-full max-w-sm space-y-2">
          <SignedIn>
            <Button asChild size="lg" className="group">
              <Link href="/ai-tools">
                Explore AI Tools <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </SignedIn>
          <SignedOut>
            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-4">
                <SignInButton afterSignInUrl="/ai-tools" mode="modal">
                  <Button>Sign In to Explore</Button>
                </SignInButton>
                <SignUpButton afterSignInUrl="/ai-tools" mode="modal">
                  <Button variant="outline">Sign Up</Button>
                </SignUpButton>
              </div>
              <p className="text-xs text-muted-foreground">You must be signed in to access the AI tools.</p>
            </div>
          </SignedOut>
        </div>
      </div>
    </section>
  );
}
