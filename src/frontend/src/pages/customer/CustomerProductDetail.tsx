import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useProductById } from "@/hooks/useQueries";
import { LightLayout } from "@/layouts/LightLayout";
import { Link, useParams, useRouter } from "@tanstack/react-router";
import {
  BadgeCheck,
  ChevronRight,
  Heart,
  Minus,
  Package,
  Plus,
  Share2,
  ShoppingCart,
  Star,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const REVIEWS = [
  {
    id: "rev-1",
    name: "Alex Thompson",
    rating: 5,
    date: "Mar 14, 2026",
    verified: true,
    comment:
      "Absolutely love this product. Exceeded my expectations in every way. Build quality is top-notch and delivery was super fast. Highly recommend!",
  },
  {
    id: "rev-2",
    name: "Priya Sharma",
    rating: 5,
    date: "Feb 28, 2026",
    verified: true,
    comment:
      "Works exactly as advertised. Great value for money. The packaging was premium and the product feels durable. Will definitely buy again.",
  },
  {
    id: "rev-3",
    name: "James O'Brien",
    rating: 4,
    date: "Feb 10, 2026",
    verified: true,
    comment:
      "Great product overall. Performs well under daily use. Slightly pricey but the quality justifies it. Customer service was helpful too.",
  },
];

const TABS = ["Description", "Reviews"];

function StarRating({
  rating,
  size = "sm",
}: {
  rating: number;
  size?: "sm" | "lg";
}) {
  const sz = size === "lg" ? "w-5 h-5" : "w-3.5 h-3.5";
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={`star-${s}`}
          className={`${sz} ${
            s <= Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "fill-muted text-muted-foreground"
          }`}
        />
      ))}
    </span>
  );
}

export default function CustomerProductDetail() {
  const { productId } = useParams({ strict: false }) as {
    productId: string;
  };
  const id = productId ? BigInt(productId) : undefined;
  const { data: product, isLoading } = useProductById(id);
  const { isAuthenticated } = useAuth();
  const { addItem } = useCart();
  const router = useRouter();

  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("Description");
  const [wishlisted, setWishlisted] = useState(false);

  if (isLoading) {
    return (
      <LightLayout>
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="grid md:grid-cols-2 gap-10">
            <Skeleton className="aspect-square rounded-2xl" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-px w-full" />
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-px w-full" />
              <div className="flex gap-3">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 w-10" />
              </div>
            </div>
          </div>
        </div>
      </LightLayout>
    );
  }

  if (!product) {
    return (
      <LightLayout>
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-xl font-bold text-foreground mb-2">
            Product not found
          </h1>
          <p className="text-muted-foreground mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/user/products">Browse Products</Link>
          </Button>
        </div>
      </LightLayout>
    );
  }

  const stockNum = Number(product.stock);
  const inStock = stockNum > 0;
  const lowStock = stockNum > 0 && stockNum <= 5;

  return (
    <LightLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Go Back */}
        <button
          type="button"
          onClick={() => window.history.back()}
          data-ocid="product.go_back_button"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-medium py-2 px-4 rounded-lg border border-border hover:bg-muted transition-colors text-sm mb-4"
        >
          ← Go Back
        </button>

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
          <Link to="/user" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link
            to="/user/products"
            className="hover:text-foreground transition-colors"
          >
            Products
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          {/* Image Area */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="aspect-square rounded-2xl bg-muted flex items-center justify-center shadow-sm border border-border overflow-hidden">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Package className="w-32 h-32 text-muted-foreground/40" />
              )}
            </div>
          </motion.div>

          {/* Details Area */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Badge className="bg-primary/10 text-primary border-primary/20 text-xs mb-2">
              {product.category}
            </Badge>
            <h1 className="text-2xl font-bold font-display text-foreground leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mt-3">
              <StarRating rating={product.rating} size="lg" />
              <span className="text-sm font-semibold text-foreground">
                {product.rating.toFixed(1)}
              </span>
            </div>

            <Separator className="my-4" />

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-foreground">
                ${product.price.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-3">
              {inStock ? (
                <Badge
                  className={`gap-1 border-0 ${
                    lowStock
                      ? "bg-amber-100 text-amber-700"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  <Zap className="w-3 h-3" />
                  {lowStock ? `Only ${stockNum} left` : "In Stock"}
                </Badge>
              ) : (
                <Badge className="bg-muted text-muted-foreground border-0">
                  Out of Stock
                </Badge>
              )}
              <span className="text-xs text-muted-foreground">
                Estimated delivery: 2–4 business days
              </span>
            </div>

            <Separator className="my-4" />

            {/* Quantity */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-medium text-foreground">
                Quantity:
              </span>
              <div className="flex items-center border border-border rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  data-ocid="product.qty_minus.button"
                  className="px-3 py-2 hover:bg-muted transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 text-sm font-semibold border-x border-border min-w-[3rem] text-center">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty(qty + 1)}
                  data-ocid="product.qty_plus.button"
                  className="px-3 py-2 hover:bg-muted transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                className="flex-1 gap-2"
                data-ocid="product.add_to_cart_button"
                onClick={() => {
                  if (!isAuthenticated) {
                    toast.info("Please sign in to add items to your cart");
                    router.navigate({ to: "/user/login" } as Parameters<
                      typeof router.navigate
                    >[0]);
                    return;
                  }
                  addItem(product, qty);
                }}
                disabled={!inStock}
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="icon"
                data-ocid="product.wishlist.toggle"
                onClick={() => {
                  setWishlisted(!wishlisted);
                  toast.success(
                    wishlisted ? "Removed from wishlist" : "Added to wishlist!",
                  );
                }}
              >
                <Heart
                  className={`w-4 h-4 ${
                    wishlisted ? "fill-rose-500 text-rose-500" : ""
                  }`}
                />
              </Button>
              <Button
                variant="outline"
                size="icon"
                data-ocid="product.share.button"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mt-10">
          <div className="flex border-b border-border gap-1">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                data-ocid={`product.tab.${tab.toLowerCase()}.toggle`}
                className={`px-5 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
                  activeTab === tab
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="py-6">
            {activeTab === "Description" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </motion.div>
            )}

            {activeTab === "Reviews" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                {REVIEWS.map((r) => (
                  <Card key={r.id} className="p-4 border-border">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
                        {r.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-sm text-foreground">
                            {r.name}
                          </span>
                          {r.verified && (
                            <Badge className="bg-emerald-100 text-emerald-700 border-0 text-xs gap-1">
                              <BadgeCheck className="w-3 h-3" />
                              Verified
                            </Badge>
                          )}
                          <span className="text-xs text-muted-foreground ml-auto">
                            {r.date}
                          </span>
                        </div>
                        <StarRating rating={r.rating} />
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                          {r.comment}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </LightLayout>
  );
}
