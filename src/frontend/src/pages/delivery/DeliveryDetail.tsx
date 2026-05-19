import { PageHeader } from "@/components/ui/PageHeader";
import { StatBadge } from "@/components/ui/StatBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DarkSidebarLayout } from "@/layouts/DarkSidebarLayout";
import { DeliveryStatus } from "@/types";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  LayoutDashboard,
  MapPin,
  Package,
  Phone,
  ShieldCheck,
  Truck,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/delivery", icon: LayoutDashboard },
  { label: "Deliveries", href: "/delivery/list", icon: Truck },
];

const DELIVERY_DATA: Record<
  string,
  {
    id: string;
    customer: string;
    phone: string;
    address: string;
    city: string;
    landmark: string;
    status: DeliveryStatus;
    scheduledTime: string;
    orderId: string;
    items: { name: string; qty: number; sku: string }[];
    timeline: { label: string; time: string; done: boolean }[];
  }
> = {
  "DLV-2847": {
    id: "DLV-2847",
    customer: "Riya Patel",
    phone: "+91 98765 43210",
    address: "42 Elm Street, Andheri West",
    city: "Mumbai 400058",
    landmark: "Near Andheri Metro Station",
    status: DeliveryStatus.assigned,
    scheduledTime: "10:00 AM – 12:00 PM",
    orderId: "ORD-19284",
    items: [
      { name: "Sony WH-1000XM5 Headphones", qty: 1, sku: "SON-WH5-BLK" },
      { name: "USB-C Charging Cable 3m", qty: 2, sku: "ACC-USB-3M" },
    ],
    timeline: [
      { label: "Order Confirmed", time: "Yesterday 6:45 PM", done: true },
      { label: "Assigned to Agent", time: "Today 8:00 AM", done: true },
      { label: "Picked Up from Warehouse", time: "Today 9:15 AM", done: true },
      { label: "Out for Delivery", time: "Today 10:00 AM", done: false },
      { label: "Delivered", time: "Expected 12:00 PM", done: false },
    ],
  },
  "DLV-2848": {
    id: "DLV-2848",
    customer: "Arjun Mehta",
    phone: "+91 87654 32109",
    address: "7 Rose Garden Colony, Bandra East",
    city: "Mumbai 400051",
    landmark: "Opposite St. Andrews Church",
    status: DeliveryStatus.in_transit,
    scheduledTime: "10:45 AM – 12:45 PM",
    orderId: "ORD-19285",
    items: [{ name: "Apple AirPods Pro 2nd Gen", qty: 1, sku: "APL-APP2-WHT" }],
    timeline: [
      { label: "Order Confirmed", time: "Yesterday 4:20 PM", done: true },
      { label: "Assigned to Agent", time: "Today 8:00 AM", done: true },
      { label: "Picked Up from Warehouse", time: "Today 9:30 AM", done: true },
      { label: "Out for Delivery", time: "Today 10:45 AM", done: true },
      { label: "Delivered", time: "Expected 12:45 PM", done: false },
    ],
  },
};

const FALLBACK_DELIVERY = DELIVERY_DATA["DLV-2847"];

export function DeliveryDetail() {
  const navigate = useNavigate();
  const params = useParams({ strict: false }) as { deliveryId?: string };
  const deliveryId = params.deliveryId ?? "DLV-2847";
  const delivery = DELIVERY_DATA[deliveryId] ?? FALLBACK_DELIVERY;

  const [otp, setOtp] = useState("");
  const [failReason, setFailReason] = useState("");
  const [failNotes, setFailNotes] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [failed, setFailed] = useState(false);

  function handleConfirm() {
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }
    setConfirmed(true);
    toast.success(`Delivery ${delivery.id} confirmed successfully!`, {
      description: `Customer ${delivery.customer} has received their order.`,
    });
  }

  function handleFail() {
    if (!failReason) {
      toast.warning("Please select a failure reason");
      return;
    }
    setFailed(true);
    toast.warning(`Delivery ${delivery.id} marked as failed`, {
      description: `Reason: ${failReason.replace(/_/g, " ")}`,
    });
  }

  const currentStatus = confirmed
    ? DeliveryStatus.delivered
    : failed
      ? DeliveryStatus.failed
      : delivery.status;

  return (
    <DarkSidebarLayout
      portalName="Delivery Portal"
      portalLogo={Truck}
      navItems={NAV_ITEMS}
      userLabel="Rahul Delivery"
      userSubLabel="Delivery Agent"
    >
      <PageHeader
        title={`Delivery ${delivery.id}`}
        subtitle={`Order ${delivery.orderId} · Scheduled ${delivery.scheduledTime}`}
        action={
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => navigate({ to: "/delivery/list" })}
            data-ocid="delivery.detail.back_button"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to List
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-5">
          {/* Customer Info */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <Card data-ocid="delivery.detail.customer.card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">
                      Customer Name
                    </p>
                    <p className="font-semibold text-sm text-foreground">
                      {delivery.customer}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">
                      Phone
                    </p>
                    <div className="flex items-center gap-1.5">
                      <Phone
                        className="w-3.5 h-3.5 text-muted-foreground"
                        strokeWidth={1.75}
                      />
                      <p className="font-medium text-sm">{delivery.phone}</p>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-muted-foreground mb-0.5">
                      Delivery Address
                    </p>
                    <div className="flex items-start gap-1.5">
                      <MapPin
                        className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0 mt-0.5"
                        strokeWidth={1.75}
                      />
                      <div>
                        <p className="text-sm font-medium">
                          {delivery.address}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {delivery.city}
                        </p>
                        <p className="text-xs text-muted-foreground italic">
                          {delivery.landmark}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map Placeholder */}
                <div
                  className="rounded-lg overflow-hidden h-36 flex items-center justify-center text-white font-semibold text-sm"
                  style={{
                    background:
                      "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #6366f1 100%)",
                  }}
                  data-ocid="delivery.detail.map_placeholder"
                >
                  <div className="flex flex-col items-center gap-2">
                    <MapPin className="w-6 h-6" />
                    <span>Map View</span>
                    <span className="text-xs font-normal opacity-75">
                      {delivery.address}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Items to Deliver */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
          >
            <Card data-ocid="delivery.detail.items.card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">
                  Items to Deliver
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {delivery.items.map((item) => (
                  <div
                    key={item.sku}
                    className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg"
                  >
                    <div
                      className="w-10 h-10 rounded-md flex-shrink-0 flex items-center justify-center"
                      style={{
                        background:
                          "linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)",
                      }}
                    >
                      <Package
                        className="w-5 h-5 text-indigo-500"
                        strokeWidth={1.75}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.sku}
                      </p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <p className="text-sm font-semibold">×{item.qty}</p>
                      <p className="text-xs text-muted-foreground">qty</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* Status Card */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
          >
            <Card data-ocid="delivery.detail.status.card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">
                  Delivery Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <StatBadge status={currentStatus} />
                </div>

                {/* Timeline */}
                <div className="space-y-3">
                  {delivery.timeline.map((step, idx) => (
                    <div key={step.label} className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                            step.done
                              ? "bg-emerald-500 text-white"
                              : "bg-muted border-2 border-border"
                          }`}
                        >
                          {step.done && <CheckCircle2 className="w-3 h-3" />}
                        </div>
                        {idx < delivery.timeline.length - 1 && (
                          <div
                            className={`w-0.5 h-6 mt-1 ${
                              step.done ? "bg-emerald-300" : "bg-muted"
                            }`}
                          />
                        )}
                      </div>
                      <div className="min-w-0 pb-1">
                        <p
                          className={`text-xs font-medium ${
                            step.done
                              ? "text-foreground"
                              : "text-muted-foreground"
                          }`}
                        >
                          {step.label}
                        </p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Clock
                            className="w-3 h-3 text-muted-foreground"
                            strokeWidth={1.5}
                          />
                          <p className="text-xs text-muted-foreground">
                            {step.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* OTP Verification */}
          {!confirmed && !failed && (
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.15 }}
            >
              <Card
                className="border-emerald-200 bg-emerald-50/30"
                data-ocid="delivery.detail.otp.card"
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2 text-emerald-700">
                    <ShieldCheck className="w-4 h-4" strokeWidth={1.75} />
                    OTP Verification
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label htmlFor="otp-input" className="text-xs">
                      Enter 6-digit OTP from customer
                    </Label>
                    <Input
                      id="otp-input"
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      placeholder="• • • • • •"
                      value={otp}
                      onChange={(e) =>
                        setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                      }
                      className="mt-1.5 text-center text-lg tracking-[0.4em] font-mono"
                      data-ocid="delivery.detail.otp.input"
                    />
                  </div>
                  <Button
                    type="button"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
                    onClick={handleConfirm}
                    data-ocid="delivery.detail.confirm.button"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Verify & Confirm Delivery
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Failed Delivery */}
          {!confirmed && !failed && (
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.2 }}
            >
              <Card
                className="border-red-200 bg-red-50/30"
                data-ocid="delivery.detail.failed.card"
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2 text-red-700">
                    <XCircle className="w-4 h-4" strokeWidth={1.75} />
                    Mark as Failed
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label htmlFor="fail-reason" className="text-xs">
                      Reason for failure
                    </Label>
                    <Select onValueChange={setFailReason} value={failReason}>
                      <SelectTrigger
                        id="fail-reason"
                        className="mt-1.5 h-9 text-sm"
                        data-ocid="delivery.detail.fail_reason.select"
                      >
                        <SelectValue placeholder="Select reason…" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="customer_unavailable">
                          Customer Unavailable
                        </SelectItem>
                        <SelectItem value="wrong_address">
                          Wrong Address
                        </SelectItem>
                        <SelectItem value="refused_delivery">
                          Refused Delivery
                        </SelectItem>
                        <SelectItem value="access_denied">
                          Access Denied
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="fail-notes" className="text-xs">
                      Additional notes
                    </Label>
                    <Textarea
                      id="fail-notes"
                      placeholder="Describe what happened…"
                      value={failNotes}
                      onChange={(e) => setFailNotes(e.target.value)}
                      className="mt-1.5 text-sm resize-none"
                      rows={3}
                      data-ocid="delivery.detail.fail_notes.textarea"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    className="w-full gap-2"
                    onClick={handleFail}
                    data-ocid="delivery.detail.fail.button"
                  >
                    <XCircle className="w-4 h-4" />
                    Mark as Failed
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Confirmed state */}
          {confirmed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                className="border-emerald-300 bg-emerald-50"
                data-ocid="delivery.detail.success_state"
              >
                <CardContent className="flex flex-col items-center py-8 gap-3">
                  <CheckCircle2
                    className="w-12 h-12 text-emerald-500"
                    strokeWidth={1.5}
                  />
                  <p className="text-sm font-semibold text-emerald-700">
                    Delivery Confirmed!
                  </p>
                  <p className="text-xs text-emerald-600 text-center">
                    Order successfully delivered to {delivery.customer}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Failed state */}
          {failed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                className="border-red-300 bg-red-50"
                data-ocid="delivery.detail.error_state"
              >
                <CardContent className="flex flex-col items-center py-8 gap-3">
                  <XCircle
                    className="w-12 h-12 text-red-500"
                    strokeWidth={1.5}
                  />
                  <p className="text-sm font-semibold text-red-700">
                    Delivery Failed
                  </p>
                  <p className="text-xs text-red-600 text-center capitalize">
                    {failReason.replace(/_/g, " ")}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </DarkSidebarLayout>
  );
}
