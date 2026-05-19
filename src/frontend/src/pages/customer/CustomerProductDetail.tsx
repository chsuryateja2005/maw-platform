import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LightLayout } from "@/layouts/LightLayout";
import { Link } from "@tanstack/react-router";
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

const PRODUCT = {
  id: "prod-detail-1",
  name: "GaN 65W Fast Charger",
  brand: "PowerMax",
  category: "Chargers",
  price: 29.99,
  mrp: 39.99,
  rating: 4.9,
  reviews: 1204,
  stock: "In Stock",
  color: "from-amber-400 to-orange-500",
  description: [
    "The PowerMax GaN 65W Fast Charger is a next-generation charging solution engineered with Gallium Nitride (GaN) technology. This allows the charger to be 40% smaller and lighter than traditional silicon-based chargers while delivering up to 65W of high-speed power.",
    "Compatible with all USB-C laptops, tablets, and smartphones including the latest iPhone and Android flagships. The intelligent power distribution automatically adjusts wattage per device, ensuring optimal charging speed and complete safety.",
    "Built-in safeguards protect against over-voltage, over-current, short circuits, and extreme temperatures — so you can charge confidently whether you're at home, at work, or traveling.",
  ],
  specs: [
    { key: "Input", value: "100–240V AC, 50/60Hz" },
    { key: "Output Power", value: "65W Max (USB-C)" },
    { key: "Ports", value: "1x USB-C, 1x USB-A" },
    { key: "Technology", value: "GaN III, PD 3.0, QC 4+" },
    { key: "Dimensions", value: "54 × 54 × 30 mm" },
    { key: "Weight", value: "112g" },
    { key: "Compatibility", value: "iPhone, Android, MacBook, iPad, Dell, HP" },
    { key: "Certifications", value: "FCC, CE, RoHS, UL" },
  ],
};

const REVIEWS = [
  {
    id: "rev-1",
    name: "Alex Thompson",
    rating: 5,
    date: "Mar 14, 2026",
    verified: true,
    comment:
      "Absolutely love this charger. Charges my MacBook Pro and iPhone simultaneously with no issues. So much smaller than the Apple charger too. Highly recommend!",
  },
  {
    id: "rev-2",
    name: "Priya Sharma",
    rating: 5,
    date: "Feb 28, 2026",
    verified: true,
    comment:
      "Works exactly as advertised. My laptop went from 20% to 80% in under 45 minutes. The build quality feels premium and the cable stays cool throughout.",
  },
  {
    id: "rev-3",
    name: "James O'Brien",
    rating: 4,
    date: "Feb 10, 2026",
    verified: true,
    comment:
      "Great charger overall. Gets slightly warm during high-load charging but nothing alarming. Compact size is a huge win for my travel kit.",
  },
];

const TABS = ["Description", "Specifications", "Reviews"];

function StarRating({
  rating,
  size = "sm",
}: { rating: number; size?: "sm" | "lg" }) {
  const sz = size === "lg" ? "w-5 h-5" : "w-3.5 h-3.5";
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={`star-${s}`}
          className={`${sz} ${s <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-muted text-muted-foreground"}`}
        />
      ))}
    </span>
  );
}

export default function CustomerProductDetail() {
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("Description");
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <LightLayout cartCount={3}>
      <div className="max-w-5xl mx-auto px-6 py-8">
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
          <span className="text-foreground">{PRODUCT.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Image Area */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div
              className={`aspect-square rounded-2xl bg-gradient-to-br ${PRODUCT.color} flex items-center justify-center shadow-lg`}
            >
              <Package className="w-32 h-32 text-white/80" />
            </div>
            <div className="flex gap-2 mt-3">
              {["alt-1", "alt-2", "alt-3"].map((a) => (
                <div
                  key={a}
                  className={`w-16 h-16 rounded-lg bg-gradient-to-br ${PRODUCT.color} opacity-60 flex items-center justify-center cursor-pointer hover:opacity-100 transition-opacity border-2 border-border`}
                >
                  <Package className="w-7 h-7 text-white/80" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Details Area */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs mb-2">
              {PRODUCT.category}
            </Badge>
            <h1 className="text-2xl font-bold font-display text-foreground leading-tight">
              {PRODUCT.name}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {PRODUCT.brand}
            </p>

            <div className="flex items-center gap-2 mt-3">
              <StarRating rating={PRODUCT.rating} size="lg" />
              <span className="text-sm font-semibold text-foreground">
                {PRODUCT.rating}
              </span>
              <span className="text-sm text-muted-foreground">
                ({PRODUCT.reviews.toLocaleString()} reviews)
              </span>
            </div>

            <Separator className="my-4" />

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-foreground">
                ${PRODUCT.price}
              </span>
              <span className="text-lg text-muted-foreground line-through">
                ${PRODUCT.mrp}
              </span>
              <Badge className="bg-rose-100 text-rose-700 border-rose-200">
                {Math.round((1 - PRODUCT.price / PRODUCT.mrp) * 100)}% OFF
              </Badge>
            </div>

            <div className="flex items-center gap-2 mt-3">
              <Badge className="bg-emerald-100 text-emerald-700 border-0 gap-1">
                <Zap className="w-3 h-3" />
                {PRODUCT.stock}
              </Badge>
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
                <span className="px-4 py-2 text-sm font-semibold border-x border-border">
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
                onClick={() => toast.success(`${PRODUCT.name} added to cart!`)}
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                className="flex-1 gap-2"
                data-ocid="product.buy_now_button"
                onClick={() => toast.success("Redirecting to checkout…")}
              >
                <Zap className="w-4 h-4" />
                Buy Now
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
                  className={`w-4 h-4 ${wishlisted ? "fill-rose-500 text-rose-500" : ""}`}
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
                {PRODUCT.description.map((para, i) => (
                  <p
                    key={`para-${i + 1}`}
                    className="text-muted-foreground leading-relaxed"
                  >
                    {para}
                  </p>
                ))}
              </motion.div>
            )}

            {activeTab === "Specifications" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Card className="overflow-hidden border-border">
                  <table className="w-full text-sm">
                    <tbody>
                      {PRODUCT.specs.map((spec, i) => (
                        <tr
                          key={spec.key}
                          className={
                            i % 2 === 0 ? "bg-muted/30" : "bg-background"
                          }
                        >
                          <td className="px-4 py-3 font-medium text-foreground w-1/3">
                            {spec.key}
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">
                            {spec.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Card>
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
