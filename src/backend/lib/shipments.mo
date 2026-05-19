import Debug "mo:core/Debug";
import ShipmentTypes "../types/shipments";

module {
  public func sampleShipments() : [ShipmentTypes.Shipment] {
    ignore ();
    Debug.todo();
  };

  public func updateShipmentStatus(shipments : [ShipmentTypes.Shipment], id : Nat, status : ShipmentTypes.ShipmentStatus) : [ShipmentTypes.Shipment] {
    ignore (shipments, id, status);
    Debug.todo();
  };
};
