import Debug "mo:core/Debug";
import OrderTypes "../types/orders";

module {
  public func sampleOrders() : [OrderTypes.Order] {
    ignore ();
    Debug.todo();
  };

  public func updateOrderStatus(orders : [OrderTypes.Order], id : Nat, status : OrderTypes.OrderStatus) : [OrderTypes.Order] {
    ignore (orders, id, status);
    Debug.todo();
  };
};
