import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import type { CartItem } from "@/hooks/useCart";
import { LightLayout } from "@/layouts/LightLayout";
import { Link, useRouter } from "@tanstack/react-router";
import { ArrowRight, Minus, Package, Plus, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const STORAGE_KEY = "maw_cart";

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as unknown[];
      if (
        Array.isArray(parsed) &&
        parsed.length > 0 &&
        typeof (parsed[0] as CartItem).productId === "string"
      ) {
        return parsed as CartItem[];
      }
    }
  } catch {
    // ignore parse errors
  }
  return [];
}

function saveCart(cart: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

export default function CustomerCart() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>(loadCart);

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  const updateQty = (productId: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  };

  const removeItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
    toast.success("Item removed from cart");
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <LightLayout>
      <div className="max-w-5xl mx-auto px-6 py-8">
        <button
          type="button"
          onClick={() => window.history.back()}
          data-ocid="cart.continue_shopping_button"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-medium py-2 px-4 rounded-lg border border-border hover:bg-muted transition-colors text-sm mb-5"
        >
          ← Continue Shopping
        </button>

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
                  key={item.productId}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  data-ocid={`cart.item.${i + 1}`}
                >
                  <Card className="p-4 border-border">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary/20 to-secondary flex items-center justify-center flex-shrink-0">
                        <Package className="w-9 h-9 text-primary/60" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground text-sm">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Unit price: ₹{item.price.toLocaleString("en-IN")}
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-border rounded-lg overflow-hidden">
                            <button
                              type="button"
                              onClick={() => updateQty(item.productId, -1)}
                              data-ocid={`cart.item.${i + 1}.qty_minus.button`}
                              className="px-2.5 py-1.5 hover:bg-muted transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 py-1.5 text-sm font-semibold border-x border-border">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQty(item.productId, 1)}
                              data-ocid={`cart.item.${i + 1}.qty_plus.button`}
                              className="px-2.5 py-1.5 hover:bg-muted transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-foreground">
                              ₹
                              {(item.price * item.quantity).toLocaleString(
                                "en-IN",
                              )}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeItem(item.productId)}
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
              <Card className="p-5 border-border sticky top-24">
                <h2 className="font-bold text-foreground mb-4">
                  Order Summary
                </h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium text-foreground">
                      ₹{subtotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <Badge className="bg-emerald-100 text-emerald-700 border-0 text-xs">
                      Free
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (8%)</span>₹
                    {tax.toLocaleString("en-IN")}
                  </div>
                </div>
                <Separator className="my-3" />
                <div className="flex justify-between font-bold text-foreground">
                  <span>Total</span>₹{total.toLocaleString("en-IN")}
                </div>

                <Button
                  className="w-full mt-4 gap-2"
                  data-ocid="cart.checkout_button"
                  onClick={() => {
                    if (!isAuthenticated) {
                      toast.info("Please sign in to proceed to checkout");
                      router.navigate({ to: "/user/login" } as Parameters<
                        typeof router.navigate
                      >[0]);
                      return;
                    }
                    router.navigate({ to: "/user/checkout" } as Parameters<
                      typeof router.navigate
                    >[0]);
                  }}
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-2">
                  Secure checkout
                </p>
              </Card>
            </div>
          </div>
        )}
      </div>
    </LightLayout>
  );
}
