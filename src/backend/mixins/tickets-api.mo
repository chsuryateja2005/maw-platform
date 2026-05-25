import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import TicketTypes "../types/tickets";
import TicketLib "../lib/tickets";
import Runtime "mo:core/Runtime";

mixin (
  accessControlState : AccessControl.AccessControlState,
  tickets : List.List<TicketTypes.Ticket>,
) {
  private func ensureTicketsSeeded() {
    if (tickets.size() == 0) {
      for (t in TicketLib.sampleTickets().values()) {
        tickets.add(t);
      };
    };
  };

  public query func getTickets() : async [TicketTypes.Ticket] {
    ensureTicketsSeeded();
    tickets.toArray();
  };

  public shared ({ caller }) func updateTicketStatus(id : Nat, status : TicketTypes.TicketStatus) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update ticket status");
    };
    TicketLib.updateTicketStatus(tickets, id, status);
  };
};
