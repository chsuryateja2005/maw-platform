import { KpiCard } from "@/components/ui/KpiCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatBadge } from "@/components/ui/StatBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DarkSidebarLayout } from "@/layouts/DarkSidebarLayout";
import { DeliveryStatus } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  Eye,
  LayoutDashboard,
  MapPin,
  PackageCheck,
  Truck,
} from "lucide-react";
import { motion } from "motion/react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/delivery", icon: LayoutDashboard },
  { label: "Deliveries", href: "/delivery/list", icon: Truck },
];

const TREND_DATA = [
  { day: "Mon", deliveries: 14 },
  { day: "Tue", deliveries: 18 },
  { day: "Wed", deliveries: 12 },
  { day: "Thu", deliveries: 21 },
  { day: "Fri", deliveries: 16 },
  { day: "Sat", deliveries: 9 },
  { day: "Sun", deliveries: 18 },
];

const ASSIGNED_DELIVERIES = [
  {
    id: "DLV-2847",
    customer: "Riya Patel",
    address: "42 Elm Street, Andheri West, Mumbai 400058",
    items: 3,
    priority: "express" as const,
    status: DeliveryStatus.assigned,
  },
  {
    id: "DLV-2848",
    customer: "Arjun Mehta",
    address: "7 Rose Garden Colony, Bandra East, Mumbai 400051",
    items: 1,
    priority: "standard" as const,
    status: DeliveryStatus.in_transit,
  },
  {
    id: "DLV-2849",
    customer: "Sunita Sharma",
    address: "15 Park View Apartments, Powai, Mumbai 400076",
    items: 5,
    priority: "express" as const,
    status: DeliveryStatus.assigned,
  },
  {
    id: "DLV-2850",
    customer: "Deepak Nair",
    address: "88 MG Road, Malad West, Mumbai 400064",
    items: 2,
    priority: "standard" as const,
    status: DeliveryStatus.assigned,
  },
  {
    id: "DLV-2851",
    customer: "Priya Verma",
    address: "3B Lotus Tower, Vikhroli, Mumbai 400083",
    items: 4,
    priority: "express" as const,
    status: DeliveryStatus.in_transit,
  },
  {
    id: "DLV-2852",
    customer: "Kiran Joshi",
    address: "22 Silver Line Road, Borivali North, Mumbai 400066",
    items: 2,
    priority: "standard" as const,
    status: DeliveryStatus.assigned,
  },
];

export function DeliveryPortal() {
  const navigate = useNavigate();

  return (
    <DarkSidebarLayout
      portalName="Delivery Portal"
      portalLogo={Truck}
      navItems={NAV_ITEMS}
      userLabel="Rahul Delivery"
      userSubLabel="Delivery Agent"
    >
      <PageHeader
        title="My Dashboard"
        subtitle="Today's deliveries and performance overview"
      />

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard
          label="Today's Deliveries"
          value={18}
          icon={PackageCheck}
          trend={12}
          trendLabel="vs yesterday"
          accentColor="text-indigo-600"
        />
        <KpiCard
          label="Completed"
          value={11}
          icon={PackageCheck}
          trend={8}
          trendLabel="vs yesterday"
          accentColor="text-emerald-600"
        />
        <KpiCard
          label="In Transit"
          value={4}
          icon={Truck}
          accentColor="text-amber-600"
        />
        <KpiCard
          label="Failed"
          value={3}
          icon={MapPin}
          trend={-5}
          trendLabel="vs yesterday"
          accentColor="text-red-600"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        {/* Daily Trend Chart */}
        <Card className="xl:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Daily Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={TREND_DATA} barSize={20}>
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    background: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: 8,
                    color: "#f1f5f9",
                    fontSize: 12,
                  }}
                  cursor={{ fill: "rgba(99,102,241,0.08)" }}
                />
                <Bar
                  dataKey="deliveries"
                  fill="#6366f1"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Route Summary */}
        <Card className="xl:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">
              Route Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  label: "Pending Start",
                  value: "6",
                  color: "text-indigo-600",
                },
                { label: "On Route", value: "4", color: "text-amber-600" },
                { label: "Done Today", value: "11", color: "text-emerald-600" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="text-center p-3 bg-muted/40 rounded-lg"
                >
                  <p className={`text-2xl font-bold font-display ${s.color}`}>
                    {s.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
            <div className="pt-1">
              <p className="text-xs text-muted-foreground mb-1.5">
                Completion Rate
              </p>
              <div className="w-full bg-muted rounded-full h-2">
                <motion.div
                  className="bg-indigo-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "61%" }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">61% (11/18)</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assigned Deliveries List */}
      <div data-ocid="delivery.assigned.list">
        <h2 className="text-base font-semibold text-foreground mb-3">
          Assigned Deliveries
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {ASSIGNED_DELIVERIES.map((d, index) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.07 }}
            >
              <Card
                className="hover:shadow-md transition-shadow duration-200"
                data-ocid={`delivery.assigned.item.${index + 1}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="min-w-0">
                      <p className="text-xs font-mono text-muted-foreground">
                        {d.id}
                      </p>
                      <p className="font-semibold text-sm text-foreground truncate">
                        {d.customer}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <StatBadge status={d.status} />
                      <Badge
                        variant="outline"
                        className={`text-[10px] px-1.5 py-0 ${
                          d.priority === "express"
                            ? "border-orange-300 text-orange-600 bg-orange-50"
                            : "border-border text-muted-foreground"
                        }`}
                      >
                        {d.priority}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-start gap-1.5 mb-3">
                    <MapPin
                      className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0 mt-0.5"
                      strokeWidth={1.75}
                    />
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {d.address}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {d.items} item{d.items > 1 ? "s" : ""}
                    </span>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs gap-1"
                      onClick={() =>
                        navigate({ to: `/delivery/detail/${d.id}` })
                      }
                      data-ocid={`delivery.view_details.button.${index + 1}`}
                    >
                      <Eye className="w-3 h-3" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </DarkSidebarLayout>
  );
}
