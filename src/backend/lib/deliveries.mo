import DeliveryTypes "../types/deliveries";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public func sampleDeliveries() : [DeliveryTypes.Delivery] {
    [
      { id = 1; orderId = 1001; customerName = "Alice Johnson"; address = "123 Main St, New York, NY 10001"; itemsCount = 3; status = #in_transit; assignedAt = Time.now() },
      { id = 2; orderId = 1002; customerName = "Bob Smith"; address = "456 Oak Ave, Los Angeles, CA 90210"; itemsCount = 1; status = #assigned; assignedAt = Time.now() },
      { id = 3; orderId = 1003; customerName = "Carol White"; address = "789 Pine Rd, Chicago, IL 60601"; itemsCount = 2; status = #delivered; assignedAt = Time.now() }
    ]
  };

  public func updateDeliveryStatus(deliveries : List.List<DeliveryTypes.Delivery>, id : Nat, status : DeliveryTypes.DeliveryStatus) {
    deliveries.mapInPlace(
      func(d) {
        if (d.id == id) { { d with status } } else { d };
      }
    );
  };
};
