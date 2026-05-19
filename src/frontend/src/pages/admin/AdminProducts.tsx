import { PageHeader } from "@/components/ui/PageHeader";
import { StatBadge } from "@/components/ui/StatBadge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DarkSidebarLayout } from "@/layouts/DarkSidebarLayout";
import { LayoutDashboard, Pencil, Plus, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { NAV_ITEMS } from "./adminNav";

interface ProductRow {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "active" | "draft" | "out_of_stock";
}

const ALL_PRODUCTS: ProductRow[] = [
  {
    id: "p-001",
    name: "Mechanical Keyboard Pro X",
    category: "Electronics",
    price: 129.99,
    stock: 84,
    status: "active",
  },
  {
    id: "p-002",
    name: "Ergonomic Office Chair",
    category: "Furniture",
    price: 349.0,
    stock: 22,
    status: "active",
  },
  {
    id: "p-003",
    name: "Noise-Cancelling Headphones",
    category: "Electronics",
    price: 199.99,
    stock: 7,
    status: "active",
  },
  {
    id: "p-004",
    name: "Bamboo Desk Organizer",
    category: "Office",
    price: 34.99,
    stock: 0,
    status: "out_of_stock",
  },
  {
    id: "p-005",
    name: "4K Webcam Ultra HD",
    category: "Electronics",
    price: 89.99,
    stock: 56,
    status: "active",
  },
  {
    id: "p-006",
    name: "Standing Desk Converter",
    category: "Furniture",
    price: 189.0,
    stock: 5,
    status: "active",
  },
  {
    id: "p-007",
    name: "Portable SSD 1TB",
    category: "Electronics",
    price: 79.99,
    stock: 143,
    status: "active",
  },
  {
    id: "p-008",
    name: "Premium Mouse Pad XL",
    category: "Office",
    price: 24.99,
    stock: 0,
    status: "draft",
  },
  {
    id: "p-009",
    name: "USB-C Docking Station",
    category: "Electronics",
    price: 149.0,
    stock: 9,
    status: "active",
  },
  {
    id: "p-010",
    name: "Wireless Charging Pad",
    category: "Electronics",
    price: 39.99,
    stock: 218,
    status: "active",
  },
];

const CATEGORIES = ["all", "Electronics", "Furniture", "Office"];

function StockCell({ stock }: { stock: number }) {
  const color =
    stock === 0
      ? "text-red-600 font-semibold"
      : stock < 10
        ? "text-amber-600 font-semibold"
        : "text-foreground";
  return (
    <span className={`font-mono text-sm ${color}`}>
      {stock.toLocaleString()}
    </span>
  );
}

function AdminProductsContent() {
  const [category, setCategory] = useState("all");

  const filtered = ALL_PRODUCTS.filter((p) =>
    category === "all" ? true : p.category === category,
  );

  function handleEdit(p: ProductRow) {
    toast.info(`Editing: ${p.name}`, {
      description: "Product editor coming soon.",
    });
  }

  function handleDelete(p: ProductRow) {
    toast.error(`Deleted: ${p.name}`, {
      description: "Product has been removed from the catalog.",
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <PageHeader
        title="Product Management"
        subtitle="Manage catalog products, pricing and stock levels"
        action={
          <Button size="sm" className="gap-2" data-ocid="products.add_button">
            <Plus className="w-4 h-4" />
            Add Product
          </Button>
        }
      />

      {/* Category Filter */}
      <div className="flex items-center gap-3 mb-5">
        <span className="text-sm text-muted-foreground">Filter:</span>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger
            className="w-40 h-8 text-sm"
            data-ocid="products.category.select"
          >
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((c) => (
              <SelectItem key={c} value={c}>
                {c === "all" ? "All Categories" : c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div
        className="bg-card border border-border rounded-xl overflow-x-auto"
        data-ocid="products.table"
      >
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/40 border-b border-border">
              {[
                "Product Name",
                "Category",
                "Price",
                "Stock",
                "Status",
                "Actions",
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
            {filtered.map((p, i) => (
              <motion.tr
                key={p.id}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.22, delay: i * 0.035 }}
                className="border-b border-border/50 hover:bg-primary/5 transition-colors"
                data-ocid={`products.item.${i + 1}`}
              >
                <td className="px-4 py-3 font-medium text-foreground max-w-[200px] truncate">
                  {p.name}
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                    {p.category}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-foreground">
                  ${p.price.toFixed(2)}
                </td>
                <td className="px-4 py-3">
                  <StockCell stock={p.stock} />
                </td>
                <td className="px-4 py-3">
                  <StatBadge status={p.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 w-7 p-0 hover:bg-primary/10 hover:text-primary"
                      onClick={() => handleEdit(p)}
                      aria-label="Edit product"
                      data-ocid={`products.edit_button.${i + 1}`}
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 w-7 p-0 hover:bg-red-500/10 hover:text-red-600"
                      onClick={() => handleDelete(p)}
                      aria-label="Delete product"
                      data-ocid={`products.delete_button.${i + 1}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div
            className="py-12 text-center text-muted-foreground"
            data-ocid="products.empty_state"
          >
            No products in this category.
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function AdminProducts() {
  return (
    <DarkSidebarLayout
      portalName="Admin Portal"
      portalLogo={LayoutDashboard}
      navItems={NAV_ITEMS}
      userLabel="Admin User"
      userSubLabel="Super Administrator"
    >
      <AdminProductsContent />
    </DarkSidebarLayout>
  );
}
