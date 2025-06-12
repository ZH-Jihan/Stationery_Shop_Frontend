import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-8 mt-12">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4">
        <div className="flex flex-col gap-2 items-center md:items-start">
          <span className="font-bold text-lg">e-comarze</span>
          <span className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} e-comarze. All rights reserved.
          </span>
        </div>
        <nav className="flex gap-6 text-muted-foreground">
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
        <div className="flex gap-4">
          <a href="#" aria-label="Facebook">
            <Facebook className="w-5 h-5" />
          </a>
          <a href="#" aria-label="Twitter">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" aria-label="Instagram">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="#" aria-label="YouTube">
            <Youtube className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
