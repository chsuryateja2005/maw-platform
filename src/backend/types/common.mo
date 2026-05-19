import Debug "mo:core/Debug";

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
};
