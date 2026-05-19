import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import { LogOut, type LucideIcon, Menu, X } from "lucide-react";
import { useState } from "react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface LightSidebarLayoutProps {
  portalName: string;
  portalLogo?: LucideIcon;
  navItems: NavItem[];
  children: React.ReactNode;
  userLabel?: string;
  userSubLabel?: string;
}

export function LightSidebarLayout({
  portalName,
  portalLogo: Logo,
  navItems,
  children,
  userLabel = "Team Member",
  userSubLabel = "Member",
}: LightSidebarLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouterState();
  const pathname = router.location.pathname;

  return (
    <div className="flex h-screen overflow-hidden bg-[#f9fafb]">
      {/* Sidebar */}
      <aside
        className={cn(
          "flex flex-col flex-shrink-0 overflow-hidden transition-all duration-250 ease-in-out",
          sidebarOpen ? "w-[260px]" : "w-0",
        )}
      >
        <div className="flex flex-col h-full w-[260px] bg-white border-r border-border">
          {/* Logo */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500 flex-shrink-0">
              {Logo ? (
                <Logo className="w-4.5 h-4.5 text-white" />
              ) : (
                <span className="text-white font-bold text-sm">
                  {portalName[0]}
                </span>
              )}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-foreground font-display">
                MAW
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {portalName}
              </p>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  data-ocid={`nav.${item.label.toLowerCase().replace(/\s+/g, "_")}.link`}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                  )}
                >
                  <item.icon
                    className={cn(
                      "w-4 h-4 flex-shrink-0",
                      isActive ? "text-primary" : "text-muted-foreground",
                    )}
                    strokeWidth={1.75}
                  />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User */}
          <div className="p-3 border-t border-border">
            <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-muted transition-colors cursor-pointer group">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/70 to-primary flex items-center justify-center flex-shrink-0">
                <span className="text-primary-foreground text-xs font-bold">
                  {userLabel.charAt(0)}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-foreground truncate">
                  {userLabel}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {userSubLabel}
                </p>
              </div>
              <LogOut
                className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                strokeWidth={1.75}
              />
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center gap-3 px-5 py-3 bg-white border-b border-border flex-shrink-0">
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
          <span className="text-sm font-semibold text-foreground">
            {portalName}
          </span>
        </header>

        <main className="flex-1 overflow-y-auto bg-[#f9fafb] p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
