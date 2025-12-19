import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[70vh] lg:min-h-[85vh] flex items-center justify-center overflow-hidden bg-champagne">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 50px,
            hsl(var(--charcoal)) 50px,
            hsl(var(--charcoal)) 51px
          )`
        }} />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Subtitle */}
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground animate-fade-in">
            The New Season Collection
          </p>

          {/* Main Title */}
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-foreground animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Timeless
            <span className="block italic text-gold">Elegance</span>
          </h2>

          {/* Description */}
          <p className="font-body text-muted-foreground text-lg md:text-xl max-w-xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Discover our curated selection of luxury pieces, crafted for those who appreciate the finer things in life.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button 
              size="lg" 
              className="bg-charcoal hover:bg-charcoal/90 text-primary-foreground font-body uppercase tracking-widest text-xs px-10 py-6"
            >
              Shop Collection
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-charcoal text-charcoal hover:bg-charcoal hover:text-primary-foreground font-body uppercase tracking-widest text-xs px-10 py-6"
            >
              Explore Lookbook
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-border to-transparent" />
      </div>
    </section>
  );
}
