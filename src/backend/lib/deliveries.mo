import Debug "mo:core/Debug";
import DeliveryTypes "../types/deliveries";

module {
  public func sampleDeliveries() : [DeliveryTypes.Delivery] {
    ignore ();
    Debug.todo();
  };

  public func updateDeliveryStatus(deliveries : [DeliveryTypes.Delivery], id : Nat, status : DeliveryTypes.DeliveryStatus) : [DeliveryTypes.Delivery] {
    ignore (deliveries, id, status);
    Debug.todo();
  };
};
