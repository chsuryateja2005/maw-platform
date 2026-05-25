import type { Issue } from "@/backend";
import { IssueStatus } from "@/backend";
import { KpiCard } from "@/components/ui/KpiCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useIssues, useResolveIssue } from "@/hooks/useQueries";
import { DarkSidebarLayout } from "@/layouts/DarkSidebarLayout";
import {
  AlertCircle,
  CheckCircle2,
  ClipboardList,
  Clock,
  MessageSquare,
  Package,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { managerNavItems } from "./managerNavItems";

type FilterTab = "All" | "Pending" | "Resolved";

function formatTs(ts: bigint): string {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString();
}

function truncate(str: string, max: number): string {
  return str.length > max ? `${str.slice(0, max)}...` : str;
}

function StatusBadge({ status }: { status: IssueStatus }) {
  if (status === IssueStatus.pending) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border bg-amber-500/10 text-amber-700 border-amber-300">
        <Clock className="w-3 h-3" />
        Pending
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border bg-emerald-500/10 text-emerald-700 border-emerald-300">
      <CheckCircle2 className="w-3 h-3" />
      Resolved
    </span>
  );
}

function SkeletonRows() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: skeleton rows
        <tr key={i} className="border-b border-border/50">
          {Array.from({ length: 7 }).map((__, j) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton cells
            <td key={j} className="px-4 py-3">
              <Skeleton className="h-4 w-full" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

function ComplaintsTable({
  issues,
  isLoading,
  filter,
}: {
  issues: Issue[];
  isLoading: boolean;
  filter: FilterTab;
}) {
  const resolveIssue = useResolveIssue();

  const filtered = issues.filter((issue) => {
    if (filter === "All") return true;
    if (filter === "Pending") return issue.status === IssueStatus.pending;
    return issue.status === IssueStatus.resolved;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-card border border-border rounded-xl overflow-hidden"
    >
      <div className="flex items-center gap-2 px-5 py-4 border-b border-border">
        <MessageSquare
          className="w-4 h-4 text-muted-foreground"
          strokeWidth={1.75}
        />
        <h2 className="text-sm font-semibold text-foreground">
          Customer Complaints
        </h2>
        <Badge variant="secondary" className="ml-auto text-xs">
          {isLoading ? "…" : filtered.length} issues
        </Badge>
      </div>

      {!isLoading && filtered.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-16 gap-3"
          data-ocid="complaints.empty_state"
        >
          <ClipboardList className="w-10 h-10 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground">
            No complaints found
          </p>
          <p className="text-xs text-muted-foreground">
            No issues match the selected filter.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/40 border-b border-border">
                {[
                  "#",
                  "Issue ID",
                  "Customer ID",
                  "Description",
                  "Status",
                  "Date",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <SkeletonRows />
              ) : (
                filtered.map((issue, idx) => (
                  <motion.tr
                    key={issue.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.04, duration: 0.25 }}
                    className="border-b border-border/50 hover:bg-primary/5 transition-colors"
                    data-ocid={`complaints.item.${idx + 1}`}
                  >
                    <td className="px-4 py-3 text-xs text-muted-foreground font-medium">
                      {idx + 1}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs font-semibold text-foreground">
                      {truncate(issue.id, 12)}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                      {truncate(issue.customerId, 12)}
                    </td>
                    <td className="px-4 py-3 max-w-xs">
                      <p className="text-sm text-foreground">
                        {truncate(issue.description, 60)}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={issue.status} />
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                      {formatTs(issue.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      {issue.status === IssueStatus.pending ? (
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          disabled={resolveIssue.isPending}
                          onClick={() => resolveIssue.mutate(issue.id)}
                          data-ocid={`complaints.confirm_button.${idx + 1}`}
                          className="text-xs h-7 px-2.5 border-emerald-500 text-emerald-700 hover:bg-emerald-50"
                        >
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Mark Resolved
                        </Button>
                      ) : (
                        <span className="text-xs text-muted-foreground font-medium">
                          Resolved
                        </span>
                      )}
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}

function ManagerComplaintsDashboard() {
  const [filter, setFilter] = useState<FilterTab>("All");
  const { data: issues = [], isLoading } = useIssues();

  const total = issues.length;
  const pending = issues.filter((i) => i.status === IssueStatus.pending).length;
  const resolved = issues.filter(
    (i) => i.status === IssueStatus.resolved,
  ).length;

  const tabs: FilterTab[] = ["All", "Pending", "Resolved"];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Customer Complaints"
        subtitle="Monitor and resolve customer issues"
      />

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <KpiCard
          label="Total Complaints"
          value={isLoading ? 0 : total}
          icon={MessageSquare}
          trend={0}
          trendLabel="all time"
          accentColor="text-indigo-600"
        />
        <KpiCard
          label="Pending"
          value={isLoading ? 0 : pending}
          icon={AlertCircle}
          trend={0}
          trendLabel="awaiting action"
          accentColor="text-amber-600"
        />
        <KpiCard
          label="Resolved"
          value={isLoading ? 0 : resolved}
          icon={CheckCircle2}
          trend={0}
          trendLabel="closed successfully"
          accentColor="text-emerald-600"
        />
      </div>

      {/* Filter Tabs */}
      <div
        className="flex items-center gap-2 flex-wrap"
        data-ocid="complaints.filter"
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setFilter(tab)}
            data-ocid={`complaints.tab.${tab.toLowerCase()}`}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
              filter === tab
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <ComplaintsTable issues={issues} isLoading={isLoading} filter={filter} />
    </div>
  );
}

export function ManagerComplaints() {
  return (
    <DarkSidebarLayout
      portalName="Warehouse Manager"
      portalLogo={Package}
      navItems={managerNavItems}
      userLabel="Alex Reyes"
      userSubLabel="Warehouse Manager"
    >
      <ManagerComplaintsDashboard />
    </DarkSidebarLayout>
  );
}

export default ManagerComplaints;
