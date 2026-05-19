import { cn } from "@/lib/utils";

type StatusVariant =
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "muted"
  | "purple";

const VARIANT_CLASSES: Record<StatusVariant, string> = {
  success:
    "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
  warning:
    "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800",
  danger:
    "bg-red-500/10 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800",
  info: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800",
  muted: "bg-muted text-muted-foreground border-border",
  purple: "bg-primary/10 text-primary border-primary/20",
};

const DOT_CLASSES: Record<StatusVariant, string> = {
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger: "bg-red-500",
  info: "bg-blue-500",
  muted: "bg-muted-foreground",
  purple: "bg-primary",
};

function resolveVariant(status: string): StatusVariant {
  const s = status.toLowerCase();
  if (["approved", "delivered", "resolved", "active", "received"].includes(s))
    return "success";
  if (["pending", "arriving", "in_progress", "processing"].includes(s))
    return "warning";
  if (["rejected", "failed", "cancelled", "closed"].includes(s))
    return "danger";
  if (["dispatched", "shipped", "confirmed", "assigned"].includes(s))
    return "info";
  if (["open", "in_transit"].includes(s)) return "purple";
  return "muted";
}

interface StatBadgeProps {
  status: string;
  label?: string;
  showDot?: boolean;
  className?: string;
  variant?: StatusVariant;
}

export function StatBadge({
  status,
  label,
  showDot = true,
  className,
  variant,
}: StatBadgeProps) {
  const resolvedVariant = variant ?? resolveVariant(status);
  const displayLabel = label ?? status.replace(/_/g, " ");

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize",
        VARIANT_CLASSES[resolvedVariant],
        className,
      )}
    >
      {showDot && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full flex-shrink-0",
            DOT_CLASSES[resolvedVariant],
          )}
        />
      )}
      {displayLabel}
    </span>
  );
}
