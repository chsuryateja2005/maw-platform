import Types "common";

module {
  public type ShipmentStatus = {
    #arriving;
    #received;
    #processing;
    #dispatched;
  };

  public type Shipment = {
    id : Nat;
    origin : Text;
    destination : Text;
    status : ShipmentStatus;
    productsCount : Nat;
    receivedAt : ?Types.Timestamp;
  };
};
