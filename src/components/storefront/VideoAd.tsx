import { useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

export function VideoAd() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-16 lg:py-24 bg-charcoal text-primary-foreground overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6 text-center lg:text-left order-2 lg:order-1">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-gold">
              The Campaign
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
              Crafted for
              <span className="block italic text-gold">Distinction</span>
            </h2>
            <p className="font-body text-primary-foreground/70 max-w-md mx-auto lg:mx-0 leading-relaxed">
              Discover the artistry behind our latest collection. Each piece tells a story of heritage, 
              precision, and timeless elegance.
            </p>
            <Button 
              variant="outline" 
              className="border-gold text-gold hover:bg-gold hover:text-charcoal font-body uppercase tracking-widest text-xs px-8 py-5"
            >
              Explore Collection
            </Button>
          </div>

          {/* Video Player */}
          <div className="order-1 lg:order-2">
            <Dialog>
              <DialogTrigger asChild>
                <div className="relative aspect-[4/3] lg:aspect-square cursor-pointer group">
                  {/* Video Thumbnail/Placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal/80 to-gold/20 rounded-sm overflow-hidden">
                    {/* Decorative Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--gold)) 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                      }} />
                    </div>
                    
                    {/* Center Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="relative">
                        {/* Animated Ring */}
                        <div className="absolute inset-0 rounded-full border-2 border-gold/30 animate-ping" style={{ animationDuration: '2s' }} />
                        <div className="absolute -inset-4 rounded-full border border-gold/20" />
                        <div className="absolute -inset-8 rounded-full border border-gold/10" />
                        
                        {/* Play Button */}
                        <button className="relative w-20 h-20 rounded-full bg-gold/90 hover:bg-gold flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                          <Play className="w-8 h-8 text-charcoal ml-1" fill="currentColor" />
                        </button>
                      </div>
                      
                      <p className="mt-8 font-body text-xs tracking-[0.2em] uppercase text-gold/80">
                        Watch the Film
                      </p>
                    </div>
                  </div>

                  {/* Corner Accents */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-gold/40" />
                  <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-gold/40" />
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-gold/40" />
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-gold/40" />
                </div>
              </DialogTrigger>
              
              <DialogContent className="max-w-4xl p-0 bg-charcoal border-gold/20">
                <div className="aspect-video w-full">
                  {/* Replace with actual video URL */}
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                    title="Brand Campaign Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-sm"
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
}
