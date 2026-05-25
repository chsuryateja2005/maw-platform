import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import OrderTypes "../types/orders";
import CommonTypes "../types/common";
import OrderLib "../lib/orders";
import Runtime "mo:core/Runtime";

mixin (
  accessControlState : AccessControl.AccessControlState,
  orders : List.List<OrderTypes.Order>,
  orderState : { var nextOrderId : Nat },
  carts : Map.Map<CommonTypes.UserId, [CommonTypes.CartItem]>,
  wishlists : Map.Map<CommonTypes.UserId, [Text]>,
  addresses : Map.Map<CommonTypes.UserId, [CommonTypes.Address]>,
) {
  public query ({ caller }) func getOrders() : async [OrderTypes.Order] {
    OrderLib.getOrdersForUser(orders, caller);
  };

  public query ({ caller }) func getOrderById(id : Nat) : async ?OrderTypes.Order {
    OrderLib.getOrderById(orders, id, caller);
  };

  public shared ({ caller }) func createOrder(
    items : [OrderTypes.OrderItem],
    deliveryAddress : Text,
  ) : async OrderTypes.Order {
    if (caller.isAnonymous()) {
      Runtime.trap("Authentication required to place an order");
    };
    OrderLib.createOrder(orders, orderState, caller, items, deliveryAddress);
  };

  public shared ({ caller }) func updateOrderStatus(id : Nat, status : OrderTypes.OrderStatus) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update order status");
    };
    OrderLib.updateOrderStatus(orders, id, status);
  };

  public shared ({ caller }) func getUserCart() : async [CommonTypes.CartItem] {
    switch (carts.get(caller)) {
      case (?items) { items };
      case null { [] };
    };
  };

  public shared ({ caller }) func saveCartItems(items : [CommonTypes.CartItem]) : async () {
    if (caller.isAnonymous()) {
      Runtime.trap("Authentication required");
    };
    carts.add(caller, items);
  };

  public query ({ caller }) func getUserWishlist() : async [Text] {
    switch (wishlists.get(caller)) {
      case (?ids) { ids };
      case null { [] };
    };
  };

  public shared ({ caller }) func toggleWishlistItem(productId : Text) : async [Text] {
    let current = switch (wishlists.get(caller)) {
      case (?ids) { ids };
      case null { [] };
    };
    let exists = current.find(func(id : Text) : Bool { id == productId }) != null;
    let updated = if (exists) {
      current.filter(func(id : Text) : Bool { id != productId });
    } else {
      current.concat([productId]);
    };
    wishlists.add(caller, updated);
    updated;
  };

  public query ({ caller }) func getUserAddresses() : async [CommonTypes.Address] {
    switch (addresses.get(caller)) {
      case (?addrs) { addrs };
      case null { [] };
    };
  };

  public shared ({ caller }) func saveAddress(addr : CommonTypes.Address) : async [CommonTypes.Address] {
    let current = switch (addresses.get(caller)) {
      case (?addrs) { addrs };
      case null { [] };
    };
    let updated = current.concat([addr]);
    addresses.add(caller, updated);
    updated;
  };

  public shared ({ caller }) func deleteAddress(index : Nat) : async [CommonTypes.Address] {
    let current = switch (addresses.get(caller)) {
      case (?addrs) { addrs };
      case null { [] };
    };
    var i = 0;
    let updated = current.filter(func(_ : CommonTypes.Address) : Bool {
      let keep = i != index;
      i += 1;
      keep;
    });
    addresses.add(caller, updated);
    updated;
  };
};
