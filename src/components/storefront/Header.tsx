import { Link, useLocation } from "react-router-dom";
import { Search, User, Menu, X } from "lucide-react";
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
  const location = useLocation();

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
              <Button variant="ghost" size="icon" className="hover:bg-transparent">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 bg-background">
              <nav className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-lg font-display tracking-wide hover:text-gold transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <h1 className="font-display text-2xl lg:text-3xl font-semibold tracking-wide text-foreground transition-colors duration-300">
              LUXE<span className="text-gold group-hover:text-foreground transition-colors duration-300">.</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-body uppercase tracking-widest transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-gold after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ${
                  location.pathname === link.href 
                    ? 'text-foreground after:scale-x-100' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {/* Search */}
            {isSearchOpen ? (
              <div className="absolute inset-x-0 top-full bg-background border-b border-border p-4 animate-fade-in shadow-soft">
                <div className="container mx-auto flex items-center gap-2">
                  <Input
                    placeholder="Search our collections..."
                    className="flex-1 border-border focus:border-gold"
                    autoFocus
                    onBlur={() => setIsSearchOpen(false)}
                  />
                  <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)} className="hover:bg-transparent">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsSearchOpen(true)}
                className="hover:bg-transparent hover:text-gold transition-colors duration-300"
              >
                <Search className="h-5 w-5" />
              </Button>
            )}

            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden sm:flex hover:bg-transparent hover:text-gold transition-colors duration-300"
            >
              <User className="h-5 w-5" />
            </Button>

            <CartDrawer />
          </div>
        </div>
      </div>
    </header>
  );
}
