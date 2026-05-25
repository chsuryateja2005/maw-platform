import { createActor } from "@/backend";
import type { Order, OrderItem } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { CartItem } from "@/hooks/useCart";
import { useGeolocation } from "@/hooks/useGeolocation";
import { LightLayout } from "@/layouts/LightLayout";
import { useActor } from "@caffeineai/core-infrastructure";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, Loader2, MapPin, Package, Truck } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const STORAGE_KEY = "maw_cart";

interface AddressForm {
  fullName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

function formatPrice(p: number) {
  return `₹${p.toLocaleString("en-IN")}`;
}

export default function CustomerCheckout() {
  const { actor, isFetching } = useActor(createActor);
  const { isLoading: detecting } = useGeolocation();
  const [step, setStep] = useState<1 | 2>(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [address, setAddress] = useState<AddressForm>({
    fullName: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [mapUrl, setMapUrl] = useState<string | null>(null);
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [orderId, setOrderId] = useState<string>("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setCart(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleDetectWithMap = async () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
            { headers: { "Accept-Language": "en" } },
          );
          const data = await res.json();
          const addr = data.address || {};
          setAddress({
            fullName: address.fullName,
            street:
              [addr.road, addr.suburb, addr.neighbourhood]
                .filter(Boolean)
                .join(", ") ||
              data.display_name ||
              "",
            city: addr.city || addr.town || addr.village || addr.county || "",
            state: addr.state || "",
            postalCode: addr.postcode || "",
            country: addr.country || "",
          });
          setMapUrl(
            `https://staticmap.openstreetmap.de/staticmap.php?center=${latitude},${longitude}&zoom=15&size=400x200&markers=${latitude},${longitude},red-pushpin`,
          );
          toast.success("Location detected and address filled");
        } catch {
          toast.error("Failed to detect location. Please enter manually.");
        }
      },
      (err) => {
        let msg = "Unable to retrieve your location.";
        if (err.code === 1)
          msg =
            "Location permission denied. Please enable location access in your browser settings.";
        else if (err.code === 2)
          msg = "Location unavailable. Please try again.";
        else if (err.code === 3)
          msg = "Location request timed out. Please try again.";
        toast.error(msg);
      },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 60000 },
    );
  };

  const handlePlaceOrder = async () => {
    if (!actor) {
      toast.error("Please sign in to place an order");
      return;
    }
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    setPlacing(true);
    try {
      const items: OrderItem[] = cart.map((item) => ({
        name: item.name,
        productId: BigInt(item.productId),
        quantity: BigInt(item.quantity),
        price: item.price,
      }));
      const addressString = `${address.fullName}, ${address.street}, ${address.city}, ${address.postalCode}, ${address.country}`;
      const order: Order = await actor.createOrder(items, addressString);
      setOrderId(order.id.toString());
      setPlaced(true);
      localStorage.removeItem(STORAGE_KEY);
      toast.success("Order placed successfully!");
    } catch (err) {
      toast.error("Failed to place order. Please try again.");
      console.error(err);
    } finally {
      setPlacing(false);
    }
  };

  if (isFetching) {
    return (
      <LightLayout>
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      </LightLayout>
    );
  }

  if (!actor) {
    return (
      <LightLayout>
        <div
          className="max-w-lg mx-auto px-6 py-20 text-center"
          data-ocid="checkout.login_required"
        >
          <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold font-display text-foreground">
            Sign in to checkout
          </h1>
          <p className="text-muted-foreground mt-2 mb-6">
            Please authenticate with Internet Identity to proceed with your
            order.
          </p>
          <Link to="/user">
            <Button data-ocid="checkout.go_home_button">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </LightLayout>
    );
  }

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
              Thank you for your purchase. Your order has been placed
              successfully.
            </p>
            <Badge className="bg-muted text-muted-foreground border-0 text-sm mb-6">
              Order #{orderId}
            </Badge>
            <div className="flex gap-3 justify-center">
              <Link to="/user/orders">
                <Button
                  variant="outline"
                  data-ocid="checkout.view_orders_button"
                >
                  View Orders
                </Button>
              </Link>
              <Link to="/user">
                <Button data-ocid="checkout.continue_shopping_button">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </LightLayout>
    );
  }

  return (
    <LightLayout>
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Steps */}
        <div className="flex items-center justify-center gap-0 mb-8">
          {[
            { id: 1, label: "Address" },
            { id: 2, label: "Review" },
          ].map((s, i) => (
            <div key={s.id} className="flex items-center">
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                  step === s.id
                    ? "bg-primary text-primary-foreground"
                    : step > s.id
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {step > s.id ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <span className="w-4 h-4 flex items-center justify-center text-xs">
                    {s.id}
                  </span>
                )}
                <span className="hidden sm:block">{s.label}</span>
              </div>
              {i < 1 && <div className="w-8 h-px bg-border" />}
            </div>
          ))}
        </div>

        {step === 1 ? (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card className="p-5 border-border">
                <div className="flex items-center gap-2 mb-4">
                  <Truck className="w-5 h-5 text-primary" />
                  <h2 className="font-bold text-foreground">
                    Delivery Address
                  </h2>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleDetectWithMap}
                  disabled={detecting}
                  className="mb-4 border-amber-500 text-amber-600 hover:bg-amber-50 hover:text-amber-700"
                  data-ocid="checkout.detect_location_button"
                >
                  {detecting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                      Detecting location...
                    </>
                  ) : (
                    <>
                      <MapPin className="w-4 h-4 mr-1.5" />
                      Use My Location
                    </>
                  )}
                </Button>

                {mapUrl && (
                  <div className="mb-4 rounded-lg overflow-hidden border border-border">
                    <img
                      src={mapUrl}
                      alt="Detected location map"
                      className="w-full h-[200px] object-cover"
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 space-y-1.5">
                    <Label htmlFor="fullname" className="text-sm">
                      Full Name
                    </Label>
                    <Input
                      id="fullname"
                      placeholder="Alex Thompson"
                      value={address.fullName}
                      onChange={(e) =>
                        setAddress((a) => ({ ...a, fullName: e.target.value }))
                      }
                      data-ocid="checkout.fullname.input"
                    />
                  </div>
                  <div className="col-span-2 space-y-1.5">
                    <Label htmlFor="street" className="text-sm">
                      Street Address
                    </Label>
                    <Input
                      id="street"
                      placeholder="123 Innovation Blvd"
                      value={address.street}
                      onChange={(e) =>
                        setAddress((a) => ({ ...a, street: e.target.value }))
                      }
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
                      value={address.city}
                      onChange={(e) =>
                        setAddress((a) => ({ ...a, city: e.target.value }))
                      }
                      data-ocid="checkout.city.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="state" className="text-sm">
                      State
                    </Label>
                    <Input
                      id="state"
                      placeholder="California"
                      value={address.state}
                      onChange={(e) =>
                        setAddress((a) => ({ ...a, state: e.target.value }))
                      }
                      data-ocid="checkout.state.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="postal" className="text-sm">
                      Postal Code
                    </Label>
                    <Input
                      id="postal"
                      placeholder="94105"
                      value={address.postalCode}
                      onChange={(e) =>
                        setAddress((a) => ({
                          ...a,
                          postalCode: e.target.value,
                        }))
                      }
                      data-ocid="checkout.postal_code.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="country" className="text-sm">
                      Country
                    </Label>
                    <Input
                      id="country"
                      placeholder="United States"
                      value={address.country}
                      onChange={(e) =>
                        setAddress((a) => ({ ...a, country: e.target.value }))
                      }
                      data-ocid="checkout.country.input"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button
                    onClick={() => setStep(2)}
                    disabled={
                      !address.fullName ||
                      !address.street ||
                      !address.city ||
                      !address.state ||
                      !address.postalCode ||
                      !address.country
                    }
                    data-ocid="checkout.continue_button"
                  >
                    Continue to Review
                  </Button>
                </div>
              </Card>
            </div>

            {/* Mini summary */}
            <div>
              <Card className="p-5 border-border sticky top-24">
                <h2 className="font-bold text-foreground mb-4">
                  Order Summary
                </h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Items</span>
                    <span className="text-foreground">{cart.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium text-foreground">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (8%)</span>
                    <span className="text-foreground">{formatPrice(tax)}</span>
                  </div>
                </div>
                <Separator className="my-3" />
                <div className="flex justify-between font-bold text-foreground">
                  <span>Total</span>
                  <span className="text-lg">{formatPrice(total)}</span>
                </div>
              </Card>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-5">
              {/* Address Summary */}
              <Card className="p-5 border-border">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-primary" />
                    <h2 className="font-bold text-foreground">
                      Delivery Address
                    </h2>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setStep(1)}
                    data-ocid="checkout.edit_address_button"
                  >
                    Edit
                  </Button>
                </div>
                <div className="text-sm text-foreground space-y-1">
                  <p className="font-medium">{address.fullName}</p>
                  <p className="text-muted-foreground">{address.street}</p>
                  <p className="text-muted-foreground">
                    {address.city}, {address.state} {address.postalCode}
                  </p>
                  <p className="text-muted-foreground">{address.country}</p>
                </div>
              </Card>

              {/* Cart Summary */}
              <Card className="p-5 border-border">
                <h2 className="font-bold text-foreground mb-4">Items</h2>
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.productId} className="flex gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary flex items-center justify-center flex-shrink-0">
                        <Package className="w-5 h-5 text-primary/60" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground line-clamp-1">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-foreground">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Final Summary */}
            <div>
              <Card className="p-5 border-border sticky top-24">
                <h2 className="font-bold text-foreground mb-4">
                  Order Summary
                </h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium text-foreground">
                      {formatPrice(subtotal)}
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
                    <span className="text-foreground">{formatPrice(tax)}</span>
                  </div>
                </div>
                <Separator className="my-3" />
                <div className="flex justify-between font-bold text-foreground mb-4">
                  <span>Total</span>
                  <span className="text-lg">{formatPrice(total)}</span>
                </div>
                <Button
                  className="w-full"
                  onClick={handlePlaceOrder}
                  disabled={placing || cart.length === 0}
                  data-ocid="checkout.place_order_button"
                >
                  {placing ? "Placing Order..." : "Place Order"}
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
