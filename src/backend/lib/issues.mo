import IssueTypes "../types/issues";
import List "mo:core/List";
import Time "mo:core/Time";
import Int "mo:core/Int";

module {
  public func createIssue_(
    issues : List.List<IssueTypes.Issue>,
    customerId : Text,
    subject : Text,
    description : Text,
  ) : () {
    let id = Time.now().toText() # "_" # customerId;
    issues.add({
      id;
      customerId;
      subject;
      description;
      status = #pending;
      createdAt = Time.now();
    });
  };

  public func getIssues_(issues : List.List<IssueTypes.Issue>) : [IssueTypes.Issue] {
    issues.toArray();
  };

  public func getIssuesByCustomer_(
    issues : List.List<IssueTypes.Issue>,
    customerId : Text,
  ) : [IssueTypes.Issue] {
    issues.filter(func(i) { i.customerId == customerId }).toArray();
  };

  public func updateIssueStatus_(
    issues : List.List<IssueTypes.Issue>,
    id : Text,
    status : IssueTypes.IssueStatus,
  ) : () {
    issues.mapInPlace(
      func(issue) {
        if (issue.id == id) { { issue with status } } else { issue };
      }
    );
  };
};
