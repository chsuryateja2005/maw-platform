import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import DeliveryTypes "../types/deliveries";
import DeliveryLib "../lib/deliveries";
import Runtime "mo:core/Runtime";

mixin (
  accessControlState : AccessControl.AccessControlState,
  deliveries : List.List<DeliveryTypes.Delivery>,
) {
  // Seed deliveries if empty
  private func ensureDeliveriesSeeded() {
    if (deliveries.size() == 0) {
      for (d in DeliveryLib.sampleDeliveries().values()) {
        deliveries.add(d);
      };
    };
  };

  public query func getDeliveries() : async [DeliveryTypes.Delivery] {
    ensureDeliveriesSeeded();
    deliveries.toArray();
  };

  public shared ({ caller }) func updateDeliveryStatus(id : Nat, status : DeliveryTypes.DeliveryStatus) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update delivery status");
    };
    DeliveryLib.updateDeliveryStatus(deliveries, id, status);
  };
};
