import { useFormattedCounter } from "@/hooks/useCounterAnimation";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

interface KpiCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  trend?: number; // percentage, positive = up, negative = down
  trendLabel?: string;
  prefix?: string;
  suffix?: string;
  accentColor?: string;
  className?: string;
}

export function KpiCard({
  label,
  value,
  icon: Icon,
  trend,
  trendLabel,
  prefix = "",
  suffix = "",
  accentColor = "text-primary",
  className,
}: KpiCardProps) {
  const animated = useFormattedCounter(value);

  const isPositive = trend !== undefined && trend >= 0;
  const trendAbs = trend !== undefined ? Math.abs(trend) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
      className={cn(
        "bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1 min-w-0">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider truncate">
            {label}
          </p>
          <p
            className={cn(
              "text-3xl font-bold font-display tracking-tight",
              accentColor,
            )}
          >
            {prefix}
            {animated}
            {suffix}
          </p>
        </div>
        <div className="flex-shrink-0 p-2.5 bg-primary/10 rounded-lg">
          <Icon className="w-5 h-5 text-primary" strokeWidth={1.75} />
        </div>
      </div>
      {trend !== undefined && (
        <div className="mt-3 flex items-center gap-1.5">
          <span
            className={cn(
              "inline-flex items-center gap-0.5 text-xs font-medium px-1.5 py-0.5 rounded-full",
              isPositive
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : "bg-red-500/10 text-red-600 dark:text-red-400",
            )}
          >
            {isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {trendAbs}%
          </span>
          {trendLabel && (
            <span className="text-xs text-muted-foreground">{trendLabel}</span>
          )}
        </div>
      )}
    </motion.div>
  );
}
