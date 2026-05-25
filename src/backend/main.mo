
import List "mo:core/List";
import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import UserApproval "mo:caffeineai-user-approval/approval";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import VendorTypes "types/vendors";
import ProductTypes "types/products";
import OrderTypes "types/orders";
import ShipmentTypes "types/shipments";
import DeliveryTypes "types/deliveries";
import TicketTypes "types/tickets";
import CommonTypes "types/common";
import VendorsMixin "mixins/vendors-api";
import ProductsMixin "mixins/products-api";
import OrdersMixin "mixins/orders-api";
import ShipmentsMixin "mixins/shipments-api";
import DeliveriesMixin "mixins/deliveries-api";
import TicketsMixin "mixins/tickets-api";
import IssueTypes "types/issues";
import IssuesMixin "mixins/issues-api";
import Migration "migration";



(with migration = Migration.run)
actor {
  // --- Authorization & Approval ---
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let approvalState = UserApproval.initState(accessControlState);

  public query ({ caller }) func isCallerApproved() : async Bool {
    AccessControl.hasPermission(accessControlState, caller, #admin) or UserApproval.isApproved(approvalState, caller);
  };

  public shared ({ caller }) func requestApproval() : async () {
    UserApproval.requestApproval(approvalState, caller);
  };

  public shared ({ caller }) func setApproval(user : Principal, status : UserApproval.ApprovalStatus) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    UserApproval.setApproval(approvalState, user, status);
  };

  public query ({ caller }) func listApprovals() : async [UserApproval.UserApprovalInfo] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    UserApproval.listApprovals(approvalState);
  };

  // --- Domain State ---
  let vendors = List.empty<VendorTypes.Vendor>();
  let vendorRequests = List.empty<VendorTypes.VendorRequest>();
  let vendorRequestState = { var nextVendorRequestId = 1 };
  let products = List.empty<ProductTypes.Product>();
  let productState = { var nextProductId = 23 };
  let orders = List.empty<OrderTypes.Order>();
  let orderState = { var nextOrderId = 1 };
  let carts = Map.empty<CommonTypes.UserId, [CommonTypes.CartItem]>();
  let wishlists = Map.empty<CommonTypes.UserId, [Text]>();
  let addresses = Map.empty<CommonTypes.UserId, [CommonTypes.Address]>();
  let shipments = List.empty<ShipmentTypes.Shipment>();
  let deliveries = List.empty<DeliveryTypes.Delivery>();
  let tickets = List.empty<TicketTypes.Ticket>();
  let issues = List.empty<IssueTypes.Issue>();

  // --- Domain Mixins ---
  include VendorsMixin(accessControlState, vendors, vendorRequests, vendorRequestState);
  include ProductsMixin(accessControlState, products, productState);
  include OrdersMixin(accessControlState, orders, orderState, carts, wishlists, addresses);
  include ShipmentsMixin(accessControlState, shipments);
  include DeliveriesMixin(accessControlState, deliveries);
  include TicketsMixin(accessControlState, tickets);
  include IssuesMixin(accessControlState, issues);
};
