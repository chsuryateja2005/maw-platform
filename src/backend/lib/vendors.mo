import VendorTypes "../types/vendors";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public func sampleVendors() : [VendorTypes.Vendor] {
    [
      { id = 1; companyName = "TechGear Ltd"; email = "contact@techgear.com"; brandName = "TechGear"; status = #approved; productsCount = 45; createdAt = Time.now() },
      { id = 2; companyName = "MobileHub Inc"; email = "info@mobilehub.com"; brandName = "MobileHub"; status = #pending; productsCount = 12; createdAt = Time.now() },
      { id = 3; companyName = "AudioWorld Corp"; email = "sales@audioworld.com"; brandName = "AudioWorld"; status = #approved; productsCount = 28; createdAt = Time.now() }
    ]
  };

  public func updateVendorStatus(vendors : List.List<VendorTypes.Vendor>, id : Nat, status : VendorTypes.VendorStatus) {
    vendors.mapInPlace(
      func(v) {
        if (v.id == id) { { v with status } } else { v };
      }
    );
  };

  public func createVendorRequest_(
    requests : List.List<VendorTypes.VendorRequest>,
    state : { var nextVendorRequestId : Nat },
    input : VendorTypes.VendorRequestInput,
  ) : VendorTypes.VendorRequest {
    let id = state.nextVendorRequestId;
    state.nextVendorRequestId += 1;
    let req : VendorTypes.VendorRequest = {
      id;
      companyName = input.companyName;
      brandName = input.brandName;
      ownerName = input.ownerName;
      email = input.email;
      phone = input.phone;
      gstNumber = input.gstNumber;
      businessAddress = input.businessAddress;
      categories = input.categories;
      bankDetails = input.bankDetails;
      status = #pending;
      submittedAt = Time.now();
    };
    requests.add(req);
    req;
  };

  public func updateVendorRequestStatus_(
    requests : List.List<VendorTypes.VendorRequest>,
    id : Nat,
    status : VendorTypes.VendorStatus,
  ) : ?VendorTypes.VendorRequest {
    var found : ?VendorTypes.VendorRequest = null;
    requests.mapInPlace(
      func(r) {
        if (r.id == id) {
          let updated = { r with status };
          found := ?updated;
          updated;
        } else { r };
      }
    );
    found;
  };
};
