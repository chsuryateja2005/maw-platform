import Debug "mo:core/Debug";
import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import ShipmentTypes "../types/shipments";

mixin (
  accessControlState : AccessControl.AccessControlState,
  shipments : List.List<ShipmentTypes.Shipment>,
) {
  public query func getShipments() : async [ShipmentTypes.Shipment] {
    ignore ();
    Debug.todo();
  };

  public shared ({ caller }) func updateShipmentStatus(id : Nat, status : ShipmentTypes.ShipmentStatus) : async () {
    ignore (caller, id, status);
    Debug.todo();
  };
};
