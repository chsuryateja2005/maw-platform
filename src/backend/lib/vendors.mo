import Debug "mo:core/Debug";
import VendorTypes "../types/vendors";

module {
  public func sampleVendors() : [VendorTypes.Vendor] {
    ignore ();
    Debug.todo();
  };

  public func updateVendorStatus(vendors : [VendorTypes.Vendor], id : Nat, status : VendorTypes.VendorStatus) : [VendorTypes.Vendor] {
    ignore (vendors, id, status);
    Debug.todo();
  };
};
