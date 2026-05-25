import { createActor } from "@/backend";
import type { VendorRequest } from "@/backend";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatBadge } from "@/components/ui/StatBadge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DarkSidebarLayout } from "@/layouts/DarkSidebarLayout";
import { VendorStatus } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Inbox, LayoutDashboard } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { NAV_ITEMS } from "./adminNav";

type FilterTab = "all" | VendorStatus;

const TABS: { id: FilterTab; label: string }[] = [
  { id: "all", label: "All" },
  { id: VendorStatus.pending, label: "Pending" },
  { id: VendorStatus.approved, label: "Approved" },
  { id: VendorStatus.rejected, label: "Rejected" },
];

function useVendorRequests() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery<VendorRequest[]>({
    queryKey: ["vendorRequests"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getVendorRequests();
    },
    enabled: !!actor && !actorFetching,
    refetchInterval: 5000,
  });
}

function useUpdateVendorRequestStatus() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: bigint;
      status: VendorStatus;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateVendorRequestStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendorRequests"] });
    },
  });
}

function formatDate(ts: bigint): string {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function AdminVendorsContent() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const { data: requests = [], isLoading } = useVendorRequests();
  const updateStatus = useUpdateVendorRequestStatus();

  const filtered = requests.filter((v) =>
    activeTab === "all" ? true : v.status === activeTab,
  );

  function handleApprove(v: VendorRequest) {
    updateStatus.mutate(
      { id: v.id, status: VendorStatus.approved },
      {
        onSuccess: () =>
          toast.success(`${v.companyName} approved`, {
            description: "Vendor can now list products.",
          }),
        onError: () => toast.error("Failed to approve vendor"),
      },
    );
  }

  function handleReject(v: VendorRequest) {
    updateStatus.mutate(
      { id: v.id, status: VendorStatus.rejected },
      {
        onSuccess: () =>
          toast.error(`${v.companyName} rejected`, {
            description: "Vendor access has been revoked.",
          }),
        onError: () => toast.error("Failed to reject vendor"),
      },
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <PageHeader
        title="Vendor Requests"
        subtitle="Review and manage vendor applications"
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          { label: "Total", value: requests.length },
          {
            label: "Pending",
            value: requests.filter((r) => r.status === VendorStatus.pending)
              .length,
          },
          {
            label: "Approved",
            value: requests.filter((r) => r.status === VendorStatus.approved)
              .length,
          },
          {
            label: "Rejected",
            value: requests.filter((r) => r.status === VendorStatus.rejected)
              .length,
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-card border border-border rounded-xl p-4"
          >
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div
        className="flex gap-1 mb-5 bg-muted/40 p-1 rounded-lg w-fit"
        data-ocid="vendors.filter.tabs"
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            data-ocid={`vendors.filter.${tab.id}.tab`}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-150 ${
              activeTab === tab.id
                ? "bg-card shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div
        className="bg-card border border-border rounded-xl overflow-x-auto"
        data-ocid="vendors.table"
      >
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/40 border-b border-border">
              {[
                "Request ID",
                "Company",
                "Brand",
                "Owner",
                "Email",
                "Categories",
                "GST",
                "Submitted",
                "Status",
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
              ["r1", "r2", "r3", "r4", "r5"].map((rk) => (
                <tr key={rk} className="border-b border-border/50">
                  {[
                    "c1",
                    "c2",
                    "c3",
                    "c4",
                    "c5",
                    "c6",
                    "c7",
                    "c8",
                    "c9",
                    "c10",
                  ].map((ck) => (
                    <td key={ck} className="px-4 py-3">
                      <Skeleton className="h-4 w-20" />
                    </td>
                  ))}
                </tr>
              ))
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-12 text-center">
                  <div
                    className="flex flex-col items-center gap-3 text-muted-foreground"
                    data-ocid="vendors.empty_state"
                  >
                    <Inbox className="w-10 h-10 opacity-40" />
                    <p className="text-sm">No vendor requests found.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((v, i) => (
                <motion.tr
                  key={v.id.toString()}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.22, delay: i * 0.04 }}
                  className="border-b border-border/50 hover:bg-primary/5 transition-colors"
                  data-ocid={`vendors.item.${i + 1}`}
                >
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    #{v.id.toString()}
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground">
                    {v.companyName}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {v.brandName}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {v.ownerName}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{v.email}</td>
                  <td
                    className="px-4 py-3 text-muted-foreground max-w-[180px] truncate"
                    title={v.categories.join(", ")}
                  >
                    {v.categories.join(", ")}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground font-mono text-xs">
                    {v.gstNumber}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">
                    {formatDate(v.submittedAt)}
                  </td>
                  <td className="px-4 py-3">
                    <StatBadge status={v.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {v.status !== VendorStatus.approved && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs text-emerald-600 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-400"
                          onClick={() => handleApprove(v)}
                          disabled={updateStatus.isPending}
                          data-ocid={`vendors.approve_button.${i + 1}`}
                        >
                          Approve
                        </Button>
                      )}
                      {v.status !== VendorStatus.rejected && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs text-red-600 border-red-200 hover:bg-red-50 hover:border-red-400"
                          onClick={() => handleReject(v)}
                          disabled={updateStatus.isPending}
                          data-ocid={`vendors.reject_button.${i + 1}`}
                        >
                          Reject
                        </Button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export function AdminVendors() {
  return (
    <DarkSidebarLayout
      portalName="Admin Portal"
      portalLogo={LayoutDashboard}
      navItems={NAV_ITEMS}
      userLabel="Admin User"
      userSubLabel="Super Administrator"
    >
      <AdminVendorsContent />
    </DarkSidebarLayout>
  );
}
