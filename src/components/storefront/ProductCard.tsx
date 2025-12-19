import { useState } from "react";
import { Link } from "react-router-dom";
import { ShopifyProduct, formatPrice } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { ShoppingBag, Heart } from "lucide-react";

interface ProductCardProps {
  product: ShopifyProduct;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { node } = product;
  
  const firstImage = node.images.edges[0]?.node;
  const secondImage = node.images.edges[1]?.node;
  const firstVariant = node.variants.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!firstVariant) return;

    addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions,
    });

    toast.success("Added to cart", {
      description: node.title,
      position: "top-center",
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist", {
      position: "top-center",
    });
  };

  // Check if product is out of stock
  const isOutOfStock = !firstVariant?.availableForSale;

  return (
    <Link 
      to={`/product/${node.handle}`}
      className="group block animate-fade-in"
      style={{ animationDelay: `${index * 0.05}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden bg-secondary/30 aspect-[3/4] mb-4">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {isOutOfStock && (
            <span className="bg-charcoal text-primary-foreground text-[10px] font-body uppercase tracking-widest px-2 py-1">
              Sold Out
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-background/80 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-background"
        >
          <Heart 
            className={`w-4 h-4 transition-colors ${isWishlisted ? 'fill-gold text-gold' : 'text-foreground'}`} 
          />
        </button>

        {/* Images with hover swap */}
        {firstImage ? (
          <div className="relative w-full h-full">
            <img
              src={firstImage.url}
              alt={firstImage.altText || node.title}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                isHovered && secondImage ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
              }`}
            />
            {secondImage && (
              <img
                src={secondImage.url}
                alt={secondImage.altText || node.title}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                  isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              />
            )}
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <span className="text-muted-foreground font-display text-lg">No Image</span>
          </div>
        )}
        
        {/* Quick Add Button */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-300 ${
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}>
          <Button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="w-full bg-background/95 backdrop-blur text-foreground hover:bg-charcoal hover:text-primary-foreground font-body uppercase tracking-widest text-xs disabled:opacity-50"
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            {isOutOfStock ? "Sold Out" : "Add to Bag"}
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-1">
        <h3 className="font-display text-lg font-medium text-foreground group-hover:text-gold transition-colors duration-300">
          {node.title}
        </h3>
        <p className="font-body text-sm text-muted-foreground">
          {formatPrice(price.amount, price.currencyCode)}
        </p>
      </div>
    </Link>
  );
}
