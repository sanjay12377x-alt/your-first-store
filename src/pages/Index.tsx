import { Header } from "@/components/storefront/Header";
import { Hero } from "@/components/storefront/Hero";
import { ProductGrid } from "@/components/storefront/ProductGrid";
import { Footer } from "@/components/storefront/Footer";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>LUXE | Luxury Fashion & Accessories</title>
        <meta name="description" content="Discover our curated selection of luxury fashion pieces. Premium quality, timeless elegance, and exclusive designs for the modern connoisseur." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <ProductGrid />
          
          {/* Trust Badges Section */}
          <section className="py-16 border-t border-border bg-ivory">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <p className="font-display text-3xl text-gold mb-2">✦</p>
                  <h3 className="font-display text-lg mb-1">Premium Quality</h3>
                  <p className="font-body text-xs text-muted-foreground">Handcrafted Excellence</p>
                </div>
                <div>
                  <p className="font-display text-3xl text-gold mb-2">✦</p>
                  <h3 className="font-display text-lg mb-1">Free Shipping</h3>
                  <p className="font-body text-xs text-muted-foreground">On Orders Over $500</p>
                </div>
                <div>
                  <p className="font-display text-3xl text-gold mb-2">✦</p>
                  <h3 className="font-display text-lg mb-1">Easy Returns</h3>
                  <p className="font-body text-xs text-muted-foreground">30-Day Return Policy</p>
                </div>
                <div>
                  <p className="font-display text-3xl text-gold mb-2">✦</p>
                  <h3 className="font-display text-lg mb-1">Secure Payment</h3>
                  <p className="font-body text-xs text-muted-foreground">100% Protected</p>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
