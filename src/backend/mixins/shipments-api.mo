import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import ShipmentTypes "../types/shipments";
import ShipmentLib "../lib/shipments";
import Runtime "mo:core/Runtime";

mixin (
  accessControlState : AccessControl.AccessControlState,
  shipments : List.List<ShipmentTypes.Shipment>,
) {
  private func ensureShipmentsSeeded() {
    if (shipments.size() == 0) {
      for (s in ShipmentLib.sampleShipments().values()) {
        shipments.add(s);
      };
    };
  };

  public query func getShipments() : async [ShipmentTypes.Shipment] {
    ensureShipmentsSeeded();
    shipments.toArray();
  };

  public shared ({ caller }) func updateShipmentStatus(id : Nat, status : ShipmentTypes.ShipmentStatus) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update shipment status");
    };
    ShipmentLib.updateShipmentStatus(shipments, id, status);
  };
};
