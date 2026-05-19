import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { LightLayout } from "@/layouts/LightLayout";
import {
  CheckCircle2,
  CreditCard,
  Package,
  Smartphone,
  Truck,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const STEPS = [
  { id: "step-cart", label: "Cart" },
  { id: "step-address", label: "Address" },
  { id: "step-payment", label: "Payment" },
  { id: "step-confirm", label: "Confirm" },
];

const ORDER_ITEMS = [
  {
    id: "oi-1",
    name: "GaN 65W Fast Charger",
    qty: 1,
    price: 29.99,
    color: "from-amber-400 to-orange-500",
  },
  {
    id: "oi-2",
    name: "MagSafe Leather Case",
    qty: 2,
    price: 34.99,
    color: "from-indigo-400 to-violet-500",
  },
  {
    id: "oi-3",
    name: "Braided USB-C Cable 2m",
    qty: 1,
    price: 11.99,
    color: "from-teal-400 to-green-500",
  },
];

const COUNTRIES = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "India",
  "France",
];

export default function CustomerCheckout() {
  const [payment, setPayment] = useState("card");
  const [placed, setPlaced] = useState(false);

  const subtotal = ORDER_ITEMS.reduce((s, i) => s + i.price * i.qty, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handlePlace = () => {
    setPlaced(true);
    toast.success("🎉 Order placed successfully!");
  };

  if (placed) {
    return (
      <LightLayout>
        <div
          className="max-w-lg mx-auto px-6 py-20 text-center"
          data-ocid="checkout.success_state"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <CheckCircle2 className="w-20 h-20 text-emerald-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold font-display text-foreground">
              Order Confirmed!
            </h1>
            <p className="text-muted-foreground mt-2 mb-6">
              Thank you for your purchase. You will receive a confirmation email
              shortly.
            </p>
            <Badge className="bg-muted text-muted-foreground border-0 text-sm mb-6">
              Order #MAW-2026-00147
            </Badge>
          </motion.div>
        </div>
      </LightLayout>
    );
  }

  return (
    <LightLayout cartCount={3}>
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Steps */}
        <div className="flex items-center justify-center gap-0 mb-8 overflow-x-auto">
          {STEPS.map((step, i) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                  i === 2
                    ? "bg-primary text-primary-foreground"
                    : i < 2
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {i < 2 ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <span className="w-4 h-4 flex items-center justify-center text-xs">
                    {i + 1}
                  </span>
                )}
                <span className="hidden sm:block">{step.label}</span>
              </div>
              {i < STEPS.length - 1 && <div className="w-8 h-px bg-border" />}
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left: Address + Payment */}
          <div className="md:col-span-2 space-y-5">
            {/* Address */}
            <Card className="p-5 border-border">
              <div className="flex items-center gap-2 mb-4">
                <Truck className="w-5 h-5 text-primary" />
                <h2 className="font-bold text-foreground">Delivery Address</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="fullname" className="text-sm">
                    Full Name
                  </Label>
                  <Input
                    id="fullname"
                    placeholder="Alex Thompson"
                    data-ocid="checkout.fullname.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-sm">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    placeholder="+1 555 000 1234"
                    data-ocid="checkout.phone.input"
                  />
                </div>
                <div className="col-span-2 space-y-1.5">
                  <Label htmlFor="street" className="text-sm">
                    Street Address
                  </Label>
                  <Input
                    id="street"
                    placeholder="123 Innovation Blvd, Suite 4"
                    data-ocid="checkout.street.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="city" className="text-sm">
                    City
                  </Label>
                  <Input
                    id="city"
                    placeholder="San Francisco"
                    data-ocid="checkout.city.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="state" className="text-sm">
                    State / Province
                  </Label>
                  <Input
                    id="state"
                    placeholder="California"
                    data-ocid="checkout.state.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="zip" className="text-sm">
                    ZIP / Postal Code
                  </Label>
                  <Input
                    id="zip"
                    placeholder="94105"
                    data-ocid="checkout.zip.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="country" className="text-sm">
                    Country
                  </Label>
                  <select
                    id="country"
                    data-ocid="checkout.country.select"
                    className="w-full border border-input rounded-md px-3 py-2 text-sm outline-none focus:border-primary bg-background text-foreground"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
            </Card>

            {/* Payment */}
            <Card className="p-5 border-border">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-primary" />
                <h2 className="font-bold text-foreground">Payment Method</h2>
              </div>
              <div className="space-y-3">
                {[
                  {
                    id: "card",
                    label: "Credit / Debit Card",
                    icon: CreditCard,
                  },
                  { id: "upi", label: "UPI", icon: Smartphone },
                  { id: "cod", label: "Cash on Delivery", icon: Package },
                ].map((method) => (
                  <label
                    key={method.id}
                    htmlFor={`pay-${method.id}`}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                      payment === method.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    <input
                      type="radio"
                      id={`pay-${method.id}`}
                      name="payment"
                      value={method.id}
                      checked={payment === method.id}
                      onChange={() => setPayment(method.id)}
                      data-ocid={`checkout.payment.${method.id}.radio`}
                      className="accent-primary"
                    />
                    <method.icon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">
                      {method.label}
                    </span>
                  </label>
                ))}

                {payment === "card" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-2 space-y-3"
                  >
                    <Input
                      placeholder="1234 5678 9012 3456"
                      data-ocid="checkout.card_number.input"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        placeholder="MM / YY"
                        data-ocid="checkout.card_expiry.input"
                      />
                      <Input
                        placeholder="CVV"
                        type="password"
                        data-ocid="checkout.card_cvv.input"
                      />
                    </div>
                  </motion.div>
                )}
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-5 border-border sticky top-20">
              <h2 className="font-bold text-foreground mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4">
                {ORDER_ITEMS.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}
                    >
                      <Package className="w-5 h-5 text-white/80" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Qty: {item.qty}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-foreground">
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <Separator className="my-3" />
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <Badge className="bg-emerald-100 text-emerald-700 border-0 text-xs">
                    Free
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (8%)</span>
                  <span className="text-foreground">${tax.toFixed(2)}</span>
                </div>
              </div>
              <Separator className="my-3" />
              <div className="flex justify-between font-bold text-foreground mb-4">
                <span>Total</span>
                <span className="text-lg">${total.toFixed(2)}</span>
              </div>
              <Button
                className="w-full"
                onClick={handlePlace}
                data-ocid="checkout.place_order_button"
              >
                Place Order
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-2">
                🔒 Secure & encrypted checkout
              </p>
            </Card>
          </div>
        </div>
      </div>
    </LightLayout>
  );
}
