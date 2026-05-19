import { PageHeader } from "@/components/ui/PageHeader";
import { StatBadge } from "@/components/ui/StatBadge";
import { Button } from "@/components/ui/button";
import { DarkSidebarLayout } from "@/layouts/DarkSidebarLayout";
import { ShipmentStatus } from "@/types";
import { Package } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { managerNavItems } from "./managerNavItems";

const ALL_SHIPMENTS = [
  {
    id: "SHP-20481",
    company: "Shenzhen TechHub Co.",
    origin: "Guangzhou, CN",
    destination: "WH-01 | Los Angeles",
    products: 142,
    status: ShipmentStatus.arriving,
    receivedDate: "—",
  },
  {
    id: "SHP-20477",
    company: "Mumbai Logistics Ltd.",
    origin: "Mumbai, IN",
    destination: "WH-02 | New York",
    products: 88,
    status: ShipmentStatus.received,
    receivedDate: "2026-05-17",
  },
  {
    id: "SHP-20470",
    company: "Berlin Parts GmbH",
    origin: "Berlin, DE",
    destination: "WH-03 | Chicago",
    products: 310,
    status: ShipmentStatus.processing,
    receivedDate: "2026-05-16",
  },
  {
    id: "SHP-20463",
    company: "Tanaka Electronics",
    origin: "Tokyo, JP",
    destination: "WH-01 | Los Angeles",
    products: 56,
    status: ShipmentStatus.dispatched,
    receivedDate: "2026-05-15",
  },
  {
    id: "SHP-20459",
    company: "Maple Supply Co.",
    origin: "Toronto, CA",
    destination: "WH-04 | Dallas",
    products: 200,
    status: ShipmentStatus.received,
    receivedDate: "2026-05-14",
  },
  {
    id: "SHP-20452",
    company: "Dubai Exports FZCO",
    origin: "Dubai, AE",
    destination: "WH-02 | New York",
    products: 74,
    status: ShipmentStatus.processing,
    receivedDate: "2026-05-13",
  },
  {
    id: "SHP-20448",
    company: "Seoul Tech Innovations",
    origin: "Seoul, KR",
    destination: "WH-05 | Seattle",
    products: 95,
    status: ShipmentStatus.arriving,
    receivedDate: "—",
  },
  {
    id: "SHP-20441",
    company: "Sydney Goods Pty Ltd",
    origin: "Sydney, AU",
    destination: "WH-03 | Chicago",
    products: 180,
    status: ShipmentStatus.dispatched,
    receivedDate: "2026-05-11",
  },
  {
    id: "SHP-20435",
    company: "Paris Couture SARL",
    origin: "Paris, FR",
    destination: "WH-01 | Los Angeles",
    products: 43,
    status: ShipmentStatus.received,
    receivedDate: "2026-05-10",
  },
  {
    id: "SHP-20429",
    company: "São Paulo Distribuidora",
    origin: "São Paulo, BR",
    destination: "WH-04 | Dallas",
    products: 220,
    status: ShipmentStatus.processing,
    receivedDate: "2026-05-09",
  },
];

const STATUS_TABS: Array<{ label: string; value: string }> = [
  { label: "All", value: "all" },
  { label: "Arriving", value: ShipmentStatus.arriving },
  { label: "Received", value: ShipmentStatus.received },
  { label: "Processing", value: ShipmentStatus.processing },
  { label: "Dispatched", value: ShipmentStatus.dispatched },
];

export function ManagerShipmentsPortal() {
  return (
    <DarkSidebarLayout
      portalName="Warehouse Manager"
      portalLogo={Package}
      navItems={managerNavItems}
      userLabel="Alex Reyes"
      userSubLabel="Warehouse Manager"
    >
      <ManagerShipments />
    </DarkSidebarLayout>
  );
}

export default function ManagerShipments() {
  const [activeTab, setActiveTab] = useState("all");
  const [statuses, setStatuses] = useState<Record<string, ShipmentStatus>>(
    Object.fromEntries(ALL_SHIPMENTS.map((s) => [s.id, s.status])),
  );

  const displayed = ALL_SHIPMENTS.filter(
    (s) => activeTab === "all" || statuses[s.id] === activeTab,
  );

  function handleStatusUpdate(shipmentId: string, newStatus: ShipmentStatus) {
    setStatuses((prev) => ({ ...prev, [shipmentId]: newStatus }));
    toast.success(
      `${shipmentId} status updated to ${newStatus.replace(/_/g, " ")}`,
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Shipments"
        subtitle={`${ALL_SHIPMENTS.length} total shipments across all warehouses`}
      />

      {/* Status filter tabs */}
      <div
        className="flex gap-2 flex-wrap"
        role="tablist"
        data-ocid="shipments.status.tab"
      >
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.value}
            onClick={() => setActiveTab(tab.value)}
            data-ocid={`shipments.filter.${tab.value}`}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 border ${
              activeTab === tab.value
                ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                : "bg-card text-muted-foreground border-border hover:bg-muted hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="bg-card border border-border rounded-xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/40 border-b border-border">
                {[
                  "Shipment ID",
                  "Company / Origin",
                  "Destination",
                  "Products",
                  "Status",
                  "Received Date",
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
              {displayed.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-12 text-center text-muted-foreground"
                  >
                    No shipments found for this status.
                  </td>
                </tr>
              ) : (
                displayed.map((s, idx) => (
                  <tr
                    key={s.id}
                    className="border-b border-border/50 hover:bg-primary/5 transition-colors"
                    data-ocid={`shipments.item.${idx + 1}`}
                  >
                    <td className="px-4 py-3 font-mono text-xs font-semibold text-foreground">
                      {s.id}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-foreground">{s.company}</p>
                      <p className="text-xs text-muted-foreground">
                        {s.origin}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">
                      {s.destination}
                    </td>
                    <td className="px-4 py-3 font-medium text-foreground">
                      {s.products}
                    </td>
                    <td className="px-4 py-3">
                      <StatBadge status={statuses[s.id]} />
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {s.receivedDate}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          data-ocid={`shipments.view_button.${idx + 1}`}
                          onClick={() => toast.info(`Viewing ${s.id}`)}
                        >
                          View
                        </Button>
                        <select
                          aria-label={`Update status for ${s.id}`}
                          data-ocid={`shipments.status_select.${idx + 1}`}
                          className="text-xs border border-border rounded-md px-2 py-1.5 bg-background text-foreground focus:ring-2 focus:ring-indigo-500 outline-none"
                          value={statuses[s.id]}
                          onChange={(e) =>
                            handleStatusUpdate(
                              s.id,
                              e.target.value as ShipmentStatus,
                            )
                          }
                        >
                          {Object.values(ShipmentStatus).map((sv) => (
                            <option key={sv} value={sv}>
                              {sv.charAt(0).toUpperCase() + sv.slice(1)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
