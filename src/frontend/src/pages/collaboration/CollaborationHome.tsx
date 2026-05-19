import { PageHeader } from "@/components/ui/PageHeader";
import { LightSidebarLayout } from "@/layouts/LightSidebarLayout";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardList,
  Globe,
  Home,
  PackageCheck,
  ShoppingBag,
  TrendingUp,
  Warehouse,
} from "lucide-react";
import { motion } from "motion/react";

const NAV_ITEMS = [
  { label: "Home", href: "/collaboration", icon: Home },
  { label: "Apply Now", href: "/collaboration/register", icon: ClipboardList },
  {
    label: "My Application",
    href: "/collaboration/status",
    icon: PackageCheck,
  },
];

const BENEFITS = [
  {
    id: "reach-millions",
    icon: Globe,
    title: "Reach Millions",
    description:
      "Tap into MAW's global customer base spanning 120+ countries and 5,000+ active vendor partnerships driving $50M+ in annual sales.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    id: "verified-brand",
    icon: CheckCircle2,
    title: "Verified Brand",
    description:
      "Get the MAW Verified badge, build buyer trust instantly, and unlock premium product placement in featured collections.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    id: "warehouse-access",
    icon: Warehouse,
    title: "Warehouse Access",
    description:
      "Leverage our 18 fulfillment centers worldwide. Ship faster, reduce overhead costs, and let MAW handle logistics end-to-end.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
];

const STATS = [
  { id: "brands", value: "5,000+", label: "Brands", icon: Building2 },
  { id: "sales", value: "$50M+", label: "In Sales", icon: TrendingUp },
  { id: "countries", value: "120+", label: "Countries", icon: Globe },
  {
    id: "products",
    value: "280K+",
    label: "Products Listed",
    icon: ShoppingBag,
  },
];

export function CollaborationHome() {
  return (
    <LightSidebarLayout
      portalName="Vendor Portal"
      portalLogo={Building2}
      navItems={NAV_ITEMS}
      userLabel="Guest User"
      userSubLabel="Prospective Vendor"
    >
      <PageHeader
        title="Vendor Program"
        subtitle="Partner with MAW and grow your brand globally"
      />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl mb-8"
        style={{ minHeight: 320 }}
      >
        <img
          src="/assets/generated/collab-hero-bg.dim_1200x500.jpg"
          alt="MAW Vendor Program"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-indigo-950/70" />
        <div className="relative z-10 flex flex-col justify-center px-10 py-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-semibold mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              Now accepting applications for 2025 Q3
            </span>
            <h1 className="text-4xl font-bold text-white font-display leading-tight mb-4 max-w-xl">
              Partner with MAW and reach millions of customers
            </h1>
            <p className="text-slate-300 text-base max-w-lg mb-8 leading-relaxed">
              Join 5,000+ verified brands on the MAW marketplace. Our vendor
              program gives you access to global infrastructure, fulfillment
              centers, and a dedicated account team.
            </p>
            <div className="flex items-center gap-3">
              <Link
                to="/collaboration/register"
                data-ocid="collab.hero.apply_now.button"
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all duration-200 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:translate-y-[-1px]"
              >
                Apply Now
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/collaboration/status"
                data-ocid="collab.hero.check_status.button"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur text-white font-medium px-5 py-3 rounded-xl text-sm border border-white/20 transition-all duration-200"
              >
                Check Status
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.45 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + i * 0.07 }}
            className="bg-white border border-border rounded-xl px-5 py-5 flex items-center gap-4 shadow-sm"
          >
            <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
              <stat.icon
                className="w-5 h-5 text-indigo-600"
                strokeWidth={1.75}
              />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground font-display leading-none">
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {stat.label}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Benefits */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-foreground font-display mb-1">
          Why partner with MAW?
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Everything you need to grow your brand at scale.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {BENEFITS.map((benefit, i) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="bg-white border border-border rounded-xl p-6 hover:shadow-md transition-all duration-250 hover:border-indigo-200 group"
              data-ocid={`collab.benefit.${benefit.id}.card`}
            >
              <div
                className={`w-11 h-11 rounded-xl ${benefit.bg} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200`}
              >
                <benefit.icon
                  className={`w-5 h-5 ${benefit.color}`}
                  strokeWidth={1.75}
                />
              </div>
              <h3 className="text-sm font-bold text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Footer Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl px-8 py-6 flex items-center justify-between gap-6"
      >
        <div>
          <p className="text-white font-bold text-base font-display">
            Ready to grow with MAW?
          </p>
          <p className="text-indigo-200 text-sm mt-0.5">
            Submit your application in under 5 minutes. Decisions within 3-5
            business days.
          </p>
        </div>
        <Link
          to="/collaboration/register"
          data-ocid="collab.cta_banner.apply.button"
          className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-indigo-700 font-semibold px-5 py-2.5 rounded-lg text-sm hover:bg-indigo-50 transition-colors"
        >
          Start Application
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </LightSidebarLayout>
  );
}
