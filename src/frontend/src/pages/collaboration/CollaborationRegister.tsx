import { createActor } from "@/backend";
import { LightSidebarLayout } from "@/layouts/LightSidebarLayout";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  Building2,
  CheckCircle,
  ClipboardList,
  Home,
  PackageCheck,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const NAV_ITEMS = [
  { label: "Home", href: "/collaboration", icon: Home },
  { label: "Apply Now", href: "/collaboration/register", icon: ClipboardList },
  {
    label: "My Application",
    href: "/collaboration/status",
    icon: PackageCheck,
  },
];

const MOBILE_CATEGORIES = [
  "Phone Cases & Covers",
  "Screen Protectors",
  "Chargers & Cables",
  "Power Banks",
  "Earphones & Headphones",
  "Bluetooth Speakers",
  "Phone Holders & Stands",
  "Camera Lenses & Accessories",
  "Smartwatch Accessories",
  "Tablet Accessories",
  "Other Mobile Accessories",
];

interface FormFields {
  companyName: string;
  brandName: string;
  ownerName: string;
  email: string;
  phone: string;
  gstNumber: string;
  businessAddress: string;
  bankAccountNumber: string;
  bankIfscCode: string;
  categories: string[];
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p
      className="flex items-center gap-1.5 mt-1.5 text-xs text-red-600"
      data-ocid="form.field_error"
    >
      <AlertCircle className="w-3 h-3 flex-shrink-0" />
      {message}
    </p>
  );
}

export function CollaborationRegister() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormFields>({
    defaultValues: { categories: [] },
  });

  const selectedCategories = watch("categories") || [];

  const createMutation = useMutation({
    mutationFn: async (data: FormFields) => {
      if (!actor) throw new Error("Backend not available");
      const bankDetails = `Account: ${data.bankAccountNumber}, IFSC: ${data.bankIfscCode}`;
      return actor.createVendorRequest({
        companyName: data.companyName,
        brandName: data.brandName,
        ownerName: data.ownerName,
        email: data.email,
        phone: data.phone,
        gstNumber: data.gstNumber,
        businessAddress: data.businessAddress,
        categories: data.categories,
        bankDetails,
      });
    },
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Application submitted successfully!");
      queryClient.invalidateQueries({ queryKey: ["vendorRequests"] });
    },
    onError: (err) => {
      toast.error("Submission failed", {
        description: err instanceof Error ? err.message : "Please try again",
      });
    },
  });

  function toggleCategory(cat: string) {
    const current = selectedCategories;
    if (current.includes(cat)) {
      setValue(
        "categories",
        current.filter((c) => c !== cat),
      );
    } else {
      setValue("categories", [...current, cat]);
    }
  }

  async function onSubmit(data: FormFields) {
    createMutation.mutate(data);
  }

  if (submitted) {
    return (
      <LightSidebarLayout
        portalName="Vendor Portal"
        portalLogo={Building2}
        navItems={NAV_ITEMS}
        userLabel="Guest User"
        userSubLabel="Prospective Vendor"
      >
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-card border border-border rounded-2xl p-8 text-center"
          >
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold font-display text-foreground mb-2">
              Application Submitted
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Your vendor application has been submitted and is pending
              approval. Our team will review it within 3-5 business days.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                type="button"
                onClick={() => navigate({ to: "/collaboration/status" })}
                className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
                data-ocid="collab.success.view_status_button"
              >
                View Application Status
              </button>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="px-5 py-2.5 border border-border bg-card text-foreground rounded-lg text-sm font-medium hover:bg-muted transition-colors"
                data-ocid="collab.success.submit_another_button"
              >
                Submit Another
              </button>
            </div>
          </motion.div>
        </div>
      </LightSidebarLayout>
    );
  }

  return (
    <LightSidebarLayout
      portalName="Vendor Portal"
      portalLogo={Building2}
      navItems={NAV_ITEMS}
      userLabel="Guest User"
      userSubLabel="Prospective Vendor"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header */}
          <div className="mb-7">
            <h1 className="text-2xl font-bold font-display text-foreground tracking-tight">
              Vendor Registration
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Complete all fields to submit your vendor application for mobile
              accessories. Our team will review within 3-5 business days.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Section 1: Company Info */}
            <div className="bg-card border border-border rounded-xl overflow-hidden mb-5">
              <div className="px-6 py-4 bg-muted/40 border-b border-border">
                <h2 className="text-sm font-semibold text-foreground">
                  Company Information
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Legal business details for verification
                </p>
              </div>
              <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label
                    className="block text-xs font-semibold text-foreground mb-1.5"
                    htmlFor="companyName"
                  >
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="companyName"
                    {...register("companyName", {
                      required: "Company name is required",
                    })}
                    placeholder="Acme Mobile Accessories Ltd."
                    data-ocid="collab.form.company_name.input"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-shadow"
                  />
                  <FieldError message={errors.companyName?.message} />
                </div>
                <div>
                  <label
                    className="block text-xs font-semibold text-foreground mb-1.5"
                    htmlFor="brandName"
                  >
                    Brand Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="brandName"
                    {...register("brandName", {
                      required: "Brand name is required",
                    })}
                    placeholder="AcmePro"
                    data-ocid="collab.form.brand_name.input"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-shadow"
                  />
                  <FieldError message={errors.brandName?.message} />
                </div>
                <div>
                  <label
                    className="block text-xs font-semibold text-foreground mb-1.5"
                    htmlFor="ownerName"
                  >
                    Owner Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="ownerName"
                    {...register("ownerName", {
                      required: "Owner name is required",
                    })}
                    placeholder="John Doe"
                    data-ocid="collab.form.owner_name.input"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-shadow"
                  />
                  <FieldError message={errors.ownerName?.message} />
                </div>
                <div>
                  <label
                    className="block text-xs font-semibold text-foreground mb-1.5"
                    htmlFor="email"
                  >
                    Business Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email", {
                      required: "Business email is required",
                      pattern: {
                        value: /^[^@]+@[^@]+\.[^@]+$/,
                        message: "Enter a valid email",
                      },
                    })}
                    placeholder="contact@yourcompany.com"
                    data-ocid="collab.form.email.input"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-shadow"
                  />
                  <FieldError message={errors.email?.message} />
                </div>
                <div>
                  <label
                    className="block text-xs font-semibold text-foreground mb-1.5"
                    htmlFor="phone"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9+\-\s()]{10,15}$/,
                        message: "Enter a valid phone number",
                      },
                    })}
                    placeholder="+91 98765 43210"
                    data-ocid="collab.form.phone.input"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-shadow"
                  />
                  <FieldError message={errors.phone?.message} />
                </div>
                <div>
                  <label
                    className="block text-xs font-semibold text-foreground mb-1.5"
                    htmlFor="gstNumber"
                  >
                    GST Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="gstNumber"
                    {...register("gstNumber", {
                      required: "GST number is required",
                    })}
                    placeholder="22AAAAA0000A1Z5"
                    data-ocid="collab.form.gst_number.input"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-shadow"
                  />
                  <FieldError message={errors.gstNumber?.message} />
                </div>
                <div className="md:col-span-2">
                  <label
                    className="block text-xs font-semibold text-foreground mb-1.5"
                    htmlFor="businessAddress"
                  >
                    Business Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="businessAddress"
                    rows={3}
                    {...register("businessAddress", {
                      required: "Business address is required",
                    })}
                    placeholder="Full business address including street, city, state, and PIN code..."
                    data-ocid="collab.form.business_address.textarea"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-shadow resize-none"
                  />
                  <FieldError message={errors.businessAddress?.message} />
                </div>
              </div>
            </div>

            {/* Section 2: Product Categories */}
            <div className="bg-card border border-border rounded-xl overflow-hidden mb-5">
              <div className="px-6 py-4 bg-muted/40 border-b border-border">
                <h2 className="text-sm font-semibold text-foreground">
                  Product Categories
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Select all mobile accessory categories you will sell
                </p>
              </div>
              <div className="px-6 py-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {MOBILE_CATEGORIES.map((cat) => (
                    <label
                      key={cat}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                        selectedCategories.includes(cat)
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/40 hover:bg-muted/30"
                      }`}
                      data-ocid={`collab.form.category.${cat
                        .replace(/\s+/g, "_")
                        .toLowerCase()}.checkbox`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                        className="w-4 h-4 rounded border-border text-primary focus:ring-primary/50"
                      />
                      <span className="text-sm text-foreground">{cat}</span>
                    </label>
                  ))}
                </div>
                {errors.categories && (
                  <p
                    className="flex items-center gap-1.5 mt-2 text-xs text-red-600"
                    data-ocid="form.field_error"
                  >
                    <AlertCircle className="w-3 h-3 flex-shrink-0" />
                    {errors.categories.message}
                  </p>
                )}
              </div>
            </div>

            {/* Section 3: Bank Details */}
            <div className="bg-card border border-border rounded-xl overflow-hidden mb-7">
              <div className="px-6 py-4 bg-muted/40 border-b border-border">
                <h2 className="text-sm font-semibold text-foreground">
                  Bank Details
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  For payment settlements
                </p>
              </div>
              <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label
                    className="block text-xs font-semibold text-foreground mb-1.5"
                    htmlFor="bankAccountNumber"
                  >
                    Account Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="bankAccountNumber"
                    {...register("bankAccountNumber", {
                      required: "Account number is required",
                    })}
                    placeholder="123456789012"
                    data-ocid="collab.form.bank_account.input"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-shadow"
                  />
                  <FieldError message={errors.bankAccountNumber?.message} />
                </div>
                <div>
                  <label
                    className="block text-xs font-semibold text-foreground mb-1.5"
                    htmlFor="bankIfscCode"
                  >
                    IFSC Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="bankIfscCode"
                    {...register("bankIfscCode", {
                      required: "IFSC code is required",
                    })}
                    placeholder="SBIN0001234"
                    data-ocid="collab.form.bank_ifsc.input"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-shadow"
                  />
                  <FieldError message={errors.bankIfscCode?.message} />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-xs text-muted-foreground">
                By submitting, you agree to MAW's vendor terms and conditions.
              </p>
              <button
                type="submit"
                disabled={createMutation.isPending}
                data-ocid="collab.form.submit_button"
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-60 text-primary-foreground font-semibold px-8 py-3 rounded-xl text-sm transition-all duration-200 shadow-md shadow-primary/25 min-w-[180px] justify-center"
              >
                {createMutation.isPending ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting…
                  </>
                ) : (
                  "Submit Application"
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </LightSidebarLayout>
  );
}
