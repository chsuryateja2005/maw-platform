import Debug "mo:core/Debug";
import TicketTypes "../types/tickets";

module {
  public func sampleTickets() : [TicketTypes.Ticket] {
    ignore ();
    Debug.todo();
  };

  public func updateTicketStatus(tickets : [TicketTypes.Ticket], id : Nat, status : TicketTypes.TicketStatus) : [TicketTypes.Ticket] {
    ignore (tickets, id, status);
    Debug.todo();
  };
};
