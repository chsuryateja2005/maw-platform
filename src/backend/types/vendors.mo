import Debug "mo:core/Debug";
import Types "common";

module {
  public type VendorStatus = {
    #pending;
    #approved;
    #rejected;
  };

  public type Vendor = {
    id : Nat;
    companyName : Text;
    email : Text;
    brandName : Text;
    status : VendorStatus;
    productsCount : Nat;
    createdAt : Types.Timestamp;
  };
};
