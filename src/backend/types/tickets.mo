import Types "common";

module {
  public type TicketStatus = {
    #open;
    #in_progress;
    #resolved;
    #closed;
  };

  public type TicketPriority = {
    #low;
    #medium;
    #high;
    #urgent;
  };

  public type TicketMessage = {
    sender : Text;
    message : Text;
    timestamp : Types.Timestamp;
  };

  public type Ticket = {
    id : Nat;
    customerId : Types.UserId;
    customerName : Text;
    subject : Text;
    priority : TicketPriority;
    status : TicketStatus;
    messages : [TicketMessage];
    createdAt : Types.Timestamp;
  };
};
