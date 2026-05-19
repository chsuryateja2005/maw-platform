import { LightSidebarLayout } from "@/layouts/LightSidebarLayout";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  Building2,
  ClipboardList,
  FileText,
  Home,
  PackageCheck,
  Upload,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
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

const PRODUCT_CATEGORIES = [
  "Electronics & Gadgets",
  "Fashion & Apparel",
  "Home & Living",
  "Health & Beauty",
  "Sports & Outdoors",
  "Food & Beverages",
  "Toys & Games",
  "Books & Media",
  "Automotive",
  "Industrial Supplies",
  "Pet Care",
  "Other",
];

interface FormFields {
  companyName: string;
  businessEmail: string;
  brandName: string;
  productName: string;
  productCategory: string;
  productSummary: string;
  quantity: number;
  unitPrice: number;
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
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [certFile, setCertFile] = useState<File | null>(null);
  const [logoOver, setLogoOver] = useState(false);
  const [certOver, setCertOver] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const logoRef = useRef<HTMLInputElement>(null);
  const certRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  function handleFileDrop(
    e: React.DragEvent,
    setter: (f: File | null) => void,
    setOver: (v: boolean) => void,
  ) {
    e.preventDefault();
    setOver(false);
    const file = e.dataTransfer.files[0];
    if (file) setter(file);
  }

  async function onSubmit() {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1400));
    setSubmitting(false);
    toast.success("Application submitted!", {
      description: "We'll review your application within 3-5 business days.",
    });
    navigate({ to: "/collaboration/status" });
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
              Company Registration
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Complete all fields to submit your vendor application. Our team
              will review within 3-5 business days.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Section 1: Company Info */}
            <div className="bg-white border border-border rounded-xl overflow-hidden mb-5">
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
                    placeholder="Acme Global Ltd."
                    data-ocid="collab.form.company_name.input"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-shadow"
                  />
                  <FieldError message={errors.companyName?.message} />
                </div>
                <div>
                  <label
                    className="block text-xs font-semibold text-foreground mb-1.5"
                    htmlFor="businessEmail"
                  >
                    Business Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="businessEmail"
                    type="email"
                    {...register("businessEmail", {
                      required: "Business email is required",
                      pattern: {
                        value: /^[^@]+@[^@]+\.[^@]+$/,
                        message: "Enter a valid email",
                      },
                    })}
                    placeholder="contact@yourcompany.com"
                    data-ocid="collab.form.business_email.input"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-shadow"
                  />
                  <FieldError message={errors.businessEmail?.message} />
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
              </div>
            </div>

            {/* Section 2: Product Info */}
            <div className="bg-white border border-border rounded-xl overflow-hidden mb-5">
              <div className="px-6 py-4 bg-muted/40 border-b border-border">
                <h2 className="text-sm font-semibold text-foreground">
                  Product Information
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Details about the products you want to list
                </p>
              </div>
              <div className="px-6 py-5 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label
                      className="block text-xs font-semibold text-foreground mb-1.5"
                      htmlFor="productName"
                    >
                      Product Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="productName"
                      {...register("productName", {
                        required: "Product name is required",
                      })}
                      placeholder="AcmePro Wireless Earbuds X5"
                      data-ocid="collab.form.product_name.input"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-shadow"
                    />
                    <FieldError message={errors.productName?.message} />
                  </div>
                  <div>
                    <label
                      className="block text-xs font-semibold text-foreground mb-1.5"
                      htmlFor="productCategory"
                    >
                      Product Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="productCategory"
                      {...register("productCategory", {
                        required: "Select a product category",
                      })}
                      data-ocid="collab.form.product_category.select"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-shadow appearance-none"
                    >
                      <option value="">Select a category…</option>
                      {PRODUCT_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    <FieldError message={errors.productCategory?.message} />
                  </div>
                </div>
                <div>
                  <label
                    className="block text-xs font-semibold text-foreground mb-1.5"
                    htmlFor="productSummary"
                  >
                    Product Summary <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="productSummary"
                    rows={4}
                    {...register("productSummary", {
                      required: "Product summary is required",
                      minLength: {
                        value: 30,
                        message: "Please provide at least 30 characters",
                      },
                    })}
                    placeholder="Describe your product — key features, materials, target audience, and what makes it unique in the market..."
                    data-ocid="collab.form.product_summary.textarea"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-shadow resize-none"
                  />
                  <FieldError message={errors.productSummary?.message} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label
                      className="block text-xs font-semibold text-foreground mb-1.5"
                      htmlFor="quantity"
                    >
                      Initial Quantity <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="quantity"
                      type="number"
                      min={1}
                      {...register("quantity", {
                        required: "Quantity is required",
                        min: { value: 1, message: "Minimum quantity is 1" },
                        valueAsNumber: true,
                      })}
                      placeholder="500"
                      data-ocid="collab.form.quantity.input"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-shadow"
                    />
                    <FieldError message={errors.quantity?.message} />
                  </div>
                  <div>
                    <label
                      className="block text-xs font-semibold text-foreground mb-1.5"
                      htmlFor="unitPrice"
                    >
                      Unit Price (USD) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                        $
                      </span>
                      <input
                        id="unitPrice"
                        type="number"
                        min={0.01}
                        step={0.01}
                        {...register("unitPrice", {
                          required: "Unit price is required",
                          min: {
                            value: 0.01,
                            message: "Price must be greater than 0",
                          },
                          valueAsNumber: true,
                        })}
                        placeholder="29.99"
                        data-ocid="collab.form.unit_price.input"
                        className="w-full pl-7 pr-3.5 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-shadow"
                      />
                    </div>
                    <FieldError message={errors.unitPrice?.message} />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Documents */}
            <div className="bg-white border border-border rounded-xl overflow-hidden mb-7">
              <div className="px-6 py-4 bg-muted/40 border-b border-border">
                <h2 className="text-sm font-semibold text-foreground">
                  Documents &amp; Assets
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Upload your company logo and any relevant certifications
                </p>
              </div>
              <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Logo Upload */}
                <div>
                  <label
                    htmlFor="logo-upload"
                    className="block text-xs font-semibold text-foreground mb-1.5"
                  >
                    Company Logo
                  </label>
                  <button
                    type="button"
                    onClick={() => logoRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setLogoOver(true);
                    }}
                    onDragLeave={() => setLogoOver(false)}
                    onDrop={(e) => handleFileDrop(e, setLogoFile, setLogoOver)}
                    data-ocid="collab.form.logo.upload_button"
                    className={`w-full flex flex-col items-center justify-center gap-2 h-28 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200 ${
                      logoOver
                        ? "border-indigo-400 bg-indigo-50"
                        : "border-border hover:border-indigo-300 hover:bg-indigo-50/40"
                    }`}
                  >
                    <Upload
                      className="w-5 h-5 text-muted-foreground"
                      strokeWidth={1.75}
                    />
                    {logoFile ? (
                      <p className="text-xs text-indigo-600 font-medium text-center px-3 truncate max-w-full">
                        {logoFile.name}
                      </p>
                    ) : (
                      <>
                        <p className="text-xs text-muted-foreground text-center">
                          Drop your logo here
                        </p>
                        <p className="text-xs text-muted-foreground/60">
                          PNG, SVG or JPG · max 5MB
                        </p>
                      </>
                    )}
                  </button>
                  <input
                    id="logo-upload"
                    ref={logoRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setLogoFile(e.target.files?.[0] ?? null)}
                  />
                </div>

                {/* Certificate Upload */}
                <div>
                  <label
                    htmlFor="cert-upload"
                    className="block text-xs font-semibold text-foreground mb-1.5"
                  >
                    Patent / Certificate
                  </label>
                  <button
                    type="button"
                    onClick={() => certRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setCertOver(true);
                    }}
                    onDragLeave={() => setCertOver(false)}
                    onDrop={(e) => handleFileDrop(e, setCertFile, setCertOver)}
                    data-ocid="collab.form.certificate.upload_button"
                    className={`w-full flex flex-col items-center justify-center gap-2 h-28 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200 ${
                      certOver
                        ? "border-indigo-400 bg-indigo-50"
                        : "border-border hover:border-indigo-300 hover:bg-indigo-50/40"
                    }`}
                  >
                    <FileText
                      className="w-5 h-5 text-muted-foreground"
                      strokeWidth={1.75}
                    />
                    {certFile ? (
                      <p className="text-xs text-indigo-600 font-medium text-center px-3 truncate max-w-full">
                        {certFile.name}
                      </p>
                    ) : (
                      <>
                        <p className="text-xs text-muted-foreground text-center">
                          Drop your document here
                        </p>
                        <p className="text-xs text-muted-foreground/60">
                          PDF, PNG or JPG · max 10MB
                        </p>
                      </>
                    )}
                  </button>
                  <input
                    id="cert-upload"
                    ref={certRef}
                    type="file"
                    accept=".pdf,image/*"
                    className="hidden"
                    onChange={(e) => setCertFile(e.target.files?.[0] ?? null)}
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs text-muted-foreground">
                By submitting, you agree to MAW's vendor terms and conditions.
              </p>
              <button
                type="submit"
                disabled={submitting}
                data-ocid="collab.form.submit_button"
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white font-semibold px-8 py-3 rounded-xl text-sm transition-all duration-200 shadow-md shadow-indigo-500/25 min-w-[180px] justify-center"
              >
                {submitting ? (
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
