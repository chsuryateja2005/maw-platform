import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  ChevronDown,
  Package,
  Search,
  ShoppingCart,
  Truck,
  User,
} from "lucide-react";
import { useState } from "react";

interface LightLayoutProps {
  children: React.ReactNode;
  cartCount?: number;
}

const NAV_LINKS = [
  { label: "Home", href: "/user" },
  { label: "Products", href: "/user/products" },
  { label: "Orders", href: "/user/orders" },
  { label: "Wishlist", href: "/user/wishlist" },
];

export function LightLayout({ children, cartCount = 0 }: LightLayoutProps) {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const router = useRouterState();
  const pathname = router.location.pathname;

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      {/* Topbar */}
      <header className="sticky top-0 z-40 bg-white border-b border-border shadow-sm">
        {/* Upper topbar */}
        <div className="flex items-center gap-4 px-6 py-3">
          {/* Logo */}
          <Link to="/user" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500">
              <Package className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="font-bold text-lg font-display text-foreground">
              MAW
            </span>
            <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded font-medium">
              Marketplace
            </span>
          </Link>

          {/* Search */}
          <div
            className={cn(
              "flex-1 max-w-xl relative transition-all duration-200",
              searchFocused ? "max-w-2xl" : "",
            )}
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products, brands, categories..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              data-ocid="topbar.search_input"
              className="w-full pl-9 pr-4 py-2 text-sm bg-muted/60 border border-border rounded-lg outline-none focus:border-primary focus:bg-white transition-colors placeholder:text-muted-foreground"
            />
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link
              to="/user/track"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1.5 rounded-md hover:bg-muted"
              data-ocid="topbar.track.link"
            >
              <Truck className="w-4 h-4" />
              Track Order
            </Link>

            <Link
              to="/user/cart"
              className="relative p-2 rounded-lg hover:bg-muted transition-colors"
              data-ocid="topbar.cart.link"
            >
              <ShoppingCart className="w-5 h-5 text-muted-foreground" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground rounded-full text-[10px] font-bold flex items-center justify-center">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-muted transition-colors text-sm text-muted-foreground"
              data-ocid="topbar.user.button"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:block">Account</span>
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Bottom nav */}
        <nav className="flex items-center gap-1 px-6 py-1.5 border-t border-border/50">
          {NAV_LINKS.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/user" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                to={link.href}
                data-ocid={`nav.${link.label.toLowerCase()}.link`}
                className={cn(
                  "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "text-primary bg-primary/8"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </header>

      {/* Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-white border-t border-border py-6 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <Link
              to="/user"
              className="hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              to="/user/products"
              className="hover:text-foreground transition-colors"
            >
              Products
            </Link>
            <Link
              to="/support"
              className="hover:text-foreground transition-colors"
            >
              Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
