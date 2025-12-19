import { Link } from "react-router-dom";
import { Search, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CartDrawer } from "./CartDrawer";
import { useState } from "react";

const navLinks = [
  { name: "New Arrivals", href: "/" },
  { name: "Collections", href: "/" },
  { name: "Women", href: "/" },
  { name: "Men", href: "/" },
  { name: "Accessories", href: "/" },
];

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top Bar */}
      <div className="bg-charcoal text-primary-foreground py-2 text-center text-xs tracking-widest font-body uppercase">
        Complimentary Shipping on Orders Over $500
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <nav className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-lg font-display tracking-wide hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="font-display text-2xl lg:text-3xl font-semibold tracking-wide text-foreground">
              LUXE<span className="text-gold">.</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-body uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            {isSearchOpen ? (
              <div className="absolute inset-x-0 top-full bg-background border-b border-border p-4 animate-fade-in">
                <div className="container mx-auto flex items-center gap-2">
                  <Input
                    placeholder="Search our collections..."
                    className="flex-1 border-border"
                    autoFocus
                    onBlur={() => setIsSearchOpen(false)}
                  />
                  <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)}>
                    ✕
                  </Button>
                </div>
              </div>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
                <Search className="h-5 w-5" />
              </Button>
            )}

            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <User className="h-5 w-5" />
            </Button>

            <CartDrawer />
          </div>
        </div>
      </div>
    </header>
  );
}
