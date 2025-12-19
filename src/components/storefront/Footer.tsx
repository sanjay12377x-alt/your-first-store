import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Instagram, Facebook, Twitter, Mail } from "lucide-react";

const footerLinks = {
  shop: [
    { name: "New Arrivals", href: "/" },
    { name: "Collections", href: "/" },
    { name: "Women", href: "/" },
    { name: "Men", href: "/" },
    { name: "Accessories", href: "/" },
  ],
  support: [
    { name: "Contact Us", href: "/" },
    { name: "FAQs", href: "/" },
    { name: "Shipping & Returns", href: "/" },
    { name: "Size Guide", href: "/" },
    { name: "Store Locator", href: "/" },
  ],
  company: [
    { name: "About Us", href: "/" },
    { name: "Careers", href: "/" },
    { name: "Sustainability", href: "/" },
    { name: "Press", href: "/" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-charcoal text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="font-display text-2xl lg:text-3xl mb-4">
              Join Our World
            </h3>
            <p className="font-body text-sm text-primary-foreground/70 mb-6">
              Subscribe for exclusive access to new collections, private sales, and personalized style recommendations.
            </p>
            <form className="flex gap-2 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 font-body"
              />
              <Button 
                type="submit"
                className="bg-gold hover:bg-gold-light text-charcoal font-body uppercase tracking-widest text-xs px-6"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <h2 className="font-display text-2xl font-semibold tracking-wide">
                LUXE<span className="text-gold">.</span>
              </h2>
            </Link>
            <p className="font-body text-sm text-primary-foreground/70 mb-6 max-w-xs">
              Curating timeless elegance for the modern connoisseur since 2024.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-primary-foreground/70 hover:text-gold transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-gold transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-gold transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-gold transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-display text-sm uppercase tracking-widest mb-4">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="font-body text-sm text-primary-foreground/70 hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-display text-sm uppercase tracking-widest mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="font-body text-sm text-primary-foreground/70 hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display text-sm uppercase tracking-widest mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="font-body text-sm text-primary-foreground/70 hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-body text-xs text-primary-foreground/50">
              © 2024 LUXE. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/" className="font-body text-xs text-primary-foreground/50 hover:text-gold transition-colors">
                Privacy Policy
              </Link>
              <Link to="/" className="font-body text-xs text-primary-foreground/50 hover:text-gold transition-colors">
                Terms of Service
              </Link>
              <Link to="/" className="font-body text-xs text-primary-foreground/50 hover:text-gold transition-colors">
                Cookie Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
