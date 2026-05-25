import type { NavItem } from "@/layouts/DarkSidebarLayout";
import {
  LayoutDashboard,
  MessageSquare,
  Package,
  PackageCheck,
  Truck,
} from "lucide-react";

export const managerNavItems: NavItem[] = [
  { label: "Dashboard", href: "/manager", icon: LayoutDashboard },
  { label: "Shipments", href: "/manager/shipments", icon: Truck },
  { label: "Inventory", href: "/manager/inventory", icon: Package },
  { label: "Dispatch", href: "/manager/dispatch", icon: PackageCheck },
  { label: "Complaints", href: "/manager/complaints", icon: MessageSquare },
];
