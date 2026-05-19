import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LightLayout } from "@/layouts/LightLayout";
import { Link } from "@tanstack/react-router";
import { Heart, Package, ShoppingCart, Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const INITIAL_WISHLIST = [
  {
    id: "wl-001",
    name: "MagSafe Leather Case",
    brand: "CasePro",
    price: 34.99,
    rating: 4.8,
    reviews: 512,
    color: "from-indigo-400 to-violet-500",
  },
  {
    id: "wl-002",
    name: "GaN 65W Fast Charger",
    brand: "PowerMax",
    price: 29.99,
    rating: 4.9,
    reviews: 1204,
    color: "from-amber-400 to-orange-500",
  },
  {
    id: "wl-003",
    name: "ANC Wireless Earbuds Pro",
    brand: "SoundWave",
    price: 79.99,
    rating: 4.8,
    reviews: 756,
    color: "from-pink-400 to-rose-500",
  },
  {
    id: "wl-004",
    name: "25000mAh Solar Power Bank",
    brand: "EnergyX",
    price: 54.99,
    rating: 4.7,
    reviews: 340,
    color: "from-emerald-400 to-teal-500",
  },
  {
    id: "wl-005",
    name: "Braided USB-C Cable 2m",
    brand: "ConnectPro",
    price: 11.99,
    rating: 4.6,
    reviews: 2310,
    color: "from-teal-400 to-green-500",
  },
  {
    id: "wl-006",
    name: "Over-Ear Studio Headphones",
    brand: "SoundWave",
    price: 129.99,
    rating: 4.9,
    reviews: 289,
    color: "from-fuchsia-400 to-pink-500",
  },
];

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

export default function CustomerWishlist() {
  const [wishlist, setWishlist] = useState(INITIAL_WISHLIST);

  const remove = (id: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
    toast.success("Removed from wishlist");
  };

  return (
    <LightLayout cartCount={3}>
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
          <h1 className="text-2xl font-bold font-display text-foreground">
            My Wishlist
          </h1>
          <span className="text-sm text-muted-foreground">
            ({wishlist.length} items)
          </span>
        </div>

        {wishlist.length === 0 ? (
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
              {wishlist.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -4 }}
                  data-ocid={`wishlist.item.${i + 1}`}
                >
                  <Card className="overflow-hidden border-border hover:shadow-lg transition-shadow">
                    <div
                      className={`h-44 bg-gradient-to-br ${item.color} flex items-center justify-center relative`}
                    >
                      <Package className="w-16 h-16 text-white/80" />
                      <button
                        type="button"
                        onClick={() => remove(item.id)}
                        data-ocid={`wishlist.item.${i + 1}.remove_button`}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors shadow-sm"
                        aria-label={`Remove ${item.name} from wishlist`}
                      >
                        <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                      </button>
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-muted-foreground">
                        {item.brand}
                      </p>
                      <p className="text-sm font-semibold text-foreground mt-0.5 line-clamp-1">
                        {item.name}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <StarRating rating={item.rating} />
                        <span className="text-xs text-muted-foreground">
                          ({item.reviews})
                        </span>
                      </div>
                      <p className="text-base font-bold text-foreground mt-1.5">
                        ${item.price}
                      </p>
                      <Button
                        size="sm"
                        className="w-full mt-3 gap-2 text-xs"
                        data-ocid={`wishlist.item.${i + 1}.add_to_cart_button`}
                        onClick={() =>
                          toast.success(`${item.name} added to cart!`)
                        }
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
