import type { Principal } from "@icp-sdk/core/principal";
import type { backendInterface, Delivery, Order, Product, Shipment, Ticket, Vendor, UserApprovalInfo } from "../backend";
import { DeliveryStatus, OrderStatus, ShipmentStatus, TicketPriority, TicketStatus, UserRole, VendorStatus } from "../backend";

// ApprovalStatus is used by setApproval / UserApprovalInfo but not yet exported from backend.d.ts
const ApprovalStatus = { approved: "approved", pending: "pending", rejected: "rejected" } as const;
type ApprovalStatus = (typeof ApprovalStatus)[keyof typeof ApprovalStatus];

const mockPrincipal = { toText: () => "aaaaa-aa", _isPrincipal: true } as unknown as Principal;

const mockProducts: Product[] = [
  { id: BigInt(1), name: "Premium Wireless Headphones", description: "High-fidelity audio with active noise cancellation", stock: BigInt(142), imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400", category: "Electronics", rating: 4.8, price: 299.99 },
  { id: BigInt(2), name: "Ergonomic Office Chair", description: "Lumbar support with adjustable armrests for all-day comfort", stock: BigInt(58), imageUrl: "https://images.unsplash.com/photo-1611967164521-abae8fba4668?w=400", category: "Furniture", rating: 4.6, price: 549.00 },
  { id: BigInt(3), name: "Ultra 4K Monitor 27\"", description: "Crystal-clear IPS panel with HDR10 and USB-C connectivity", stock: BigInt(34), imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400", category: "Electronics", rating: 4.7, price: 699.99 },
  { id: BigInt(4), name: "Mechanical Keyboard Pro", description: "Cherry MX switches with RGB backlight and aluminum frame", stock: BigInt(201), imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400", category: "Peripherals", rating: 4.9, price: 189.00 },
  { id: BigInt(5), name: "Running Shoes Air Boost", description: "Lightweight mesh with responsive foam cushioning", stock: BigInt(89), imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", category: "Sports", rating: 4.5, price: 129.99 },
  { id: BigInt(6), name: "Smart Watch Series X", description: "Health monitoring, GPS, and 7-day battery life", stock: BigInt(67), imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400", category: "Wearables", rating: 4.7, price: 349.00 },
];

const mockOrders: Order[] = [
  { id: BigInt(1001), status: OrderStatus.processing, total: 489.98, userId: mockPrincipal, createdAt: BigInt(Date.now() - 2 * 86400000) * BigInt(1000000), items: [{ name: "Premium Wireless Headphones", productId: BigInt(1), quantity: BigInt(1), price: 299.99 }, { name: "Running Shoes Air Boost", productId: BigInt(5), quantity: BigInt(1), price: 129.99 }] },
  { id: BigInt(1002), status: OrderStatus.shipped, total: 699.99, userId: mockPrincipal, createdAt: BigInt(Date.now() - 5 * 86400000) * BigInt(1000000), items: [{ name: "Ultra 4K Monitor 27\"", productId: BigInt(3), quantity: BigInt(1), price: 699.99 }] },
  { id: BigInt(1003), status: OrderStatus.delivered, total: 189.00, userId: mockPrincipal, createdAt: BigInt(Date.now() - 10 * 86400000) * BigInt(1000000), items: [{ name: "Mechanical Keyboard Pro", productId: BigInt(4), quantity: BigInt(1), price: 189.00 }] },
  { id: BigInt(1004), status: OrderStatus.pending, total: 898.00, userId: mockPrincipal, createdAt: BigInt(Date.now() - 1 * 86400000) * BigInt(1000000), items: [{ name: "Ergonomic Office Chair", productId: BigInt(2), quantity: BigInt(1), price: 549.00 }, { name: "Smart Watch Series X", productId: BigInt(6), quantity: BigInt(1), price: 349.00 }] },
];

const mockDeliveries: Delivery[] = [
  { id: BigInt(1), customerName: "Sarah Johnson", status: DeliveryStatus.in_transit, assignedAt: BigInt(Date.now() - 86400000) * BigInt(1000000), orderId: BigInt(1002), itemsCount: BigInt(1), address: "123 Oak Street, San Francisco, CA 94102" },
  { id: BigInt(2), customerName: "Michael Chen", status: DeliveryStatus.assigned, assignedAt: BigInt(Date.now() - 3600000) * BigInt(1000000), orderId: BigInt(1001), itemsCount: BigInt(2), address: "456 Pine Avenue, Los Angeles, CA 90001" },
  { id: BigInt(3), customerName: "Emma Williams", status: DeliveryStatus.delivered, assignedAt: BigInt(Date.now() - 3 * 86400000) * BigInt(1000000), orderId: BigInt(1003), itemsCount: BigInt(1), address: "789 Maple Drive, Seattle, WA 98101" },
  { id: BigInt(4), customerName: "James Rodriguez", status: DeliveryStatus.in_transit, assignedAt: BigInt(Date.now() - 2 * 3600000) * BigInt(1000000), orderId: BigInt(1004), itemsCount: BigInt(2), address: "321 Cedar Blvd, Austin, TX 78701" },
];

const mockShipments: Shipment[] = [
  { id: BigInt(1), productsCount: BigInt(450), status: ShipmentStatus.arriving, destination: "San Francisco Hub", origin: "Shenzhen Factory", receivedAt: undefined },
  { id: BigInt(2), productsCount: BigInt(200), status: ShipmentStatus.dispatched, destination: "Los Angeles Hub", origin: "Seoul Factory", receivedAt: undefined },
  { id: BigInt(3), productsCount: BigInt(320), status: ShipmentStatus.received, destination: "Seattle Hub", origin: "Tokyo Factory", receivedAt: BigInt(Date.now() - 86400000) * BigInt(1000000) },
  { id: BigInt(4), productsCount: BigInt(180), status: ShipmentStatus.processing, destination: "Austin Hub", origin: "Berlin Factory", receivedAt: undefined },
];

const mockTickets: Ticket[] = [
  { id: BigInt(1), customerName: "Alice Turner", status: TicketStatus.open, subject: "Order #1001 delayed — need update", messages: [{ sender: "Alice Turner", message: "My order has been processing for 3 days with no update. Can you please check?", timestamp: BigInt(Date.now() - 86400000) * BigInt(1000000) }], createdAt: BigInt(Date.now() - 86400000) * BigInt(1000000), customerId: mockPrincipal, priority: TicketPriority.high },
  { id: BigInt(2), customerName: "Bob Martinez", status: TicketStatus.in_progress, subject: "Wrong item received in order #998", messages: [{ sender: "Bob Martinez", message: "I received a different color than what I ordered.", timestamp: BigInt(Date.now() - 2 * 86400000) * BigInt(1000000) }, { sender: "Support Agent", message: "We're looking into this for you and will arrange a replacement.", timestamp: BigInt(Date.now() - 86400000) * BigInt(1000000) }], createdAt: BigInt(Date.now() - 2 * 86400000) * BigInt(1000000), customerId: mockPrincipal, priority: TicketPriority.medium },
  { id: BigInt(3), customerName: "Carol White", status: TicketStatus.resolved, subject: "Refund request for order #985", messages: [{ sender: "Carol White", message: "Product was defective on arrival.", timestamp: BigInt(Date.now() - 5 * 86400000) * BigInt(1000000) }], createdAt: BigInt(Date.now() - 5 * 86400000) * BigInt(1000000), customerId: mockPrincipal, priority: TicketPriority.urgent },
];

const mockVendors: Vendor[] = [
  { id: BigInt(1), productsCount: BigInt(145), status: VendorStatus.approved, createdAt: BigInt(Date.now() - 30 * 86400000) * BigInt(1000000), email: "contact@techpeak.com", companyName: "TechPeak Solutions Ltd.", brandName: "TechPeak" },
  { id: BigInt(2), productsCount: BigInt(67), status: VendorStatus.pending, createdAt: BigInt(Date.now() - 3 * 86400000) * BigInt(1000000), email: "hello@urbancraft.io", companyName: "UrbanCraft Industries", brandName: "UrbanCraft" },
  { id: BigInt(3), productsCount: BigInt(89), status: VendorStatus.approved, createdAt: BigInt(Date.now() - 60 * 86400000) * BigInt(1000000), email: "sales@novagoods.com", companyName: "NovaGoods International", brandName: "NovaGoods" },
  { id: BigInt(4), productsCount: BigInt(0), status: VendorStatus.rejected, createdAt: BigInt(Date.now() - 15 * 86400000) * BigInt(1000000), email: "info@fastrack.shop", companyName: "FastTrack Commerce", brandName: "FastTrack" },
];

const mockApprovals: UserApprovalInfo[] = [
  { status: ApprovalStatus.approved, principal: mockPrincipal },
];

export const mockBackend: backendInterface = {
  assignCallerUserRole: async (_user: Principal, _role: UserRole): Promise<void> => undefined,
  getCallerUserRole: async (): Promise<UserRole> => UserRole.admin,
  getDeliveries: async (): Promise<Array<Delivery>> => mockDeliveries,
  getOrders: async (): Promise<Array<Order>> => mockOrders,
  getProducts: async (): Promise<Array<Product>> => mockProducts,
  getShipments: async (): Promise<Array<Shipment>> => mockShipments,
  getTickets: async (): Promise<Array<Ticket>> => mockTickets,
  getVendors: async (): Promise<Array<Vendor>> => mockVendors,
  isCallerAdmin: async (): Promise<boolean> => true,
  isCallerApproved: async (): Promise<boolean> => true,
  listApprovals: async (): Promise<Array<UserApprovalInfo>> => mockApprovals,
  requestApproval: async (): Promise<void> => undefined,
  setApproval: async (_user: Principal, _status: ApprovalStatus): Promise<void> => undefined,
  updateDeliveryStatus: async (_id: bigint, _status: DeliveryStatus): Promise<void> => undefined,
  updateOrderStatus: async (_id: bigint, _status: OrderStatus): Promise<void> => undefined,
  updateShipmentStatus: async (_id: bigint, _status: ShipmentStatus): Promise<void> => undefined,
  updateTicketStatus: async (_id: bigint, _status: TicketStatus): Promise<void> => undefined,
  updateVendorStatus: async (_id: bigint, _status: VendorStatus): Promise<void> => undefined,
  _initializeAccessControl: async (): Promise<void> => undefined,
};
