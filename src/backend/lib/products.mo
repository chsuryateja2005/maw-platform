import ProductTypes "../types/products";
import List "mo:core/List";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Float "mo:core/Float";
import Text "mo:core/Text";

module {
  public func sampleProducts() : [ProductTypes.Product] {
    [
      { id = 1; name = "Crystal Clear Phone Case iPhone 15"; category = "Phone Cases"; brand = "Spigen"; company = "Spigen Inc"; price = 899.0; originalPrice = 1199.0; discountPercent = 25; stock = 150; rating = 4.5; imageUrl = "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400"; description = "Ultra-thin crystal clear case with military-grade drop protection for iPhone 15." },
      { id = 2; name = "Leather Wallet Case Samsung S24"; category = "Phone Cases"; brand = "Samsung"; company = "Samsung Electronics"; price = 1799.0; originalPrice = 2499.0; discountPercent = 28; stock = 80; rating = 4.3; imageUrl = "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400"; description = "Premium genuine leather flip wallet case with card slots for Samsung Galaxy S24." },
      { id = 3; name = "Rugged Armor Case iPhone 15 Pro"; category = "Phone Cases"; brand = "Spigen"; company = "Spigen Inc"; price = 1499.0; originalPrice = 1999.0; discountPercent = 25; stock = 120; rating = 4.7; imageUrl = "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400"; description = "Heavy-duty rugged armor case with air cushion technology for iPhone 15 Pro." },
      { id = 4; name = "Slim Matte Case Google Pixel 8"; category = "Phone Cases"; brand = "Caseology"; company = "Caseology Corp"; price = 999.0; originalPrice = 1499.0; discountPercent = 33; stock = 60; rating = 4.2; imageUrl = "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=400"; description = "Slim matte finish case with microfiber lining for Google Pixel 8." },
      { id = 5; name = "Tempered Glass Screen Protector iPhone 15"; category = "Screen Protectors"; brand = "Belkin"; company = "Belkin International"; price = 699.0; originalPrice = 999.0; discountPercent = 30; stock = 200; rating = 4.6; imageUrl = "https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=400"; description = "9H hardness tempered glass screen protector with oleophobic coating." },
      { id = 6; name = "Privacy Screen Protector Samsung S24"; category = "Screen Protectors"; brand = "UGREEN"; company = "UGREEN Group"; price = 999.0; originalPrice = 1499.0; discountPercent = 33; stock = 90; rating = 4.1; imageUrl = "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400"; description = "Anti-spy privacy screen protector with 180 degree viewing angle protection." },
      { id = 7; name = "Anti-Glare Matte Screen Protector"; category = "Screen Protectors"; brand = "Baseus"; company = "Baseus Technology"; price = 799.0; originalPrice = 1199.0; discountPercent = 33; stock = 110; rating = 4.4; imageUrl = "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=400"; description = "Anti-glare matte finish screen protector reduces reflections and fingerprints." },
      { id = 8; name = "65W GaN USB-C Fast Charger"; category = "Chargers"; brand = "Anker"; company = "Anker Innovations"; price = 2499.0; originalPrice = 3499.0; discountPercent = 29; stock = 75; rating = 4.8; imageUrl = "https://images.unsplash.com/photo-1588508065123-287b28e013da?w=400"; description = "65W GaN technology fast charger compatible with USB-C laptops, tablets, and phones." },
      { id = 9; name = "20W USB-C Wall Charger"; category = "Chargers"; brand = "OnePlus"; company = "OnePlus Technology"; price = 1499.0; originalPrice = 1999.0; discountPercent = 25; stock = 130; rating = 4.5; imageUrl = "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400"; description = "SUPERVOOC 20W USB-C Power Adapter for fast charging OnePlus devices and more." },
      { id = 10; name = "30W Dual Port Wall Charger"; category = "Chargers"; brand = "Anker"; company = "Anker Innovations"; price = 1799.0; originalPrice = 2499.0; discountPercent = 28; stock = 95; rating = 4.3; imageUrl = "https://images.unsplash.com/photo-1603539947678-cd3954ed515d?w=400"; description = "30W dual port charger with USB-C and USB-A for charging two devices simultaneously." },
      { id = 11; name = "Wireless MagSafe Charger 15W"; category = "Chargers"; brand = "Belkin"; company = "Belkin International"; price = 2199.0; originalPrice = 2999.0; discountPercent = 27; stock = 55; rating = 4.6; imageUrl = "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=400"; description = "15W MagSafe compatible wireless charger pad with cooling system." },
      { id = 12; name = "USB-C to Lightning Cable 2m"; category = "Cables"; brand = "Anker"; company = "Anker Innovations"; price = 899.0; originalPrice = 1299.0; discountPercent = 31; stock = 180; rating = 4.4; imageUrl = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"; description = "2m braided USB-C to Lightning cable with 20W fast charging support." },
      { id = 13; name = "USB-C to USB-C Cable 1m Braided"; category = "Cables"; brand = "UGREEN"; company = "UGREEN Group"; price = 699.0; originalPrice = 999.0; discountPercent = 30; stock = 220; rating = 4.5; imageUrl = "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=400"; description = "1m nylon braided USB-C cable supporting 100W charging and 480Mbps data transfer." },
      { id = 14; name = "Retractable USB-C to USB-A Cable"; category = "Cables"; brand = "Baseus"; company = "Baseus Technology"; price = 599.0; originalPrice = 899.0; discountPercent = 33; stock = 140; rating = 4.2; imageUrl = "https://images.unsplash.com/photo-1583394293214-b6bde5d19a99?w=400"; description = "Retractable design cable that extends from 0.3m to 1.5m for convenient portability." },
      { id = 15; name = "Magnetic USB-C Data Cable"; category = "Cables"; brand = "Mi"; company = "Xiaomi Corporation"; price = 1199.0; originalPrice = 1599.0; discountPercent = 25; stock = 70; rating = 4.3; imageUrl = "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=400"; description = "360-degree magnetic connector USB-C cable for one-handed easy attachment." },
      { id = 16; name = "26800mAh Portable Power Bank"; category = "Power Banks"; brand = "Anker"; company = "Anker Innovations"; price = 3499.0; originalPrice = 4999.0; discountPercent = 30; stock = 45; rating = 4.7; imageUrl = "https://images.unsplash.com/photo-1609592374351-fc03e8a25c9b?w=400"; description = "26800mAh high capacity power bank with 65W PD fast charging and dual USB-A ports." },
      { id = 17; name = "10000mAh Slim Power Bank"; category = "Power Banks"; brand = "Mi"; company = "Xiaomi Corporation"; price = 1999.0; originalPrice = 2999.0; discountPercent = 33; stock = 85; rating = 4.5; imageUrl = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400"; description = "Ultra-slim 10000mAh power bank with 22.5W fast charge and built-in USB-C cable." },
      { id = 18; name = "MagSafe Wireless Power Bank 5000mAh"; category = "Power Banks"; brand = "Belkin"; company = "Belkin International"; price = 2799.0; originalPrice = 3999.0; discountPercent = 30; stock = 60; rating = 4.6; imageUrl = "https://images.unsplash.com/photo-1610465299996-30f240ac2b1c?w=400"; description = "5000mAh MagSafe compatible wireless power bank attaches magnetically to iPhone." },
      { id = 19; name = "Bluetooth Wireless Earbuds Pro"; category = "Audio"; brand = "boAt"; company = "boAt Lifestyle"; price = 3999.0; originalPrice = 5999.0; discountPercent = 33; stock = 65; rating = 4.7; imageUrl = "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400"; description = "Active noise cancellation earbuds with 30hr total battery life and IPX5 rating." },
      { id = 20; name = "Over-Ear Wireless Headphones"; category = "Audio"; brand = "JBL"; company = "JBL Harman"; price = 5999.0; originalPrice = 8999.0; discountPercent = 33; stock = 40; rating = 4.8; imageUrl = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"; description = "Premium over-ear wireless headphones with 40hr battery, foldable design, and aptX." },
      { id = 21; name = "USB-C Audio Adapter DAC"; category = "Audio"; brand = "UGREEN"; company = "UGREEN Group"; price = 1299.0; originalPrice = 1799.0; discountPercent = 28; stock = 100; rating = 4.3; imageUrl = "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400"; description = "High-resolution DAC USB-C to 3.5mm adapter with 32-bit/384kHz audio support." },
      { id = 22; name = "Clip-On Portable Speaker"; category = "Audio"; brand = "boAt"; company = "boAt Lifestyle"; price = 1799.0; originalPrice = 2499.0; discountPercent = 28; stock = 75; rating = 4.4; imageUrl = "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400"; description = "Compact clip-on Bluetooth speaker with 12hr battery and IP67 waterproof rating." }
    ]
  };

  public func createProduct_(
    products : List.List<ProductTypes.Product>,
    state : { var nextProductId : Nat },
    input : ProductTypes.ProductInput,
  ) : ProductTypes.Product {
    let id = state.nextProductId;
    state.nextProductId += 1;
    let p : ProductTypes.Product = {
      id;
      name = input.name;
      category = input.category;
      brand = input.brand;
      company = input.company;
      description = input.description;
      price = input.price;
      originalPrice = input.originalPrice;
      discountPercent = input.discountPercent;
      stock = input.stock;
      rating = input.rating;
      imageUrl = input.imageUrl;
    };
    products.add(p);
    p;
  };

  public func updateProduct_(
    products : List.List<ProductTypes.Product>,
    id : Nat,
    input : ProductTypes.ProductInput,
  ) : ?ProductTypes.Product {
    var found : ?ProductTypes.Product = null;
    products.mapInPlace(
      func(p) {
        if (p.id == id) {
          let updated : ProductTypes.Product = {
            id;
            name = input.name;
            category = input.category;
            brand = input.brand;
            company = input.company;
            description = input.description;
            price = input.price;
            originalPrice = input.originalPrice;
            discountPercent = input.discountPercent;
            stock = input.stock;
            rating = input.rating;
            imageUrl = input.imageUrl;
          };
          found := ?updated;
          updated;
        } else { p };
      }
    );
    found;
  };

  public func deleteProduct_(
    products : List.List<ProductTypes.Product>,
    id : Nat,
  ) : Bool {
    let before = products.size();
    products.retain(func(p) { p.id != id });
    products.size() < before;
  };

  public func sortProducts(
    arr : [ProductTypes.Product],
    sortBy : ?ProductTypes.SortBy,
  ) : [ProductTypes.Product] {
    switch (sortBy) {
      case null { arr };
      case (?#company) {
        arr.sort(func(a : ProductTypes.Product, b : ProductTypes.Product) : { #less; #equal; #greater } {
          Text.compare(a.company, b.company);
        });
      };
      case (?#brand) {
        arr.sort(func(a : ProductTypes.Product, b : ProductTypes.Product) : { #less; #equal; #greater } {
          Text.compare(a.brand, b.brand);
        });
      };
      case (?#category) {
        arr.sort(func(a : ProductTypes.Product, b : ProductTypes.Product) : { #less; #equal; #greater } {
          Text.compare(a.category, b.category);
        });
      };
      case (?#priceAsc) {
        arr.sort(func(a : ProductTypes.Product, b : ProductTypes.Product) : { #less; #equal; #greater } {
          Float.compare(a.price, b.price);
        });
      };
      case (?#priceDesc) {
        arr.sort(func(a : ProductTypes.Product, b : ProductTypes.Product) : { #less; #equal; #greater } {
          Float.compare(b.price, a.price);
        });
      };
      case (?#rating) {
        arr.sort(func(a : ProductTypes.Product, b : ProductTypes.Product) : { #less; #equal; #greater } {
          Float.compare(b.rating, a.rating);
        });
      };
      case (?#newest) {
        arr.sort(func(a : ProductTypes.Product, b : ProductTypes.Product) : { #less; #equal; #greater } {
          if (a.id > b.id) { #less } else if (a.id < b.id) { #greater } else { #equal };
        });
      };
    };
  };
};
