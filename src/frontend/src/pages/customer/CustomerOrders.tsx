import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useOrders } from "@/hooks/useQueries";
import { LightLayout } from "@/layouts/LightLayout";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Package,
  ReceiptText,
  RefreshCw,
  Truck,
  User,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const STATUS_STYLE: Record<string, string> = {
  delivered: "bg-emerald-100 text-emerald-700 border-emerald-200",
  shipped: "bg-blue-100 text-blue-700 border-blue-200",
  processing: "bg-amber-100 text-amber-700 border-amber-200",
  pending: "bg-violet-100 text-violet-700 border-violet-200",
  confirmed: "bg-violet-100 text-violet-700 border-violet-200",
  cancelled: "bg-rose-100 text-rose-700 border-rose-200",
  returned: "bg-muted text-muted-foreground border-border",
};

const TRACKING_STEPS = [
  { key: "placed", label: "Order Placed" },
  { key: "packing", label: "Packing" },
  { key: "shipped", label: "Shipped" },
  { key: "delivered", label: "Delivered" },
];

function getStepStatus(
  orderStatus: string,
  stepIndex: number,
): "completed" | "current" | "pending" {
  const statusMap: Record<string, number> = {
    pending: 0,
    confirmed: 0,
    processing: 1,
    shipped: 2,
    delivered: 3,
    cancelled: -1,
    returned: -1,
  };
  const currentStep = statusMap[orderStatus] ?? -1;
  if (currentStep === -1) return "pending";
  if (stepIndex < currentStep) return "completed";
  if (stepIndex === currentStep) return "current";
  return "pending";
}

function formatDate(ts: bigint): string {
  try {
    const d = new Date(Number(ts) / 1_000_000);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "Unknown date";
  }
}

function OrderSkeleton() {
  return (
    <Card className="p-5 border-border">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl bg-muted shimmer flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-32 bg-muted shimmer rounded" />
          <div className="h-3 w-48 bg-muted shimmer rounded" />
          <div className="h-3 w-24 bg-muted shimmer rounded" />
        </div>
      </div>
    </Card>
  );
}

interface ReturnForm {
  orderId: bigint;
  reason: string;
  description: string;
}

export default function CustomerOrders() {
  const { isAuthenticated } = useAuth();
  const { data: orders, isLoading, error } = useOrders();
  const [expandedId, setExpandedId] = useState<bigint | null>(null);
  const [returnForm, setReturnForm] = useState<ReturnForm | null>(null);
  const [returnSubmitted, setReturnSubmitted] = useState<bigint | null>(null);

  if (!isAuthenticated) {
    return (
      <LightLayout>
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-bold font-display text-foreground mb-2">
            Sign in to see your orders
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            Track your packages and view your order history
          </p>
          <Link to="/user/login" search={{ returnTo: "/user/orders" }}>
            <Button data-ocid="orders.login_button">Sign In</Button>
          </Link>
        </div>
      </LightLayout>
    );
  }

  return (
    <LightLayout>
      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Go Back */}
        <button
          type="button"
          onClick={() => window.history.back()}
          data-ocid="orders.go_back_button"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-medium py-2 px-4 rounded-lg border border-border hover:bg-muted transition-colors text-sm mb-4"
        >
          ← Go Back
        </button>

        <div className="flex items-center gap-3 mb-6">
          <ReceiptText className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold font-display text-foreground">
            My Orders &amp; Returns
          </h1>
        </div>

        {isLoading ? (
          <div className="space-y-4" data-ocid="orders.loading_state">
            <OrderSkeleton />
            <OrderSkeleton />
            <OrderSkeleton />
          </div>
        ) : error ? (
          <div
            className="flex flex-col items-center justify-center h-64 text-center"
            data-ocid="orders.error_state"
          >
            <AlertCircle className="w-16 h-16 text-destructive mb-4" />
            <h2 className="text-lg font-semibold text-foreground">
              Unable to load orders
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              Please try refreshing the page
            </p>
          </div>
        ) : orders && orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order, i) => {
              const isExpanded = expandedId === order.id;
              return (
                <motion.div
                  key={String(order.id)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  data-ocid={`orders.item.${i + 1}`}
                >
                  <Card className="border-border overflow-hidden">
                    <div className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                          <Package className="w-7 h-7 text-primary-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 flex-wrap">
                            <div>
                              <p className="font-bold text-foreground text-sm">
                                Order #{String(order.id)}
                              </p>
                              <div className="flex items-center gap-3 mt-0.5 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <CalendarDays className="w-3 h-3" />
                                  {formatDate(order.createdAt)}
                                </span>
                                <span>
                                  {order.items.length}{" "}
                                  {order.items.length === 1 ? "item" : "items"}
                                </span>
                              </div>
                            </div>
                            <Badge
                              className={`text-xs border ${STATUS_STYLE[order.status] || "bg-muted text-muted-foreground border-border"}`}
                            >
                              {order.status.charAt(0).toUpperCase() +
                                order.status.slice(1)}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <span className="font-bold text-foreground">
                              ₹{order.total.toFixed(2)}
                            </span>
                            <div className="flex gap-2">
                              {order.status === "delivered" &&
                                returnSubmitted !== order.id && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-xs gap-1 border-amber-400 text-amber-700 hover:bg-amber-50"
                                    data-ocid={`orders.item.${i + 1}.return_button`}
                                    onClick={() =>
                                      setReturnForm({
                                        orderId: order.id,
                                        reason: "",
                                        description: "",
                                      })
                                    }
                                  >
                                    <RefreshCw className="w-3 h-3" />
                                    Return
                                  </Button>
                                )}
                              {returnSubmitted === order.id && (
                                <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                                  <CheckCircle className="w-3 h-3" /> Return
                                  Requested
                                </span>
                              )}
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs gap-1"
                                data-ocid={`orders.item.${i + 1}.track_button`}
                                onClick={() =>
                                  setExpandedId(isExpanded ? null : order.id)
                                }
                              >
                                <Truck className="w-3 h-3" />
                                {isExpanded ? "Hide" : "Track"}
                                {isExpanded ? (
                                  <ChevronUp className="w-3 h-3" />
                                ) : (
                                  <ChevronDown className="w-3 h-3" />
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 border-t border-border">
                            <div className="mt-4 space-y-2">
                              {order.items.map((item, idx) => (
                                <div
                                  key={`${item.productId}-${idx}`}
                                  className="flex items-center justify-between text-sm"
                                >
                                  <span className="text-foreground">
                                    {item.name} x{String(item.quantity)}
                                  </span>
                                  <span className="text-muted-foreground">
                                    ₹
                                    {(
                                      item.price * Number(item.quantity)
                                    ).toFixed(2)}
                                  </span>
                                </div>
                              ))}
                            </div>

                            {order.status !== "cancelled" &&
                              order.status !== "returned" && (
                                <div className="mt-5">
                                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                                    Tracking Timeline
                                  </p>
                                  <div className="flex items-center">
                                    {TRACKING_STEPS.map((step, stepIdx) => {
                                      const stepStatus = getStepStatus(
                                        order.status,
                                        stepIdx,
                                      );
                                      const isLast =
                                        stepIdx === TRACKING_STEPS.length - 1;
                                      return (
                                        <div
                                          key={step.key}
                                          className="flex items-center flex-1"
                                        >
                                          <div className="flex flex-col items-center">
                                            <div
                                              className={`w-3 h-3 rounded-full ${
                                                stepStatus === "completed"
                                                  ? "bg-primary"
                                                  : stepStatus === "current"
                                                    ? "bg-primary ring-2 ring-primary/30"
                                                    : "bg-muted"
                                              }`}
                                            />
                                            <span
                                              className={`text-[10px] mt-1 font-medium ${
                                                stepStatus === "completed"
                                                  ? "text-primary"
                                                  : stepStatus === "current"
                                                    ? "text-primary font-semibold"
                                                    : "text-muted-foreground"
                                              }`}
                                            >
                                              {step.label}
                                            </span>
                                          </div>
                                          {!isLast && (
                                            <div
                                              className={`flex-1 h-0.5 mx-1 ${
                                                stepStatus === "completed"
                                                  ? "bg-primary"
                                                  : "bg-muted"
                                              }`}
                                            />
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}

                            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                              <p className="text-xs text-muted-foreground">
                                Deliver to: {order.deliveryAddress}
                              </p>
                            </div>

                            {/* Return / Replace form */}
                            {returnForm?.orderId === order.id && (
                              <div
                                className="mt-4 border border-amber-300 rounded-lg p-4"
                                style={{ backgroundColor: "#fffbeb" }}
                                data-ocid={`orders.item.${i + 1}.return_form`}
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <h4 className="text-sm font-semibold text-foreground">
                                    Return / Replace Request
                                  </h4>
                                  <button
                                    type="button"
                                    onClick={() => setReturnForm(null)}
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                    data-ocid={`orders.item.${i + 1}.return_form.close_button`}
                                    aria-label="Close return form"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                                <div className="space-y-3">
                                  <div>
                                    <label
                                      htmlFor="return-reason"
                                      className="text-xs font-medium text-foreground block mb-1"
                                    >
                                      Reason
                                    </label>
                                    <select
                                      id="return-reason"
                                      value={returnForm.reason}
                                      onChange={(e) =>
                                        setReturnForm((f) =>
                                          f
                                            ? { ...f, reason: e.target.value }
                                            : f,
                                        )
                                      }
                                      className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                                      data-ocid={`orders.item.${i + 1}.return_form.select`}
                                    >
                                      <option value="">Select a reason</option>
                                      <option value="defective">
                                        Defective / Not working
                                      </option>
                                      <option value="wrong_item">
                                        Wrong item received
                                      </option>
                                      <option value="not_as_described">
                                        Not as described
                                      </option>
                                      <option value="changed_mind">
                                        Changed my mind
                                      </option>
                                      <option value="damaged">
                                        Damaged in transit
                                      </option>
                                    </select>
                                  </div>
                                  <div>
                                    <label
                                      htmlFor="return-desc"
                                      className="text-xs font-medium text-foreground block mb-1"
                                    >
                                      Description (optional)
                                    </label>
                                    <textarea
                                      id="return-desc"
                                      value={returnForm.description}
                                      onChange={(e) =>
                                        setReturnForm((f) =>
                                          f
                                            ? {
                                                ...f,
                                                description: e.target.value,
                                              }
                                            : f,
                                        )
                                      }
                                      placeholder="Describe the issue..."
                                      rows={3}
                                      className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
                                      data-ocid={`orders.item.${i + 1}.return_form.textarea`}
                                    />
                                  </div>
                                  <div className="flex gap-2">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setReturnSubmitted(order.id);
                                        setReturnForm(null);
                                        import("sonner").then(({ toast }) => {
                                          toast.success(
                                            "Return request submitted!",
                                          );
                                        });
                                      }}
                                      disabled={!returnForm.reason}
                                      className="flex-1 py-2 px-3 text-sm font-semibold bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                      data-ocid={`orders.item.${i + 1}.return_form.submit_button`}
                                    >
                                      Submit Return
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setReturnForm(null)}
                                      className="py-2 px-3 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg transition-colors"
                                      data-ocid={`orders.item.${i + 1}.return_form.cancel_button`}
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center h-64 text-center"
            data-ocid="orders.empty_state"
          >
            <Package className="w-16 h-16 text-muted-foreground mb-4" />
            <h2 className="text-lg font-semibold text-foreground">
              No orders yet
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              Start shopping to see your orders here
            </p>
            <Link to="/user/products">
              <Button data-ocid="orders.browse_button">Browse Products</Button>
            </Link>
          </motion.div>
        )}
      </div>
    </LightLayout>
  );
}
