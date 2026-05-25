import ShipmentTypes "../types/shipments";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public func sampleShipments() : [ShipmentTypes.Shipment] {
    [
      { id = 1; origin = "Shenzhen, China"; destination = "New York Warehouse"; status = #arriving; productsCount = 500; receivedAt = null },
      { id = 2; origin = "Munich, Germany"; destination = "London Hub"; status = #processing; productsCount = 200; receivedAt = ?Time.now() },
      { id = 3; origin = "Tokyo, Japan"; destination = "Los Angeles Port"; status = #dispatched; productsCount = 350; receivedAt = ?Time.now() }
    ]
  };

  public func updateShipmentStatus(shipments : List.List<ShipmentTypes.Shipment>, id : Nat, status : ShipmentTypes.ShipmentStatus) {
    shipments.mapInPlace(
      func(s) {
        if (s.id == id) { { s with status } } else { s }
      }
    );
  };
};
