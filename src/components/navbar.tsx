"use client";

import Link from "next/link";
import { MountainIcon, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/pricing", label: "Pricing" },
  { href: "/ai-tools", label: "AI Tools" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 px-4 lg:px-6 h-16 flex items-center bg-background mx-auto">
      <Link className="flex items-center justify-center" href="/">
        <MountainIcon className="h-6 w-6" />
        <span className="sr-only">Heidless Hub</span>
      </Link>
      <span className="ml-2 font-headline text-lg font-semibold">Heidless Hub</span>
      <nav className="ml-auto hidden items-center gap-4 sm:gap-6 lg:flex">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            className={cn(
              "text-sm font-medium hover:text-primary transition-colors",
              pathname === link.href ? "text-primary" : "text-muted-foreground"
            )}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
       
        <div className="flex items-center gap-2">
            <SignedOut>
                <SignInButton mode="modal">
                    <Button variant="ghost">Sign In</Button>
                </SignInButton>
                <SignUpButton mode="modal">
                    <Button>Sign Up</Button>
                </SignUpButton>
            </SignedOut>
            <SignedIn>
                <UserButton afterSignOutUrl="/"/>
            </SignedIn>
        </div>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="lg:hidden ml-auto" size="icon" variant="outline">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <div className="grid gap-4 py-6">
            <Link className="flex items-center" href="/">
              <MountainIcon className="h-6 w-6" />
              <span className="ml-2 font-headline text-lg font-semibold">Heidless Hub</span>
            </Link>
            <nav className="grid gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  className={cn(
                    "flex w-full items-center py-2 text-lg font-medium hover:text-primary transition-colors",
                    pathname === link.href ? "text-primary" : "text-muted-foreground"
                  )}
                  href={link.href}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
             <div className="mt-4 grid gap-2">
                <SignedOut>
                    <SignInButton mode="modal">
                        <Button variant="outline" className="w-full">Sign In</Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                        <Button className="w-full">Sign Up</Button>
                    </SignUpButton>
                </SignedOut>
                <SignedIn>
                    <UserButton afterSignOutUrl="/" />
                </SignedIn>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
