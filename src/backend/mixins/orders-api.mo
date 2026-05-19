import Debug "mo:core/Debug";
import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import OrderTypes "../types/orders";

mixin (
  accessControlState : AccessControl.AccessControlState,
  orders : List.List<OrderTypes.Order>,
) {
  public query func getOrders() : async [OrderTypes.Order] {
    ignore ();
    Debug.todo();
  };

  public shared ({ caller }) func updateOrderStatus(id : Nat, status : OrderTypes.OrderStatus) : async () {
    ignore (caller, id, status);
    Debug.todo();
  };
};
