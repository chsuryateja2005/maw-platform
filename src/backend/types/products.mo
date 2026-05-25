module {
  public type SortBy = {
    #company;
    #brand;
    #category;
    #priceAsc;
    #priceDesc;
    #rating;
    #newest;
  };

  public type Product = {
    id : Nat;
    name : Text;
    category : Text;
    brand : Text;
    company : Text;
    price : Float;
    originalPrice : Float;
    discountPercent : Nat;
    stock : Nat;
    rating : Float;
    imageUrl : Text;
    description : Text;
  };

  public type ProductInput = {
    name : Text;
    category : Text;
    brand : Text;
    company : Text;
    description : Text;
    price : Float;
    originalPrice : Float;
    stock : Nat;
    rating : Float;
    imageUrl : Text;
    discountPercent : Nat;
  };
};
