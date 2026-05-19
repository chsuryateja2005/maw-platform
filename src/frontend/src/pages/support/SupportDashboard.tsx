import { KpiCard } from "@/components/ui/KpiCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatBadge } from "@/components/ui/StatBadge";
import { Button } from "@/components/ui/button";
import { LightSidebarLayout } from "@/layouts/LightSidebarLayout";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  HeadphonesIcon,
  LayoutDashboard,
  MessageSquare,
  TicketCheck,
} from "lucide-react";
import { motion } from "motion/react";

export const SUPPORT_NAV = [
  { label: "Dashboard", href: "/support", icon: LayoutDashboard },
  { label: "Tickets", href: "/support/tickets", icon: TicketCheck },
  { label: "Live Chat", href: "/support/chat", icon: MessageSquare },
];

const RECENT_TICKETS = [
  {
    id: "TKT-2841",
    customer: "Rohan Mehta",
    subject: "Order not delivered after 7 days",
    priority: "urgent",
    status: "open",
    created: "2h ago",
  },
  {
    id: "TKT-2840",
    customer: "Aisha Khan",
    subject: "Wrong item shipped in order #4420",
    priority: "high",
    status: "in_progress",
    created: "4h ago",
  },
  {
    id: "TKT-2839",
    customer: "Sam Patel",
    subject: "Refund not credited after cancellation",
    priority: "medium",
    status: "in_progress",
    created: "1d ago",
  },
  {
    id: "TKT-2838",
    customer: "Neha Gupta",
    subject: "Product stopped working after 2 days",
    priority: "high",
    status: "open",
    created: "1d ago",
  },
  {
    id: "TKT-2837",
    customer: "Vijay Sharma",
    subject: "Discount code not applying at checkout",
    priority: "low",
    status: "resolved",
    created: "2d ago",
  },
  {
    id: "TKT-2836",
    customer: "Priya Nair",
    subject: "Duplicate charge on credit card",
    priority: "urgent",
    status: "open",
    created: "3d ago",
  },
];

const PRIORITY_VARIANT = {
  urgent: "danger" as const,
  high: "warning" as const,
  medium: "info" as const,
  low: "muted" as const,
};

export function SupportPortal() {
  const navigate = useNavigate();

  return (
    <LightSidebarLayout
      portalName="Support Center"
      portalLogo={HeadphonesIcon}
      navItems={SUPPORT_NAV}
      userLabel="Priya Desai"
      userSubLabel="Support Agent"
    >
      <PageHeader
        title="Support Dashboard"
        subtitle="Customer tickets, SLA management, and resolution tracking"
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <KpiCard
          label="Open Tickets"
          value={47}
          icon={AlertCircle}
          accentColor="text-red-500"
        />
        <KpiCard
          label="Resolved Today"
          value={23}
          icon={CheckCircle2}
          accentColor="text-emerald-600"
          trend={12}
          trendLabel="vs yesterday"
        />
        <KpiCard
          label="Avg Response Time"
          value={4.2}
          icon={Clock}
          suffix="h"
          accentColor="text-primary"
          trend={-8}
          trendLabel="faster"
        />
      </div>

      {/* Recent Tickets */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.35 }}
        className="bg-white border border-border rounded-xl mb-6"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-sm font-semibold text-foreground">
            Recent Tickets
          </h2>
          <Button
            variant="ghost"
            size="sm"
            data-ocid="dashboard.view_all_tickets.button"
            onClick={() => navigate({ to: "/support/tickets" })}
          >
            View All
          </Button>
        </div>
        <div className="divide-y divide-border">
          {RECENT_TICKETS.map((ticket, i) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              tabIndex={0}
              data-ocid={`dashboard.ticket.item.${i + 1}`}
              className="flex items-center gap-4 px-5 py-3.5 hover:bg-muted/40 transition-colors cursor-pointer"
              onClick={() => navigate({ to: `/support/tickets/${ticket.id}` })}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                navigate({ to: `/support/tickets/${ticket.id}` })
              }
            >
              <span className="text-xs font-mono text-muted-foreground w-20 shrink-0">
                {ticket.id}
              </span>
              <span className="text-sm font-medium text-foreground w-32 shrink-0 truncate">
                {ticket.customer}
              </span>
              <span className="text-sm text-muted-foreground flex-1 min-w-0 truncate">
                {ticket.subject}
              </span>
              <StatBadge
                status={ticket.priority}
                variant={
                  PRIORITY_VARIANT[
                    ticket.priority as keyof typeof PRIORITY_VARIANT
                  ]
                }
                className="shrink-0"
              />
              <StatBadge status={ticket.status} className="shrink-0" />
              <span className="text-xs text-muted-foreground w-14 text-right shrink-0">
                {ticket.created}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-3"
      >
        <Button
          data-ocid="dashboard.view_all_tickets_cta.button"
          onClick={() => navigate({ to: "/support/tickets" })}
        >
          <TicketCheck className="w-4 h-4 mr-2" />
          View All Tickets
        </Button>
        <Button
          variant="outline"
          data-ocid="dashboard.start_live_chat.button"
          onClick={() => navigate({ to: "/support/chat" })}
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          Start Live Chat
        </Button>
      </motion.div>
    </LightSidebarLayout>
  );
}
