import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Address {
    tag: string;
    street: string;
    country: string;
    city: string;
    postalCode: string;
    isDefault: boolean;
}
export interface ProductInput {
    originalPrice: number;
    name: string;
    description: string;
    discountPercent: bigint;
    company: string;
    stock: bigint;
    imageUrl: string;
    category: string;
    brand: string;
    rating: number;
    price: number;
}
export interface VendorRequest {
    id: bigint;
    categories: Array<string>;
    status: VendorStatus;
    ownerName: string;
    bankDetails: string;
    gstNumber: string;
    submittedAt: Timestamp;
    businessAddress: string;
    email: string;
    companyName: string;
    brandName: string;
    phone: string;
}
export interface VendorRequestInput {
    categories: Array<string>;
    ownerName: string;
    bankDetails: string;
    gstNumber: string;
    businessAddress: string;
    email: string;
    companyName: string;
    brandName: string;
    phone: string;
}
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
export interface Issue {
    id: string;
    status: IssueStatus;
    subject: string;
    createdAt: Timestamp;
    description: string;
    customerId: string;
}
export interface Order {
    id: bigint;
    status: OrderStatus;
    deliveryAddress: string;
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
export interface CartItem {
    productId: string;
    quantity: bigint;
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
    originalPrice: number;
    name: string;
    description: string;
    discountPercent: bigint;
    company: string;
    stock: bigint;
    imageUrl: string;
    category: string;
    brand: string;
    rating: number;
    price: number;
}
export enum DeliveryStatus {
    assigned = "assigned",
    in_transit = "in_transit",
    delivered = "delivered",
    failed = "failed"
}
export enum IssueStatus {
    resolved = "resolved",
    pending = "pending"
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
export enum SortBy {
    newest = "newest",
    company = "company",
    category = "category",
    brand = "brand",
    priceDesc = "priceDesc",
    rating = "rating",
    priceAsc = "priceAsc"
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
    createIssue(subject: string, description: string): Promise<Issue>;
    createOrder(items: Array<OrderItem>, deliveryAddress: string): Promise<Order>;
    createProduct(input: ProductInput): Promise<Product>;
    createVendorRequest(input: VendorRequestInput): Promise<VendorRequest>;
    deleteAddress(index: bigint): Promise<Array<Address>>;
    deleteProduct(id: bigint): Promise<boolean>;
    getCallerUserRole(): Promise<UserRole>;
    getDeliveries(): Promise<Array<Delivery>>;
    getIssues(): Promise<Array<Issue>>;
    getMyIssues(): Promise<Array<Issue>>;
    getOrderById(id: bigint): Promise<Order | null>;
    getOrders(): Promise<Array<Order>>;
    getProductById(id: bigint): Promise<Product | null>;
    getProducts(category: string | null, search: string | null, sortBy: SortBy | null): Promise<Array<Product>>;
    getShipments(): Promise<Array<Shipment>>;
    getTickets(): Promise<Array<Ticket>>;
    getUserAddresses(): Promise<Array<Address>>;
    getUserCart(): Promise<Array<CartItem>>;
    getUserWishlist(): Promise<Array<string>>;
    getVendorRequests(): Promise<Array<VendorRequest>>;
    getVendors(): Promise<Array<Vendor>>;
    isCallerAdmin(): Promise<boolean>;
    isCallerApproved(): Promise<boolean>;
    listApprovals(): Promise<Array<UserApprovalInfo>>;
    requestApproval(): Promise<void>;
    saveAddress(addr: Address): Promise<Array<Address>>;
    saveCartItems(items: Array<CartItem>): Promise<void>;
    setApproval(user: Principal, status: ApprovalStatus): Promise<void>;
    toggleWishlistItem(productId: string): Promise<Array<string>>;
    updateDeliveryStatus(id: bigint, status: DeliveryStatus): Promise<void>;
    updateIssueStatus(id: string, status: IssueStatus): Promise<boolean>;
    updateOrderStatus(id: bigint, status: OrderStatus): Promise<void>;
    updateProduct(id: bigint, input: ProductInput): Promise<Product | null>;
    updateShipmentStatus(id: bigint, status: ShipmentStatus): Promise<void>;
    updateTicketStatus(id: bigint, status: TicketStatus): Promise<void>;
    updateVendorRequestStatus(id: bigint, status: VendorStatus): Promise<VendorRequest | null>;
    updateVendorStatus(id: bigint, status: VendorStatus): Promise<void>;
}
