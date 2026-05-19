import Types "common";

module {
  public type DeliveryStatus = {
    #assigned;
    #in_transit;
    #delivered;
    #failed;
  };

  public type Delivery = {
    id : Nat;
    orderId : Nat;
    customerName : Text;
    address : Text;
    itemsCount : Nat;
    status : DeliveryStatus;
    assignedAt : Types.Timestamp;
  };
};
