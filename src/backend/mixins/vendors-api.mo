import Debug "mo:core/Debug";
import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import VendorTypes "../types/vendors";

mixin (
  accessControlState : AccessControl.AccessControlState,
  vendors : List.List<VendorTypes.Vendor>,
) {
  public query func getVendors() : async [VendorTypes.Vendor] {
    ignore ();
    Debug.todo();
  };

  public shared ({ caller }) func updateVendorStatus(id : Nat, status : VendorTypes.VendorStatus) : async () {
    ignore (caller, id, status);
    Debug.todo();
  };
};
