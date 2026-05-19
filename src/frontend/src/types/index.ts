import type { Principal } from "@dfinity/principal";

// Re-export backend types with frontend aliases
export type { Principal };

export enum DeliveryStatus {
  assigned = "assigned",
  in_transit = "in_transit",
  delivered = "delivered",
  failed = "failed",
}

export enum OrderStatus {
  shipped = "shipped",
  cancelled = "cancelled",
  pending = "pending",
  delivered = "delivered",
  confirmed = "confirmed",
  processing = "processing",
  returned = "returned",
}

export enum ShipmentStatus {
  dispatched = "dispatched",
  arriving = "arriving",
  processing = "processing",
  received = "received",
}

export enum TicketPriority {
  low = "low",
  high = "high",
  urgent = "urgent",
  medium = "medium",
}

export enum TicketStatus {
  resolved = "resolved",
  closed = "closed",
  in_progress = "in_progress",
  open = "open",
}

export enum UserRole {
  admin = "admin",
  user = "user",
  guest = "guest",
}

export enum VendorStatus {
  pending = "pending",
  approved = "approved",
  rejected = "rejected",
}

export enum ApprovalStatus {
  pending = "pending",
  approved = "approved",
  rejected = "rejected",
}

export type Timestamp = bigint;
export type UserId = Principal;

export interface Shipment {
  id: bigint;
  productsCount: bigint;
  status: ShipmentStatus;
  destination: string;
  origin: string;
  receivedAt?: Timestamp;
}

export interface OrderItem {
  name: string;
  productId: bigint;
  quantity: bigint;
  price: number;
}

export interface Order {
  id: bigint;
  status: OrderStatus;
  total: number;
  userId: UserId;
  createdAt: Timestamp;
  items: Array<OrderItem>;
}

export interface UserApprovalInfo {
  status: ApprovalStatus;
  principal: Principal;
}

export interface Delivery {
  id: bigint;
  customerName: string;
  status: DeliveryStatus;
  assignedAt: Timestamp;
  orderId: bigint;
  itemsCount: bigint;
  address: string;
}

export interface TicketMessage {
  sender: string;
  message: string;
  timestamp: Timestamp;
}

export interface Ticket {
  id: bigint;
  customerName: string;
  status: TicketStatus;
  subject: string;
  messages: Array<TicketMessage>;
  createdAt: Timestamp;
  customerId: UserId;
  priority: TicketPriority;
}

export interface Vendor {
  id: bigint;
  productsCount: bigint;
  status: VendorStatus;
  createdAt: Timestamp;
  email: string;
  companyName: string;
  brandName: string;
}

export interface Product {
  id: bigint;
  name: string;
  description: string;
  stock: bigint;
  imageUrl: string;
  category: string;
  rating: number;
  price: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export type PortalId =
  | "admin"
  | "manager"
  | "delivery"
  | "user"
  | "collaboration"
  | "support";
