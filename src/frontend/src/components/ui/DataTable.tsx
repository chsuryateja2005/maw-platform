import { cn } from "@/lib/utils";
import { SkeletonRow } from "./SkeletonRow";

interface Column<T> {
  key: keyof T | string;
  header: string;
  className?: string;
  render?: (row: T, index: number) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  skeletonRows?: number;
  className?: string;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  loading = false,
  skeletonRows = 5,
  className,
  onRowClick,
  emptyMessage = "No data found.",
}: DataTableProps<T>) {
  return (
    <div
      className={cn(
        "w-full overflow-x-auto rounded-xl border border-border",
        className,
      )}
    >
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted/40 border-b border-border">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={cn(
                  "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap",
                  col.className,
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: skeletonRows }, (_, i) => i).map((skelIdx) => (
              <SkeletonRow
                key={`skeleton-${skelIdx * 7 + 1}`}
                cols={columns.length}
              />
            ))
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-12 text-center text-muted-foreground"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={JSON.stringify(Object.values(row)).slice(0, 64)}
                onClick={() => onRowClick?.(row)}
                role={onRowClick ? "button" : undefined}
                tabIndex={onRowClick ? 0 : undefined}
                onKeyDown={
                  onRowClick
                    ? (e) => {
                        if (e.key === "Enter" || e.key === " ") onRowClick(row);
                      }
                    : undefined
                }
                className={cn(
                  "border-b border-border/50 transition-colors duration-150",
                  onRowClick && "cursor-pointer hover:bg-primary/5",
                )}
                data-ocid="table.item"
              >
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    className={cn("px-4 py-3 whitespace-nowrap", col.className)}
                  >
                    {col.render
                      ? col.render(row, 0)
                      : String(row[col.key as keyof T] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
