import List "mo:core/List";
import ProductTypes "types/products";
import IssueTypes "types/issues";
import CommonTypes "types/common";

module {
  // --- Old inline types (from previous deployment) ---
  type OldProduct = {
    id : Nat;
    name : Text;
    category : Text;
    price : Float;
    stock : Nat;
    rating : Float;
    imageUrl : Text;
    description : Text;
  };

  type OldIssueStatus = {
    #pending;
    #resolved;
  };

  type OldIssue = {
    id : Text;
    customerId : Text;
    description : Text;
    status : OldIssueStatus;
    createdAt : CommonTypes.Timestamp;
  };

  // --- Old actor stable state shape ---
  type OldActor = {
    products : List.List<OldProduct>;
    issues : List.List<OldIssue>;
  };

  // --- New actor stable state shape ---
  type NewActor = {
    products : List.List<ProductTypes.Product>;
    issues : List.List<IssueTypes.Issue>;
  };

  public func run(old : OldActor) : NewActor {
    let products = old.products.map<OldProduct, ProductTypes.Product>(
      func(p) {
        {
          p with
          brand = "";
          company = "";
          originalPrice = p.price;
          discountPercent = 0;
        }
      }
    );

    let issues = old.issues.map<OldIssue, IssueTypes.Issue>(
      func(i) {
        {
          i with
          subject = "Support Request";
        }
      }
    );

    { products; issues };
  };
};
