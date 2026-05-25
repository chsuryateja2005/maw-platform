import { SupportChatBubble } from "@/components/SupportChatBubble";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ChevronDown,
  ChevronUp,
  Globe,
  MapPin,
  Menu,
  Package,
  RotateCcw,
  Search,
  ShoppingCart,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";

interface LightLayoutProps {
  children: React.ReactNode;
}

const NAV_ITEMS = [
  { label: "≡ All", href: "/user/products" },
  { label: "Sell", href: "/collaboration" },
  { label: "MAW Pay", href: "/user/products?category=Pay" },
  { label: "Gift Cards", href: "/user/products?category=Gift" },
  { label: "Today's Deals", href: "/user/products?sort=deals" },
  { label: "Phone Cases", href: "/user/products?category=PhoneCases" },
  { label: "Chargers & Cables", href: "/user/products?category=Chargers" },
  { label: "Earphones", href: "/user/products?category=Audio" },
  { label: "Smartwatches", href: "/user/products?category=Smartwatches" },
  { label: "Power Banks", href: "/user/products?category=PowerBanks" },
  { label: "More...", href: "/user/products" },
];

const CATEGORIES = [
  "All",
  "Phone Cases",
  "Screen Protectors",
  "Chargers",
  "Cables",
  "Power Banks",
  "Audio",
  "Smartwatches",
  "Gaming",
  "Camera Accessories",
];

const FOOTER_COL1 = [
  { label: "About MAW", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Press Releases", href: "#" },
  { label: "MAW Science", href: "#" },
];

const FOOTER_COL3 = [
  { label: "Sell on MAW", href: "/collaboration" },
  { label: "Sell under MAW Accelerator", href: "/collaboration" },
  { label: "Protect and Build Your Brand", href: "#" },
  { label: "MAW Global Selling", href: "#" },
  { label: "Supply to MAW", href: "#" },
  { label: "Become an Affiliate", href: "#" },
  { label: "Fulfilment by MAW", href: "#" },
  { label: "Advertise Your Products", href: "#" },
  { label: "MAW Pay on Merchants", href: "#" },
];

const FOOTER_COL4 = [
  { label: "Your Account", href: "/user/profile" },
  { label: "Returns Centre", href: "/user/orders" },
  { label: "Recalls and Product Safety Alerts", href: "#" },
  { label: "100% Purchase Protection", href: "#" },
  { label: "MAW App Download", href: "#" },
  { label: "Help", href: "#support" },
];

const SUBSIDIARY_BRANDS = [
  { name: "ShopLocal", tagline: "Local fashion brands" },
  { name: "MAW Web Services", tagline: "Scalable Cloud Computing" },
  { name: "ListenBooks", tagline: "Download Audio Books" },
  { name: "MAW Movies", tagline: "Movies, TV & Celebrities" },
  { name: "StyleHub", tagline: "Designer Fashion Brands" },
  { name: "MAW Business", tagline: "Everything For Your Business" },
  { name: "MAW Prime Music", tagline: "100 million songs, ad-free" },
];

export function LightLayout({ children }: LightLayoutProps) {
  const [searchVal, setSearchVal] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [locationText, setLocationText] = useState("Select location");
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { isAuthenticated, principal, login, logout } = useAuth();
  const categoryRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  // Scroll listener for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(e.target as Node)
      ) {
        setCategoryOpen(false);
      }
      if (
        accountRef.current &&
        !accountRef.current.contains(e.target as Node)
      ) {
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Load saved delivery address
  useEffect(() => {
    const saved = localStorage.getItem("maw_delivery_address");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as { line1?: string };
        if (parsed.line1) setLocationText(parsed.line1);
      } catch {
        /* ignore */
      }
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate({ to: "/user/products" } as Parameters<typeof navigate>[0]);
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const displayName =
    isAuthenticated && principal ? `${principal.slice(0, 8)}...` : null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* ═══════════════════════════════ HEADER ═══════════════════════════════ */}
      <header className="sticky top-0 z-40 w-full">
        {/* Top bar — very dark */}
        <div
          style={{ backgroundColor: "#0f1923" }}
          className="flex items-stretch gap-0 px-3 py-2"
        >
          {/* Logo */}
          <Link
            to="/user"
            className="flex items-center gap-2 flex-shrink-0 mr-3 px-2 py-1 rounded hover:ring-1 hover:ring-amber-400 transition-all"
            data-ocid="header.logo.link"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded bg-amber-500">
              <Package className="w-4 h-4 text-white" />
            </div>
            <div className="leading-tight">
              <div className="text-white font-bold text-lg leading-none">
                MAW
              </div>
              <div className="text-amber-400 text-[9px] leading-none">.in</div>
            </div>
          </Link>

          {/* Deliver to */}
          <Link
            to="/user/checkout"
            className="hidden md:flex flex-col justify-center mr-3 px-2 py-1 rounded hover:ring-1 hover:ring-amber-400 transition-all flex-shrink-0"
            data-ocid="header.location.link"
          >
            <span className="text-gray-400 text-[10px] leading-tight">
              Deliver to
            </span>
            <span className="text-white text-xs font-bold flex items-center gap-0.5">
              <MapPin className="w-3 h-3 text-white flex-shrink-0" />
              <span className="truncate max-w-[100px]">{locationText}</span>
            </span>
          </Link>

          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            className="flex flex-1 rounded overflow-hidden min-w-0"
          >
            {/* Category dropdown */}
            <div className="relative flex-shrink-0" ref={categoryRef}>
              <button
                type="button"
                onClick={() => setCategoryOpen((v) => !v)}
                className="h-full px-3 bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-medium flex items-center gap-1 transition-colors"
                data-ocid="header.search.category_select"
              >
                <span className="hidden sm:inline max-w-[80px] truncate">
                  {selectedCategory}
                </span>
                <ChevronDown className="w-3 h-3 flex-shrink-0" />
              </button>
              {categoryOpen && (
                <div className="absolute top-full left-0 mt-0.5 w-48 bg-white border border-gray-200 rounded shadow-xl z-50 py-1 max-h-64 overflow-y-auto">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat);
                        setCategoryOpen(false);
                      }}
                      className={cn(
                        "w-full text-left px-4 py-2 text-sm hover:bg-amber-50 transition-colors",
                        selectedCategory === cat &&
                          "font-bold text-amber-700 bg-amber-50",
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search input */}
            <input
              type="text"
              placeholder="Search MAW.in"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              data-ocid="header.search_input"
              className="flex-1 px-4 py-2 text-sm text-gray-900 bg-white outline-none border-0 min-w-0"
            />

            {/* Search button */}
            <button
              type="submit"
              className="flex-shrink-0 w-12 bg-amber-400 hover:bg-amber-500 flex items-center justify-center transition-colors"
              data-ocid="header.search.submit_button"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-gray-800" />
            </button>
          </form>

          {/* Language */}
          <div className="hidden lg:flex items-center flex-shrink-0 ml-3">
            <button
              type="button"
              className="flex items-center gap-1 text-white text-xs px-2 py-1 rounded hover:ring-1 hover:ring-amber-400 transition-all"
              data-ocid="header.language.toggle"
            >
              <Globe className="w-4 h-4" />
              <span>EN</span>
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>

          {/* Account & Lists */}
          <div className="relative flex-shrink-0 ml-2" ref={accountRef}>
            <button
              type="button"
              onClick={() => setAccountOpen((v) => !v)}
              className="flex flex-col justify-center h-full px-2 py-1 rounded hover:ring-1 hover:ring-amber-400 transition-all text-left"
              data-ocid="header.account.toggle"
            >
              <span className="text-gray-400 text-[10px] leading-tight">
                {isAuthenticated ? `Hello, ${displayName}` : "Hello, sign in"}
              </span>
              <span className="text-white text-xs font-bold flex items-center gap-0.5">
                Account &amp; Lists <ChevronDown className="w-3 h-3" />
              </span>
            </button>

            {accountOpen && (
              <div className="absolute top-full right-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-2xl z-50 overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50">
                  {isAuthenticated ? (
                    <div className="space-y-2">
                      <p className="text-xs text-gray-500 truncate">
                        {principal}
                      </p>
                      <Link
                        to="/user/profile"
                        onClick={() => setAccountOpen(false)}
                        className="block w-full py-2 px-3 text-sm text-center text-white bg-amber-500 hover:bg-amber-600 rounded font-medium transition-colors"
                        data-ocid="header.account.profile_link"
                      >
                        Your Account
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setAccountOpen(false);
                        }}
                        className="block w-full py-1.5 px-3 text-xs text-center text-gray-600 hover:bg-gray-100 rounded transition-colors"
                        data-ocid="header.account.logout_button"
                      >
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={() => {
                          login();
                          setAccountOpen(false);
                        }}
                        className="block w-full py-2 px-3 text-sm text-center text-white bg-amber-500 hover:bg-amber-600 rounded font-medium transition-colors"
                        data-ocid="header.account.signin_button"
                      >
                        Sign in
                      </button>
                      <p className="text-xs text-center text-gray-500">
                        New customer?{" "}
                        <Link
                          to="/user/login"
                          onClick={() => setAccountOpen(false)}
                          className="text-amber-600 hover:underline"
                          data-ocid="header.account.register_link"
                        >
                          Start here
                        </Link>
                      </p>
                    </div>
                  )}
                </div>
                <div className="p-2">
                  <p className="text-xs font-bold text-gray-700 px-2 py-1">
                    Your Lists
                  </p>
                  <Link
                    to="/user/wishlist"
                    onClick={() => setAccountOpen(false)}
                    className="flex items-center gap-2 px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors"
                    data-ocid="header.account.wishlist_link"
                  >
                    Wish List
                  </Link>
                  <Link
                    to="/user/orders"
                    onClick={() => setAccountOpen(false)}
                    className="flex items-center gap-2 px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors"
                    data-ocid="header.account.orders_link"
                  >
                    Your Orders
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Returns & Orders */}
          <Link
            to="/user/orders"
            className="hidden md:flex flex-col justify-center flex-shrink-0 ml-2 px-2 py-1 rounded hover:ring-1 hover:ring-amber-400 transition-all"
            data-ocid="header.orders.link"
          >
            <span className="text-gray-400 text-[10px] leading-tight">
              Returns
            </span>
            <span className="text-white text-xs font-bold flex items-center gap-0.5">
              <RotateCcw className="w-3 h-3" /> &amp; Orders
            </span>
          </Link>

          {/* Cart */}
          <Link
            to="/user/cart"
            className="relative flex items-center gap-1 flex-shrink-0 ml-2 px-2 py-1 rounded hover:ring-1 hover:ring-amber-400 transition-all"
            data-ocid="header.cart.link"
          >
            <div className="relative">
              <ShoppingCart className="w-8 h-8 text-white" />
              {totalItems > 0 && (
                <span className="absolute -top-1 left-1/2 -translate-x-1 min-w-[20px] h-5 px-1 bg-amber-400 text-gray-900 rounded-full text-xs font-bold flex items-center justify-center">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </div>
            <span className="hidden sm:block text-white text-xs font-bold">
              Cart
            </span>
          </Link>
        </div>

        {/* Nav menu bar — dark navy */}
        <nav
          style={{ backgroundColor: "#1a2332" }}
          className="flex items-center gap-0 px-3 py-0 overflow-x-auto scrollbar-none"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              data-ocid={`nav.${item.label.toLowerCase().replace(/[^a-z0-9]/g, "-")}.link`}
              className="flex items-center gap-1.5 whitespace-nowrap px-3 py-2 text-sm text-gray-200 hover:text-white hover:ring-1 hover:ring-white/40 rounded transition-all flex-shrink-0"
            >
              {item.label === "≡ All" && <Menu className="w-4 h-4" />}
              {item.label === "≡ All" ? "All" : item.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* ═══════════════════════════════ MAIN CONTENT ═══════════════════════════════ */}
      <main className="flex-1 bg-background">{children}</main>

      {/* ═══════════════════════════════ FOOTER ═══════════════════════════════ */}
      <footer>
        {/* Section A — Personalized recs banner (logged-out only) */}
        {!isAuthenticated && (
          <div className="bg-white border-t border-gray-200 py-6">
            <div className="flex flex-col items-center gap-2">
              <h3 className="text-base font-semibold text-gray-800">
                See personalised recommendations
              </h3>
              <button
                type="button"
                onClick={login}
                className="px-6 py-2 rounded-full bg-amber-400 hover:bg-amber-500 text-gray-900 text-sm font-semibold transition-colors shadow"
                data-ocid="footer.signin.button"
              >
                Sign in
              </button>
              <p className="text-xs text-gray-500">
                New customer?{" "}
                <Link
                  to="/user/login"
                  className="text-cyan-700 hover:underline"
                  data-ocid="footer.register.link"
                >
                  Start here.
                </Link>
              </p>
            </div>
          </div>
        )}

        {/* Section B — Back to top */}
        <button
          type="button"
          onClick={scrollToTop}
          className="w-full py-3 text-white text-sm font-medium text-center transition-colors hover:brightness-110"
          style={{ backgroundColor: "#37475a" }}
          data-ocid="footer.back_to_top.button"
        >
          Back to top
        </button>

        {/* Section C — 4-column links */}
        <div style={{ backgroundColor: "#1a2332" }} className="py-10 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Col 1 */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">
                Get to Know Us
              </h4>
              <ul className="space-y-2">
                {FOOTER_COL1.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-gray-300 hover:text-white text-sm transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 2 */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">
                Connect with Us
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    <SiFacebook className="w-4 h-4" />
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    <SiX className="w-4 h-4" />
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    <SiInstagram className="w-4 h-4" />
                    Instagram
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">
                Make Money with Us
              </h4>
              <ul className="space-y-2">
                {FOOTER_COL3.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className="text-gray-300 hover:text-white text-sm transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">
                Let Us Help You
              </h4>
              <ul className="space-y-2">
                {FOOTER_COL4.map((item) => (
                  <li key={item.label}>
                    {item.href.startsWith("#") ? (
                      <a
                        href={item.href}
                        onClick={
                          item.href === "#support"
                            ? (e) => {
                                e.preventDefault();
                                document
                                  .getElementById("support-section")
                                  ?.scrollIntoView({ behavior: "smooth" });
                              }
                            : undefined
                        }
                        className="text-gray-300 hover:text-white text-sm transition-colors"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        to={item.href}
                        className="text-gray-300 hover:text-white text-sm transition-colors"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Section D — Bottom logo bar */}
        <div
          style={{ backgroundColor: "#1a2332", borderTop: "1px solid #4a5568" }}
          className="py-4 px-6"
        >
          <div className="max-w-6xl mx-auto flex flex-col items-center gap-2">
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <Link
                to="/user"
                className="flex items-center gap-1.5"
                data-ocid="footer.logo.link"
              >
                <div className="w-6 h-6 rounded bg-amber-500 flex items-center justify-center">
                  <Package className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-white font-bold text-base">MAW</span>
              </Link>
              <span className="text-gray-500">|</span>
              <button
                type="button"
                className="flex items-center gap-1.5 border border-gray-500 rounded px-3 py-1 text-white text-xs hover:border-gray-300 transition-colors"
                data-ocid="footer.language.select"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>🇮🇳 English</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              <span className="text-gray-500">|</span>
              <button
                type="button"
                className="flex items-center gap-1.5 border border-gray-500 rounded px-3 py-1 text-white text-xs hover:border-gray-300 transition-colors"
                data-ocid="footer.country.select"
              >
                🇮🇳 India
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>
            <p className="text-gray-400 text-xs">
              © 2024–{new Date().getFullYear()}, MAW Platform, Inc. or its
              affiliates
            </p>
          </div>
        </div>

        {/* Section E — Subsidiary brands + legal */}
        <div style={{ backgroundColor: "#0d1a26" }} className="py-8 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
              {SUBSIDIARY_BRANDS.map((brand) => (
                <button
                  key={brand.name}
                  type="button"
                  className="border border-gray-700 rounded px-3 py-2 text-left hover:border-gray-400 transition-colors"
                >
                  <p className="text-white text-xs font-semibold">
                    {brand.name}
                  </p>
                  <p className="text-gray-400 text-[10px] mt-0.5">
                    {brand.tagline}
                  </p>
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mb-3">
              {[
                "Conditions of Use & Sale",
                "Privacy Notice",
                "Interest-Based Ads",
              ].map((item, i, arr) => (
                <span key={item} className="flex items-center gap-3">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-200 text-xs transition-colors cursor-pointer bg-transparent border-0 p-0"
                    onClick={() => {}}
                  >
                    {item}
                  </button>
                  {i < arr.length - 1 && (
                    <span className="text-gray-600">|</span>
                  )}
                </span>
              ))}
            </div>
            <p className="text-gray-500 text-xs text-center">
              © 1996–{new Date().getFullYear()}, MAW Platform, Inc. or its
              affiliates
            </p>
            <p className="text-gray-600 text-[10px] text-center mt-1">
              Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-600 hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* ═══════════════════════════════ SCROLL TO TOP ═══════════════════════════════ */}
      <SupportChatBubble />
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        data-ocid="scroll_to_top.button"
        className={cn(
          "fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full flex items-center justify-center",
          "bg-gray-800 hover:bg-gray-700 text-white shadow-lg",
          "transition-all duration-300 ease-in-out",
          showScrollTop
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none",
        )}
      >
        <ChevronUp className="w-5 h-5" />
      </button>
    </div>
  );
}
