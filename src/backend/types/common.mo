module {
  public type UserId = Principal;
  public type Timestamp = Int;

  public type Role = {
    #admin;
    #customer;
    #vendor;
    #warehouse_manager;
    #delivery_agent;
    #support_agent;
  };

  public type CartItem = {
    productId : Text;
    quantity : Nat;
  };

  public type Address = {
    tag : Text;
    street : Text;
    city : Text;
    postalCode : Text;
    country : Text;
    isDefault : Bool;
  };
};
