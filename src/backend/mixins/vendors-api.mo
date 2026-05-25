import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import VendorTypes "../types/vendors";
import VendorLib "../lib/vendors";
import Runtime "mo:core/Runtime";

mixin (
  accessControlState : AccessControl.AccessControlState,
  vendors : List.List<VendorTypes.Vendor>,
  vendorRequests : List.List<VendorTypes.VendorRequest>,
  vendorRequestState : { var nextVendorRequestId : Nat },
) {
  private func ensureVendorsSeeded() {
    if (vendors.size() == 0) {
      for (v in VendorLib.sampleVendors().values()) {
        vendors.add(v);
      };
    };
  };

  public query func getVendors() : async [VendorTypes.Vendor] {
    ensureVendorsSeeded();
    vendors.toArray();
  };

  public shared ({ caller }) func updateVendorStatus(id : Nat, status : VendorTypes.VendorStatus) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update vendor status");
    };
    VendorLib.updateVendorStatus(vendors, id, status);
  };

  public shared func createVendorRequest(input : VendorTypes.VendorRequestInput) : async VendorTypes.VendorRequest {
    VendorLib.createVendorRequest_(vendorRequests, vendorRequestState, input);
  };

  public query ({ caller }) func getVendorRequests() : async [VendorTypes.VendorRequest] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view vendor requests");
    };
    vendorRequests.toArray();
  };

  public shared ({ caller }) func updateVendorRequestStatus(id : Nat, status : VendorTypes.VendorStatus) : async ?VendorTypes.VendorRequest {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update vendor request status");
    };
    VendorLib.updateVendorRequestStatus_(vendorRequests, id, status);
  };
};
