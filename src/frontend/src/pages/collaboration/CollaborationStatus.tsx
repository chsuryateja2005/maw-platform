import { StatBadge } from "@/components/ui/StatBadge";
import { LightSidebarLayout } from "@/layouts/LightSidebarLayout";
import { Link } from "@tanstack/react-router";
import {
  Building2,
  CheckCircle2,
  ClipboardList,
  Clock,
  ExternalLink,
  Home,
  Loader2,
  PackageCheck,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";

const NAV_ITEMS = [
  { label: "Home", href: "/collaboration", icon: Home },
  { label: "Apply Now", href: "/collaboration/register", icon: ClipboardList },
  {
    label: "My Application",
    href: "/collaboration/status",
    icon: PackageCheck,
  },
];

const APPLICATION = {
  id: "MAW-VND-2025-0847",
  companyName: "Horizon Tech Industries Ltd.",
  brandName: "HorizonPro",
  productName: "HorizonPro UltraCharge Hub X9",
  productCategory: "Electronics & Gadgets",
  submittedDate: "May 14, 2025",
  currentStep: 2,
};

const TIMELINE_STEPS = [
  {
    id: "submitted",
    step: 1,
    label: "Application Submitted",
    description: "Your application has been received and queued for review.",
    icon: CheckCircle2,
    state: "complete" as const,
  },
  {
    id: "under-review",
    step: 2,
    label: "Under Review",
    description: "Our vendor success team is evaluating your application.",
    icon: Loader2,
    state: "active" as const,
  },
  {
    id: "decision",
    step: 3,
    label: "Decision",
    description: "Final approval or feedback from the vendor committee.",
    icon: ShieldCheck,
    state: "upcoming" as const,
  },
  {
    id: "approved",
    step: 4,
    label: "Approved & Onboarded",
    description: "Welcome to MAW! Your products go live on the marketplace.",
    icon: XCircle,
    state: "upcoming" as const,
  },
];

function TimelineStep({
  step,
  isLast,
}: {
  step: (typeof TIMELINE_STEPS)[number];
  isLast: boolean;
}) {
  const stateStyle = {
    complete: {
      icon: "bg-emerald-500 text-white",
      label: "text-foreground font-semibold",
      connector: "bg-emerald-400",
    },
    active: {
      icon: "bg-indigo-600 text-white ring-4 ring-indigo-200",
      label: "text-indigo-700 font-bold",
      connector: "bg-border",
    },
    upcoming: {
      icon: "bg-muted text-muted-foreground border border-border",
      label: "text-muted-foreground",
      connector: "bg-border",
    },
  }[step.state];

  return (
    <div className="flex gap-4" data-ocid={`collab.timeline.step.${step.step}`}>
      <div className="flex flex-col items-center">
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${stateStyle.icon}`}
        >
          {step.state === "active" ? (
            <step.icon className="w-4 h-4 animate-spin" strokeWidth={2} />
          ) : step.state === "complete" ? (
            <CheckCircle2 className="w-4 h-4" strokeWidth={2} />
          ) : (
            <span className="text-xs font-bold">{step.step}</span>
          )}
        </div>
        {!isLast && (
          <div
            className={`w-0.5 flex-1 mt-1 min-h-[40px] rounded-full ${stateStyle.connector}`}
          />
        )}
      </div>
      <div className="pb-8">
        <p className={`text-sm ${stateStyle.label}`}>{step.label}</p>
        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
          {step.description}
        </p>
        {step.state === "active" && (
          <span className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-0.5 bg-indigo-50 border border-indigo-200 rounded-full text-xs font-medium text-indigo-700">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
            In Progress
          </span>
        )}
      </div>
    </div>
  );
}

export function CollaborationStatus() {
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
          {/* Page Header */}
          <div className="mb-7">
            <h1 className="text-2xl font-bold font-display text-foreground tracking-tight">
              Application Status
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Track the progress of your vendor application below.
            </p>
          </div>

          {/* Status Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="bg-white border border-border rounded-xl overflow-hidden mb-5 shadow-sm"
            data-ocid="collab.status.card"
          >
            {/* Status Banner */}
            <div className="bg-amber-50 border-b border-amber-100 px-6 py-5 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center mb-3">
                <Clock className="w-7 h-7 text-amber-600" strokeWidth={1.75} />
              </div>
              <StatBadge
                status="pending"
                label="Pending Review"
                className="px-4 py-1.5 text-sm mb-2"
              />
              <p className="text-xs text-muted-foreground mt-1.5">
                Application ID:{" "}
                <span className="font-mono font-semibold text-foreground">
                  {APPLICATION.id}
                </span>
              </p>
            </div>

            {/* Details Grid */}
            <div className="px-6 py-5 grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
              {[
                { label: "Company", value: APPLICATION.companyName },
                { label: "Brand", value: APPLICATION.brandName },
                { label: "Product", value: APPLICATION.productName },
                { label: "Category", value: APPLICATION.productCategory },
                { label: "Submitted", value: APPLICATION.submittedDate },
              ].map((detail) => (
                <div key={detail.label}>
                  <p className="text-xs text-muted-foreground">
                    {detail.label}
                  </p>
                  <p className="text-sm font-semibold text-foreground mt-0.5 break-words">
                    {detail.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="bg-white border border-border rounded-xl overflow-hidden mb-5 shadow-sm"
          >
            <div className="px-6 py-4 border-b border-border bg-muted/30">
              <h2 className="text-sm font-semibold text-foreground">
                Review Progress
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Our team reviews applications within 3–5 business days.
              </p>
            </div>
            <div className="px-6 py-6">
              {TIMELINE_STEPS.map((step, i) => (
                <TimelineStep
                  key={step.id}
                  step={step}
                  isLast={i === TIMELINE_STEPS.length - 1}
                />
              ))}
            </div>
          </motion.div>

          {/* Info + Support */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-indigo-50 border border-indigo-100 rounded-xl px-6 py-4 flex items-start gap-4"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <ShieldCheck
                className="w-4 h-4 text-indigo-600"
                strokeWidth={1.75}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-indigo-900">
                Application under review
              </p>
              <p className="text-xs text-indigo-700 mt-0.5 leading-relaxed">
                Our vendor success team is carefully reviewing your submission.
                You'll receive an email at your registered business address once
                a decision is made.
              </p>
              <div className="mt-3 flex items-center gap-4">
                <Link
                  to="/support"
                  data-ocid="collab.status.contact_support.link"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 hover:text-indigo-900 transition-colors"
                >
                  Contact Support
                  <ExternalLink className="w-3 h-3" />
                </Link>
                <Link
                  to="/collaboration"
                  data-ocid="collab.status.back_home.link"
                  className="text-xs text-indigo-600/80 hover:text-indigo-700 transition-colors"
                >
                  ← Back to Home
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </LightSidebarLayout>
  );
}
