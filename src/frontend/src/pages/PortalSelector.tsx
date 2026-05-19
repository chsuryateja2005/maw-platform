import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Boxes,
  HeadphonesIcon,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

const PORTALS = [
  {
    id: "admin",
    name: "Admin Portal",
    description: "Manage vendors, orders, users, and platform-wide operations.",
    href: "/admin",
    icon: ShieldCheck,
    badge: "Enterprise",
    theme: "dark",
    gradient: "from-indigo-500 to-violet-600",
  },
  {
    id: "manager",
    name: "Manager Portal",
    description:
      "Monitor inventory, dispatch shipments, and oversee warehouse ops.",
    href: "/manager",
    icon: Boxes,
    badge: "Operations",
    theme: "dark",
    gradient: "from-slate-600 to-indigo-700",
  },
  {
    id: "delivery",
    name: "Delivery Portal",
    description:
      "Track live deliveries, manage drivers, and update delivery statuses.",
    href: "/delivery",
    icon: Truck,
    badge: "Logistics",
    theme: "dark",
    gradient: "from-indigo-600 to-sky-600",
  },
  {
    id: "user",
    name: "Customer Portal",
    description:
      "Browse products, place orders, and track shipments with ease.",
    href: "/user",
    icon: ShoppingBag,
    badge: "Marketplace",
    theme: "light",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    id: "collaboration",
    name: "Collaboration Hub",
    description:
      "Coordinate teams, manage projects, and streamline vendor communication.",
    href: "/collaboration",
    icon: Users,
    badge: "Teamwork",
    theme: "light",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    id: "support",
    name: "Support Center",
    description:
      "Handle customer tickets, resolve issues, and manage SLA workflows.",
    href: "/support",
    icon: HeadphonesIcon,
    badge: "CX",
    theme: "light",
    gradient: "from-rose-500 to-orange-500",
  },
];

export default function PortalSelector() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
      }}
    >
      {/* Hero background overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url('/assets/generated/portal-hero-bg.dim_1600x900.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Grid overlay pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative flex flex-col flex-1 z-10">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500 flex items-center justify-center">
              <Boxes className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-white font-bold text-xl font-display">
                MAW
              </span>
              <span className="ml-2 text-indigo-300 text-xs">
                Mobile Accessories Warehouse
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              All Systems Operational
            </span>
          </div>
        </header>

        {/* Hero text */}
        <div className="flex flex-col items-center text-center pt-10 pb-12 px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <span className="inline-block text-indigo-300 text-xs font-semibold tracking-widest uppercase mb-4 px-3 py-1 border border-indigo-500/30 rounded-full bg-indigo-500/10">
              Enterprise Operations Platform
            </span>
            <h1 className="text-4xl md:text-6xl font-bold font-display text-white leading-tight mb-4">
              Select Your
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                {" "}
                Portal
              </span>
            </h1>
            <p className="text-slate-400 text-lg max-w-xl">
              MAW gives every team their own purpose-built workspace. Choose
              your portal below.
            </p>
          </motion.div>
        </div>

        {/* Portal cards */}
        <div className="flex-1 px-6 pb-16">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PORTALS.map((portal, index) => (
              <motion.div
                key={portal.id}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                data-ocid={`portal.${portal.id}.card`}
              >
                <Link
                  to={portal.href}
                  className="flex flex-col h-full p-6 rounded-2xl border transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    borderColor: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(12px)",
                  }}
                  data-ocid={`portal.${portal.id}.link`}
                >
                  {/* Icon + badge */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${portal.gradient} flex items-center justify-center shadow-lg`}
                    >
                      <portal.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs font-semibold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-2.5 py-1">
                      {portal.badge}
                    </span>
                  </div>

                  {/* Text */}
                  <h3 className="text-base font-bold text-white font-display mb-2">
                    {portal.name}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed flex-1">
                    {portal.description}
                  </p>

                  {/* CTA */}
                  <div className="mt-4 flex items-center gap-1.5 text-indigo-300 text-sm font-medium group">
                    <span>Enter Portal</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="py-4 text-center">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
