import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useQueries";
import { LightLayout } from "@/layouts/LightLayout";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  Package,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ── Mock Data ─────────────────────────────────────────────────────────────────

const HERO_SLIDES = [
  {
    id: "slide-1",
    bg: "from-amber-500 via-orange-500 to-orange-600",
    overlay: "from-amber-900/40 to-orange-900/30",
    headline: "India's Best Mobile Accessories Store",
    sub: "Genuine accessories for all major brands. Free delivery on orders above ₹499.",
    cta: "Shop Now",
    badge: "Best Deals Today",
  },
  {
    id: "slide-2",
    bg: "from-blue-600 via-blue-500 to-teal-500",
    overlay: "from-blue-900/40 to-teal-900/30",
    headline: "Top-Rated Phone Cases & Covers",
    sub: "Shockproof, slim, and stylish cases for iPhone, Samsung, OnePlus & more.",
    cta: "Explore Cases",
    badge: "Up to 50% Off",
  },
  {
    id: "slide-3",
    bg: "from-purple-600 via-violet-500 to-indigo-600",
    overlay: "from-purple-900/40 to-violet-900/30",
    headline: "Earphones & Headphones Mega Sale",
    sub: "Wired, wireless, TWS & noise-cancelling — top brands at unbeatable prices.",
    cta: "Shop Audio",
    badge: "Limited Time",
  },
];

const CONTINUE_SHOPPING = [
  {
    id: "cs-1",
    name: "boAt Airdopes 141 TWS Earbuds",
    price: 1299,
    category: "Audio",
    color: "bg-purple-600",
    initial: "A",
  },
  {
    id: "cs-2",
    name: "Spigen Armor Case for iPhone 15",
    price: 899,
    category: "Phone Cases",
    color: "bg-slate-600",
    initial: "C",
  },
  {
    id: "cs-3",
    name: "Anker 65W USB-C Charger",
    price: 1799,
    category: "Chargers",
    color: "bg-blue-600",
    initial: "C",
  },
  {
    id: "cs-4",
    name: "Ambrane 20000mAh Power Bank",
    price: 1299,
    category: "Power Banks",
    color: "bg-green-600",
    initial: "P",
  },
  {
    id: "cs-5",
    name: "Tempered Glass Screen Protector",
    price: 299,
    category: "Screen Protectors",
    color: "bg-amber-500",
    initial: "S",
  },
  {
    id: "cs-6",
    name: "Fire-Boltt Ninja Smartwatch",
    price: 1799,
    category: "Smartwatches",
    color: "bg-red-600",
    initial: "W",
  },
];

const TOMORROW_DEALS = [
  {
    id: "td-1",
    name: "Noise ColorFit Pro Smartwatch",
    origPrice: 4999,
    price: 2999,
    discount: 40,
    color: "bg-slate-700",
    initial: "W",
  },
  {
    id: "td-2",
    name: "Realme Buds Air 3 TWS",
    origPrice: 3499,
    price: 1999,
    discount: 43,
    color: "bg-blue-500",
    initial: "B",
  },
  {
    id: "td-3",
    name: "Romoss 30000mAh Power Bank",
    origPrice: 2999,
    price: 1799,
    discount: 40,
    color: "bg-green-600",
    initial: "P",
  },
  {
    id: "td-4",
    name: "Braided Type-C Cable 3m",
    origPrice: 599,
    price: 299,
    discount: 50,
    color: "bg-amber-500",
    initial: "C",
  },
];

const SPONSORED_PRODUCTS = [
  {
    id: "sp-1",
    name: "boAt Bassheads 100 Earphones",
    price: 449,
    color: "bg-red-600",
    initial: "E",
  },
  {
    id: "sp-2",
    name: "Mi 18W Fast Charger",
    price: 599,
    color: "bg-orange-500",
    initial: "C",
  },
  {
    id: "sp-3",
    name: "Samsung OG Type-C Cable",
    price: 349,
    color: "bg-blue-500",
    initial: "C",
  },
  {
    id: "sp-4",
    name: "Pikkme Back Cover OnePlus 12",
    price: 499,
    color: "bg-purple-500",
    initial: "B",
  },
  {
    id: "sp-5",
    name: "iVoomi 10000mAh Slim Power Bank",
    price: 899,
    color: "bg-green-600",
    initial: "P",
  },
  {
    id: "sp-6",
    name: "Zebronics ZEB-Sound Bomb Bluetooth Speaker",
    price: 799,
    color: "bg-teal-600",
    initial: "S",
  },
];

const KEEP_SHOPPING = [
  {
    id: "ks-1",
    name: "DJI Osmo Mobile 6 Gimbal",
    price: 8999,
    category: "Camera & Lenses",
    color: "bg-slate-700",
    initial: "G",
  },
  {
    id: "ks-2",
    name: "Redmi Gaming Controller",
    price: 1299,
    category: "Gaming Accessories",
    color: "bg-red-600",
    initial: "G",
  },
  {
    id: "ks-3",
    name: "Portronics Bluetooth Car Kit",
    price: 799,
    category: "Bluetooth Accessories",
    color: "bg-blue-600",
    initial: "C",
  },
  {
    id: "ks-4",
    name: "Stuffcool MagSafe Ring Holder",
    price: 399,
    category: "Phone Accessories",
    color: "bg-amber-600",
    initial: "R",
  },
  {
    id: "ks-5",
    name: "UGREEN USB-C to 3.5mm Adapter",
    price: 549,
    category: "Cables",
    color: "bg-teal-600",
    initial: "A",
  },
  {
    id: "ks-6",
    name: "Lapcare Wireless Earbuds",
    price: 999,
    category: "Audio",
    color: "bg-violet-600",
    initial: "E",
  },
];

const CHARGER_CABLE_DEALS = [
  {
    id: "cc-1",
    name: "Anker 140W GaN Charger",
    origPrice: 4999,
    price: 2999,
    discount: 40,
    color: "bg-slate-700",
    initial: "C",
  },
  {
    id: "cc-2",
    name: "Belkin 3-in-1 Charging Cable",
    origPrice: 1299,
    price: 699,
    discount: 46,
    color: "bg-blue-600",
    initial: "C",
  },
  {
    id: "cc-3",
    name: "URBN 65W PD Wall Charger",
    origPrice: 2499,
    price: 1499,
    discount: 40,
    color: "bg-amber-600",
    initial: "W",
  },
  {
    id: "cc-4",
    name: "Portronics Car Charger 30W",
    origPrice: 999,
    price: 499,
    discount: 50,
    color: "bg-green-600",
    initial: "C",
  },
];

const EARPHONE_DEALS = [
  {
    id: "ep-1",
    name: "Sony WH-1000XM5 Headphones",
    origPrice: 29990,
    price: 19990,
    discount: 33,
    color: "bg-slate-800",
    initial: "H",
  },
  {
    id: "ep-2",
    name: "JBL Tune 230NC TWS Earbuds",
    origPrice: 5999,
    price: 2999,
    discount: 50,
    color: "bg-blue-600",
    initial: "E",
  },
  {
    id: "ep-3",
    name: "OnePlus Buds Pro 2",
    origPrice: 9999,
    price: 5999,
    discount: 40,
    color: "bg-red-600",
    initial: "B",
  },
  {
    id: "ep-4",
    name: "Sennheiser CX 300S Earphones",
    origPrice: 2499,
    price: 1299,
    discount: 48,
    color: "bg-purple-600",
    initial: "E",
  },
];

const INSPIRED_BY_LISTS = [
  {
    id: "il-1",
    name: "Joby GorillaPod 3K Mini Tripod",
    price: 2499,
    category: "Camera & Lenses",
    color: "bg-slate-700",
    initial: "T",
  },
  {
    id: "il-2",
    name: "Mivi DuoPods A850 TWS",
    price: 899,
    category: "Audio",
    color: "bg-purple-600",
    initial: "E",
  },
  {
    id: "il-3",
    name: "Spigen Liquid Air Case",
    price: 799,
    category: "Phone Cases",
    color: "bg-slate-600",
    initial: "C",
  },
  {
    id: "il-4",
    name: "Portronics Splash 12 Speaker",
    price: 1499,
    category: "Bluetooth Speakers",
    color: "bg-teal-600",
    initial: "S",
  },
  {
    id: "il-5",
    name: "ESR Screen Protector iPhone 15 Pro",
    price: 399,
    category: "Screen Protectors",
    color: "bg-amber-500",
    initial: "S",
  },
  {
    id: "il-6",
    name: "Hitage Power Bank 10000mAh",
    price: 699,
    category: "Power Banks",
    color: "bg-green-600",
    initial: "P",
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function inr(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

function ScrollRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-1 px-1">
      {children}
    </div>
  );
}

function SectionHeading({
  title,
  sub,
  viewAllLink,
}: { title: string; sub?: string; viewAllLink?: string }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
        {sub && <p className="text-sm text-muted-foreground mt-0.5">{sub}</p>}
      </div>
      {viewAllLink && (
        <Link to={viewAllLink as "/user/products"}>
          <Button
            variant="ghost"
            size="sm"
            className="text-amber-600 hover:text-amber-700 gap-0.5 text-sm"
            data-ocid="section.view_all_button"
          >
            See all <ChevronRight className="w-4 h-4" />
          </Button>
        </Link>
      )}
    </div>
  );
}

// ── Hero Carousel ─────────────────────────────────────────────────────────────

function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const navigate = useNavigate();

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % HERO_SLIDES.length);
    }, 5000);
  };

  const stopTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: timer functions are stable references
  useEffect(() => {
    if (!paused) startTimer();
    return stopTimer;
  }, [paused]);

  const goTo = (i: number) => setCurrent(i);
  const prev = () =>
    setCurrent((c) => (c - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  const next = () => setCurrent((c) => (c + 1) % HERO_SLIDES.length);
  const slide = HERO_SLIDES[current];

  return (
    <section
      className="relative overflow-hidden h-[250px] md:h-[400px] select-none"
      onMouseEnter={() => {
        setPaused(true);
        stopTimer();
      }}
      onMouseLeave={() => setPaused(false)}
      data-ocid="hero.carousel"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${slide.bg} transition-all duration-700`}
      />
      <div className={`absolute inset-0 bg-gradient-to-r ${slide.overlay}`} />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-12">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.45 }}
        >
          <Badge className="mb-3 bg-white/25 text-white border-white/40 backdrop-blur-sm text-xs px-3 py-1">
            {slide.badge}
          </Badge>
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">
            {slide.headline}
          </h1>
          <p className="text-white/85 text-sm md:text-base mb-5 max-w-lg mx-auto">
            {slide.sub}
          </p>
          <Button
            className="bg-amber-400 hover:bg-amber-300 text-amber-900 font-bold px-6"
            data-ocid={`hero.slide.${current + 1}.cta_button`}
            onClick={() => navigate({ to: "/user/products" })}
          >
            {slide.cta}
          </Button>
        </motion.div>
      </div>
      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        data-ocid="hero.prev_button"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center text-white transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        data-ocid="hero.next_button"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center text-white transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {HERO_SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            data-ocid={`hero.dot.${i + 1}`}
            onClick={() => goTo(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${i === current ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"}`}
          />
        ))}
      </div>
    </section>
  );
}

// ── Mini Product Card ─────────────────────────────────────────────────────────

interface MiniCardProps {
  id: string;
  name: string;
  price: number;
  color: string;
  initial: string;
  category?: string;
  index: number;
  origPrice?: number;
  sponsored?: boolean;
}

function MiniCard({
  id,
  name,
  price,
  color,
  initial,
  category,
  index,
  origPrice,
  sponsored,
}: MiniCardProps) {
  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="flex-shrink-0"
    >
      <Link to="/user/products" data-ocid={`product.item.${index + 1}.link`}>
        <div className="rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer p-3 min-w-[160px] w-[165px] border border-slate-100">
          <div
            className={`${color} rounded-md h-24 flex items-center justify-center mb-2`}
          >
            <span className="text-2xl font-bold text-white/80">{initial}</span>
          </div>
          {category && (
            <p className="text-[10px] text-muted-foreground mb-0.5">
              {category}
            </p>
          )}
          {sponsored && (
            <p className="text-[10px] text-muted-foreground mb-0.5">
              Sponsored
            </p>
          )}
          <p className="text-sm font-medium text-foreground line-clamp-2 min-h-[2.5rem] leading-tight">
            {name}
          </p>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-sm font-bold text-foreground">
              {inr(price)}
            </span>
            {origPrice && (
              <span className="text-[11px] text-muted-foreground line-through">
                {inr(origPrice)}
              </span>
            )}
          </div>
          {origPrice && (
            <p className="text-[11px] text-green-600 font-medium mt-0.5 flex items-center gap-1">
              <Truck className="w-3 h-3" /> Tomorrow delivery
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

// ── Deal Grid Card ────────────────────────────────────────────────────────────

interface DealCardProps {
  id: string;
  name: string;
  origPrice: number;
  price: number;
  discount: number;
  color: string;
  initial: string;
  index: number;
}

function DealCard({
  id,
  name,
  origPrice,
  price,
  discount,
  color,
  initial,
  index,
}: DealCardProps) {
  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.07 }}
    >
      <Link to="/user/products" data-ocid={`deal.item.${index + 1}.link`}>
        <div className="rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer p-3 border border-slate-100">
          <div
            className={`${color} rounded-md h-32 flex items-center justify-center mb-2 relative`}
          >
            <span className="text-3xl font-bold text-white/80">{initial}</span>
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">
              -{discount}%
            </span>
          </div>
          <p className="text-sm font-semibold text-foreground line-clamp-2 min-h-[2.5rem]">
            {name}
          </p>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-sm font-bold text-foreground">
              {inr(price)}
            </span>
            <span className="text-xs text-muted-foreground line-through">
              {inr(origPrice)}
            </span>
          </div>
          <p className="text-[11px] text-green-600 font-medium mt-0.5 flex items-center gap-1">
            <Truck className="w-3 h-3" /> Tomorrow delivery
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export function CustomerPortal() {
  return <CustomerHome />;
}

function CustomerHome() {
  const { data: products } = useProducts();
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const featuredFromBackend = products?.slice(0, 6) ?? [];

  return (
    <LightLayout>
      {/* 1. AUTO-PLAYING HERO CAROUSEL */}
      <HeroCarousel />

      {/* 2. CONTINUE SHOPPING */}
      <section className="bg-white py-8 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeading
            title="Continue shopping"
            viewAllLink="/user/products"
          />
          <ScrollRow>
            {CONTINUE_SHOPPING.map((item, i) => (
              <MiniCard key={item.id} {...item} index={i} />
            ))}
          </ScrollRow>
        </div>
      </section>

      {/* 3. DEALS DELIVERED BY TOMORROW */}
      <section className="bg-muted/30 py-8 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeading
            title="Deals delivered by Tomorrow"
            sub="Order now for guaranteed next-day delivery"
            viewAllLink="/user/products"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TOMORROW_DEALS.map((item, i) => (
              <DealCard key={item.id} {...item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. MOBILE ACCESSORIES PROMO BANNER */}
      <section className="py-8 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="rounded-xl bg-[#0f1b2d] text-white flex flex-col md:flex-row items-center justify-between gap-6 px-8 py-8">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-6 h-6 text-amber-400" />
                <span className="text-amber-400 font-bold text-xl tracking-wide">
                  MAW Accessories
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-3">
                Genuine accessories. Guaranteed quality.
              </h3>
              <ul className="space-y-1.5 text-sm text-blue-100">
                <li className="flex items-center gap-2">
                  <span className="text-amber-400">✓</span> 100% genuine brand
                  accessories
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-400">✓</span> Free delivery on
                  orders above ₹499
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-400">✓</span> Easy 10-day returns
                  &amp; exchange
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-400">✓</span> 10,000+ products
                  across all brands
                </li>
              </ul>
            </div>
            <div className="text-center">
              <p className="text-blue-200 text-sm mb-1">Shop the full range</p>
              <p className="text-3xl font-bold text-white mb-4">
                50,000+
                <span className="text-base font-normal text-blue-300">
                  {" "}
                  accessories
                </span>
              </p>
              <Button
                className="bg-amber-400 hover:bg-amber-300 text-amber-900 font-bold px-8"
                data-ocid="accessories_promo.shop_button"
                onClick={() => navigate({ to: "/user/products" })}
              >
                Shop All
              </Button>
              <p className="text-xs text-blue-300 mt-2">
                All major brands. Best prices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SPONSORED PRODUCTS */}
      <section className="bg-white py-8 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-bold text-foreground">Sponsored</h2>
            <Badge
              variant="outline"
              className="text-[10px] px-1.5 py-0 h-4 text-muted-foreground"
            >
              Ad
            </Badge>
          </div>
          <ScrollRow>
            {SPONSORED_PRODUCTS.map((item, i) => (
              <MiniCard key={item.id} {...item} index={i} sponsored />
            ))}
          </ScrollRow>
        </div>
      </section>

      {/* 6. KEEP SHOPPING FOR */}
      <section className="bg-muted/20 py-8 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeading
            title="Keep shopping for"
            viewAllLink="/user/products"
          />
          <ScrollRow>
            {KEEP_SHOPPING.map((item, i) => (
              <MiniCard key={item.id} {...item} index={i} />
            ))}
          </ScrollRow>
        </div>
      </section>

      {/* 7. DEAL FOR YOU */}
      <section className="bg-white py-8 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeading
            title="Deal for you"
            sub="Limited time — while stocks last"
          />
          <div className="rounded-xl border border-red-100 bg-gradient-to-br from-red-50 to-orange-50 flex flex-col md:flex-row gap-6 p-6 items-center">
            <div className="bg-slate-700 rounded-xl w-full md:w-64 h-52 flex items-center justify-center flex-shrink-0 relative">
              <span className="text-5xl font-black text-white/70">⌚</span>
              <span className="absolute top-3 left-3 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">
                -60%
              </span>
              <Badge className="absolute bottom-3 left-3 bg-amber-500 text-white border-0 text-xs">
                Limited time deal
              </Badge>
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">
                Smartwatches & Bands
              </p>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Apple Watch Series 9 — 41mm GPS
              </h3>
              <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-4 h-4 ${s <= 4 ? "fill-amber-400 text-amber-400" : "fill-muted text-muted-foreground"}`}
                  />
                ))}
                <span className="text-sm text-muted-foreground ml-1">
                  (2,847 ratings)
                </span>
              </div>
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-3xl font-bold text-foreground">
                  ₹35,999
                </span>
                <span className="text-lg text-muted-foreground line-through">
                  ₹59,999
                </span>
              </div>
              <p className="text-sm text-green-600 font-medium mb-4">
                You save ₹24,000 (40%)
              </p>
              <div className="flex gap-3 flex-wrap">
                <Button
                  className="bg-amber-400 hover:bg-amber-300 text-amber-900 font-bold"
                  data-ocid="featured_deal.add_to_cart_button"
                  onClick={() =>
                    toast.success("Apple Watch Series 9 added to cart!")
                  }
                >
                  <ShoppingCart className="w-4 h-4 mr-1.5" /> Add to Cart
                </Button>
                <Link to="/user/products">
                  <Button
                    variant="outline"
                    data-ocid="featured_deal.see_all_button"
                  >
                    See all deals
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8A. DEALS ON CHARGERS & CABLES */}
      <section className="bg-muted/20 py-8 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeading
            title="Deals on Chargers & Cables"
            viewAllLink="/user/products"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CHARGER_CABLE_DEALS.map((item, i) => (
              <DealCard key={item.id} {...item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* 8B. DEALS ON EARPHONES & HEADPHONES */}
      <section className="bg-white py-8 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeading
            title="Deals on Earphones & Headphones"
            viewAllLink="/user/products"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {EARPHONE_DEALS.map((item, i) => (
              <DealCard key={item.id} {...item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* 9. INSPIRED BY YOUR LISTS */}
      <section className="bg-muted/30 py-8 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeading
            title="Inspired by your Lists"
            viewAllLink="/user/products"
          />
          <ScrollRow>
            {INSPIRED_BY_LISTS.map((item, i) => (
              <MiniCard key={item.id} {...item} index={i} />
            ))}
          </ScrollRow>
        </div>
      </section>

      {/* BACKEND — recommended row if available */}
      {featuredFromBackend.length > 0 && (
        <section className="bg-white py-8 border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-4">
            <SectionHeading
              title="Recommended for You"
              viewAllLink="/user/products"
            />
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
              {featuredFromBackend.map((product, i) => (
                <motion.div
                  key={String(product.id)}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="flex-shrink-0"
                >
                  <Link
                    to="/user/products/$productId"
                    params={{ productId: String(product.id) }}
                  >
                    <div className="rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer p-3 min-w-[160px] w-[165px] border border-slate-100">
                      <div className="bg-indigo-500 rounded-md h-24 flex items-center justify-center mb-2">
                        <Package className="w-8 h-8 text-white/70" />
                      </div>
                      <p className="text-[10px] text-muted-foreground mb-0.5">
                        {product.category}
                      </p>
                      <p className="text-sm font-medium text-foreground line-clamp-2 min-h-[2.5rem] leading-tight">
                        {product.name}
                      </p>
                      <span className="text-sm font-bold text-foreground">
                        {inr(Math.round(product.price))}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── AMAZON-STYLE FOOTER ─────────────────────────────────────────────── */}
      <footer className="bg-[#131921] text-white">
        {/* Back to Top bar */}
        <button
          type="button"
          onClick={scrollToTop}
          className="w-full py-3 bg-[#232f3e] hover:bg-[#2d3e50] text-white text-sm font-medium transition-colors text-center block"
          data-ocid="footer.back_to_top_button"
        >
          Back to top
        </button>

        {/* 4-column footer links */}
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-white/10">
          <div>
            <h4 className="font-bold text-sm mb-3">Get to Know Us</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              {[
                "About MAW",
                "Careers",
                "Press Releases",
                "MAW Science",
                "Investor Relations",
              ].map((l) => (
                <li key={l}>
                  <button
                    type="button"
                    className="hover:text-white transition-colors"
                  >
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-3">Connect with Us</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              {[
                { label: "Facebook", url: "https://facebook.com" },
                { label: "Twitter", url: "https://x.com" },
                { label: "Instagram", url: "https://instagram.com" },
                { label: "YouTube", url: "https://youtube.com" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-3">Make Money with Us</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              {[
                "Sell on MAW",
                "Become an Affiliate",
                "Advertise Your Products",
                "Self-Publish with MAW",
              ].map((l) => (
                <li key={l}>
                  <a
                    href="/collaboration"
                    className="hover:text-white transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-3">Let Us Help You</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link
                  to="/user/profile"
                  className="hover:text-white transition-colors"
                >
                  Your Account
                </Link>
              </li>
              <li>
                <Link
                  to="/user/orders"
                  className="hover:text-white transition-colors"
                >
                  Your Orders
                </Link>
              </li>
              <li>
                <Link
                  to="/user/cart"
                  className="hover:text-white transition-colors"
                >
                  Your Cart
                </Link>
              </li>
              <li>
                <Link
                  to="/user/wishlist"
                  className="hover:text-white transition-colors"
                >
                  Your Wishlist
                </Link>
              </li>
              <li>
                <Link
                  to="/support"
                  className="hover:text-white transition-colors"
                >
                  Help &amp; Customer Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Logo + language/country row */}
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Package className="w-7 h-7 text-amber-400" />
            <span className="text-xl font-bold text-amber-400">MAW</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <button
              type="button"
              className="border border-white/30 rounded px-3 py-1.5 hover:bg-white/10 transition-colors text-slate-300"
            >
              🌐 English
            </button>
            <button
              type="button"
              className="border border-white/30 rounded px-3 py-1.5 hover:bg-white/10 transition-colors text-slate-300"
            >
              🇮🇳 India
            </button>
          </div>
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} MAW. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              className="text-amber-400 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              caffeine.ai
            </a>
          </p>
        </div>

        {/* Subsidiary brands row */}
        <div className="max-w-6xl mx-auto px-6 py-5">
          <p className="text-xs text-slate-500 text-center mb-3">
            Subsidiaries &amp; Partners
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400">
            {[
              "MAW Pay",
              "MAW Business",
              "MAW Logistics",
              "MAW Gift Cards",
              "MAW Business Accounts",
              "MAW Seller Hub",
              "MAW Returns",
              "MAW Affiliate",
            ].map((b) => (
              <button
                key={b}
                type="button"
                className="hover:text-slate-200 transition-colors"
              >
                {b}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-4">
            {[
              "Conditions of Use",
              "Privacy Notice",
              "Interest-Based Ads",
              "Cookie Preferences",
            ].map((l) => (
              <button
                key={l}
                type="button"
                className="hover:text-slate-300 transition-colors"
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </footer>

      {/* FLOATING SCROLL TO TOP BUTTON */}
      {scrollY > 300 && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          data-ocid="scroll_to_top_button"
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-amber-500 hover:bg-amber-400 text-white shadow-lg flex items-center justify-center text-xl font-bold transition-colors"
        >
          ↑
        </motion.button>
      )}
    </LightLayout>
  );
}
