import { SignedIn, SignedOut } from "@clerk/nextjs";
import { AiToolsClient } from "./ai-tools-client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

export default function AiToolsPage() {
  return (
    <>
      <SignedIn>
        <AiToolsClient />
      </SignedIn>
      <SignedOut>
        <div className="container mx-auto flex flex-col items-center justify-center gap-6 px-4 py-20 text-center min-h-[calc(100vh-10rem)]">
          <h1 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">Access Our Exclusive AI Tools</h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Please sign in to explore our suite of AI-powered tools designed to enhance your business.
          </p>
          <div className="flex gap-4">
            <SignInButton mode="modal">
              <Button>Sign In</Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button variant="secondary">Sign Up</Button>
            </SignUpButton>
          </div>
        </div>
      </SignedOut>
    </>
  );
}
