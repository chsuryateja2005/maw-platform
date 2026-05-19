import Debug "mo:core/Debug";
import List "mo:core/List";
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
import VendorsMixin "mixins/vendors-api";
import ProductsMixin "mixins/products-api";
import OrdersMixin "mixins/orders-api";
import ShipmentsMixin "mixins/shipments-api";
import DeliveriesMixin "mixins/deliveries-api";
import TicketsMixin "mixins/tickets-api";

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
  let products = List.empty<ProductTypes.Product>();
  let orders = List.empty<OrderTypes.Order>();
  let shipments = List.empty<ShipmentTypes.Shipment>();
  let deliveries = List.empty<DeliveryTypes.Delivery>();
  let tickets = List.empty<TicketTypes.Ticket>();

  // --- Domain Mixins ---
  include VendorsMixin(accessControlState, vendors);
  include ProductsMixin(accessControlState, products);
  include OrdersMixin(accessControlState, orders);
  include ShipmentsMixin(accessControlState, shipments);
  include DeliveriesMixin(accessControlState, deliveries);
  include TicketsMixin(accessControlState, tickets);
};
