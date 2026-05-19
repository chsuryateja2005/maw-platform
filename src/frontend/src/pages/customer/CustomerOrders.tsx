import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LightLayout } from "@/layouts/LightLayout";
import {
  ArrowRight,
  CalendarDays,
  Package,
  ReceiptText,
  Truck,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

const ORDERS = [
  {
    id: "ord-001",
    orderId: "MAW-2026-00147",
    date: "May 14, 2026",
    items: 3,
    total: 111.87,
    status: "Delivered",
    color: "from-amber-400 to-orange-500",
  },
  {
    id: "ord-002",
    orderId: "MAW-2026-00131",
    date: "May 7, 2026",
    items: 1,
    total: 79.99,
    status: "Shipped",
    color: "from-blue-400 to-indigo-500",
  },
  {
    id: "ord-003",
    orderId: "MAW-2026-00115",
    date: "Apr 28, 2026",
    items: 2,
    total: 47.98,
    status: "Processing",
    color: "from-violet-400 to-purple-500",
  },
  {
    id: "ord-004",
    orderId: "MAW-2026-00098",
    date: "Apr 15, 2026",
    items: 4,
    total: 134.95,
    status: "Delivered",
    color: "from-teal-400 to-cyan-500",
  },
  {
    id: "ord-005",
    orderId: "MAW-2026-00072",
    date: "Mar 30, 2026",
    items: 2,
    total: 68.49,
    status: "Cancelled",
    color: "from-rose-400 to-red-500",
  },
];

const STATUS_STYLE: Record<string, string> = {
  Delivered: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Shipped: "bg-blue-100 text-blue-700 border-blue-200",
  Processing: "bg-amber-100 text-amber-700 border-amber-200",
  Cancelled: "bg-rose-100 text-rose-700 border-rose-200",
};

export default function CustomerOrders() {
  return (
    <LightLayout cartCount={3}>
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="flex items-center gap-3 mb-6">
          <ReceiptText className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold font-display text-foreground">
            My Orders
          </h1>
        </div>

        <div className="space-y-4">
          {ORDERS.map((order, i) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              data-ocid={`orders.item.${i + 1}`}
            >
              <Card className="p-5 border-border hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${order.color} flex items-center justify-center flex-shrink-0`}
                  >
                    <Package className="w-7 h-7 text-white/80" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        <p className="font-bold text-foreground text-sm">
                          {order.orderId}
                        </p>
                        <div className="flex items-center gap-3 mt-0.5 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <CalendarDays className="w-3 h-3" />
                            {order.date}
                          </span>
                          <span>
                            {order.items} {order.items === 1 ? "item" : "items"}
                          </span>
                        </div>
                      </div>
                      <Badge
                        className={`text-xs border ${STATUS_STYLE[order.status]}`}
                      >
                        {order.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="font-bold text-foreground">
                        ${order.total.toFixed(2)}
                      </span>
                      <div className="flex gap-2">
                        {order.status !== "Cancelled" &&
                          order.status !== "Delivered" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs gap-1"
                              data-ocid={`orders.item.${i + 1}.track_button`}
                              onClick={() =>
                                toast.info(`Tracking ${order.orderId}`)
                              }
                            >
                              <Truck className="w-3 h-3" />
                              Track Order
                            </Button>
                          )}
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-xs gap-1 text-primary"
                          data-ocid={`orders.item.${i + 1}.details_button`}
                          onClick={() =>
                            toast.info(`Opening details for ${order.orderId}`)
                          }
                        >
                          View Details <ArrowRight className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </LightLayout>
  );
}
