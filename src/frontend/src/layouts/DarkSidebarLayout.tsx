import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import { LogOut, type LucideIcon, Menu, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface DarkSidebarLayoutProps {
  portalName: string;
  portalLogo?: LucideIcon;
  navItems: NavItem[];
  children: React.ReactNode;
  userLabel?: string;
  userSubLabel?: string;
}

export function DarkSidebarLayout({
  portalName,
  portalLogo: Logo,
  navItems,
  children,
  userLabel = "Admin User",
  userSubLabel = "Administrator",
}: DarkSidebarLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouterState();
  const pathname = router.location.pathname;

  return (
    <div className="flex h-screen overflow-hidden bg-[#0f172a]">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="flex-shrink-0 overflow-hidden"
      >
        <div
          className="flex flex-col h-full w-[280px] bg-[#0f172a] border-r border-white/[0.06]"
          style={{ boxShadow: "2px 0 20px rgba(0,0,0,0.3)" }}
        >
          {/* Logo area */}
          <div className="flex items-center gap-3 px-5 py-5 border-b border-white/[0.06]">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-indigo-500">
              {Logo ? (
                <Logo className="w-5 h-5 text-white" />
              ) : (
                <span className="text-white font-bold text-sm">
                  {portalName[0]}
                </span>
              )}
            </div>
            <div className="min-w-0">
              <p className="text-white font-bold text-sm leading-tight font-display">
                MAW
              </p>
              <p className="text-indigo-300 text-xs truncate">{portalName}</p>
            </div>
          </div>

          {/* Nav items */}
          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  data-ocid={`nav.${item.label.toLowerCase().replace(/\s+/g, "_")}.link`}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                    isActive
                      ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.06] border border-transparent",
                  )}
                >
                  <item.icon
                    className={cn(
                      "w-4.5 h-4.5 flex-shrink-0",
                      isActive ? "text-indigo-400" : "text-slate-500",
                    )}
                    strokeWidth={1.75}
                  />
                  <span className="truncate">{item.label}</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom user section */}
          <div className="p-3 border-t border-white/[0.06]">
            <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/[0.06] transition-colors cursor-pointer group">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">
                  {userLabel.charAt(0)}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-slate-200 truncate">
                  {userLabel}
                </p>
                <p className="text-xs text-slate-500 truncate">
                  {userSubLabel}
                </p>
              </div>
              <LogOut
                className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors flex-shrink-0"
                strokeWidth={1.75}
              />
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center gap-3 px-5 py-3 bg-white border-b border-border shadow-subtle flex-shrink-0">
          <button
            type="button"
            onClick={() => setSidebarOpen((v) => !v)}
            className="p-1.5 rounded-md hover:bg-muted transition-colors"
            aria-label="Toggle sidebar"
            data-ocid="sidebar.toggle"
          >
            {sidebarOpen ? (
              <X className="w-4 h-4 text-muted-foreground" />
            ) : (
              <Menu className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">
              {portalName}
            </p>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-background p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
