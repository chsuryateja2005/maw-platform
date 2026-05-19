import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
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
export type UserId = Principal;
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
export interface TicketMessage {
    sender: string;
    message: string;
    timestamp: Timestamp;
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
export enum DeliveryStatus {
    assigned = "assigned",
    in_transit = "in_transit",
    delivered = "delivered",
    failed = "failed"
}
export enum OrderStatus {
    shipped = "shipped",
    cancelled = "cancelled",
    pending = "pending",
    delivered = "delivered",
    confirmed = "confirmed",
    processing = "processing",
    returned = "returned"
}
export enum ShipmentStatus {
    dispatched = "dispatched",
    arriving = "arriving",
    processing = "processing",
    received = "received"
}
export enum TicketPriority {
    low = "low",
    high = "high",
    urgent = "urgent",
    medium = "medium"
}
export enum TicketStatus {
    resolved = "resolved",
    closed = "closed",
    in_progress = "in_progress",
    open = "open"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum VendorStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getCallerUserRole(): Promise<UserRole>;
    getDeliveries(): Promise<Array<Delivery>>;
    getOrders(): Promise<Array<Order>>;
    getProducts(): Promise<Array<Product>>;
    getShipments(): Promise<Array<Shipment>>;
    getTickets(): Promise<Array<Ticket>>;
    getVendors(): Promise<Array<Vendor>>;
    isCallerAdmin(): Promise<boolean>;
    isCallerApproved(): Promise<boolean>;
    listApprovals(): Promise<Array<UserApprovalInfo>>;
    requestApproval(): Promise<void>;
    setApproval(user: Principal, status: ApprovalStatus): Promise<void>;
    updateDeliveryStatus(id: bigint, status: DeliveryStatus): Promise<void>;
    updateOrderStatus(id: bigint, status: OrderStatus): Promise<void>;
    updateShipmentStatus(id: bigint, status: ShipmentStatus): Promise<void>;
    updateTicketStatus(id: bigint, status: TicketStatus): Promise<void>;
    updateVendorStatus(id: bigint, status: VendorStatus): Promise<void>;
}
