import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { LightLayout } from "@/layouts/LightLayout";
import {
  Bell,
  Edit3,
  Globe,
  Mail,
  MapPin,
  Phone,
  Trash2,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const TABS = ["Account", "Addresses", "Wishlist", "Settings"];

const ADDRESSES = [
  {
    id: "addr-1",
    label: "Home",
    name: "Alex Thompson",
    street: "123 Innovation Blvd, Suite 4",
    city: "San Francisco, CA 94105",
    country: "United States",
    isDefault: true,
  },
  {
    id: "addr-2",
    label: "Work",
    name: "Alex Thompson",
    street: "555 Market Street, Floor 12",
    city: "San Francisco, CA 94102",
    country: "United States",
    isDefault: false,
  },
];

export default function CustomerProfile() {
  const [activeTab, setActiveTab] = useState("Account");
  const [notifications, setNotifications] = useState({
    orders: true,
    promotions: false,
    newsletter: true,
  });
  const [language, setLanguage] = useState("English");

  return (
    <LightLayout cartCount={3}>
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

        {activeTab === "Account" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-5"
          >
            <Card className="p-6 border-border">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xl font-bold">
                  AT
                </div>
                <div>
                  <h2 className="font-bold text-foreground">Alex Thompson</h2>
                  <p className="text-sm text-muted-foreground">
                    alex.thompson@email.com
                  </p>
                  <Badge className="mt-1 bg-primary/10 text-primary border-0 text-xs">
                    Verified Customer
                  </Badge>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-auto gap-1"
                  data-ocid="profile.edit_avatar.button"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Edit Photo
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-sm flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    Full Name
                  </Label>
                  <Input
                    defaultValue="Alex Thompson"
                    data-ocid="profile.name.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" />
                    Email
                  </Label>
                  <Input
                    defaultValue="alex.thompson@email.com"
                    data-ocid="profile.email.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" />
                    Phone
                  </Label>
                  <Input
                    defaultValue="+1 555 000 1234"
                    data-ocid="profile.phone.input"
                  />
                </div>
              </div>
              <Button
                className="mt-4"
                data-ocid="profile.save_account.button"
                onClick={() => toast.success("Profile updated!")}
              >
                Save Changes
              </Button>
            </Card>
          </motion.div>
        )}

        {activeTab === "Addresses" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {ADDRESSES.map((addr, i) => (
              <Card
                key={addr.id}
                className="p-4 border-border"
                data-ocid={`profile.address.item.${i + 1}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-foreground">
                          {addr.label}
                        </span>
                        {addr.isDefault && (
                          <Badge className="bg-primary/10 text-primary border-0 text-xs">
                            Default
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {addr.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {addr.street}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {addr.city}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {addr.country}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1 text-xs"
                      data-ocid={`profile.address.item.${i + 1}.edit_button`}
                      onClick={() => toast.info("Edit address")}
                    >
                      <Edit3 className="w-3 h-3" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1 text-xs text-destructive hover:text-destructive"
                      data-ocid={`profile.address.item.${i + 1}.delete_button`}
                      onClick={() => toast.success("Address removed")}
                    >
                      <Trash2 className="w-3 h-3" />
                      Remove
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
            <Button
              variant="outline"
              className="gap-2"
              data-ocid="profile.add_address.button"
              onClick={() => toast.info("Add new address")}
            >
              <MapPin className="w-4 h-4" />
              Add New Address
            </Button>
          </motion.div>
        )}

        {activeTab === "Wishlist" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="p-8 text-center border-border">
              <p className="text-muted-foreground">
                Your saved wishlist items are on the{" "}
                <a href="/user/wishlist" className="text-primary underline">
                  Wishlist page
                </a>
                .
              </p>
            </Card>
          </motion.div>
        )}

        {activeTab === "Settings" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <Card className="p-5 border-border">
              <div className="flex items-center gap-2 mb-4">
                <Bell className="w-4 h-4 text-primary" />
                <h3 className="font-semibold text-foreground">Notifications</h3>
              </div>
              <div className="space-y-4">
                {(
                  [
                    {
                      key: "orders" as const,
                      label: "Order updates",
                      desc: "Get notified when your order status changes",
                    },
                    {
                      key: "promotions" as const,
                      label: "Promotions & deals",
                      desc: "Receive special offers and discounts",
                    },
                    {
                      key: "newsletter" as const,
                      label: "Newsletter",
                      desc: "Weekly product highlights and tips",
                    },
                  ] as const
                ).map((n) => (
                  <div
                    key={n.key}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {n.label}
                      </p>
                      <p className="text-xs text-muted-foreground">{n.desc}</p>
                    </div>
                    <Switch
                      checked={notifications[n.key]}
                      onCheckedChange={(v) => {
                        setNotifications((prev) => ({ ...prev, [n.key]: v }));
                        toast.success(
                          `${n.label} ${v ? "enabled" : "disabled"}`,
                        );
                      }}
                      data-ocid={`profile.notif.${n.key}.switch`}
                    />
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5 border-border">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-4 h-4 text-primary" />
                <h3 className="font-semibold text-foreground">Language</h3>
              </div>
              <select
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value);
                  toast.success(`Language set to ${e.target.value}`);
                }}
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
          </motion.div>
        )}
      </div>
    </LightLayout>
  );
}
