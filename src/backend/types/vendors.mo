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

  public type VendorRequest = {
    id : Nat;
    companyName : Text;
    brandName : Text;
    ownerName : Text;
    email : Text;
    phone : Text;
    gstNumber : Text;
    businessAddress : Text;
    categories : [Text];
    bankDetails : Text;
    status : VendorStatus;
    submittedAt : Types.Timestamp;
  };

  public type VendorRequestInput = {
    companyName : Text;
    brandName : Text;
    ownerName : Text;
    email : Text;
    phone : Text;
    gstNumber : Text;
    businessAddress : Text;
    categories : [Text];
    bankDetails : Text;
  };
};
