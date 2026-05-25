import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import ProductTypes "../types/products";
import ProductLib "../lib/products";
import Runtime "mo:core/Runtime";

mixin (
  accessControlState : AccessControl.AccessControlState,
  products : List.List<ProductTypes.Product>,
  productState : { var nextProductId : Nat },
) {
  // Seed products on first call if empty
  private func ensureProductsSeeded() {
    if (products.size() == 0) {
      for (p in ProductLib.sampleProducts().values()) {
        products.add(p);
      };
      productState.nextProductId := 23;
    };
  };

  public query func getProducts(category : ?Text, search : ?Text, sortBy : ?ProductTypes.SortBy) : async [ProductTypes.Product] {
    ensureProductsSeeded();
    let filtered = products.toArray().filter(func(p : ProductTypes.Product) : Bool {
      let matchCat = switch (category) {
        case null { true };
        case (?c) { p.category == c };
      };
      let matchSearch = switch (search) {
        case null { true };
        case (?s) {
          let lower = s.toLower();
          p.name.toLower().contains(#text lower) or p.description.toLower().contains(#text lower) or p.brand.toLower().contains(#text lower) or p.company.toLower().contains(#text lower);
        };
      };
      matchCat and matchSearch;
    });
    ProductLib.sortProducts(filtered, sortBy);
  };

  public query func getProductById(id : Nat) : async ?ProductTypes.Product {
    ensureProductsSeeded();
    products.toArray().find(func(p : ProductTypes.Product) : Bool { p.id == id });
  };

  public shared ({ caller }) func createProduct(input : ProductTypes.ProductInput) : async ProductTypes.Product {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can create products");
    };
    ensureProductsSeeded();
    ProductLib.createProduct_(products, productState, input);
  };

  public shared ({ caller }) func updateProduct(id : Nat, input : ProductTypes.ProductInput) : async ?ProductTypes.Product {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    ensureProductsSeeded();
    ProductLib.updateProduct_(products, id, input);
  };

  public shared ({ caller }) func deleteProduct(id : Nat) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    ensureProductsSeeded();
    ProductLib.deleteProduct_(products, id);
  };
};
