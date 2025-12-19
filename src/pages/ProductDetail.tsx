import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductByHandle, fetchProducts, formatPrice, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Header } from "@/components/storefront/Header";
import { Footer } from "@/components/storefront/Footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductCard } from "@/components/storefront/ProductCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Minus, Plus, ShoppingBag, Check, Share2, Copy, Truck, RotateCcw, Shield } from "lucide-react";
import { toast } from "sonner";

interface ProductNode {
  id: string;
  title: string;
  description: string;
  handle: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string | null;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        price: {
          amount: string;
          currencyCode: string;
        };
        availableForSale: boolean;
        selectedOptions: Array<{
          name: string;
          value: string;
        }>;
      };
    }>;
  };
  options: Array<{
    name: string;
    values: string[];
  }>;
}

export default function ProductDetail() {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ProductNode | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    async function loadProduct() {
      if (!handle) return;
      setIsLoading(true);
      const data = await fetchProductByHandle(handle);
      setProduct(data);
      
      // Initialize selected options with first values
      if (data?.options) {
        const initialOptions: Record<string, string> = {};
        data.options.forEach((option: { name: string; values: string[] }) => {
          if (option.name !== "Title") {
            initialOptions[option.name] = option.values[0];
          }
        });
        setSelectedOptions(initialOptions);
      }

      // Fetch related products
      const allProducts = await fetchProducts(5);
      setRelatedProducts(allProducts.filter((p: ShopifyProduct) => p.node.handle !== handle).slice(0, 4));
      
      setIsLoading(false);
    }
    loadProduct();
    window.scrollTo(0, 0);
  }, [handle]);

  const selectedVariant = product?.variants.edges.find((variant) => {
    return variant.node.selectedOptions.every(
      (option) => selectedOptions[option.name] === option.value || option.name === "Title"
    );
  })?.node || product?.variants.edges[0]?.node;

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;

    addItem({
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions,
    });

    toast.success("Added to bag", {
      description: `${product.title}${selectedVariant.title !== "Default Title" ? ` - ${selectedVariant.title}` : ""}`,
      position: "top-center",
    });
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard", { position: "top-center" });
    } catch {
      toast.error("Failed to copy link");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <Skeleton className="h-4 w-48 mb-8" />
          <div className="grid md:grid-cols-2 gap-12">
            <Skeleton className="aspect-square w-full" />
            <div className="space-y-6">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-24 text-center">
          <h1 className="font-display text-3xl mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/">Return to Shop</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const images = product.images.edges;
  const isInStock = selectedVariant?.availableForSale;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 lg:py-12">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="font-body text-xs uppercase tracking-widest">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/#products" className="font-body text-xs uppercase tracking-widest">Shop</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-body text-xs uppercase tracking-widest">{product.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-secondary/30 overflow-hidden group cursor-zoom-in">
              {images[selectedImage]?.node ? (
                <img
                  src={images[selectedImage].node.url}
                  alt={images[selectedImage].node.altText || product.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-muted-foreground font-display">No Image</span>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === index ? "border-gold" : "border-transparent hover:border-border"
                    }`}
                  >
                    <img
                      src={image.node.url}
                      alt={image.node.altText || `${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="lg:py-4">
            {/* Stock Status */}
            <div className="flex items-center gap-2 mb-4">
              <span className={`w-2 h-2 rounded-full ${isInStock ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="font-body text-xs uppercase tracking-widest text-muted-foreground">
                {isInStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            <h1 className="font-display text-3xl lg:text-4xl font-medium mb-4 animate-fade-in">
              {product.title}
            </h1>

            <p className="font-display text-2xl text-gold mb-6">
              {selectedVariant && formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)}
            </p>

            {/* Share Button */}
            <button 
              onClick={handleShare}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <Share2 className="w-4 h-4" />
              <span className="font-body text-xs uppercase tracking-widest">Share</span>
            </button>

            {/* Options */}
            {product.options.map((option) => {
              if (option.name === "Title" && option.values[0] === "Default Title") return null;
              
              return (
                <div key={option.name} className="mb-6">
                  <label className="font-body text-sm uppercase tracking-widest text-muted-foreground mb-3 block">
                    {option.name}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {option.values.map((value) => (
                      <button
                        key={value}
                        onClick={() => setSelectedOptions({ ...selectedOptions, [option.name]: value })}
                        className={`px-4 py-2 border font-body text-sm transition-all duration-300 ${
                          selectedOptions[option.name] === value
                            ? "border-charcoal bg-charcoal text-primary-foreground"
                            : "border-border hover:border-charcoal"
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Quantity */}
            <div className="mb-8">
              <label className="font-body text-sm uppercase tracking-widest text-muted-foreground mb-3 block">
                Quantity
              </label>
              <div className="flex items-center border border-border w-fit">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-none"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-body">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-none"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <Button
              onClick={handleAddToCart}
              disabled={!isInStock}
              className="w-full bg-charcoal hover:bg-charcoal/90 text-primary-foreground font-body uppercase tracking-widest text-xs py-6 mb-8 transition-all duration-300 hover:shadow-elegant"
              size="lg"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              {isInStock ? "Add to Bag" : "Out of Stock"}
            </Button>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-border mb-6">
              <div className="text-center">
                <Truck className="w-5 h-5 mx-auto mb-2 text-gold" />
                <p className="font-body text-xs text-muted-foreground">Free Shipping</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-5 h-5 mx-auto mb-2 text-gold" />
                <p className="font-body text-xs text-muted-foreground">Easy Returns</p>
              </div>
              <div className="text-center">
                <Shield className="w-5 h-5 mx-auto mb-2 text-gold" />
                <p className="font-body text-xs text-muted-foreground">Secure Checkout</p>
              </div>
            </div>

            {/* Accordion Details */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="description" className="border-border">
                <AccordionTrigger className="font-body text-sm uppercase tracking-widest hover:no-underline">
                  Description
                </AccordionTrigger>
                <AccordionContent className="font-body text-muted-foreground leading-relaxed">
                  {product.description || "No description available."}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="shipping" className="border-border">
                <AccordionTrigger className="font-body text-sm uppercase tracking-widest hover:no-underline">
                  Shipping & Returns
                </AccordionTrigger>
                <AccordionContent className="font-body text-muted-foreground leading-relaxed space-y-2">
                  <p>• Free standard shipping on orders over $500</p>
                  <p>• Express shipping available at checkout</p>
                  <p>• 30-day return policy for unworn items</p>
                  <p>• Items must be returned in original packaging</p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="care" className="border-border">
                <AccordionTrigger className="font-body text-sm uppercase tracking-widest hover:no-underline">
                  Care Instructions
                </AccordionTrigger>
                <AccordionContent className="font-body text-muted-foreground leading-relaxed space-y-2">
                  <p>• Store in a cool, dry place</p>
                  <p>• Avoid direct sunlight</p>
                  <p>• Follow care label instructions</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 pt-16 border-t border-border">
            <div className="text-center mb-12">
              <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
                You May Also Like
              </p>
              <h2 className="font-display text-3xl font-light text-foreground">
                Related Products
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((product, index) => (
                <ProductCard key={product.node.id} product={product} index={index} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
