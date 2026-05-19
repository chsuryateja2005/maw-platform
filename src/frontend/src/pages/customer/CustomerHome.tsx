import { StatBadge } from "@/components/ui/StatBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LightLayout } from "@/layouts/LightLayout";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BatteryCharging,
  Cable,
  ChevronRight,
  Headphones,
  Heart,
  Package,
  Search,
  Shield,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Star,
  Truck,
  Zap,
  ZoomIn,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const CATEGORIES = [
  {
    id: "cat-cases",
    label: "Phone Cases",
    icon: Smartphone,
    color: "from-indigo-500 to-violet-600",
    count: 142,
  },
  {
    id: "cat-screen",
    label: "Screen Protectors",
    icon: Shield,
    color: "from-blue-500 to-indigo-600",
    count: 87,
  },
  {
    id: "cat-chargers",
    label: "Chargers",
    icon: BatteryCharging,
    color: "from-amber-500 to-orange-600",
    count: 63,
  },
  {
    id: "cat-cables",
    label: "Cables & Adapters",
    icon: Cable,
    color: "from-teal-500 to-cyan-600",
    count: 95,
  },
  {
    id: "cat-power",
    label: "Power Banks",
    icon: Zap,
    color: "from-green-500 to-emerald-600",
    count: 48,
  },
  {
    id: "cat-audio",
    label: "Audio Accessories",
    icon: Headphones,
    color: "from-pink-500 to-rose-600",
    count: 76,
  },
];

const FEATURED_PRODUCTS = [
  {
    id: "prod-1",
    name: "MagSafe Leather Case",
    brand: "CasePro",
    price: 34.99,
    mrp: 49.99,
    rating: 4.8,
    reviews: 512,
    badge: "Hot",
    color: "from-indigo-400 to-violet-500",
  },
  {
    id: "prod-2",
    name: "Tempered Glass Shield Pro",
    brand: "ShieldTech",
    price: 14.99,
    mrp: 24.99,
    rating: 4.7,
    reviews: 890,
    badge: "Sale",
    color: "from-blue-400 to-cyan-500",
  },
  {
    id: "prod-3",
    name: "GaN 65W Fast Charger",
    brand: "PowerMax",
    price: 29.99,
    mrp: 39.99,
    rating: 4.9,
    reviews: 1204,
    badge: "New",
    color: "from-amber-400 to-orange-500",
  },
  {
    id: "prod-4",
    name: "Braided USB-C Cable 2m",
    brand: "ConnectPro",
    price: 11.99,
    mrp: 17.99,
    rating: 4.6,
    reviews: 2310,
    badge: "Sale",
    color: "from-teal-400 to-green-500",
  },
  {
    id: "prod-5",
    name: "25000mAh Solar Power Bank",
    brand: "EnergyX",
    price: 54.99,
    mrp: 79.99,
    rating: 4.7,
    reviews: 340,
    badge: "New",
    color: "from-emerald-400 to-teal-500",
  },
  {
    id: "prod-6",
    name: "ANC Wireless Earbuds Pro",
    brand: "SoundWave",
    price: 79.99,
    mrp: 119.99,
    rating: 4.8,
    reviews: 756,
    badge: "Hot",
    color: "from-pink-400 to-rose-500",
  },
  {
    id: "prod-7",
    name: "Clear Shockproof Case",
    brand: "CasePro",
    price: 9.99,
    mrp: 14.99,
    rating: 4.5,
    reviews: 1890,
    badge: "Sale",
    color: "from-purple-400 to-indigo-500",
  },
  {
    id: "prod-8",
    name: "MagSafe Wireless Charger Pad",
    brand: "PowerMax",
    price: 24.99,
    mrp: 34.99,
    rating: 4.6,
    reviews: 628,
    badge: "New",
    color: "from-violet-400 to-purple-500",
  },
];

const DEALS = [
  {
    id: "deal-1",
    name: "Lightning Fast Cable Bundle",
    price: 19.99,
    mrp: 39.99,
    off: 50,
    color: "from-orange-500 to-red-500",
  },
  {
    id: "deal-2",
    name: "360° Rugged Case + Screen Pack",
    price: 22.99,
    mrp: 44.99,
    off: 49,
    color: "from-indigo-500 to-blue-500",
  },
  {
    id: "deal-3",
    name: "10000mAh Slim Power Bank",
    price: 27.99,
    mrp: 49.99,
    off: 44,
    color: "from-green-500 to-teal-500",
  },
  {
    id: "deal-4",
    name: "Sport Wireless Earbuds",
    price: 34.99,
    mrp: 64.99,
    off: 46,
    color: "from-pink-500 to-violet-500",
  },
  {
    id: "deal-5",
    name: "Car Charger Dual USB-C",
    price: 12.99,
    mrp: 24.99,
    off: 48,
    color: "from-amber-500 to-yellow-500",
  },
];

const TRUST = [
  {
    id: "trust-ship",
    icon: Truck,
    title: "Free Shipping",
    desc: "On orders above $29",
  },
  {
    id: "trust-return",
    icon: ShieldCheck,
    title: "30-Day Returns",
    desc: "Hassle-free returns",
  },
  {
    id: "trust-secure",
    icon: Shield,
    title: "Secure Payment",
    desc: "256-bit SSL encrypted",
  },
  {
    id: "trust-support",
    icon: ZoomIn,
    title: "24/7 Support",
    desc: "Live chat & email",
  },
];

const BADGE_STYLE: Record<string, string> = {
  Hot: "bg-rose-100 text-rose-700 border-rose-200",
  Sale: "bg-orange-100 text-orange-700 border-orange-200",
  New: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

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

export function CustomerPortal() {
  return <CustomerHome />;
}

function CustomerHome() {
  const [searchVal, setSearchVal] = useState("");

  return (
    <LightLayout cartCount={3}>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 text-white">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 20% 50%, white 0%, transparent 60%), radial-gradient(ellipse at 80% 10%, white 0%, transparent 50%)",
          }}
        />
        <div className="relative max-w-5xl mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm">
              🔥 Summer Sale — Up to 50% Off
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4 leading-tight">
              Discover Premium
              <br />
              Mobile Accessories
            </h1>
            <p className="text-indigo-100 text-lg mb-8 max-w-xl mx-auto">
              Shop the best phone cases, chargers, cables, and audio gear from
              top brands.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex items-center gap-2 max-w-xl mx-auto mb-8 bg-white rounded-xl shadow-lg px-4 py-2"
          >
            <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            <input
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Search for products, brands..."
              data-ocid="hero.search_input"
              className="flex-1 outline-none text-foreground text-sm py-1 bg-transparent placeholder:text-muted-foreground"
            />
            <Button
              size="sm"
              className="rounded-lg"
              data-ocid="hero.search_button"
            >
              Search
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex items-center justify-center gap-3 flex-wrap"
          >
            <Link to="/user/products">
              <Button
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                data-ocid="hero.shop_now_button"
              >
                Shop Now <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link to="/user/products">
              <Button
                className="bg-white text-indigo-700 hover:bg-white/90 font-semibold"
                data-ocid="hero.deals_button"
              >
                View Deals
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {TRUST.map((t) => (
            <div key={t.id} className="flex items-center gap-3 py-2">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <t.icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {t.title}
                </p>
                <p className="text-xs text-muted-foreground">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold font-display text-foreground">
              Shop by Category
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Browse our curated collections
            </p>
          </div>
          <Link to="/user/products">
            <Button
              variant="ghost"
              size="sm"
              className="text-primary gap-1"
              data-ocid="categories.view_all_button"
            >
              View All <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.07 }}
              whileHover={{ scale: 1.04, y: -2 }}
            >
              <Link to="/user/products" data-ocid={`category.${cat.id}.link`}>
                <Card className="p-4 text-center cursor-pointer hover:shadow-md transition-shadow border-border">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} mx-auto mb-3 flex items-center justify-center`}
                  >
                    <cat.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm font-semibold text-foreground leading-tight">
                    {cat.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {cat.count} items
                  </p>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-muted/30 py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold font-display text-foreground">
                Featured Products
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                Handpicked favorites from our customers
              </p>
            </div>
            <Link to="/user/products">
              <Button
                variant="ghost"
                size="sm"
                className="text-primary gap-1"
                data-ocid="featured.view_all_button"
              >
                View All <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {FEATURED_PRODUCTS.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                whileHover={{ y: -4 }}
              >
                <Card className="overflow-hidden border-border hover:shadow-lg transition-shadow">
                  <div
                    className={`h-36 bg-gradient-to-br ${p.color} flex items-center justify-center relative`}
                  >
                    <Package className="w-12 h-12 text-white/80" />
                    <Badge
                      className={`absolute top-2 left-2 text-xs border ${BADGE_STYLE[p.badge]}`}
                    >
                      {p.badge}
                    </Badge>
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-muted-foreground">{p.brand}</p>
                    <p className="text-sm font-semibold text-foreground mt-0.5 line-clamp-1">
                      {p.name}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <StarRating rating={p.rating} />
                      <span className="text-xs text-muted-foreground">
                        ({p.reviews})
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="text-sm font-bold text-foreground">
                        ${p.price}
                      </span>
                      <span className="text-xs text-muted-foreground line-through">
                        ${p.mrp}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      className="w-full mt-2 text-xs"
                      data-ocid={`featured.${p.id}.add_to_cart_button`}
                      onClick={() => toast.success(`${p.name} added to cart!`)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deals Section */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold font-display text-foreground">
              Today's Deals
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Limited time offers — grab them before they're gone
            </p>
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-3 -mx-2 px-2">
          {DEALS.map((d) => (
            <motion.div
              key={d.id}
              whileHover={{ scale: 1.03, y: -2 }}
              className="flex-shrink-0 w-48"
            >
              <Card className="overflow-hidden border-border cursor-pointer hover:shadow-md transition-shadow">
                <div
                  className={`h-28 bg-gradient-to-br ${d.color} flex items-center justify-center relative`}
                >
                  <Package className="w-10 h-10 text-white/80" />
                  <Badge className="absolute top-2 right-2 bg-white text-rose-600 border-0 font-bold text-xs">
                    -{d.off}%
                  </Badge>
                </div>
                <div className="p-3">
                  <p className="text-xs font-semibold text-foreground line-clamp-2 leading-tight">
                    {d.name}
                  </p>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-sm font-bold text-foreground">
                      ${d.price}
                    </span>
                    <span className="text-xs text-muted-foreground line-through">
                      ${d.mrp}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full mt-2 text-xs"
                    data-ocid={`deals.${d.id}.add_to_cart_button`}
                    onClick={() => toast.success(`${d.name} added to cart!`)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </LightLayout>
  );
}
