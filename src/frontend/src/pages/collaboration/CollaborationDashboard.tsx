import { KpiCard } from "@/components/ui/KpiCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatBadge } from "@/components/ui/StatBadge";
import { LightSidebarLayout } from "@/layouts/LightSidebarLayout";
import {
  Bell,
  CalendarDays,
  FolderOpen,
  LayoutDashboard,
  MessageSquare,
  Plus,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/collaboration", icon: LayoutDashboard },
  { label: "Projects", href: "/collaboration/projects", icon: FolderOpen },
  { label: "Team", href: "/collaboration/team", icon: Users },
  { label: "Messages", href: "/collaboration/messages", icon: MessageSquare },
  { label: "Calendar", href: "/collaboration/calendar", icon: CalendarDays },
  { label: "Notifications", href: "/collaboration/notifications", icon: Bell },
];

const PROJECTS = [
  {
    name: "Q3 Vendor Onboarding",
    team: "Business Dev",
    tasks: 24,
    completed: 18,
    status: "in_progress",
    dueDate: "Jun 30",
  },
  {
    name: "Warehouse System Upgrade",
    team: "Engineering",
    tasks: 41,
    completed: 41,
    status: "resolved",
    dueDate: "May 15",
  },
  {
    name: "Customer App Revamp",
    team: "Product & Design",
    tasks: 56,
    completed: 23,
    status: "in_progress",
    dueDate: "Jul 31",
  },
  {
    name: "Winter Collection Launch",
    team: "Marketing",
    tasks: 18,
    completed: 6,
    status: "pending",
    dueDate: "Oct 1",
  },
];

export function CollaborationPortal() {
  return (
    <LightSidebarLayout
      portalName="Collaboration Hub"
      portalLogo={Users}
      navItems={NAV_ITEMS}
      userLabel="Jordan P."
      userSubLabel="Product Lead"
    >
      <PageHeader
        title="Collaboration Hub"
        subtitle="Projects, team coordination, and cross-functional workflows"
        action={
          <button
            type="button"
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            data-ocid="collab.new_project.button"
          >
            <Plus className="w-4 h-4" />
            New Project
          </button>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard
          label="Active Projects"
          value={26}
          icon={FolderOpen}
          trend={4}
          trendLabel="this month"
        />
        <KpiCard label="Team Members" value={138} icon={Users} />
        <KpiCard
          label="Open Tasks"
          value={1135}
          icon={CalendarDays}
          trend={-8}
          trendLabel="completed"
        />
        <KpiCard label="Unread Messages" value={47} icon={MessageSquare} />
      </div>

      <div className="bg-white border border-border rounded-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-sm font-semibold text-foreground">
            Active Projects
          </h2>
          <button
            type="button"
            className="text-xs text-primary hover:underline"
            data-ocid="collab.projects.view_all.button"
          >
            View All
          </button>
        </div>
        <div className="divide-y divide-border">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              className="flex items-center gap-4 px-5 py-4 hover:bg-muted/30 transition-colors"
              data-ocid={`collab.project.item.${i + 1}`}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">
                  {project.name}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {project.team} · Due {project.dueDate}
                </p>
                <div className="mt-2 w-full bg-muted rounded-full h-1.5">
                  <div
                    className="bg-primary h-1.5 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.round((project.completed / project.tasks) * 100)}%`,
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                <StatBadge status={project.status} />
                <span className="text-xs text-muted-foreground">
                  {project.completed}/{project.tasks} tasks
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </LightSidebarLayout>
  );
}
