import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { LightLayout } from "@/layouts/LightLayout";
import {
  ChevronDown,
  Package,
  Search,
  SlidersHorizontal,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const ALL_PRODUCTS = [
  {
    id: "p-001",
    name: "MagSafe Leather Case",
    brand: "CasePro",
    category: "Phone Cases",
    price: 34.99,
    mrp: 49.99,
    rating: 4.8,
    reviews: 512,
    stock: "In Stock",
    badge: "Hot",
    color: "from-indigo-400 to-violet-500",
  },
  {
    id: "p-002",
    name: "Tempered Glass Shield Pro",
    brand: "ShieldTech",
    category: "Screen Protectors",
    price: 14.99,
    mrp: 24.99,
    rating: 4.7,
    reviews: 890,
    stock: "In Stock",
    badge: "Sale",
    color: "from-blue-400 to-cyan-500",
  },
  {
    id: "p-003",
    name: "GaN 65W Fast Charger",
    brand: "PowerMax",
    category: "Chargers",
    price: 29.99,
    mrp: 39.99,
    rating: 4.9,
    reviews: 1204,
    stock: "In Stock",
    badge: "New",
    color: "from-amber-400 to-orange-500",
  },
  {
    id: "p-004",
    name: "Braided USB-C Cable 2m",
    brand: "ConnectPro",
    category: "Cables",
    price: 11.99,
    mrp: 17.99,
    rating: 4.6,
    reviews: 2310,
    stock: "Low Stock",
    badge: "Sale",
    color: "from-teal-400 to-green-500",
  },
  {
    id: "p-005",
    name: "25000mAh Solar Power Bank",
    brand: "EnergyX",
    category: "Power Banks",
    price: 54.99,
    mrp: 79.99,
    rating: 4.7,
    reviews: 340,
    stock: "In Stock",
    badge: "New",
    color: "from-emerald-400 to-teal-500",
  },
  {
    id: "p-006",
    name: "ANC Wireless Earbuds Pro",
    brand: "SoundWave",
    category: "Audio",
    price: 79.99,
    mrp: 119.99,
    rating: 4.8,
    reviews: 756,
    stock: "In Stock",
    badge: "Hot",
    color: "from-pink-400 to-rose-500",
  },
  {
    id: "p-007",
    name: "Clear Shockproof Case",
    brand: "CasePro",
    category: "Phone Cases",
    price: 9.99,
    mrp: 14.99,
    rating: 4.5,
    reviews: 1890,
    stock: "In Stock",
    badge: "Sale",
    color: "from-purple-400 to-indigo-500",
  },
  {
    id: "p-008",
    name: "MagSafe Wireless Charger Pad",
    brand: "PowerMax",
    category: "Chargers",
    price: 24.99,
    mrp: 34.99,
    rating: 4.6,
    reviews: 628,
    stock: "In Stock",
    badge: "New",
    color: "from-violet-400 to-purple-500",
  },
  {
    id: "p-009",
    name: "Privacy Screen Protector",
    brand: "ShieldTech",
    category: "Screen Protectors",
    price: 18.99,
    mrp: 29.99,
    rating: 4.4,
    reviews: 445,
    stock: "In Stock",
    badge: "New",
    color: "from-slate-400 to-blue-500",
  },
  {
    id: "p-010",
    name: "20W USB-C Power Adapter",
    brand: "PowerMax",
    category: "Chargers",
    price: 19.99,
    mrp: 27.99,
    rating: 4.7,
    reviews: 1100,
    stock: "In Stock",
    badge: "Sale",
    color: "from-yellow-400 to-amber-500",
  },
  {
    id: "p-011",
    name: "Over-Ear Studio Headphones",
    brand: "SoundWave",
    category: "Audio",
    price: 129.99,
    mrp: 189.99,
    rating: 4.9,
    reviews: 289,
    stock: "In Stock",
    badge: "Hot",
    color: "from-fuchsia-400 to-pink-500",
  },
  {
    id: "p-012",
    name: "Slim Braided Lightning Cable",
    brand: "ConnectPro",
    category: "Cables",
    price: 13.99,
    mrp: 21.99,
    rating: 4.5,
    reviews: 1780,
    stock: "In Stock",
    badge: "New",
    color: "from-cyan-400 to-teal-500",
  },
];

const CATEGORIES = [
  "Phone Cases",
  "Chargers",
  "Cables",
  "Audio",
  "Power Banks",
  "Screen Protectors",
];
const BRANDS = [
  "CasePro",
  "ShieldTech",
  "PowerMax",
  "ConnectPro",
  "EnergyX",
  "SoundWave",
];
const SORT_OPTIONS = [
  "Relevance",
  "Price: Low to High",
  "Price: High to Low",
  "Newest",
  "Rating",
];

const BADGE_STYLE: Record<string, string> = {
  Hot: "bg-rose-100 text-rose-700 border-rose-200",
  Sale: "bg-orange-100 text-orange-700 border-orange-200",
  New: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

const STOCK_STYLE: Record<string, string> = {
  "In Stock": "bg-emerald-100 text-emerald-700",
  "Low Stock": "bg-amber-100 text-amber-700",
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

export default function CustomerProducts() {
  const [search, setSearch] = useState("");
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState("Relevance");

  const toggleCat = (c: string) =>
    setSelectedCats((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c],
    );
  const toggleBrand = (b: string) =>
    setSelectedBrands((prev) =>
      prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b],
    );

  const filtered = ALL_PRODUCTS.filter((p) => {
    if (
      search &&
      !p.name.toLowerCase().includes(search.toLowerCase()) &&
      !p.brand.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    if (selectedCats.length && !selectedCats.includes(p.category)) return false;
    if (selectedBrands.length && !selectedBrands.includes(p.brand))
      return false;
    if (minPrice && p.price < Number(minPrice)) return false;
    if (maxPrice && p.price > Number(maxPrice)) return false;
    if (minRating && p.rating < minRating) return false;
    return true;
  }).sort((a, b) => {
    if (sort === "Price: Low to High") return a.price - b.price;
    if (sort === "Price: High to Low") return b.price - a.price;
    if (sort === "Rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <LightLayout cartCount={3}>
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Search + Sort Row */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <div className="flex items-center gap-2 flex-1 min-w-0 bg-white border border-border rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <input
              type="text"
              placeholder="Search products or brands..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-ocid="products.search_input"
              className="flex-1 outline-none text-sm text-foreground placeholder:text-muted-foreground bg-transparent"
            />
          </div>
          <div className="flex items-center gap-2 bg-white border border-border rounded-lg px-3 py-2">
            <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              data-ocid="products.sort.select"
              className="outline-none text-sm text-foreground bg-transparent"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 text-muted-foreground" />
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <aside className="w-56 flex-shrink-0 space-y-6">
            <Card className="p-4 border-border">
              <h3 className="text-sm font-bold text-foreground mb-3">
                Categories
              </h3>
              <div className="space-y-2">
                {CATEGORIES.map((c) => (
                  <div key={c} className="flex items-center gap-2">
                    <Checkbox
                      id={`cat-${c}`}
                      checked={selectedCats.includes(c)}
                      onCheckedChange={() => toggleCat(c)}
                      data-ocid={`filter.cat.${c.toLowerCase().replace(/\s+/g, "-")}.checkbox`}
                    />
                    <Label
                      htmlFor={`cat-${c}`}
                      className="text-sm text-foreground cursor-pointer"
                    >
                      {c}
                    </Label>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4 border-border">
              <h3 className="text-sm font-bold text-foreground mb-3">
                Price Range
              </h3>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  data-ocid="filter.price_min.input"
                  className="w-full border border-border rounded-md px-2 py-1.5 text-xs outline-none focus:border-primary bg-background"
                />
                <span className="text-muted-foreground">—</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  data-ocid="filter.price_max.input"
                  className="w-full border border-border rounded-md px-2 py-1.5 text-xs outline-none focus:border-primary bg-background"
                />
              </div>
            </Card>

            <Card className="p-4 border-border">
              <h3 className="text-sm font-bold text-foreground mb-3">
                Min Rating
              </h3>
              <div className="space-y-2">
                {[4, 3, 2].map((r) => (
                  <button
                    key={`rating-${r}`}
                    type="button"
                    onClick={() => setMinRating(minRating === r ? 0 : r)}
                    data-ocid={`filter.rating.${r}.toggle`}
                    className={`flex items-center gap-1.5 w-full px-2 py-1 rounded-md text-xs transition-colors ${
                      minRating === r
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    {r}+ stars
                  </button>
                ))}
              </div>
            </Card>

            <Card className="p-4 border-border">
              <h3 className="text-sm font-bold text-foreground mb-3">Brands</h3>
              <div className="space-y-2">
                {BRANDS.map((b) => (
                  <div key={b} className="flex items-center gap-2">
                    <Checkbox
                      id={`brand-${b}`}
                      checked={selectedBrands.includes(b)}
                      onCheckedChange={() => toggleBrand(b)}
                      data-ocid={`filter.brand.${b.toLowerCase()}.checkbox`}
                    />
                    <Label
                      htmlFor={`brand-${b}`}
                      className="text-sm text-foreground cursor-pointer"
                    >
                      {b}
                    </Label>
                  </div>
                ))}
              </div>
            </Card>
          </aside>

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground mb-4">
              {filtered.length} products found
            </p>
            {filtered.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center h-64 text-center"
                data-ocid="products.empty_state"
              >
                <Package className="w-12 h-12 text-muted-foreground mb-3" />
                <p className="text-foreground font-semibold">
                  No products found
                </p>
                <p className="text-muted-foreground text-sm">
                  Try adjusting your filters
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.04 }}
                    whileHover={{ y: -3 }}
                    data-ocid={`products.item.${i + 1}`}
                  >
                    <Card className="overflow-hidden border-border hover:shadow-lg transition-shadow">
                      <div
                        className={`h-40 bg-gradient-to-br ${p.color} flex items-center justify-center relative`}
                      >
                        <Package className="w-14 h-14 text-white/80" />
                        <Badge
                          className={`absolute top-2 left-2 text-xs border ${BADGE_STYLE[p.badge]}`}
                        >
                          {p.badge}
                        </Badge>
                        <Badge
                          className={`absolute top-2 right-2 text-xs ${STOCK_STYLE[p.stock]}`}
                        >
                          {p.stock}
                        </Badge>
                      </div>
                      <div className="p-3">
                        <p className="text-xs text-muted-foreground">
                          {p.brand}
                        </p>
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
                          <span className="text-base font-bold text-foreground">
                            ${p.price}
                          </span>
                          <span className="text-xs text-muted-foreground line-through">
                            ${p.mrp}
                          </span>
                          <span className="text-xs text-emerald-600 font-medium">
                            {Math.round((1 - p.price / p.mrp) * 100)}% off
                          </span>
                        </div>
                        <Button
                          size="sm"
                          className="w-full mt-2 text-xs"
                          data-ocid={`products.${p.id}.add_to_cart_button`}
                          onClick={() =>
                            toast.success(`${p.name} added to cart!`)
                          }
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </LightLayout>
  );
}
