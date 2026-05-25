import TicketTypes "../types/tickets";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public func sampleTickets() : [TicketTypes.Ticket] {
    // Start with empty tickets — support staff create them via their portal
    []
  };

  public func updateTicketStatus(tickets : List.List<TicketTypes.Ticket>, id : Nat, status : TicketTypes.TicketStatus) {
    tickets.mapInPlace(
      func(t) {
        if (t.id == id) { { t with status } } else { t };
      }
    );
  };
};
