import Debug "mo:core/Debug";
import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import ProductTypes "../types/products";

mixin (
  accessControlState : AccessControl.AccessControlState,
  products : List.List<ProductTypes.Product>,
) {
  public query func getProducts() : async [ProductTypes.Product] {
    ignore ();
    Debug.todo();
  };
};
