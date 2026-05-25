import OrderTypes "../types/orders";
import CommonTypes "../types/common";
import List "mo:core/List";
import Time "mo:core/Time";
import Float "mo:core/Float";

module {
  public func sampleOrders() : [OrderTypes.Order] {
    []
  };

  public func updateOrderStatus(orders : List.List<OrderTypes.Order>, id : Nat, status : OrderTypes.OrderStatus) {
    orders.mapInPlace(
      func(o) {
        if (o.id == id) { { o with status } } else { o };
      }
    );
  };

  public func createOrder(
    orders : List.List<OrderTypes.Order>,
    state : { var nextOrderId : Nat },
    userId : CommonTypes.UserId,
    items : [OrderTypes.OrderItem],
    deliveryAddress : Text,
  ) : OrderTypes.Order {
    var total : Float = 0.0;
    for (item in items.values()) {
      total += item.price * item.quantity.toFloat();
    };
    let order : OrderTypes.Order = {
      id = state.nextOrderId;
      userId;
      items;
      total;
      status = #pending;
      deliveryAddress;
      createdAt = Time.now();
    };
    state.nextOrderId += 1;
    orders.add(order);
    order;
  };

  public func getOrdersForUser(orders : List.List<OrderTypes.Order>, userId : CommonTypes.UserId) : [OrderTypes.Order] {
    orders.filter(func(o : OrderTypes.Order) : Bool { o.userId == userId }).toArray();
  };

  public func getOrderById(orders : List.List<OrderTypes.Order>, id : Nat, userId : CommonTypes.UserId) : ?OrderTypes.Order {
    orders.find(func(o : OrderTypes.Order) : Bool { o.id == id and o.userId == userId });
  };
};
