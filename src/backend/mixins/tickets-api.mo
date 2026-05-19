import Debug "mo:core/Debug";
import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import TicketTypes "../types/tickets";

mixin (
  accessControlState : AccessControl.AccessControlState,
  tickets : List.List<TicketTypes.Ticket>,
) {
  public query func getTickets() : async [TicketTypes.Ticket] {
    ignore ();
    Debug.todo();
  };

  public shared ({ caller }) func updateTicketStatus(id : Nat, status : TicketTypes.TicketStatus) : async () {
    ignore (caller, id, status);
    Debug.todo();
  };
};
