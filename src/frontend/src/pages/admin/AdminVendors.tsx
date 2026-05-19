import { PageHeader } from "@/components/ui/PageHeader";
import { StatBadge } from "@/components/ui/StatBadge";
import { Button } from "@/components/ui/button";
import { DarkSidebarLayout } from "@/layouts/DarkSidebarLayout";
import { VendorStatus } from "@/types";
import { LayoutDashboard } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { NAV_ITEMS } from "./adminNav";

interface VendorRow {
  id: string;
  company: string;
  brand: string;
  email: string;
  products: number;
  status: VendorStatus;
}

const VENDORS: VendorRow[] = [
  {
    id: "v-001",
    company: "TechGear Solutions",
    brand: "TechGear",
    email: "ops@techgear.io",
    products: 248,
    status: VendorStatus.approved,
  },
  {
    id: "v-002",
    company: "NovaBrands Co.",
    brand: "NovaBrands",
    email: "hello@novabrands.com",
    products: 128,
    status: VendorStatus.pending,
  },
  {
    id: "v-003",
    company: "Urban Essentials Ltd",
    brand: "UrbanEss",
    email: "trade@urbaness.net",
    products: 92,
    status: VendorStatus.approved,
  },
  {
    id: "v-004",
    company: "Horizon Goods Inc.",
    brand: "HorizonG",
    email: "supply@horizongoods.com",
    products: 317,
    status: VendorStatus.rejected,
  },
  {
    id: "v-005",
    company: "PrimeCraft Industries",
    brand: "PrimeCraft",
    email: "b2b@primecraft.in",
    products: 0,
    status: VendorStatus.pending,
  },
  {
    id: "v-006",
    company: "SwiftDeal Corp",
    brand: "SwiftDeal",
    email: "vendor@swiftdeal.co",
    products: 185,
    status: VendorStatus.approved,
  },
  {
    id: "v-007",
    company: "Apex Retail Group",
    brand: "ApexRetail",
    email: "apexretail@apex.com",
    products: 402,
    status: VendorStatus.approved,
  },
  {
    id: "v-008",
    company: "Verdant Market",
    brand: "Verdant",
    email: "info@verdantmarket.io",
    products: 0,
    status: VendorStatus.pending,
  },
];

type FilterTab = "all" | VendorStatus;

const TABS: { id: FilterTab; label: string }[] = [
  { id: "all", label: "All" },
  { id: VendorStatus.pending, label: "Pending" },
  { id: VendorStatus.approved, label: "Approved" },
  { id: VendorStatus.rejected, label: "Rejected" },
];

function AdminVendorsContent() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [vendorStatuses, setVendorStatuses] = useState<
    Record<string, VendorStatus>
  >(() => Object.fromEntries(VENDORS.map((v) => [v.id, v.status])));

  const filtered = VENDORS.filter((v) =>
    activeTab === "all" ? true : vendorStatuses[v.id] === activeTab,
  );

  function handleApprove(v: VendorRow) {
    setVendorStatuses((prev) => ({ ...prev, [v.id]: VendorStatus.approved }));
    toast.success(`${v.company} approved`, {
      description: "Vendor can now list products.",
    });
  }

  function handleReject(v: VendorRow) {
    setVendorStatuses((prev) => ({ ...prev, [v.id]: VendorStatus.rejected }));
    toast.error(`${v.company} rejected`, {
      description: "Vendor access has been revoked.",
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <PageHeader
        title="Vendor Management"
        subtitle="Review and manage marketplace vendors"
      />

      {/* Filter Tabs */}
      <div
        className="flex gap-1 mb-5 bg-muted/40 p-1 rounded-lg w-fit"
        data-ocid="vendors.filter.tabs"
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            data-ocid={`vendors.filter.${tab.id}.tab`}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-150 ${
              activeTab === tab.id
                ? "bg-card shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div
        className="bg-card border border-border rounded-xl overflow-x-auto"
        data-ocid="vendors.table"
      >
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/40 border-b border-border">
              {[
                "Company Name",
                "Brand",
                "Email",
                "Products",
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
            {filtered.map((v, i) => {
              const currentStatus = vendorStatuses[v.id];
              return (
                <motion.tr
                  key={v.id}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.22, delay: i * 0.04 }}
                  className="border-b border-border/50 hover:bg-primary/5 transition-colors"
                  data-ocid={`vendors.item.${i + 1}`}
                >
                  <td className="px-4 py-3 font-medium text-foreground">
                    {v.company}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{v.brand}</td>
                  <td className="px-4 py-3 text-muted-foreground">{v.email}</td>
                  <td className="px-4 py-3 text-foreground font-mono">
                    {v.products.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <StatBadge status={currentStatus} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {currentStatus !== VendorStatus.approved && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs text-emerald-600 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-400"
                          onClick={() => handleApprove(v)}
                          data-ocid={`vendors.approve_button.${i + 1}`}
                        >
                          Approve
                        </Button>
                      )}
                      {currentStatus !== VendorStatus.rejected && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs text-red-600 border-red-200 hover:bg-red-50 hover:border-red-400"
                          onClick={() => handleReject(v)}
                          data-ocid={`vendors.reject_button.${i + 1}`}
                        >
                          Reject
                        </Button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div
            className="py-12 text-center text-muted-foreground"
            data-ocid="vendors.empty_state"
          >
            No vendors match the selected filter.
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function AdminVendors() {
  return (
    <DarkSidebarLayout
      portalName="Admin Portal"
      portalLogo={LayoutDashboard}
      navItems={NAV_ITEMS}
      userLabel="Admin User"
      userSubLabel="Super Administrator"
    >
      <AdminVendorsContent />
    </DarkSidebarLayout>
  );
}
