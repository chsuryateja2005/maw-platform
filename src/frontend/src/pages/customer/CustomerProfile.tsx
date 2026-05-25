import type { Address } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/useAuth";
import {
  useDeleteAddress,
  useSaveAddress,
  useUserAddresses,
} from "@/hooks/useQueries";
import { LightLayout } from "@/layouts/LightLayout";
import { Link } from "@tanstack/react-router";
import {
  Bell,
  Globe,
  Loader2,
  LocateFixed,
  LogOut,
  Mail,
  MapPin,
  Plus,
  Trash2,
  User,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const TABS = ["Account", "Addresses", "Settings"] as const;

function AuthGate({
  children,
  isAuthenticated,
}: {
  children: React.ReactNode;
  isAuthenticated: boolean;
}) {
  if (isAuthenticated) return <>{children}</>;
  return (
    <div className="text-center py-16">
      <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
      <h2 className="text-xl font-bold font-display text-foreground mb-2">
        Sign in to access this section
      </h2>
      <p className="text-muted-foreground text-sm mb-6">
        Please sign in to view and manage your profile
      </p>
      <Link to="/user/login" search={{ returnTo: "/user/profile" }}>
        <Button data-ocid="profile.login_button">Sign In</Button>
      </Link>
    </div>
  );
}

function AddressSkeleton() {
  return (
    <Card className="p-4 border-border">
      <div className="flex items-start gap-3">
        <div className="w-5 h-5 rounded-full bg-muted shimmer mt-0.5" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-24 bg-muted shimmer rounded" />
          <div className="h-3 w-full bg-muted shimmer rounded" />
          <div className="h-3 w-2/3 bg-muted shimmer rounded" />
        </div>
      </div>
    </Card>
  );
}

export default function CustomerProfile() {
  const { isAuthenticated, principal, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("Account");
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [formTag, setFormTag] = useState("Home");
  const [formStreet, setFormStreet] = useState("");
  const [formCity, setFormCity] = useState("");
  const [formPostal, setFormPostal] = useState("");
  const [formCountry, setFormCountry] = useState("");
  const [formDefault, setFormDefault] = useState(false);
  const [locating, setLocating] = useState(false);

  const { data: addresses, isLoading: addressesLoading } = useUserAddresses();
  const saveAddress = useSaveAddress();
  const deleteAddress = useDeleteAddress();

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
          );
          const data = await res.json();
          const addr = data.address || {};
          setFormStreet(
            [addr.road, addr.house_number].filter(Boolean).join(" ") || "",
          );
          setFormCity(addr.city || addr.town || addr.village || "");
          setFormPostal(addr.postcode || "");
          setFormCountry(addr.country || "");
          toast.success("Location detected and address filled");
        } catch {
          toast.error("Failed to fetch address from location");
        } finally {
          setLocating(false);
        }
      },
      () => {
        toast.error("Unable to retrieve your location");
        setLocating(false);
      },
    );
  };

  const handleSaveAddress = async () => {
    if (!formStreet || !formCity || !formCountry) {
      toast.error("Please fill in all required fields");
      return;
    }
    const addr: Address = {
      tag: formTag || "Home",
      street: formStreet,
      city: formCity,
      postalCode: formPostal,
      country: formCountry,
      isDefault: formDefault,
    };
    try {
      await saveAddress.mutateAsync(addr);
      toast.success("Address saved");
      setShowAddForm(false);
      setFormTag("Home");
      setFormStreet("");
      setFormCity("");
      setFormPostal("");
      setFormCountry("");
      setFormDefault(false);
    } catch {
      toast.error("Failed to save address");
    }
  };

  const handleDeleteAddress = async (index: number) => {
    try {
      await deleteAddress.mutateAsync(BigInt(index));
      toast.success("Address removed");
    } catch {
      toast.error("Failed to remove address");
    }
  };

  return (
    <LightLayout>
      <div className="max-w-3xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold font-display text-foreground mb-6">
          My Profile
        </h1>

        <div className="flex gap-1 border-b border-border mb-6">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              data-ocid={`profile.tab.${tab.toLowerCase()}.toggle`}
              className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "Account" && (
            <motion.div
              key="account"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-5"
            >
              <AuthGate isAuthenticated={isAuthenticated}>
                <Card className="p-6 border-border">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-xl font-bold">
                      {principal ? principal.slice(0, 2).toUpperCase() : "?"}
                    </div>
                    <div className="min-w-0">
                      <h2 className="font-bold text-foreground">
                        You are signed in
                      </h2>
                      <p className="text-sm text-muted-foreground break-all">
                        {principal || "Unknown"}
                      </p>
                      <Badge className="mt-1 bg-primary/10 text-primary border-0 text-xs">
                        Verified Customer
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="gap-2"
                    data-ocid="profile.logout_button"
                    onClick={() => logout()}
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </Button>
                </Card>
              </AuthGate>
            </motion.div>
          )}

          {activeTab === "Addresses" && (
            <motion.div
              key="addresses"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <AuthGate isAuthenticated={isAuthenticated}>
                {addressesLoading ? (
                  <div className="space-y-4">
                    <AddressSkeleton />
                    <AddressSkeleton />
                  </div>
                ) : addresses && addresses.length > 0 ? (
                  addresses.map((addr, i) => (
                    <Card
                      key={`${addr.street}-${addr.city}-${i}`}
                      className="p-4 border-border"
                      data-ocid={`profile.address.item.${i + 1}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-sm text-foreground">
                                {addr.tag}
                              </span>
                              {addr.isDefault && (
                                <Badge className="bg-primary/10 text-primary border-0 text-xs">
                                  Default
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-0.5">
                              {addr.street}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {addr.city}, {addr.postalCode}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {addr.country}
                            </p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1 text-xs text-destructive hover:text-destructive"
                          data-ocid={`profile.address.item.${i + 1}.delete_button`}
                          onClick={() => handleDeleteAddress(i)}
                          disabled={deleteAddress.isPending}
                        >
                          <Trash2 className="w-3 h-3" />
                          Remove
                        </Button>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div
                    className="text-center py-8"
                    data-ocid="profile.addresses.empty_state"
                  >
                    <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground text-sm">
                      No saved addresses yet
                    </p>
                  </div>
                )}

                {!showAddForm ? (
                  <Button
                    variant="outline"
                    className="gap-2"
                    data-ocid="profile.add_address.button"
                    onClick={() => setShowAddForm(true)}
                  >
                    <Plus className="w-4 h-4" />
                    Add New Address
                  </Button>
                ) : (
                  <Card className="p-5 border-border">
                    <h3 className="font-semibold text-foreground mb-4">
                      Add New Address
                    </h3>
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <Label className="text-sm">Tag (e.g. Home, Work)</Label>
                        <Input
                          value={formTag}
                          onChange={(e) => setFormTag(e.target.value)}
                          placeholder="Home"
                          data-ocid="profile.address.tag.input"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-sm">Street</Label>
                        <Input
                          value={formStreet}
                          onChange={(e) => setFormStreet(e.target.value)}
                          placeholder="123 Main St"
                          data-ocid="profile.address.street.input"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label className="text-sm">City</Label>
                          <Input
                            value={formCity}
                            onChange={(e) => setFormCity(e.target.value)}
                            placeholder="San Francisco"
                            data-ocid="profile.address.city.input"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-sm">Postal Code</Label>
                          <Input
                            value={formPostal}
                            onChange={(e) => setFormPostal(e.target.value)}
                            placeholder="94105"
                            data-ocid="profile.address.postal.input"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-sm">Country</Label>
                        <Input
                          value={formCountry}
                          onChange={(e) => setFormCountry(e.target.value)}
                          placeholder="United States"
                          data-ocid="profile.address.country.input"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={formDefault}
                          onCheckedChange={setFormDefault}
                          data-ocid="profile.address.default.switch"
                        />
                        <Label className="text-sm">
                          Set as default address
                        </Label>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant="outline"
                          className="gap-2"
                          onClick={handleUseLocation}
                          disabled={locating}
                          data-ocid="profile.address.use_location.button"
                        >
                          {locating ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <LocateFixed className="w-4 h-4" />
                          )}
                          Use My Location
                        </Button>
                        <Button
                          onClick={handleSaveAddress}
                          disabled={saveAddress.isPending}
                          data-ocid="profile.address.save.button"
                        >
                          {saveAddress.isPending ? (
                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          ) : null}
                          Save Address
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => setShowAddForm(false)}
                          data-ocid="profile.address.cancel.button"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </Card>
                )}
              </AuthGate>
            </motion.div>
          )}

          {activeTab === "Settings" && (
            <motion.div
              key="settings"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <AuthGate isAuthenticated={isAuthenticated}>
                <Card className="p-5 border-border">
                  <div className="flex items-center gap-2 mb-4">
                    <Mail className="w-4 h-4 text-primary" />
                    <h3 className="font-semibold text-foreground">
                      Email Notifications
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Order updates
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Get notified when your order status changes
                        </p>
                      </div>
                      <Switch
                        checked={notifications.email}
                        onCheckedChange={(v) => {
                          setNotifications((prev) => ({ ...prev, email: v }));
                          toast.success(
                            `Email notifications ${v ? "enabled" : "disabled"}`,
                          );
                        }}
                        data-ocid="profile.notif.email.switch"
                      />
                    </div>
                  </div>
                </Card>

                <Card className="p-5 border-border">
                  <div className="flex items-center gap-2 mb-4">
                    <Bell className="w-4 h-4 text-primary" />
                    <h3 className="font-semibold text-foreground">
                      Push Notifications
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Delivery alerts
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Receive push notifications for delivery updates
                        </p>
                      </div>
                      <Switch
                        checked={notifications.push}
                        onCheckedChange={(v) => {
                          setNotifications((prev) => ({ ...prev, push: v }));
                          toast.success(
                            `Push notifications ${v ? "enabled" : "disabled"}`,
                          );
                        }}
                        data-ocid="profile.notif.push.switch"
                      />
                    </div>
                  </div>
                </Card>

                <Card className="p-5 border-border">
                  <div className="flex items-center gap-2 mb-4">
                    <Globe className="w-4 h-4 text-primary" />
                    <h3 className="font-semibold text-foreground">Language</h3>
                  </div>
                  <select
                    defaultValue="English"
                    data-ocid="profile.language.select"
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary bg-background text-foreground"
                  >
                    {[
                      "English",
                      "Spanish",
                      "French",
                      "German",
                      "Hindi",
                      "Arabic",
                    ].map((l) => (
                      <option key={l}>{l}</option>
                    ))}
                  </select>
                </Card>
              </AuthGate>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LightLayout>
  );
}
