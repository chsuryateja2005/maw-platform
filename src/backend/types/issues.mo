import Types "common";

module {
  public type IssueStatus = {
    #pending;
    #resolved;
  };

  public type Issue = {
    id : Text;
    customerId : Text;
    subject : Text;
    description : Text;
    status : IssueStatus;
    createdAt : Types.Timestamp;
  };
};
