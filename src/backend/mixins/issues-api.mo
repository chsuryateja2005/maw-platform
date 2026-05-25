import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import Runtime "mo:core/Runtime";
import IssueTypes "../types/issues";
import IssueLib "../lib/issues";

mixin (
  accessControlState : AccessControl.AccessControlState,
  issues : List.List<IssueTypes.Issue>,
) {
  public shared ({ caller }) func createIssue(subject : Text, description : Text) : async IssueTypes.Issue {
    let customerId = caller.toText();
    IssueLib.createIssue_(issues, customerId, subject, description);
    let all = issues.toArray();
    let last = all[all.size() - 1];
    last;
  };

  public query func getIssues() : async [IssueTypes.Issue] {
    IssueLib.getIssues_(issues);
  };

  public query ({ caller }) func getMyIssues() : async [IssueTypes.Issue] {
    let customerId = caller.toText();
    IssueLib.getIssuesByCustomer_(issues, customerId);
  };

  public shared ({ caller }) func updateIssueStatus(id : Text, status : IssueTypes.IssueStatus) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update issue status");
    };
    IssueLib.updateIssueStatus_(issues, id, status);
    true;
  };
};
