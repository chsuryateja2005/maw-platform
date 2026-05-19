import { DataTable } from "@/components/ui/DataTable";
import { KpiCard } from "@/components/ui/KpiCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatBadge } from "@/components/ui/StatBadge";
import { DarkSidebarLayout } from "@/layouts/DarkSidebarLayout";
import {
  AlertTriangle,
  BarChart3,
  Bell,
  LayoutDashboard,
  ShoppingCart,
  Store,
} from "lucide-react";
import { NAV_ITEMS } from "./adminNav";

const MOCK_VENDORS = [
  {
    id: "1",
    name: "TechGear Pro",
    category: "Cases & Covers",
    orders: 1247,
    status: "approved",
    revenue: "$84,320",
  },
  {
    id: "2",
    name: "AudioMax Electronics",
    category: "Earphones & Headsets",
    orders: 893,
    status: "approved",
    revenue: "$62,140",
  },
  {
    id: "3",
    name: "PowerCell Solutions",
    category: "Chargers & Cables",
    orders: 654,
    status: "pending",
    revenue: "$41,890",
  },
  {
    id: "4",
    name: "ScreenGuard Industries",
    category: "Screen Protectors",
    orders: 421,
    status: "approved",
    revenue: "$28,650",
  },
  {
    id: "5",
    name: "SmartCase Co.",
    category: "Smart Accessories",
    orders: 287,
    status: "rejected",
    revenue: "$19,300",
  },
];

const VENDOR_COLUMNS = [
  { key: "name", header: "Vendor" },
  { key: "category", header: "Category" },
  { key: "orders", header: "Orders", className: "text-right" },
  { key: "revenue", header: "Revenue", className: "text-right" },
  {
    key: "status",
    header: "Status",
    render: (row: (typeof MOCK_VENDORS)[0]) => (
      <StatBadge status={row.status} />
    ),
  },
];

export function AdminPortal() {
  return (
    <DarkSidebarLayout
      portalName="Admin Portal"
      portalLogo={LayoutDashboard}
      navItems={NAV_ITEMS}
      userLabel="Alex R."
      userSubLabel="Super Admin"
    >
      <PageHeader
        title="Admin Dashboard"
        subtitle="Platform-wide operations and vendor management"
        action={
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Notifications"
              data-ocid="admin.notifications.button"
            >
              <Bell className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        }
      />

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard
          label="Total Vendors"
          value={248}
          icon={Store}
          trend={12}
          trendLabel="vs last month"
        />
        <KpiCard
          label="Active Orders"
          value={4369}
          icon={ShoppingCart}
          trend={8}
          trendLabel="today"
        />
        <KpiCard
          label="Revenue"
          value={366200}
          icon={BarChart3}
          prefix="$"
          trend={15}
          trendLabel="this month"
        />
        <KpiCard
          label="Support Tickets"
          value={381}
          icon={Bell}
          trend={-5}
          trendLabel="resolved faster"
        />
      </div>

      {/* Alerts */}
      <div className="mb-6 p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl flex items-start gap-3">
        <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-foreground">
            3 vendors awaiting approval
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            PowerCell Solutions and 2 others have submitted onboarding
            documents.
          </p>
        </div>
        <button
          type="button"
          className="ml-auto text-xs font-medium text-primary hover:underline flex-shrink-0"
          data-ocid="admin.vendor_approval.button"
        >
          Review Now
        </button>
      </div>

      {/* Vendors table */}
      <div className="bg-card border border-border rounded-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-sm font-semibold text-foreground">Top Vendors</h2>
          <button
            type="button"
            className="text-xs text-primary hover:underline"
            data-ocid="admin.vendors.view_all.button"
          >
            View All
          </button>
        </div>
        <DataTable
          columns={VENDOR_COLUMNS as Parameters<typeof DataTable>[0]["columns"]}
          data={MOCK_VENDORS as unknown as Record<string, unknown>[]}
          className="border-0 rounded-none"
        />
      </div>
    </DarkSidebarLayout>
  );
}
