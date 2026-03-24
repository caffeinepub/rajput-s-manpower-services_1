import Map "mo:core/Map";
import List "mo:core/List";
import Order "mo:core/Order";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  var nextSubmissionId = 0;

  type Submission = {
    id : Nat;
    name : Text;
    phone : Text;
    company : Text;
    workersNeeded : Nat;
    typeOfWork : Text;
    message : Text;
    timestamp : Time.Time;
    isRead : Bool;
  };

  module Submission {
    public func compareByTimestamp(submission1 : Submission, submission2 : Submission) : Order.Order {
      Int.compare(submission2.timestamp, submission1.timestamp);
    };
  };

  let submissions = Map.empty<Nat, Submission>();

  public shared ({ caller }) func submitQuery(input : Submission) : async Nat {
    let submissionId = nextSubmissionId;
    nextSubmissionId += 1;
    let submission : Submission = {
      input with
      id = submissionId;
      timestamp = Time.now();
      isRead = false;
    };
    submissions.add(submission.id, submission);
    submission.id;
  };

  public query ({ caller }) func getAllSubmissions() : async [Submission] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can get all submissions");
    };
    submissions.values().toArray().sort(Submission.compareByTimestamp);
  };

  public shared ({ caller }) func markSubmissionRead(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can mark submission read");
    };
    let updated = List.empty<Submission>();
    var found = false;
    for (submission in submissions.values()) {
      if (submission.id == id) {
        updated.add({ submission with isRead = true });
        found := true;
      } else {
        updated.add(submission);
      };
    };
    if (not found) {
      Runtime.trap("Submission not found");
    };
    submissions.clear();
    for (submission in updated.values()) {
      submissions.add(submission.id, submission);
    };
  };

  public shared ({ caller }) func markSubmissionUnread(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can mark submission unread");
    };
    switch (submissions.get(id)) {
      case (null) {
        Runtime.trap("Submission not found");
      };
      case (?submission) {
        let updatedSubmission = { submission with isRead = false };
        submissions.add(id, updatedSubmission);
      };
    };
  };

  public shared ({ caller }) func deleteSubmission(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete submissions");
    };
    if (not submissions.containsKey(id)) {
      Runtime.trap("Submission not found");
    };
    submissions.remove(id);
  };
};
