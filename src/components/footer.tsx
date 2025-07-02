
import Link from "next/link";
import { MountainIcon } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-6 px-4 md:px-6">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <MountainIcon className="h-6 w-6" />
          <span className="text-lg font-semibold font-headline">Heidless Hub</span>
        </div>
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Heidless Hub. All rights reserved.</p>
        <nav className="flex gap-4 sm:gap-6 flex-wrap justify-center">
          <Link className="text-sm hover:text-primary transition-colors" href="/services">
            Services
          </Link>
          <Link className="text-sm hover:text-primary transition-colors" href="/portfolio">
            Portfolio
          </Link>
          <Link className="text-sm hover:text-primary transition-colors" href="/pricing">
            Pricing
          </Link>
          <Link className="text-sm hover:text-primary transition-colors" href="/contact">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
