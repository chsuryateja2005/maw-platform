import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LightLayout } from "@/layouts/LightLayout";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Minus, Package, Plus, Tag, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

interface CartItem {
  id: string;
  name: string;
  brand: string;
  variant: string;
  price: number;
  qty: number;
  color: string;
}

const INITIAL_CART: CartItem[] = [
  {
    id: "ci-001",
    name: "GaN 65W Fast Charger",
    brand: "PowerMax",
    variant: "White / UK Plug",
    price: 29.99,
    qty: 1,
    color: "from-amber-400 to-orange-500",
  },
  {
    id: "ci-002",
    name: "MagSafe Leather Case",
    brand: "CasePro",
    variant: "Midnight Blue / iPhone 15 Pro",
    price: 34.99,
    qty: 2,
    color: "from-indigo-400 to-violet-500",
  },
  {
    id: "ci-003",
    name: "Braided USB-C Cable 2m",
    brand: "ConnectPro",
    variant: "Black / 2 meters",
    price: 11.99,
    qty: 1,
    color: "from-teal-400 to-green-500",
  },
];

const RELATED = [
  {
    id: "rel-1",
    name: "Tempered Glass Shield Pro",
    price: 14.99,
    color: "from-blue-400 to-cyan-500",
  },
  {
    id: "rel-2",
    name: "25000mAh Solar Power Bank",
    price: 54.99,
    color: "from-emerald-400 to-teal-500",
  },
  {
    id: "rel-3",
    name: "ANC Wireless Earbuds Pro",
    price: 79.99,
    color: "from-pink-400 to-rose-500",
  },
  {
    id: "rel-4",
    name: "MagSafe Wireless Charger Pad",
    price: 24.99,
    color: "from-violet-400 to-purple-500",
  },
];

export default function CustomerCart() {
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART);
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const updateQty = (id: string, delta: number) =>
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item,
      ),
    );

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    toast.success("Item removed from cart");
  };

  const applyPromo = () => {
    if (promo.toLowerCase() === "save10") {
      setPromoApplied(true);
      toast.success("Promo code applied! 10% off");
    } else {
      toast.error("Invalid promo code");
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + tax;

  return (
    <LightLayout cartCount={cart.length}>
      <div className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold font-display text-foreground mb-6">
          Your Cart
        </h1>

        {cart.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center h-64 text-center"
            data-ocid="cart.empty_state"
          >
            <Package className="w-16 h-16 text-muted-foreground mb-4" />
            <h2 className="text-lg font-semibold text-foreground">
              Your cart is empty
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              Add some products to get started
            </p>
            <Link to="/user/products">
              <Button data-ocid="cart.shop_now_button">Shop Now</Button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="md:col-span-2 space-y-3">
              {cart.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  data-ocid={`cart.item.${i + 1}`}
                >
                  <Card className="p-4 border-border">
                    <div className="flex gap-4">
                      <div
                        className={`w-20 h-20 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}
                      >
                        <Package className="w-9 h-9 text-white/80" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground text-sm">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.brand}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {item.variant}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-border rounded-lg overflow-hidden">
                            <button
                              type="button"
                              onClick={() => updateQty(item.id, -1)}
                              data-ocid={`cart.item.${i + 1}.qty_minus.button`}
                              className="px-2.5 py-1.5 hover:bg-muted transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 py-1.5 text-sm font-semibold border-x border-border">
                              {item.qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQty(item.id, 1)}
                              data-ocid={`cart.item.${i + 1}.qty_plus.button`}
                              className="px-2.5 py-1.5 hover:bg-muted transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-foreground">
                              ${(item.price * item.qty).toFixed(2)}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              data-ocid={`cart.item.${i + 1}.delete_button`}
                              className="text-muted-foreground hover:text-destructive transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="space-y-4">
              <Card className="p-5 border-border">
                <h2 className="font-bold text-foreground mb-4">
                  Order Summary
                </h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium text-foreground">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Promo (SAVE10)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
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
                <div className="flex justify-between font-bold text-foreground">
                  <span>Total</span>
                  <span className="text-lg">${total.toFixed(2)}</span>
                </div>

                {/* Promo Code */}
                <div className="mt-4 flex gap-2">
                  <div className="flex-1 flex items-center border border-border rounded-lg px-3 gap-2">
                    <Tag className="w-3.5 h-3.5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Promo code"
                      value={promo}
                      onChange={(e) => setPromo(e.target.value)}
                      data-ocid="cart.promo_code.input"
                      className="flex-1 outline-none text-xs py-2 bg-transparent text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={applyPromo}
                    data-ocid="cart.apply_promo.button"
                  >
                    Apply
                  </Button>
                </div>

                <Link to="/user/checkout">
                  <Button
                    className="w-full mt-4 gap-2"
                    data-ocid="cart.checkout_button"
                  >
                    Checkout <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <p className="text-xs text-center text-muted-foreground mt-2">
                  🔒 Secure checkout
                </p>
              </Card>
            </div>
          </div>
        )}

        {/* Related Products */}
        <div className="mt-10">
          <h2 className="text-xl font-bold font-display text-foreground mb-4">
            You might also like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {RELATED.map((r) => (
              <motion.div key={r.id} whileHover={{ y: -3 }}>
                <Card className="overflow-hidden border-border hover:shadow-md transition-shadow cursor-pointer">
                  <div
                    className={`h-28 bg-gradient-to-br ${r.color} flex items-center justify-center`}
                  >
                    <Package className="w-10 h-10 text-white/80" />
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-semibold text-foreground line-clamp-2">
                      {r.name}
                    </p>
                    <p className="text-sm font-bold text-foreground mt-1">
                      ${r.price}
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full mt-2 text-xs"
                      data-ocid={`cart.related.${r.id}.add_to_cart_button`}
                      onClick={() => toast.success(`${r.name} added to cart!`)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </LightLayout>
  );
}
