import { PageHeader } from "@/components/ui/PageHeader";
import { StatBadge } from "@/components/ui/StatBadge";
import { DarkSidebarLayout } from "@/layouts/DarkSidebarLayout";
import { AlertTriangle, Check, LayoutDashboard, X } from "lucide-react";
import { motion } from "motion/react";
import { NAV_ITEMS } from "./adminNav";

interface RoleRow {
  id: string;
  role: string;
  viewProducts: boolean;
  manageOrders: boolean;
  approveVendors: boolean;
  viewAnalytics: boolean;
  manageUsers: boolean;
  systemSettings: boolean;
}

const ROLES: RoleRow[] = [
  {
    id: "role-admin",
    role: "Super Admin",
    viewProducts: true,
    manageOrders: true,
    approveVendors: true,
    viewAnalytics: true,
    manageUsers: true,
    systemSettings: true,
  },
  {
    id: "role-manager",
    role: "Manager",
    viewProducts: true,
    manageOrders: true,
    approveVendors: true,
    viewAnalytics: true,
    manageUsers: false,
    systemSettings: false,
  },
  {
    id: "role-vendor",
    role: "Vendor",
    viewProducts: true,
    manageOrders: false,
    approveVendors: false,
    viewAnalytics: false,
    manageUsers: false,
    systemSettings: false,
  },
  {
    id: "role-delivery",
    role: "Delivery Agent",
    viewProducts: false,
    manageOrders: true,
    approveVendors: false,
    viewAnalytics: false,
    manageUsers: false,
    systemSettings: false,
  },
  {
    id: "role-support",
    role: "Support",
    viewProducts: true,
    manageOrders: true,
    approveVendors: false,
    viewAnalytics: false,
    manageUsers: false,
    systemSettings: false,
  },
  {
    id: "role-customer",
    role: "Customer",
    viewProducts: true,
    manageOrders: false,
    approveVendors: false,
    viewAnalytics: false,
    manageUsers: false,
    systemSettings: false,
  },
];

const PERMISSION_COLS: { key: keyof RoleRow; label: string }[] = [
  { key: "viewProducts", label: "View Products" },
  { key: "manageOrders", label: "Manage Orders" },
  { key: "approveVendors", label: "Approve Vendors" },
  { key: "viewAnalytics", label: "Analytics" },
  { key: "manageUsers", label: "Manage Users" },
  { key: "systemSettings", label: "System Settings" },
];

type LogStatus = "success" | "failed" | "warning";

interface LogRow {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  ip: string;
  status: LogStatus;
}

const ACTIVITY_LOG: LogRow[] = [
  {
    id: "log-001",
    timestamp: "2026-05-19 14:32:07",
    user: "admin@maw.io",
    action: "Vendor approved: TechGear Solutions",
    ip: "192.168.1.10",
    status: "success",
  },
  {
    id: "log-002",
    timestamp: "2026-05-19 14:28:41",
    user: "admin@maw.io",
    action: "Login via Internet Identity",
    ip: "192.168.1.10",
    status: "success",
  },
  {
    id: "log-003",
    timestamp: "2026-05-19 13:57:12",
    user: "manager@maw.io",
    action: "Failed login attempt (wrong passphrase)",
    ip: "203.0.113.54",
    status: "failed",
  },
  {
    id: "log-004",
    timestamp: "2026-05-19 13:44:05",
    user: "support@maw.io",
    action: "Ticket #TK-2049 escalated to manager",
    ip: "10.0.0.22",
    status: "warning",
  },
  {
    id: "log-005",
    timestamp: "2026-05-19 13:11:38",
    user: "vendor@techgear.io",
    action: "Product batch uploaded (128 SKUs)",
    ip: "198.51.100.9",
    status: "success",
  },
  {
    id: "log-006",
    timestamp: "2026-05-19 12:49:02",
    user: "admin@maw.io",
    action: "Security policy updated",
    ip: "192.168.1.10",
    status: "success",
  },
  {
    id: "log-007",
    timestamp: "2026-05-19 12:30:17",
    user: "delivery@maw.io",
    action: "Order #ORD-48291 marked delivered",
    ip: "172.16.0.5",
    status: "success",
  },
  {
    id: "log-008",
    timestamp: "2026-05-19 11:58:44",
    user: "unknown",
    action: "Brute force attempt detected (blocked)",
    ip: "45.33.32.156",
    status: "failed",
  },
  {
    id: "log-009",
    timestamp: "2026-05-19 11:20:33",
    user: "manager@maw.io",
    action: "Report exported: May 2026 Sales",
    ip: "10.0.0.22",
    status: "success",
  },
  {
    id: "log-010",
    timestamp: "2026-05-19 10:44:19",
    user: "admin@maw.io",
    action: "New warehouse IN-05 registered",
    ip: "192.168.1.10",
    status: "warning",
  },
];

const LOG_STATUS_ICON: Record<LogStatus, React.ReactNode> = {
  success: <Check className="w-3.5 h-3.5" />,
  failed: <X className="w-3.5 h-3.5" />,
  warning: <AlertTriangle className="w-3.5 h-3.5" />,
};

function PermCell({ value }: { value: boolean }) {
  return value ? (
    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-600">
      <Check className="w-3 h-3" />
    </span>
  ) : (
    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-muted text-muted-foreground/40">
      <X className="w-3 h-3" />
    </span>
  );
}

function AdminSecurityContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <PageHeader
        title="Security"
        subtitle="Role permissions and platform activity monitoring"
      />

      {/* Roles Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05 }}
        className="bg-card border border-border rounded-xl overflow-x-auto mb-8"
        data-ocid="security.roles.table"
      >
        <div className="px-5 py-4 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">
            Role Permissions
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Access control matrix for all user roles
          </p>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/40 border-b border-border">
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Role
              </th>
              {PERMISSION_COLS.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROLES.map((row, i) => (
              <motion.tr
                key={row.id}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: i * 0.04 }}
                className="border-b border-border/50 hover:bg-primary/5 transition-colors"
                data-ocid={`security.roles.item.${i + 1}`}
              >
                <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                  {row.role}
                </td>
                {PERMISSION_COLS.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-center">
                    <PermCell value={row[col.key] as boolean} />
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Activity Log */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.15 }}
        className="bg-card border border-border rounded-xl overflow-x-auto"
        data-ocid="security.activity.table"
      >
        <div className="px-5 py-4 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">
            Activity Log
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Recent platform events and authentication activity
          </p>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/40 border-b border-border">
              {["Timestamp", "User", "Action", "IP Address", "Status"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {ACTIVITY_LOG.map((log, i) => (
              <motion.tr
                key={log.id}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: 0.15 + i * 0.03 }}
                className="border-b border-border/50 hover:bg-primary/5 transition-colors"
                data-ocid={`security.activity.item.${i + 1}`}
              >
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground whitespace-nowrap">
                  {log.timestamp}
                </td>
                <td className="px-4 py-3 text-foreground max-w-[160px] truncate">
                  {log.user}
                </td>
                <td className="px-4 py-3 text-muted-foreground max-w-[260px] truncate">
                  {log.action}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground whitespace-nowrap">
                  {log.ip}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border ${
                      log.status === "success"
                        ? "bg-emerald-500/10 text-emerald-700 border-emerald-200"
                        : log.status === "failed"
                          ? "bg-red-500/10 text-red-700 border-red-200"
                          : "bg-amber-500/10 text-amber-700 border-amber-200"
                    }`}
                  >
                    {LOG_STATUS_ICON[log.status]}
                    {log.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
}

export function AdminSecurity() {
  return (
    <DarkSidebarLayout
      portalName="Admin Portal"
      portalLogo={LayoutDashboard}
      navItems={NAV_ITEMS}
      userLabel="Admin User"
      userSubLabel="Super Administrator"
    >
      <AdminSecurityContent />
    </DarkSidebarLayout>
  );
}
