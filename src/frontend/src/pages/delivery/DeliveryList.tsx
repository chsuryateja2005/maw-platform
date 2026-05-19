import { PageHeader } from "@/components/ui/PageHeader";
import { StatBadge } from "@/components/ui/StatBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DarkSidebarLayout } from "@/layouts/DarkSidebarLayout";
import { DeliveryStatus } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import { Eye, LayoutDashboard, MapPin, Truck } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/delivery", icon: LayoutDashboard },
  { label: "Deliveries", href: "/delivery/list", icon: Truck },
];

type Priority = "express" | "standard";

interface DeliveryRow {
  id: string;
  customer: string;
  address: string;
  items: number;
  priority: Priority;
  status: DeliveryStatus;
  scheduledTime: string;
  phone: string;
}

const ALL_DELIVERIES: DeliveryRow[] = [
  {
    id: "DLV-2847",
    customer: "Riya Patel",
    address: "42 Elm Street, Andheri West, Mumbai",
    items: 3,
    priority: "express",
    status: DeliveryStatus.assigned,
    scheduledTime: "10:00 AM",
    phone: "+91 98765 43210",
  },
  {
    id: "DLV-2848",
    customer: "Arjun Mehta",
    address: "7 Rose Garden Colony, Bandra East, Mumbai",
    items: 1,
    priority: "standard",
    status: DeliveryStatus.in_transit,
    scheduledTime: "10:45 AM",
    phone: "+91 87654 32109",
  },
  {
    id: "DLV-2849",
    customer: "Sunita Sharma",
    address: "15 Park View Apartments, Powai, Mumbai",
    items: 5,
    priority: "express",
    status: DeliveryStatus.assigned,
    scheduledTime: "11:15 AM",
    phone: "+91 76543 21098",
  },
  {
    id: "DLV-2850",
    customer: "Deepak Nair",
    address: "88 MG Road, Malad West, Mumbai",
    items: 2,
    priority: "standard",
    status: DeliveryStatus.delivered,
    scheduledTime: "09:00 AM",
    phone: "+91 65432 10987",
  },
  {
    id: "DLV-2851",
    customer: "Priya Verma",
    address: "3B Lotus Tower, Vikhroli, Mumbai",
    items: 4,
    priority: "express",
    status: DeliveryStatus.in_transit,
    scheduledTime: "11:30 AM",
    phone: "+91 54321 09876",
  },
  {
    id: "DLV-2852",
    customer: "Kiran Joshi",
    address: "22 Silver Line Road, Borivali North, Mumbai",
    items: 2,
    priority: "standard",
    status: DeliveryStatus.assigned,
    scheduledTime: "12:00 PM",
    phone: "+91 43210 98765",
  },
  {
    id: "DLV-2853",
    customer: "Amit Singh",
    address: "56 Hill View Colony, Kandivali East, Mumbai",
    items: 1,
    priority: "standard",
    status: DeliveryStatus.delivered,
    scheduledTime: "09:30 AM",
    phone: "+91 32109 87654",
  },
  {
    id: "DLV-2854",
    customer: "Neha Gupta",
    address: "9 Sunrise Society, Goregaon West, Mumbai",
    items: 3,
    priority: "express",
    status: DeliveryStatus.failed,
    scheduledTime: "10:20 AM",
    phone: "+91 21098 76543",
  },
  {
    id: "DLV-2855",
    customer: "Rahul Desai",
    address: "77 Shanti Nagar, Chembur, Mumbai",
    items: 2,
    priority: "standard",
    status: DeliveryStatus.delivered,
    scheduledTime: "08:45 AM",
    phone: "+91 10987 65432",
  },
  {
    id: "DLV-2856",
    customer: "Kavita Reddy",
    address: "31 Ocean Drive, Worli, Mumbai",
    items: 6,
    priority: "express",
    status: DeliveryStatus.assigned,
    scheduledTime: "01:00 PM",
    phone: "+91 09876 54321",
  },
];

type FilterTab = "all" | DeliveryStatus;

const FILTER_TABS: { label: string; value: FilterTab }[] = [
  { label: "All", value: "all" },
  { label: "Assigned", value: DeliveryStatus.assigned },
  { label: "In Transit", value: DeliveryStatus.in_transit },
  { label: "Delivered", value: DeliveryStatus.delivered },
  { label: "Failed", value: DeliveryStatus.failed },
];

export function DeliveryList() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const filtered =
    activeTab === "all"
      ? ALL_DELIVERIES
      : ALL_DELIVERIES.filter((d) => d.status === activeTab);

  return (
    <DarkSidebarLayout
      portalName="Delivery Portal"
      portalLogo={Truck}
      navItems={NAV_ITEMS}
      userLabel="Rahul Delivery"
      userSubLabel="Delivery Agent"
    >
      <PageHeader
        title="My Deliveries"
        subtitle={`${ALL_DELIVERIES.length} deliveries assigned for today`}
      />

      {/* Filter Tabs */}
      <div
        className="flex gap-1 mb-5 bg-muted/50 rounded-lg p-1 w-fit"
        data-ocid="delivery.filter.tab"
      >
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.value}
            onClick={() => setActiveTab(tab.value)}
            data-ocid={`delivery.filter.${tab.value}`}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-150 ${
              activeTab === tab.value
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3 uppercase tracking-wide">
                    Delivery ID
                  </th>
                  <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3 uppercase tracking-wide">
                    Customer
                  </th>
                  <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3 uppercase tracking-wide hidden md:table-cell">
                    Address
                  </th>
                  <th className="text-center text-xs font-semibold text-muted-foreground px-4 py-3 uppercase tracking-wide">
                    Items
                  </th>
                  <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3 uppercase tracking-wide">
                    Priority
                  </th>
                  <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3 uppercase tracking-wide">
                    Status
                  </th>
                  <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3 uppercase tracking-wide hidden lg:table-cell">
                    Scheduled
                  </th>
                  <th className="text-center text-xs font-semibold text-muted-foreground px-4 py-3 uppercase tracking-wide">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, index) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.04 }}
                    className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                    data-ocid={`delivery.table.row.${index + 1}`}
                  >
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                      {row.id}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-foreground text-sm">
                        {row.customer}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {row.phone}
                      </p>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="flex items-start gap-1">
                        <MapPin
                          className="w-3 h-3 text-muted-foreground flex-shrink-0 mt-0.5"
                          strokeWidth={1.75}
                        />
                        <p className="text-xs text-muted-foreground max-w-[200px] truncate">
                          {row.address}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-sm font-semibold">{row.items}</span>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="outline"
                        className={`text-[10px] px-2 py-0.5 ${
                          row.priority === "express"
                            ? "border-orange-300 text-orange-600 bg-orange-50"
                            : "border-border text-muted-foreground"
                        }`}
                      >
                        {row.priority}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <StatBadge status={row.status} />
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground hidden lg:table-cell">
                      {row.scheduledTime}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs gap-1"
                        onClick={() =>
                          navigate({ to: `/delivery/detail/${row.id}` })
                        }
                        data-ocid={`delivery.view.button.${index + 1}`}
                      >
                        <Eye className="w-3 h-3" />
                        View
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div
                className="flex flex-col items-center justify-center py-16"
                data-ocid="delivery.table.empty_state"
              >
                <PackageIcon className="w-10 h-10 text-muted-foreground mb-3" />
                <p className="text-sm font-medium text-foreground">
                  No deliveries found
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  No deliveries match the selected filter
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </DarkSidebarLayout>
  );
}

function PackageIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}
