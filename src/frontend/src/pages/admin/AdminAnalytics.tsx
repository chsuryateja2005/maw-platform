import { PageHeader } from "@/components/ui/PageHeader";
import { DarkSidebarLayout } from "@/layouts/DarkSidebarLayout";
import { LayoutDashboard } from "lucide-react";
import { motion } from "motion/react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { NAV_ITEMS } from "./adminNav";

const revenueData = [
  { month: "Jan", revenue: 38400 },
  { month: "Feb", revenue: 52100 },
  { month: "Mar", revenue: 47800 },
  { month: "Apr", revenue: 61200 },
  { month: "May", revenue: 74900 },
  { month: "Jun", revenue: 89300 },
];

const weeklyData = [
  { day: "Mon", orders: 142 },
  { day: "Tue", orders: 198 },
  { day: "Wed", orders: 165 },
  { day: "Thu", orders: 237 },
  { day: "Fri", orders: 312 },
  { day: "Sat", orders: 280 },
  { day: "Sun", orders: 194 },
];

const userGrowth = Array.from({ length: 30 }, (_, idx) => ({
  day: `${idx + 1}`,
  users: 9800 + Math.round(idx * 97 + Math.sin(idx * 0.6) * 120),
}));

const pieData = [
  { name: "Phone Cases", value: 42 },
  { name: "Chargers & Cables", value: 18 },
  { name: "Power Banks", value: 14 },
  { name: "Earphones", value: 16 },
  { name: "Accessories", value: 10 },
];

const PIE_COLORS = ["#6366f1", "#8b5cf6", "#06b6d4", "#10b981", "#94a3b8"];

const tooltipStyle = {
  background: "#fff",
  border: "1px solid #e2e8f0",
  borderRadius: 8,
  fontSize: 12,
};

function ChartCard({
  title,
  delay,
  ocid,
  children,
}: { title: string; delay: number; ocid: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, delay }}
      className="bg-card border border-border rounded-xl p-5"
      data-ocid={ocid}
    >
      <h3 className="text-sm font-semibold text-foreground mb-4">{title}</h3>
      {children}
    </motion.div>
  );
}

function AdminAnalyticsContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <PageHeader
        title="Analytics"
        subtitle="Revenue, sales trends, and platform growth metrics"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Revenue (Jan – Jun 2026)"
          delay={0.05}
          ocid="analytics.revenue.card"
        >
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={revenueData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(148,163,184,0.12)"
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => `₹${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(v: number) => [
                  `₹${v.toLocaleString("en-IN")}`,
                  "Revenue",
                ]}
                contentStyle={tooltipStyle}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#6366f1"
                strokeWidth={2.5}
                dot={{ r: 4, fill: "#6366f1", strokeWidth: 0 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Weekly Orders"
          delay={0.12}
          ocid="analytics.weekly_orders.card"
        >
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(148,163,184,0.12)"
              />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(v: number) => [v.toLocaleString("en-IN"), "Orders"]}
                contentStyle={tooltipStyle}
              />
              <Bar dataKey="orders" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="User Growth (Last 30 Days)"
          delay={0.19}
          ocid="analytics.user_growth.card"
        >
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={userGrowth}>
              <defs>
                <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(148,163,184,0.12)"
              />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 10, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
                interval={4}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
                domain={["auto", "auto"]}
              />
              <Tooltip
                formatter={(v: number) => [v.toLocaleString("en-IN"), "Users"]}
                contentStyle={tooltipStyle}
              />
              <Area
                type="monotone"
                dataKey="users"
                stroke="#06b6d4"
                strokeWidth={2}
                fill="url(#userGrad)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Sales by Category"
          delay={0.26}
          ocid="analytics.category_pie.card"
        >
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="45%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={PIE_COLORS[index % PIE_COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Tooltip
                formatter={(v: number) => [`${v}%`, "Share"]}
                contentStyle={tooltipStyle}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </motion.div>
  );
}

export function AdminAnalytics() {
  return (
    <DarkSidebarLayout
      portalName="Admin Portal"
      portalLogo={LayoutDashboard}
      navItems={NAV_ITEMS}
      userLabel="Admin User"
      userSubLabel="Super Administrator"
    >
      <AdminAnalyticsContent />
    </DarkSidebarLayout>
  );
}
