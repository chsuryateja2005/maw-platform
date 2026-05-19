import Debug "mo:core/Debug";
import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import DeliveryTypes "../types/deliveries";

mixin (
  accessControlState : AccessControl.AccessControlState,
  deliveries : List.List<DeliveryTypes.Delivery>,
) {
  public query func getDeliveries() : async [DeliveryTypes.Delivery] {
    ignore ();
    Debug.todo();
  };

  public shared ({ caller }) func updateDeliveryStatus(id : Nat, status : DeliveryTypes.DeliveryStatus) : async () {
    ignore (caller, id, status);
    Debug.todo();
  };
};
