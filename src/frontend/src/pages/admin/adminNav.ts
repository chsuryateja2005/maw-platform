import type { NavItem } from "@/layouts/DarkSidebarLayout";
import {
  BarChart2,
  LayoutDashboard,
  Package,
  Shield,
  Store,
} from "lucide-react";

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Vendors", href: "/admin/vendors", icon: Store },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart2 },
  { label: "Security", href: "/admin/security", icon: Shield },
];
