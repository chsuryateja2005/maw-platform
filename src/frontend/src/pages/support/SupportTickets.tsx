import { PageHeader } from "@/components/ui/PageHeader";
import { StatBadge } from "@/components/ui/StatBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LightSidebarLayout } from "@/layouts/LightSidebarLayout";
import { useNavigate } from "@tanstack/react-router";
import { Eye, HeadphonesIcon, Search, XCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { SUPPORT_NAV } from "./SupportDashboard";

const ALL_TICKETS = [
  {
    id: "TKT-2841",
    customer: "Rohan Mehta",
    subject: "Order not delivered after 7 days",
    priority: "urgent",
    status: "open",
    category: "Complaint",
    createdAt: "19 May 2026, 09:14",
    lastReply: "2h ago",
  },
  {
    id: "TKT-2840",
    customer: "Aisha Khan",
    subject: "Wrong item shipped in order #4420",
    priority: "high",
    status: "in_progress",
    category: "Complaint",
    createdAt: "19 May 2026, 07:02",
    lastReply: "4h ago",
  },
  {
    id: "TKT-2839",
    customer: "Sam Patel",
    subject: "Refund not credited after cancellation",
    priority: "medium",
    status: "in_progress",
    category: "Refund",
    createdAt: "18 May 2026, 14:30",
    lastReply: "6h ago",
  },
  {
    id: "TKT-2838",
    customer: "Neha Gupta",
    subject: "Product stopped working after 2 days",
    priority: "high",
    status: "open",
    category: "Technical",
    createdAt: "18 May 2026, 11:45",
    lastReply: "1d ago",
  },
  {
    id: "TKT-2837",
    customer: "Vijay Sharma",
    subject: "Discount code not applying at checkout",
    priority: "low",
    status: "resolved",
    category: "General",
    createdAt: "17 May 2026, 16:20",
    lastReply: "2d ago",
  },
  {
    id: "TKT-2836",
    customer: "Priya Nair",
    subject: "Duplicate charge on credit card",
    priority: "urgent",
    status: "open",
    category: "Refund",
    createdAt: "17 May 2026, 09:55",
    lastReply: "2d ago",
  },
  {
    id: "TKT-2835",
    customer: "Amit Bose",
    subject: "App crashes during payment step",
    priority: "high",
    status: "closed",
    category: "Technical",
    createdAt: "16 May 2026, 18:40",
    lastReply: "3d ago",
  },
  {
    id: "TKT-2834",
    customer: "Sunita Rao",
    subject: "Unable to update delivery address",
    priority: "medium",
    status: "resolved",
    category: "General",
    createdAt: "16 May 2026, 13:12",
    lastReply: "3d ago",
  },
  {
    id: "TKT-2833",
    customer: "Karan Malhotra",
    subject: "Received damaged packaging",
    priority: "medium",
    status: "in_progress",
    category: "Complaint",
    createdAt: "15 May 2026, 10:30",
    lastReply: "4d ago",
  },
  {
    id: "TKT-2832",
    customer: "Deepa Iyer",
    subject: "Account locked after password reset",
    priority: "high",
    status: "open",
    category: "Technical",
    createdAt: "15 May 2026, 08:00",
    lastReply: "4d ago",
  },
  {
    id: "TKT-2831",
    customer: "Rahul Joshi",
    subject: "Invoice not matching order total",
    priority: "low",
    status: "resolved",
    category: "Refund",
    createdAt: "14 May 2026, 17:45",
    lastReply: "5d ago",
  },
  {
    id: "TKT-2830",
    customer: "Meera Pillai",
    subject: "Product description misleading",
    priority: "low",
    status: "closed",
    category: "General",
    createdAt: "14 May 2026, 12:00",
    lastReply: "5d ago",
  },
];

const FILTERS = ["All", "Open", "In Progress", "Resolved"] as const;
type Filter = (typeof FILTERS)[number];

const PRIORITY_VARIANT = {
  urgent: "danger" as const,
  high: "warning" as const,
  medium: "info" as const,
  low: "muted" as const,
};

export function SupportTickets() {
  const [filter, setFilter] = useState<Filter>("All");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = ALL_TICKETS.filter((t) => {
    const matchesFilter =
      filter === "All" ||
      (filter === "Open" && t.status === "open") ||
      (filter === "In Progress" && t.status === "in_progress") ||
      (filter === "Resolved" && t.status === "resolved");
    const matchesSearch =
      search === "" ||
      t.customer.toLowerCase().includes(search.toLowerCase()) ||
      t.subject.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <LightSidebarLayout
      portalName="Support Center"
      portalLogo={HeadphonesIcon}
      navItems={SUPPORT_NAV}
      userLabel="Priya Desai"
      userSubLabel="Support Agent"
    >
      <PageHeader
        title="All Tickets"
        subtitle={`${ALL_TICKETS.length} total tickets across all categories`}
      />

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-1 bg-white border border-border rounded-lg p-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              data-ocid={`tickets.filter.${f.toLowerCase().replace(" ", "_")}.tab`}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              }`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            className="pl-8 w-60 h-8 text-sm"
            placeholder="Search tickets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-ocid="tickets.search_input"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Ticket ID
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Customer
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Subject
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Priority
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Category
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Created
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Last Reply
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <AnimatePresence mode="popLayout">
                {filtered.map((ticket, i) => (
                  <motion.tr
                    key={ticket.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.03 }}
                    tabIndex={0}
                    data-ocid={`tickets.row.item.${i + 1}`}
                    className="hover:bg-muted/30 transition-colors cursor-pointer"
                    onClick={() =>
                      navigate({ to: `/support/tickets/${ticket.id}` })
                    }
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      navigate({ to: `/support/tickets/${ticket.id}` })
                    }
                  >
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                      {ticket.id}
                    </td>
                    <td className="px-4 py-3 font-medium text-foreground">
                      {ticket.customer}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground max-w-[200px] truncate">
                      {ticket.subject}
                    </td>
                    <td className="px-4 py-3">
                      <StatBadge
                        status={ticket.priority}
                        variant={
                          PRIORITY_VARIANT[
                            ticket.priority as keyof typeof PRIORITY_VARIANT
                          ]
                        }
                      />
                    </td>
                    <td className="px-4 py-3">
                      <StatBadge status={ticket.status} />
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {ticket.category}
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                      {ticket.createdAt}
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">
                      {ticket.lastReply}
                    </td>
                    <td className="px-4 py-3">
                      <div
                        className="flex items-center gap-1"
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={() => {}}
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          data-ocid={`tickets.view_button.${i + 1}`}
                          onClick={() =>
                            navigate({ to: `/support/tickets/${ticket.id}` })
                          }
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-destructive hover:text-destructive"
                          data-ocid={`tickets.close_button.${i + 1}`}
                          onClick={() =>
                            toast.success(`Ticket ${ticket.id} closed`)
                          }
                        >
                          <XCircle className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div
              className="py-12 text-center text-muted-foreground text-sm"
              data-ocid="tickets.empty_state"
            >
              No tickets match your filters.
            </div>
          )}
        </div>
      </div>
    </LightSidebarLayout>
  );
}
