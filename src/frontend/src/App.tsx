import PortalSelector from "@/pages/PortalSelector";
import { AdminAnalytics } from "@/pages/admin/AdminAnalytics";
import { AdminPortal } from "@/pages/admin/AdminDashboard";
import { AdminProducts } from "@/pages/admin/AdminProducts";
import { AdminSecurity } from "@/pages/admin/AdminSecurity";
import { AdminVendors } from "@/pages/admin/AdminVendors";
import { CollaborationHome } from "@/pages/collaboration/CollaborationHome";
import { CollaborationRegister } from "@/pages/collaboration/CollaborationRegister";
import { CollaborationStatus } from "@/pages/collaboration/CollaborationStatus";
import CustomerCart from "@/pages/customer/CustomerCart";
import CustomerCheckout from "@/pages/customer/CustomerCheckout";
import { CustomerPortal } from "@/pages/customer/CustomerHome";
import CustomerOrders from "@/pages/customer/CustomerOrders";
import CustomerProductDetail from "@/pages/customer/CustomerProductDetail";
import CustomerProducts from "@/pages/customer/CustomerProducts";
import CustomerProfile from "@/pages/customer/CustomerProfile";
import CustomerWishlist from "@/pages/customer/CustomerWishlist";
import { DeliveryPortal } from "@/pages/delivery/DeliveryDashboard";
import { DeliveryDetail } from "@/pages/delivery/DeliveryDetail";
import { DeliveryList } from "@/pages/delivery/DeliveryList";
import { ManagerPortal } from "@/pages/manager/ManagerDashboard";
import { ManagerDispatchPortal } from "@/pages/manager/ManagerDispatch";
import { ManagerInventoryPortal } from "@/pages/manager/ManagerInventory";
import { ManagerShipmentsPortal } from "@/pages/manager/ManagerShipments";
import { SupportPortal } from "@/pages/support/SupportDashboard";
import { SupportLiveChat } from "@/pages/support/SupportLiveChat";
import { SupportTicketDetail } from "@/pages/support/SupportTicketDetail";
import { SupportTickets } from "@/pages/support/SupportTickets";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Toaster } from "sonner";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <AnimatePresence mode="wait">
        <Outlet />
      </AnimatePresence>
      <Toaster
        position="bottom-right"
        richColors
        closeButton
        toastOptions={{ duration: 4500 }}
      />
    </>
  ),
});

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: "easeInOut" }}
      className="contents"
    >
      {children}
    </motion.div>
  );
}

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <Navigate to="/user" replace />,
});

const portalsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/portals",
  component: () => (
    <PageTransition>
      <PortalSelector />
    </PageTransition>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <PageTransition>
      <AdminPortal />
    </PageTransition>
  ),
});

const adminVendorsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/vendors",
  component: () => (
    <PageTransition>
      <AdminVendors />
    </PageTransition>
  ),
});

const adminProductsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/products",
  component: () => (
    <PageTransition>
      <AdminProducts />
    </PageTransition>
  ),
});

const adminAnalyticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/analytics",
  component: () => (
    <PageTransition>
      <AdminAnalytics />
    </PageTransition>
  ),
});

const adminSecurityRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/security",
  component: () => (
    <PageTransition>
      <AdminSecurity />
    </PageTransition>
  ),
});

const managerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/manager",
  component: () => (
    <PageTransition>
      <ManagerPortal />
    </PageTransition>
  ),
});

const managerShipmentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/manager/shipments",
  component: () => (
    <PageTransition>
      <ManagerShipmentsPortal />
    </PageTransition>
  ),
});

const managerInventoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/manager/inventory",
  component: () => (
    <PageTransition>
      <ManagerInventoryPortal />
    </PageTransition>
  ),
});

const managerDispatchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/manager/dispatch",
  component: () => (
    <PageTransition>
      <ManagerDispatchPortal />
    </PageTransition>
  ),
});

const deliveryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/delivery",
  component: () => (
    <PageTransition>
      <DeliveryPortal />
    </PageTransition>
  ),
});

const deliveryListRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/delivery/list",
  component: () => (
    <PageTransition>
      <DeliveryList />
    </PageTransition>
  ),
});

const deliveryDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/delivery/detail/$deliveryId",
  component: () => (
    <PageTransition>
      <DeliveryDetail />
    </PageTransition>
  ),
});

const userRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/user",
  component: () => (
    <PageTransition>
      <CustomerPortal />
    </PageTransition>
  ),
});

const userProductsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/user/products",
  component: () => (
    <PageTransition>
      <CustomerProducts />
    </PageTransition>
  ),
});

const userProductDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/user/products/$productId",
  component: () => (
    <PageTransition>
      <CustomerProductDetail />
    </PageTransition>
  ),
});

const userCartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/user/cart",
  component: () => (
    <PageTransition>
      <CustomerCart />
    </PageTransition>
  ),
});

const userCheckoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/user/checkout",
  component: () => (
    <PageTransition>
      <CustomerCheckout />
    </PageTransition>
  ),
});

const userTrackRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/user/track",
  component: () => (
    <PageTransition>
      <CustomerOrders />
    </PageTransition>
  ),
});

const userOrdersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/user/orders",
  component: () => (
    <PageTransition>
      <CustomerOrders />
    </PageTransition>
  ),
});

const userProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/user/profile",
  component: () => (
    <PageTransition>
      <CustomerProfile />
    </PageTransition>
  ),
});

const userWishlistRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/user/wishlist",
  component: () => (
    <PageTransition>
      <CustomerWishlist />
    </PageTransition>
  ),
});

const collaborationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/collaboration",
  component: () => (
    <PageTransition>
      <CollaborationHome />
    </PageTransition>
  ),
});

const collaborationRegisterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/collaboration/register",
  component: () => (
    <PageTransition>
      <CollaborationRegister />
    </PageTransition>
  ),
});

const collaborationStatusRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/collaboration/status",
  component: () => (
    <PageTransition>
      <CollaborationStatus />
    </PageTransition>
  ),
});

const supportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/support",
  component: () => (
    <PageTransition>
      <SupportPortal />
    </PageTransition>
  ),
});

const supportTicketsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/support/tickets",
  component: () => (
    <PageTransition>
      <SupportTickets />
    </PageTransition>
  ),
});

const supportTicketDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/support/tickets/$ticketId",
  component: () => (
    <PageTransition>
      <SupportTicketDetail />
    </PageTransition>
  ),
});

const supportChatRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/support/chat",
  component: () => (
    <PageTransition>
      <SupportLiveChat />
    </PageTransition>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  portalsRoute,
  adminRoute,
  adminVendorsRoute,
  adminProductsRoute,
  adminAnalyticsRoute,
  adminSecurityRoute,
  managerRoute,
  managerShipmentsRoute,
  managerInventoryRoute,
  managerDispatchRoute,
  deliveryRoute,
  deliveryListRoute,
  deliveryDetailRoute,
  userRoute,
  userProductsRoute,
  userProductDetailRoute,
  userCartRoute,
  userCheckoutRoute,
  userTrackRoute,
  userOrdersRoute,
  userProfileRoute,
  userWishlistRoute,
  collaborationRoute,
  collaborationRegisterRoute,
  collaborationStatusRoute,
  supportRoute,
  supportTicketsRoute,
  supportTicketDetailRoute,
  supportChatRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
