import Types "common";

module {
  public type OrderStatus = {
    #pending;
    #confirmed;
    #processing;
    #shipped;
    #delivered;
    #cancelled;
    #returned;
  };

  public type OrderItem = {
    productId : Nat;
    name : Text;
    price : Float;
    quantity : Nat;
  };

  public type Order = {
    id : Nat;
    userId : Types.UserId;
    items : [OrderItem];
    total : Float;
    status : OrderStatus;
    createdAt : Types.Timestamp;
  };
};
