import { KpiCard } from "@/components/ui/KpiCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatBadge } from "@/components/ui/StatBadge";
import { DarkSidebarLayout } from "@/layouts/DarkSidebarLayout";
import { ShipmentStatus } from "@/types";
import {
  AlertTriangle,
  LayoutDashboard,
  Package,
  PackageCheck,
  Truck,
} from "lucide-react";
import { motion } from "motion/react";
import { managerNavItems } from "./managerNavItems";

const recentShipments = [
  {
    id: "SHP-20481",
    origin: "Guangzhou, CN",
    products: 142,
    arrival: "2026-05-18",
    status: ShipmentStatus.arriving,
  },
  {
    id: "SHP-20477",
    origin: "Mumbai, IN",
    products: 88,
    arrival: "2026-05-17",
    status: ShipmentStatus.received,
  },
  {
    id: "SHP-20470",
    origin: "Berlin, DE",
    products: 310,
    arrival: "2026-05-16",
    status: ShipmentStatus.processing,
  },
  {
    id: "SHP-20463",
    origin: "Tokyo, JP",
    products: 56,
    arrival: "2026-05-15",
    status: ShipmentStatus.dispatched,
  },
  {
    id: "SHP-20459",
    origin: "Toronto, CA",
    products: 200,
    arrival: "2026-05-14",
    status: ShipmentStatus.received,
  },
  {
    id: "SHP-20452",
    origin: "Dubai, AE",
    products: 74,
    arrival: "2026-05-13",
    status: ShipmentStatus.processing,
  },
];

const lowStockAlerts = [
  {
    id: "PRD-0041",
    name: "Wireless Earbuds Pro",
    category: "Electronics",
    stock: 4,
    threshold: 20,
  },
  {
    id: "PRD-0088",
    name: "Ergonomic Office Chair",
    category: "Furniture",
    stock: 2,
    threshold: 10,
  },
  {
    id: "PRD-0113",
    name: "Protein Powder 2kg",
    category: "Health",
    stock: 7,
    threshold: 25,
  },
  {
    id: "PRD-0057",
    name: "Smart Watch Band",
    category: "Accessories",
    stock: 3,
    threshold: 15,
  },
  {
    id: "PRD-0092",
    name: "Running Shoes Size 10",
    category: "Footwear",
    stock: 1,
    threshold: 12,
  },
];

export function ManagerPortal() {
  return (
    <DarkSidebarLayout
      portalName="Warehouse Manager"
      portalLogo={Package}
      navItems={managerNavItems}
      userLabel="Alex Reyes"
      userSubLabel="Warehouse Manager"
    >
      <ManagerDashboard />
    </DarkSidebarLayout>
  );
}

export default function ManagerDashboard() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Warehouse Dashboard"
        subtitle="Real-time overview of shipments, inventory, and dispatch status."
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <KpiCard
          label="Incoming Shipments"
          value={23}
          icon={Truck}
          trend={12}
          trendLabel="vs last week"
          accentColor="text-indigo-600"
        />
        <KpiCard
          label="Items in Stock"
          value={8492}
          icon={Package}
          trend={3}
          trendLabel="vs last week"
          accentColor="text-emerald-600"
        />
        <KpiCard
          label="Low Stock Alerts"
          value={7}
          icon={AlertTriangle}
          trend={-2}
          trendLabel="vs last week"
          accentColor="text-amber-600"
        />
        <KpiCard
          label="Ready to Dispatch"
          value={156}
          icon={PackageCheck}
          trend={8}
          trendLabel="vs last week"
          accentColor="text-blue-600"
        />
      </div>

      {/* Recent Shipments */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="bg-card border border-border rounded-xl overflow-hidden"
      >
        <div className="flex items-center gap-2 px-5 py-4 border-b border-border">
          <LayoutDashboard
            className="w-4 h-4 text-muted-foreground"
            strokeWidth={1.75}
          />
          <h2 className="text-sm font-semibold text-foreground">
            Recent Shipments
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/40 border-b border-border">
                {[
                  "Shipment ID",
                  "Origin",
                  "Products",
                  "Arrival Date",
                  "Status",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentShipments.map((s, idx) => (
                <tr
                  key={s.id}
                  className="border-b border-border/50 hover:bg-primary/5 transition-colors"
                  data-ocid={`dashboard.shipment.item.${idx + 1}`}
                >
                  <td className="px-4 py-3 font-mono text-xs font-semibold text-foreground">
                    {s.id}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {s.origin}
                  </td>
                  <td className="px-4 py-3 text-foreground font-medium">
                    {s.products}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {s.arrival}
                  </td>
                  <td className="px-4 py-3">
                    <StatBadge status={s.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Low Stock Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle
            className="w-4 h-4 text-amber-500"
            strokeWidth={1.75}
          />
          <h2 className="text-sm font-semibold text-foreground">
            Inventory Alerts
          </h2>
          <span className="ml-1 text-xs bg-red-500/10 text-red-600 border border-red-200 px-2 py-0.5 rounded-full font-medium">
            {lowStockAlerts.length} items
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-4">
          {lowStockAlerts.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + idx * 0.07, duration: 0.3 }}
              className="bg-red-50 border border-red-200 dark:bg-red-500/5 dark:border-red-500/20 rounded-xl p-4"
              data-ocid={`inventory.alert.item.${idx + 1}`}
            >
              <p className="text-xs font-mono text-muted-foreground mb-1">
                {p.id}
              </p>
              <p className="text-sm font-semibold text-foreground leading-tight mb-2 line-clamp-2">
                {p.name}
              </p>
              <p className="text-xs text-muted-foreground mb-3">{p.category}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-red-600">
                  Stock: <strong>{p.stock}</strong>
                </span>
                <span className="text-xs text-muted-foreground">
                  Min: {p.threshold}
                </span>
              </div>
              <div className="mt-2 h-1.5 bg-red-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 rounded-full"
                  style={{
                    width: `${Math.min((p.stock / p.threshold) * 100, 100)}%`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
