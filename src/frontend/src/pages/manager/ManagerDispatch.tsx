import { PageHeader } from "@/components/ui/PageHeader";
import { StatBadge } from "@/components/ui/StatBadge";
import { Button } from "@/components/ui/button";
import { DarkSidebarLayout } from "@/layouts/DarkSidebarLayout";
import { CheckCircle2, Clock, Package, SendHorizonal } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { managerNavItems } from "./managerNavItems";

const DELIVERY_AGENTS = [
  "James Okonkwo",
  "Priya Mehta",
  "Carlos Ruiz",
  "Nina Volkova",
  "David Tan",
  "Aisha Balogun",
];

interface DispatchOrder {
  id: string;
  customer: string;
  items: number;
  address: string;
  weight: string;
}

const READY_ORDERS: DispatchOrder[] = [
  {
    id: "ORD-77342",
    customer: "Emma Thompson",
    items: 3,
    address: "142 Oak Ave, Portland OR 97201",
    weight: "2.4 kg",
  },
  {
    id: "ORD-77351",
    customer: "Marcus Johnson",
    items: 1,
    address: "89 Harbor Blvd, San Diego CA 92101",
    weight: "0.8 kg",
  },
  {
    id: "ORD-77368",
    customer: "Fatima Al-Rashid",
    items: 5,
    address: "311 Maple St, Austin TX 78701",
    weight: "6.1 kg",
  },
  {
    id: "ORD-77374",
    customer: "Liam Chen",
    items: 2,
    address: "55 Pine Rd, Boston MA 02101",
    weight: "1.9 kg",
  },
  {
    id: "ORD-77382",
    customer: "Sofia Martinez",
    items: 4,
    address: "220 River Ln, Miami FL 33101",
    weight: "4.3 kg",
  },
  {
    id: "ORD-77390",
    customer: "Noah Williams",
    items: 2,
    address: "18 Summit Dr, Denver CO 80201",
    weight: "3.0 kg",
  },
];

interface RecentDispatch {
  id: string;
  agent: string;
  dispatchedAt: string;
  status: string;
  orderId: string;
}

const RECENT_DISPATCHES: RecentDispatch[] = [
  {
    id: "DSP-0041",
    orderId: "ORD-77290",
    agent: "James Okonkwo",
    dispatchedAt: "2026-05-18 09:14",
    status: "in_transit",
  },
  {
    id: "DSP-0040",
    orderId: "ORD-77281",
    agent: "Priya Mehta",
    dispatchedAt: "2026-05-18 08:52",
    status: "delivered",
  },
  {
    id: "DSP-0039",
    orderId: "ORD-77273",
    agent: "David Tan",
    dispatchedAt: "2026-05-17 17:30",
    status: "delivered",
  },
  {
    id: "DSP-0038",
    orderId: "ORD-77261",
    agent: "Carlos Ruiz",
    dispatchedAt: "2026-05-17 15:12",
    status: "in_transit",
  },
  {
    id: "DSP-0037",
    orderId: "ORD-77249",
    agent: "Nina Volkova",
    dispatchedAt: "2026-05-17 11:05",
    status: "delivered",
  },
];

export function ManagerDispatchPortal() {
  return (
    <DarkSidebarLayout
      portalName="Warehouse Manager"
      portalLogo={Package}
      navItems={managerNavItems}
      userLabel="Alex Reyes"
      userSubLabel="Warehouse Manager"
    >
      <ManagerDispatch />
    </DarkSidebarLayout>
  );
}

export default function ManagerDispatch() {
  const [assignments, setAssignments] = useState<Record<string, string>>(
    Object.fromEntries(READY_ORDERS.map((o) => [o.id, ""])),
  );
  const [dispatched, setDispatched] = useState<Set<string>>(new Set());

  function handleDispatch(orderId: string) {
    const agent = assignments[orderId];
    if (!agent) {
      toast.error("Please assign a delivery agent first.");
      return;
    }
    setDispatched((prev) => new Set([...prev, orderId]));
    toast.success(`${orderId} dispatched to ${agent}`);
  }

  const pendingOrders = READY_ORDERS.filter((o) => !dispatched.has(o.id));

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dispatch"
        subtitle="Assign delivery agents and dispatch orders to the field."
      />

      {/* Ready to Dispatch */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <SendHorizonal
            className="w-4 h-4 text-indigo-500"
            strokeWidth={1.75}
          />
          <h2 className="text-sm font-semibold text-foreground">
            Orders Ready for Dispatch
          </h2>
          <span className="ml-1 text-xs bg-indigo-500/10 text-indigo-600 border border-indigo-200 px-2 py-0.5 rounded-full font-medium">
            {pendingOrders.length} pending
          </span>
        </div>

        {pendingOrders.length === 0 ? (
          <div
            className="bg-card border border-border rounded-xl p-12 text-center"
            data-ocid="dispatch.empty_state"
          >
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
            <p className="text-foreground font-semibold mb-1">
              All orders dispatched!
            </p>
            <p className="text-sm text-muted-foreground">
              No pending orders at this time.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {pendingOrders.map((order, idx) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06, duration: 0.3 }}
                className="bg-card border border-border rounded-xl p-5 space-y-4 hover:shadow-md transition-shadow"
                data-ocid={`dispatch.order.item.${idx + 1}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-mono text-xs font-semibold text-muted-foreground">
                      {order.id}
                    </p>
                    <p className="font-semibold text-foreground mt-0.5">
                      {order.customer}
                    </p>
                  </div>
                  <span className="text-xs bg-blue-500/10 text-blue-600 border border-blue-200 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                    {order.items} item{order.items !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground leading-relaxed">
                  <p className="font-medium text-foreground/70 mb-0.5">
                    Ship to:
                  </p>
                  {order.address}
                </div>
                <div className="text-xs text-muted-foreground">
                  Weight:{" "}
                  <span className="font-medium text-foreground">
                    {order.weight}
                  </span>
                </div>

                <div className="pt-2 border-t border-border space-y-2">
                  <select
                    aria-label={`Assign delivery agent for ${order.id}`}
                    data-ocid={`dispatch.agent_select.${idx + 1}`}
                    className="w-full text-xs border border-border rounded-md px-3 py-2 bg-background text-foreground focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={assignments[order.id]}
                    onChange={(e) =>
                      setAssignments((prev) => ({
                        ...prev,
                        [order.id]: e.target.value,
                      }))
                    }
                  >
                    <option value="">— Select delivery agent —</option>
                    {DELIVERY_AGENTS.map((agent) => (
                      <option key={agent} value={agent}>
                        {agent}
                      </option>
                    ))}
                  </select>
                  <Button
                    type="button"
                    className="w-full gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"
                    size="sm"
                    onClick={() => handleDispatch(order.id)}
                    data-ocid={`dispatch.dispatch_button.${idx + 1}`}
                    disabled={!assignments[order.id]}
                  >
                    <SendHorizonal className="w-3.5 h-3.5" />
                    Dispatch Order
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Recently Dispatched */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-4 h-4 text-muted-foreground" strokeWidth={1.75} />
          <h2 className="text-sm font-semibold text-foreground">
            Recently Dispatched
          </h2>
        </div>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/40 border-b border-border">
                  {[
                    "Dispatch ID",
                    "Order ID",
                    "Delivery Agent",
                    "Dispatched At",
                    "Status",
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
                {RECENT_DISPATCHES.map((d, idx) => (
                  <tr
                    key={d.id}
                    className="border-b border-border/50 hover:bg-primary/5 transition-colors"
                    data-ocid={`dispatch.history.item.${idx + 1}`}
                  >
                    <td className="px-4 py-3 font-mono text-xs font-semibold text-foreground">
                      {d.id}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                      {d.orderId}
                    </td>
                    <td className="px-4 py-3 font-medium text-foreground">
                      {d.agent}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">
                      {d.dispatchedAt}
                    </td>
                    <td className="px-4 py-3">
                      <StatBadge status={d.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
