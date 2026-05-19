import { cn } from "@/lib/utils";

interface SkeletonRowProps {
  cols?: number;
  className?: string;
}

function ShimmerCell({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-4 rounded-md bg-gradient-to-r from-muted via-muted/60 to-muted bg-[length:600px_100%] animate-shimmer",
        className,
      )}
    />
  );
}

const CELL_KEYS = [
  "col-a",
  "col-b",
  "col-c",
  "col-d",
  "col-e",
  "col-f",
  "col-g",
  "col-h",
];

export function SkeletonRow({ cols = 5, className }: SkeletonRowProps) {
  const widths = ["w-1/3", "w-1/4", "w-1/5", "w-1/6", "w-1/4"];

  return (
    <tr className={cn("border-b border-border/50", className)}>
      {CELL_KEYS.slice(0, cols).map((cellKey, ci) => (
        <td key={cellKey} className="px-4 py-3">
          <ShimmerCell className={widths[ci % widths.length]} />
        </td>
      ))}
    </tr>
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-card border border-border rounded-xl p-5 space-y-3 animate-pulse",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <ShimmerCell className="w-2/5 h-3" />
        <div className="w-10 h-10 rounded-lg bg-muted" />
      </div>
      <ShimmerCell className="w-1/2 h-8" />
      <ShimmerCell className="w-1/3 h-3" />
    </div>
  );
}
