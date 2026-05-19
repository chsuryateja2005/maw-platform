import { PageHeader } from "@/components/ui/PageHeader";
import { StatBadge } from "@/components/ui/StatBadge";
import { Button } from "@/components/ui/button";
import { DarkSidebarLayout } from "@/layouts/DarkSidebarLayout";
import { cn } from "@/lib/utils";
import { Download, Package } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { managerNavItems } from "./managerNavItems";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  stock: number;
  threshold: number;
  lastUpdated: string;
}

const INVENTORY: InventoryItem[] = [
  {
    id: "PRD-0001",
    name: "Smartphone Case Ultra",
    category: "Accessories",
    stock: 340,
    threshold: 50,
    lastUpdated: "2026-05-18",
  },
  {
    id: "PRD-0008",
    name: '4K Smart TV 55"',
    category: "Electronics",
    stock: 22,
    threshold: 15,
    lastUpdated: "2026-05-18",
  },
  {
    id: "PRD-0012",
    name: "Mechanical Keyboard RGB",
    category: "Peripherals",
    stock: 95,
    threshold: 30,
    lastUpdated: "2026-05-17",
  },
  {
    id: "PRD-0019",
    name: "Noise-Cancelling Headphones",
    category: "Electronics",
    stock: 58,
    threshold: 25,
    lastUpdated: "2026-05-17",
  },
  {
    id: "PRD-0025",
    name: "Yoga Mat Premium",
    category: "Fitness",
    stock: 0,
    threshold: 20,
    lastUpdated: "2026-05-16",
  },
  {
    id: "PRD-0031",
    name: "Coffee Maker Deluxe",
    category: "Kitchen",
    stock: 11,
    threshold: 18,
    lastUpdated: "2026-05-16",
  },
  {
    id: "PRD-0041",
    name: "Wireless Earbuds Pro",
    category: "Electronics",
    stock: 4,
    threshold: 20,
    lastUpdated: "2026-05-15",
  },
  {
    id: "PRD-0057",
    name: "Smart Watch Band",
    category: "Accessories",
    stock: 3,
    threshold: 15,
    lastUpdated: "2026-05-15",
  },
  {
    id: "PRD-0063",
    name: "Bamboo Cutting Board",
    category: "Kitchen",
    stock: 175,
    threshold: 30,
    lastUpdated: "2026-05-14",
  },
  {
    id: "PRD-0072",
    name: "LED Desk Lamp Adjustable",
    category: "Office",
    stock: 44,
    threshold: 20,
    lastUpdated: "2026-05-14",
  },
  {
    id: "PRD-0088",
    name: "Ergonomic Office Chair",
    category: "Furniture",
    stock: 2,
    threshold: 10,
    lastUpdated: "2026-05-13",
  },
  {
    id: "PRD-0092",
    name: "Running Shoes Size 10",
    category: "Footwear",
    stock: 1,
    threshold: 12,
    lastUpdated: "2026-05-13",
  },
];

function getStockStatus(stock: number, threshold: number): string {
  if (stock === 0) return "out_of_stock";
  if (stock < threshold) return "low_stock";
  return "in_stock";
}

function stockStatusLabel(status: string): string {
  return status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function handleExport() {
  toast.success("CSV export started — file will download shortly.");
}

export function ManagerInventoryPortal() {
  return (
    <DarkSidebarLayout
      portalName="Warehouse Manager"
      portalLogo={Package}
      navItems={managerNavItems}
      userLabel="Alex Reyes"
      userSubLabel="Warehouse Manager"
    >
      <ManagerInventory />
    </DarkSidebarLayout>
  );
}

export default function ManagerInventory() {
  const lowStockCount = INVENTORY.filter(
    (i) => i.stock < i.threshold && i.stock > 0,
  ).length;
  const outCount = INVENTORY.filter((i) => i.stock === 0).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Inventory"
        subtitle={`${INVENTORY.length} products · ${lowStockCount} low stock · ${outCount} out of stock`}
        action={
          <Button
            type="button"
            variant="outline"
            className="gap-2"
            onClick={handleExport}
            data-ocid="inventory.export_button"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        }
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="bg-card border border-border rounded-xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/40 border-b border-border">
                {[
                  "Product ID",
                  "Product Name",
                  "Category",
                  "Current Stock",
                  "Low Stock Threshold",
                  "Status",
                  "Last Updated",
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
              {INVENTORY.map((item, idx) => {
                const status = getStockStatus(item.stock, item.threshold);
                const isLow = item.stock < item.threshold;
                return (
                  <tr
                    key={item.id}
                    className={cn(
                      "border-b border-border/50 transition-colors",
                      isLow &&
                        item.stock === 0 &&
                        "bg-red-50 dark:bg-red-500/5",
                      isLow &&
                        item.stock > 0 &&
                        "bg-amber-50/60 dark:bg-amber-500/5",
                    )}
                    data-ocid={`inventory.item.${idx + 1}`}
                  >
                    <td className="px-4 py-3 font-mono text-xs font-semibold text-muted-foreground">
                      {item.id}
                    </td>
                    <td className="px-4 py-3 font-medium text-foreground">
                      {item.name}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full border border-border">
                        {item.category}
                      </span>
                    </td>
                    <td
                      className={cn(
                        "px-4 py-3 font-bold text-base",
                        isLow
                          ? item.stock === 0
                            ? "text-red-600"
                            : "text-amber-600"
                          : "text-emerald-600",
                      )}
                    >
                      {item.stock}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {item.threshold}
                    </td>
                    <td className="px-4 py-3">
                      <StatBadge
                        status={status}
                        label={stockStatusLabel(status)}
                        variant={
                          status === "in_stock"
                            ? "success"
                            : status === "low_stock"
                              ? "warning"
                              : "danger"
                        }
                      />
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">
                      {item.lastUpdated}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
