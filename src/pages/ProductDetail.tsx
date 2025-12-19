import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductByHandle, formatPrice } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Header } from "@/components/storefront/Header";
import { Footer } from "@/components/storefront/Footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, Minus, Plus, ShoppingBag, Check } from "lucide-react";
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
      
      setIsLoading(false);
    }
    loadProduct();
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12">
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 lg:py-12">
        {/* Breadcrumb */}
        <Link 
          to="/" 
          className="inline-flex items-center text-sm font-body text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Shop
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-secondary/30 overflow-hidden">
              {images[selectedImage]?.node ? (
                <img
                  src={images[selectedImage].node.url}
                  alt={images[selectedImage].node.altText || product.title}
                  className="w-full h-full object-cover"
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
                    className={`flex-shrink-0 w-20 h-20 overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? "border-gold" : "border-transparent"
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
            <h1 className="font-display text-3xl lg:text-4xl font-medium mb-4">
              {product.title}
            </h1>

            <p className="font-display text-2xl text-gold mb-6">
              {selectedVariant && formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)}
            </p>

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
                        className={`px-4 py-2 border font-body text-sm transition-all ${
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
              disabled={!selectedVariant?.availableForSale}
              className="w-full bg-charcoal hover:bg-charcoal/90 text-primary-foreground font-body uppercase tracking-widest text-xs py-6 mb-6"
              size="lg"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              {selectedVariant?.availableForSale ? "Add to Bag" : "Out of Stock"}
            </Button>

            {/* Description */}
            {product.description && (
              <div className="border-t border-border pt-8">
                <h3 className="font-display text-lg mb-4">Description</h3>
                <p className="font-body text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Features */}
            <div className="border-t border-border pt-8 mt-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-gold" />
                  <span className="font-body text-sm">Free Shipping</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-gold" />
                  <span className="font-body text-sm">Easy Returns</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-gold" />
                  <span className="font-body text-sm">Secure Checkout</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-gold" />
                  <span className="font-body text-sm">Premium Quality</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
