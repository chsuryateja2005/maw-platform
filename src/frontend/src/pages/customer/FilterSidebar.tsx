import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, ChevronUp, Star, X } from "lucide-react";
import { useState } from "react";
import type { Filters } from "./CustomerProducts";
import {
  BRANDS,
  COLOUR_SWATCHES,
  COMPATIBILITY_OPTIONS,
  DISCOUNT_TIERS,
  SHOPPING_IDEAS,
} from "./mockProducts";

interface FilterSidebarProps {
  filters: Filters;
  onFiltersChange: (f: Partial<Filters>) => void;
  onClearAll: () => void;
  activeCount: number;
}

function AccordionSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border pb-3 mb-3">
      <button
        type="button"
        className="flex items-center justify-between w-full py-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
        onClick={() => setOpen((o) => !o)}
      >
        {title}
        {open ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>
      {open && <div className="mt-2">{children}</div>}
    </div>
  );
}

function StarRow({
  stars,
  selected,
  onClick,
}: { stars: number; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-1 w-full py-1.5 px-1 rounded text-sm transition-colors ${
        selected
          ? "text-amber-600 bg-amber-50"
          : "text-foreground hover:text-amber-600"
      }`}
    >
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-3.5 h-3.5 ${
            s <= stars
              ? "fill-amber-400 text-amber-400"
              : "fill-muted text-muted-foreground"
          }`}
        />
      ))}
      <span className="ml-0.5 text-xs text-muted-foreground">&amp; Up</span>
    </button>
  );
}

export function FilterSidebar({
  filters,
  onFiltersChange,
  onClearAll,
  activeCount,
}: FilterSidebarProps) {
  const [showMoreBrands, setShowMoreBrands] = useState(false);
  const [showMoreIdeas, setShowMoreIdeas] = useState(false);
  const [showMoreCompat, setShowMoreCompat] = useState(false);
  const [sliderMin, setSliderMin] = useState(filters.priceMin ?? 0);
  const [sliderMax, setSliderMax] = useState(filters.priceMax ?? 70600);

  const toggleSet = <T,>(set: T[], val: T): T[] =>
    set.includes(val) ? set.filter((v) => v !== val) : [...set, val];

  const visibleBrands = showMoreBrands ? BRANDS : BRANDS.slice(0, 5);
  const visibleIdeas = showMoreIdeas
    ? SHOPPING_IDEAS
    : SHOPPING_IDEAS.slice(0, 7);
  const visibleCompat = showMoreCompat
    ? COMPATIBILITY_OPTIONS
    : COMPATIBILITY_OPTIONS.slice(0, 4);

  const PRICE_BUCKETS = [
    { label: "Under ₹300", min: 0, max: 300 },
    { label: "₹300 to ₹450", min: 300, max: 450 },
    { label: "₹450 to ₹600", min: 450, max: 600 },
    { label: "₹600 to ₹800", min: 600, max: 800 },
    { label: "₹800 and above", min: 800, max: 70600 },
  ];

  return (
    <aside
      className="w-full lg:w-[260px] flex-shrink-0"
      data-ocid="products.filter_sidebar"
    >
      <div className="bg-card rounded-lg border border-border p-4 sticky top-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-foreground text-sm">Filters</h2>
          {activeCount > 0 && (
            <button
              type="button"
              onClick={onClearAll}
              className="text-xs text-primary hover:underline"
              data-ocid="filter.clear_all_button"
            >
              Clear All ({activeCount})
            </button>
          )}
        </div>

        {/* Popular Shopping Ideas */}
        <AccordionSection title="Popular Shopping Ideas">
          <div className="flex flex-wrap gap-1.5">
            {visibleIdeas.map((idea) => {
              const active = filters.shoppingIdeas.includes(idea);
              return (
                <Badge
                  key={idea}
                  variant={active ? "default" : "outline"}
                  className={`cursor-pointer text-xs transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "hover:border-primary hover:text-primary"
                  }`}
                  onClick={() =>
                    onFiltersChange({
                      shoppingIdeas: toggleSet(filters.shoppingIdeas, idea),
                    })
                  }
                  data-ocid={`filter.idea.${idea.toLowerCase().replace(/\s+/g, "-")}.toggle`}
                >
                  {idea}
                </Badge>
              );
            })}
          </div>
          <button
            type="button"
            className="text-xs text-primary mt-2 hover:underline"
            onClick={() => setShowMoreIdeas((v) => !v)}
          >
            {showMoreIdeas
              ? "Show less"
              : `See more +${SHOPPING_IDEAS.length - 7} more`}
          </button>
        </AccordionSection>

        {/* Delivery Day */}
        <AccordionSection title="Delivery Day">
          <div className="space-y-2">
            {[
              { label: "Get It by Tomorrow", days: 1 },
              { label: "Get It in 2 Days", days: 2 },
            ].map((opt) => (
              <label
                key={opt.days}
                htmlFor={`delivery-day-${opt.days}`}
                className="flex items-center gap-2 cursor-pointer"
                data-ocid={`filter.delivery.${opt.days}.checkbox`}
              >
                <Checkbox
                  id={`delivery-day-${opt.days}`}
                  checked={filters.deliveryDays.includes(opt.days as 1 | 2)}
                  onCheckedChange={() =>
                    onFiltersChange({
                      deliveryDays: toggleSet(
                        filters.deliveryDays,
                        opt.days as 1 | 2,
                      ),
                    })
                  }
                />
                <span className="text-sm text-foreground">{opt.label}</span>
              </label>
            ))}
          </div>
        </AccordionSection>

        {/* Free Delivery */}
        <div className="border-b border-border pb-3 mb-3">
          <label
            htmlFor="filter-free-delivery"
            className="flex items-start gap-2 cursor-pointer"
            data-ocid="filter.free_delivery.checkbox"
          >
            <Checkbox
              id="filter-free-delivery"
              checked={filters.freeDelivery}
              onCheckedChange={(v) => onFiltersChange({ freeDelivery: !!v })}
              className="mt-0.5"
            />
            <div>
              <span className="text-sm font-medium text-foreground">
                Eligible for Free Delivery
              </span>
              <p className="text-xs text-muted-foreground mt-0.5">
                FREE Delivery on orders over ₹499
              </p>
            </div>
          </label>
        </div>

        {/* Customer Reviews */}
        <AccordionSection title="Customer Reviews">
          <div className="space-y-0.5">
            {[4, 3, 2].map((r) => (
              <StarRow
                key={r}
                stars={r}
                selected={filters.minRating === r}
                onClick={() =>
                  onFiltersChange({
                    minRating: filters.minRating === r ? 0 : r,
                  })
                }
              />
            ))}
          </div>
        </AccordionSection>

        {/* Price Range */}
        <AccordionSection title="Price">
          <div className="space-y-3">
            <div className="px-1">
              <div className="flex justify-between text-xs text-muted-foreground mb-2">
                <span>₹{sliderMin.toLocaleString()}</span>
                <span>₹{sliderMax.toLocaleString()}</span>
              </div>
              <div className="relative h-2 bg-muted rounded-full">
                <div
                  className="absolute h-2 bg-primary rounded-full"
                  style={{
                    left: `${(sliderMin / 70600) * 100}%`,
                    right: `${100 - (sliderMax / 70600) * 100}%`,
                  }}
                />
                <input
                  type="range"
                  min={0}
                  max={70600}
                  step={100}
                  value={sliderMin}
                  onChange={(e) =>
                    setSliderMin(
                      Math.min(Number(e.target.value), sliderMax - 100),
                    )
                  }
                  className="absolute w-full h-2 opacity-0 cursor-pointer"
                  data-ocid="filter.price_slider_min.input"
                />
                <input
                  type="range"
                  min={0}
                  max={70600}
                  step={100}
                  value={sliderMax}
                  onChange={(e) =>
                    setSliderMax(
                      Math.max(Number(e.target.value), sliderMin + 100),
                    )
                  }
                  className="absolute w-full h-2 opacity-0 cursor-pointer"
                  data-ocid="filter.price_slider_max.input"
                />
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="w-full text-xs"
              onClick={() =>
                onFiltersChange({ priceMin: sliderMin, priceMax: sliderMax })
              }
              data-ocid="filter.price_apply.button"
            >
              Apply
            </Button>
            <Separator />
            <div className="space-y-1">
              {PRICE_BUCKETS.map((b) => (
                <button
                  key={b.label}
                  type="button"
                  onClick={() => {
                    onFiltersChange({ priceMin: b.min, priceMax: b.max });
                    setSliderMin(b.min);
                    setSliderMax(b.max);
                  }}
                  className={`w-full text-left text-xs px-1 py-1 rounded transition-colors ${
                    filters.priceMin === b.min && filters.priceMax === b.max
                      ? "text-primary font-medium"
                      : "text-primary hover:underline"
                  }`}
                  data-ocid="filter.price_bucket.button"
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        </AccordionSection>

        {/* Deals & Discounts */}
        <AccordionSection title="Deals &amp; Discounts">
          <div className="space-y-2">
            {[
              { label: "All Discounts", val: "all" },
              { label: "Buy More Save More", val: "bundle" },
              { label: "Coupons", val: "coupon" },
              { label: "Today's Deals", val: "today" },
            ].map((d) => (
              <label
                key={d.val}
                htmlFor={`filter-deal-${d.val}`}
                className="flex items-center gap-2 cursor-pointer"
                data-ocid={`filter.deal.${d.val}.checkbox`}
              >
                <Checkbox
                  id={`filter-deal-${d.val}`}
                  checked={filters.deals.includes(d.val)}
                  onCheckedChange={() =>
                    onFiltersChange({ deals: toggleSet(filters.deals, d.val) })
                  }
                />
                <span className="text-sm text-foreground">{d.label}</span>
              </label>
            ))}
          </div>
        </AccordionSection>

        {/* Brands */}
        <AccordionSection title="Brand">
          <div className="space-y-2">
            {visibleBrands.map((brand) => (
              <label
                key={brand}
                htmlFor={`filter-brand-${brand.toLowerCase()}`}
                className="flex items-center gap-2 cursor-pointer"
                data-ocid={`filter.brand.${brand.toLowerCase()}.checkbox`}
              >
                <Checkbox
                  id={`filter-brand-${brand.toLowerCase()}`}
                  checked={filters.brands.includes(brand)}
                  onCheckedChange={() =>
                    onFiltersChange({
                      brands: toggleSet(filters.brands, brand),
                    })
                  }
                />
                <span className="text-sm text-foreground">{brand}</span>
              </label>
            ))}
          </div>
          <button
            type="button"
            className="text-xs text-primary mt-2 hover:underline"
            onClick={() => setShowMoreBrands((v) => !v)}
          >
            {showMoreBrands
              ? "See less"
              : `See more +${BRANDS.length - 5} more`}
          </button>
        </AccordionSection>

        {/* Colour */}
        <AccordionSection title="Colour">
          <div className="grid grid-cols-6 gap-2">
            {COLOUR_SWATCHES.map((c) => {
              const active = filters.colours.includes(c.name);
              return (
                <button
                  key={c.name}
                  type="button"
                  title={c.name}
                  onClick={() =>
                    onFiltersChange({
                      colours: toggleSet(filters.colours, c.name),
                    })
                  }
                  data-ocid={`filter.colour.${c.name.toLowerCase()}.toggle`}
                  className={`w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 ${
                    active
                      ? "border-primary ring-2 ring-primary ring-offset-1"
                      : "border-transparent hover:border-border"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              );
            })}
          </div>
          {filters.colours.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {filters.colours.map((c) => (
                <Badge key={c} variant="outline" className="text-xs gap-1 pr-1">
                  {c}
                  <button
                    type="button"
                    onClick={() =>
                      onFiltersChange({
                        colours: filters.colours.filter((x) => x !== c),
                      })
                    }
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </AccordionSection>

        {/* Connectivity */}
        <AccordionSection title="Connectivity">
          <div className="space-y-2">
            {["Wired", "Wireless", "Bluetooth"].map((conn) => (
              <label
                key={conn}
                htmlFor={`filter-conn-${conn.toLowerCase()}`}
                className="flex items-center gap-2 cursor-pointer"
                data-ocid={`filter.connectivity.${conn.toLowerCase()}.checkbox`}
              >
                <Checkbox
                  id={`filter-conn-${conn.toLowerCase()}`}
                  checked={filters.connectivity.includes(
                    conn.toLowerCase() as "wired" | "wireless" | "bluetooth",
                  )}
                  onCheckedChange={() =>
                    onFiltersChange({
                      connectivity: toggleSet(
                        filters.connectivity,
                        conn.toLowerCase() as
                          | "wired"
                          | "wireless"
                          | "bluetooth",
                      ),
                    })
                  }
                />
                <span className="text-sm text-foreground">{conn}</span>
              </label>
            ))}
          </div>
        </AccordionSection>

        {/* Compatibility */}
        <AccordionSection title="Compatibility">
          <div className="space-y-2">
            {visibleCompat.map((comp) => (
              <label
                key={comp}
                htmlFor={`filter-compat-${comp.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                className="flex items-center gap-2 cursor-pointer"
                data-ocid={`filter.compat.${comp.toLowerCase().replace(/[^a-z0-9]/g, "-")}.checkbox`}
              >
                <Checkbox
                  id={`filter-compat-${comp.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                  checked={filters.compatibility.includes(comp)}
                  onCheckedChange={() =>
                    onFiltersChange({
                      compatibility: toggleSet(filters.compatibility, comp),
                    })
                  }
                />
                <span className="text-sm text-foreground">{comp}</span>
              </label>
            ))}
          </div>
          <button
            type="button"
            className="text-xs text-primary mt-2 hover:underline"
            onClick={() => setShowMoreCompat((v) => !v)}
          >
            {showMoreCompat
              ? "See less"
              : `See more +${COMPATIBILITY_OPTIONS.length - 4} more`}
          </button>
        </AccordionSection>

        {/* Discount */}
        <AccordionSection title="Discount" defaultOpen={false}>
          <div className="space-y-2">
            {DISCOUNT_TIERS.map((tier) => (
              <label
                key={tier}
                htmlFor={`filter-discount-${tier}`}
                className="flex items-center gap-2 cursor-pointer"
                data-ocid={`filter.discount.${tier}.checkbox`}
              >
                <Checkbox
                  id={`filter-discount-${tier}`}
                  checked={filters.minDiscount === tier}
                  onCheckedChange={() =>
                    onFiltersChange({
                      minDiscount: filters.minDiscount === tier ? 0 : tier,
                    })
                  }
                />
                <span className="text-sm text-foreground">
                  {tier}% Off or more
                </span>
              </label>
            ))}
          </div>
        </AccordionSection>
      </div>
    </aside>
  );
}
