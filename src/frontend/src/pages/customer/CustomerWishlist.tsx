import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useProducts } from "@/hooks/useQueries";
import { LightLayout } from "@/layouts/LightLayout";
import { Link } from "@tanstack/react-router";
import { Heart, Package, ShoppingCart, Star, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const WISHLIST_KEY = "maw_wishlist";
const CART_KEY = "maw_cart";

interface CartItem {
  productId: string;
  quantity: number;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={`star-${s}`}
          className={`w-3 h-3 ${
            s <= Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "fill-muted text-muted-foreground"
          }`}
        />
      ))}
    </span>
  );
}

function WishlistSkeleton() {
  return (
    <Card className="overflow-hidden border-border">
      <div className="h-44 bg-muted shimmer" />
      <div className="p-4 space-y-2">
        <div className="h-3 w-20 bg-muted shimmer rounded" />
        <div className="h-4 w-full bg-muted shimmer rounded" />
        <div className="h-4 w-16 bg-muted shimmer rounded" />
        <div className="h-8 w-full bg-muted shimmer rounded mt-2" />
      </div>
    </Card>
  );
}

export default function CustomerWishlist() {
  const { data: allProducts, isLoading } = useProducts();
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(WISHLIST_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setWishlistIds(parsed.map(String));
        }
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  const wishlistProducts = (allProducts || []).filter((p) =>
    wishlistIds.includes(String(p.id)),
  );

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlistIds((prev) => {
      const next = prev.filter((id) => id !== productId);
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
      return next;
    });
    toast.success("Removed from wishlist");
  }, []);

  const addToCart = useCallback((productId: string, name: string) => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      const cart: CartItem[] = raw ? JSON.parse(raw) : [];
      const existing = cart.find((item) => item.productId === productId);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ productId, quantity: 1 });
      }
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      toast.success(`${name} added to cart!`);
    } catch {
      toast.error("Failed to add to cart");
    }
  }, []);

  if (!mounted || isLoading) {
    return (
      <LightLayout>
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="h-8 w-48 bg-muted shimmer rounded mb-6" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            <WishlistSkeleton />
            <WishlistSkeleton />
            <WishlistSkeleton />
          </div>
        </div>
      </LightLayout>
    );
  }

  return (
    <LightLayout>
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
          <h1 className="text-2xl font-bold font-display text-foreground">
            My Wishlist
          </h1>
          <span className="text-sm text-muted-foreground">
            ({wishlistProducts.length} items)
          </span>
        </div>

        {wishlistProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center h-64 text-center"
            data-ocid="wishlist.empty_state"
          >
            <Heart className="w-16 h-16 text-muted-foreground mb-4" />
            <h2 className="text-lg font-semibold text-foreground">
              Your wishlist is empty
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              Save products you love to buy them later
            </p>
            <Link to="/user/products">
              <Button data-ocid="wishlist.browse_button">
                Browse Products
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
            <AnimatePresence>
              {wishlistProducts.map((item, i) => (
                <motion.div
                  key={String(item.id)}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -4 }}
                  data-ocid={`wishlist.item.${i + 1}`}
                >
                  <Card className="overflow-hidden border-border hover:shadow-lg transition-shadow">
                    <div className="h-44 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center relative">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <Package className="w-16 h-16 text-muted-foreground" />
                      )}
                      <button
                        type="button"
                        onClick={() => removeFromWishlist(String(item.id))}
                        data-ocid={`wishlist.item.${i + 1}.remove_button`}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors shadow-sm"
                        aria-label={`Remove ${item.name} from wishlist`}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-muted-foreground">
                        {item.category}
                      </p>
                      <p className="text-sm font-semibold text-foreground mt-0.5 line-clamp-1">
                        {item.name}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <StarRating rating={item.rating} />
                        <span className="text-xs text-muted-foreground">
                          ({String(item.stock)})
                        </span>
                      </div>
                      <p className="text-base font-bold text-foreground mt-1.5">
                        ${item.price.toFixed(2)}
                      </p>
                      <Button
                        size="sm"
                        className="w-full mt-3 gap-2 text-xs"
                        data-ocid={`wishlist.item.${i + 1}.add_to_cart_button`}
                        onClick={() => addToCart(String(item.id), item.name)}
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        Add to Cart
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </LightLayout>
  );
}
