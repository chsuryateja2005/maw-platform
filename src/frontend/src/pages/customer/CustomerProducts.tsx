import type { Product } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useProducts } from "@/hooks/useQueries";
import { LightLayout } from "@/layouts/LightLayout";
import { Link, useNavigate } from "@tanstack/react-router";
import { Filter, Package, Search, ShoppingCart, Star, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FilterSidebar } from "./FilterSidebar";

export interface Filters {
  search: string;
  sort: string;
  minRating: number;
  priceMin: number;
  priceMax: number;
  shoppingIdeas: string[];
  deliveryDays: (1 | 2)[];
  freeDelivery: boolean;
  deals: string[];
  brands: string[];
  colours: string[];
  connectivity: ("wired" | "wireless" | "bluetooth")[];
  compatibility: string[];
  minDiscount: number;
}

const DEFAULT_FILTERS: Filters = {
  search: "",
  sort: "featured",
  minRating: 0,
  priceMin: 0,
  priceMax: 70600,
  shoppingIdeas: [],
  deliveryDays: [],
  freeDelivery: false,
  deals: [],
  brands: [],
  colours: [],
  connectivity: [],
  compatibility: [],
  minDiscount: 0,
};

const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Company (A-Z)", value: "company" },
  { label: "Brand (A-Z)", value: "brand" },
  { label: "Category (A-Z)", value: "category" },
  { label: "Price: Low to High", value: "priceAsc" },
  { label: "Price: High to Low", value: "priceDesc" },
  { label: "Avg. Customer Review", value: "rating" },
  { label: "Newest Arrivals", value: "newest" },
  { label: "Best Sellers", value: "bestsellers" },
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

function countActiveFilters(f: Filters): number {
  let n = 0;
  if (f.search) n++;
  if (f.minRating > 0) n++;
  if (f.priceMin > 0 || f.priceMax < 70600) n++;
  if (f.shoppingIdeas.length) n += f.shoppingIdeas.length;
  if (f.deliveryDays.length) n += f.deliveryDays.length;
  if (f.freeDelivery) n++;
  if (f.deals.length) n += f.deals.length;
  if (f.brands.length) n += f.brands.length;
  if (f.colours.length) n += f.colours.length;
  if (f.connectivity.length) n += f.connectivity.length;
  if (f.compatibility.length) n += f.compatibility.length;
  if (f.minDiscount > 0) n++;
  return n;
}

function buildActivePills(
  f: Filters,
  onRemove: (key: keyof Filters, val?: string) => void,
): { label: string; onRemove: () => void; key: string }[] {
  const pills: { label: string; onRemove: () => void; key: string }[] = [];
  if (f.minRating > 0)
    pills.push({
      label: `${f.minRating}★ & Up`,
      key: "rating",
      onRemove: () => onRemove("minRating"),
    });
  if (f.priceMin > 0 || f.priceMax < 70600)
    pills.push({
      label: `₹${f.priceMin.toLocaleString()}–₹${f.priceMax.toLocaleString()}`,
      key: "price",
      onRemove: () => onRemove("priceMin"),
    });
  if (f.freeDelivery)
    pills.push({
      label: "Free Delivery",
      key: "free",
      onRemove: () => onRemove("freeDelivery"),
    });
  if (f.minDiscount > 0)
    pills.push({
      label: `${f.minDiscount}%+ Off`,
      key: "disc",
      onRemove: () => onRemove("minDiscount"),
    });
  for (const v of f.shoppingIdeas)
    pills.push({
      label: v,
      key: `idea-${v}`,
      onRemove: () => onRemove("shoppingIdeas", v),
    });
  for (const v of f.deliveryDays)
    pills.push({
      label: `Day ${v}`,
      key: `day-${v}`,
      onRemove: () => onRemove("deliveryDays", String(v)),
    });
  for (const v of f.deals)
    pills.push({
      label: v,
      key: `deal-${v}`,
      onRemove: () => onRemove("deals", v),
    });
  for (const v of f.brands)
    pills.push({
      label: v,
      key: `brand-${v}`,
      onRemove: () => onRemove("brands", v),
    });
  for (const v of f.colours)
    pills.push({
      label: v,
      key: `colour-${v}`,
      onRemove: () => onRemove("colours", v),
    });
  for (const v of f.connectivity)
    pills.push({
      label: v,
      key: `conn-${v}`,
      onRemove: () => onRemove("connectivity", v),
    });
  for (const v of f.compatibility)
    pills.push({
      label: v,
      key: `compat-${v}`,
      onRemove: () => onRemove("compatibility", v),
    });
  return pills;
}

function formatPrice(p: number) {
  return `₹${p.toLocaleString("en-IN")}`;
}

export default function CustomerProducts() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 24;
  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const sortBy =
    filters.sort === "featured" || filters.sort === "bestsellers"
      ? undefined
      : filters.sort;
  const { data: products, isLoading } = useProducts(
    undefined,
    filters.search || undefined,
    sortBy,
  );

  // Sync search param from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    if (q) setFilters((f) => ({ ...f, search: q }));
  }, []);

  const updateFilters = useCallback((partial: Partial<Filters>) => {
    setFilters((f) => ({ ...f, ...partial }));
    setPage(1);
    const params = new URLSearchParams(window.location.search);
    if (partial.search !== undefined) {
      if (partial.search) params.set("q", partial.search);
      else params.delete("q");
    }
    const newUrl = `${window.location.pathname}${
      params.toString() ? `?${params.toString()}` : ""
    }`;
    window.history.replaceState(null, "", newUrl);
  }, []);

  const clearAll = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
    window.history.replaceState(null, "", window.location.pathname);
  }, []);

  const removeFilter = useCallback((key: keyof Filters, val?: string) => {
    setFilters((f) => {
      if (key === "minRating") return { ...f, minRating: 0 };
      if (key === "priceMin") return { ...f, priceMin: 0, priceMax: 70600 };
      if (key === "freeDelivery") return { ...f, freeDelivery: false };
      if (key === "minDiscount") return { ...f, minDiscount: 0 };
      if (Array.isArray(f[key]) && val !== undefined) {
        return { ...f, [key]: (f[key] as string[]).filter((v) => v !== val) };
      }
      return f;
    });
    setPage(1);
  }, []);

  const filtered = useMemo((): Product[] => {
    let result = products ? [...products] : [];
    if (filters.minRating > 0)
      result = result.filter((p) => p.rating >= filters.minRating);
    if (filters.priceMin > 0)
      result = result.filter((p) => p.price >= filters.priceMin);
    if (filters.priceMax < 70600)
      result = result.filter((p) => p.price <= filters.priceMax);
    if (filters.brands.length)
      result = result.filter((p) => filters.brands.includes(p.brand));
    if (filters.minDiscount > 0)
      result = result.filter(
        (p) => Number(p.discountPercent) >= filters.minDiscount,
      );
    if (filters.sort === "bestsellers") {
      result = result.sort(
        (a, b) => Number(b.discountPercent) - Number(a.discountPercent),
      );
    }
    return result;
  }, [filters, products]);

  const paginated = filtered.slice(0, page * PAGE_SIZE);
  const activeCount = countActiveFilters({ ...filters, search: "" });
  const activePills = buildActivePills(filters, removeFilter);

  function handleAddToCart(p: Product) {
    if (!isAuthenticated) {
      navigate({ to: "/user/login" });
      return;
    }
    addItem(p, 1);
  }

  return (
    <LightLayout>
      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 py-4">
        {/* Search + Sort bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-4">
          <div className="flex items-center gap-2 flex-1 min-w-0 bg-card border border-border rounded-lg px-3 py-2.5 shadow-sm">
            <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <input
              type="text"
              placeholder="Search mobile accessories..."
              value={filters.search}
              onChange={(e) => updateFilters({ search: e.target.value })}
              data-ocid="products.search_input"
              className="flex-1 outline-none text-sm text-foreground placeholder:text-muted-foreground bg-transparent"
            />
            {filters.search && (
              <button
                type="button"
                onClick={() => updateFilters({ search: "" })}
              >
                <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          {/* Desktop sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar
              filters={filters}
              onFiltersChange={updateFilters}
              onClearAll={clearAll}
              activeCount={activeCount}
            />
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Sort + results bar */}
            <div className="flex flex-wrap items-center gap-3 mb-3">
              {/* Mobile filters button */}
              <button
                type="button"
                className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-card border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
                onClick={() => setSidebarOpen(true)}
                data-ocid="products.mobile_filters_button"
              >
                <Filter className="w-4 h-4" />
                Filters
                {activeCount > 0 && (
                  <span className="ml-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {activeCount}
                  </span>
                )}
              </button>

              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground font-medium">
                  Sort by:
                </span>
                <select
                  value={filters.sort}
                  onChange={(e) => updateFilters({ sort: e.target.value })}
                  data-ocid="products.sort.select"
                  className="outline-none text-sm text-foreground bg-card border border-border rounded px-2 py-1.5 cursor-pointer hover:border-primary transition-colors"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              {filters.sort !== "featured" && (
                <Badge
                  variant="outline"
                  className="cursor-pointer gap-1 text-xs hover:border-primary transition-colors"
                  onClick={() => updateFilters({ sort: "featured" })}
                  data-ocid="products.sort_clear.button"
                >
                  {SORT_OPTIONS.find((o) => o.value === filters.sort)?.label}
                  <X className="w-3 h-3" />
                </Badge>
              )}

              <span className="text-sm text-muted-foreground ml-auto">
                {paginated.length === 0
                  ? "No results"
                  : `1–${paginated.length} of ${filtered.length} results`}
              </span>
            </div>

            {/* Active filter pills */}
            {activePills.length > 0 && (
              <div
                className="flex flex-wrap gap-1.5 mb-3 pb-3 border-b border-border"
                data-ocid="products.active_filters"
              >
                {activePills.map((pill) => (
                  <Badge
                    key={pill.key}
                    variant="secondary"
                    className="cursor-pointer gap-1 text-xs pr-1 hover:bg-muted transition-colors"
                    onClick={pill.onRemove}
                  >
                    {pill.label}
                    <X className="w-3 h-3" />
                  </Badge>
                ))}
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-xs text-primary hover:underline px-1"
                  data-ocid="filter.clear_all_button"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Product grid */}
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
                {[
                  "s1",
                  "s2",
                  "s3",
                  "s4",
                  "s5",
                  "s6",
                  "s7",
                  "s8",
                  "s9",
                  "s10",
                  "s11",
                  "s12",
                ].map((sk) => (
                  <Card
                    key={sk}
                    className="overflow-hidden border-border h-full flex flex-col"
                  >
                    <Skeleton className="h-44 w-full" />
                    <div className="p-3 flex flex-col flex-1 gap-2">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-5 w-20" />
                      <Skeleton className="h-8 w-full mt-auto" />
                    </div>
                  </Card>
                ))}
              </div>
            ) : paginated.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center h-64 text-center"
                data-ocid="products.empty_state"
              >
                <Package className="w-12 h-12 text-muted-foreground mb-3" />
                <p className="text-foreground font-semibold">
                  No products found
                </p>
                <p className="text-muted-foreground text-sm mt-1">
                  Try adjusting your filters
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={clearAll}
                >
                  Clear all filters
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
                  {paginated.map((p, i) => (
                    <motion.div
                      key={p.id.toString()}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.22,
                        delay: Math.min(i, 8) * 0.04,
                      }}
                      whileHover={{ y: -2 }}
                      data-ocid={`products.item.${i + 1}`}
                    >
                      <Card className="overflow-hidden border-border hover:shadow-md transition-shadow h-full flex flex-col">
                        <Link
                          to="/user/products/$productId"
                          params={{ productId: String(p.id) }}
                          className="block relative"
                        >
                          <div className="h-44 bg-muted flex items-center justify-center relative overflow-hidden">
                            {p.imageUrl ? (
                              <img
                                src={p.imageUrl}
                                alt={p.name}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                                onError={(e) => {
                                  (
                                    e.currentTarget as HTMLImageElement
                                  ).style.display = "none";
                                }}
                              />
                            ) : (
                              <Package className="w-14 h-14 text-muted-foreground/50" />
                            )}
                            {Number(p.discountPercent) > 0 && (
                              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                                -{Number(p.discountPercent)}%
                              </div>
                            )}
                            {Number(p.stock) <= 5 && Number(p.stock) > 0 && (
                              <Badge className="absolute top-2 right-2 text-xs bg-amber-100 text-amber-700 border-amber-200">
                                Low Stock
                              </Badge>
                            )}
                            {Number(p.stock) === 0 && (
                              <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
                                <Badge variant="outline" className="text-xs">
                                  Out of Stock
                                </Badge>
                              </div>
                            )}
                          </div>
                        </Link>
                        <div className="p-3 flex flex-col flex-1">
                          <p className="text-xs text-primary font-medium">
                            {p.brand}
                          </p>
                          <Link
                            to="/user/products/$productId"
                            params={{ productId: String(p.id) }}
                          >
                            <p className="text-sm font-medium text-foreground mt-0.5 line-clamp-2 hover:text-primary transition-colors leading-tight">
                              {p.name}
                            </p>
                          </Link>
                          <p className="text-[11px] text-muted-foreground mt-0.5">
                            {p.company}
                          </p>
                          <div className="flex items-center gap-1 mt-1.5">
                            <StarRating rating={p.rating} />
                            <span className="text-xs text-amber-600 font-medium">
                              {p.rating.toFixed(1)}
                            </span>
                          </div>
                          <div className="flex items-baseline gap-1.5 mt-1.5">
                            <span className="text-base font-bold text-foreground">
                              {formatPrice(p.price)}
                            </span>
                            {p.originalPrice > p.price && (
                              <span className="text-xs text-muted-foreground line-through">
                                {formatPrice(p.originalPrice)}
                              </span>
                            )}
                          </div>
                          <div className="mt-auto pt-2">
                            <Button
                              size="sm"
                              className="w-full text-xs h-8"
                              disabled={Number(p.stock) === 0}
                              data-ocid={`products.add_to_cart.${i + 1}`}
                              onClick={() => handleAddToCart(p)}
                            >
                              <ShoppingCart className="w-3.5 h-3.5 mr-1" />
                              {isAuthenticated
                                ? "Add to Cart"
                                : "Sign in to Add"}
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                {page * PAGE_SIZE < filtered.length && (
                  <div className="flex justify-center mt-6">
                    <Button
                      variant="outline"
                      onClick={() => setPage((p) => p + 1)}
                      data-ocid="products.load_more.button"
                    >
                      Load more products
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed inset-y-0 left-0 w-80 max-w-[90vw] bg-background z-50 overflow-y-auto shadow-xl lg:hidden"
              data-ocid="products.filter_drawer"
            >
              <div className="flex items-center justify-between p-4 border-b border-border sticky top-0 bg-background">
                <h2 className="font-semibold text-foreground">Filters</h2>
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 rounded hover:bg-muted"
                  data-ocid="products.filter_drawer.close_button"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-3">
                <FilterSidebar
                  filters={filters}
                  onFiltersChange={(partial) => {
                    updateFilters(partial);
                  }}
                  onClearAll={() => {
                    clearAll();
                    setSidebarOpen(false);
                  }}
                  activeCount={activeCount}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </LightLayout>
  );
}
