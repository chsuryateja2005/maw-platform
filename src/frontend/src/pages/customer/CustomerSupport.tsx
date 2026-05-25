import { IssueStatus } from "@/backend";
import { useAuth } from "@/hooks/useAuth";
import { useCreateIssue, useMyIssues } from "@/hooks/useQueries";
import { LightLayout } from "@/layouts/LightLayout";
import { cn } from "@/lib/utils";
import {
  BadgeCheck,
  Clock,
  Headset,
  Mail,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const SUBJECT_OPTIONS = [
  "Order Issue",
  "Payment Issue",
  "Product Quality",
  "Delivery Issue",
  "Return/Refund",
  "Other",
];

function StatusBadge({ status }: { status: IssueStatus }) {
  const isPending = status === IssueStatus.pending;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium",
        isPending
          ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
          : "bg-green-100 text-green-800 border border-green-200",
      )}
    >
      {isPending ? (
        <>
          <Clock className="w-3 h-3" />
          Pending
        </>
      ) : (
        <>
          <BadgeCheck className="w-3 h-3" />
          Resolved
        </>
      )}
    </span>
  );
}

export default function CustomerSupport() {
  const { isAuthenticated } = useAuth();
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const createIssue = useCreateIssue();
  const { data: myIssues, isLoading } = useMyIssues(isAuthenticated);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !description.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (!isAuthenticated) {
      toast.error("Please log in to submit a complaint.");
      return;
    }
    try {
      await createIssue.mutateAsync({
        subject,
        description: description.trim(),
      });
      toast.success("Complaint submitted successfully!");
      setSubject("");
      setDescription("");
    } catch {
      toast.error("Failed to submit complaint. Please try again.");
    }
  };

  return (
    <LightLayout>
      <div className="min-h-screen bg-background">
        {/* Hero */}
        <div className="bg-gradient-to-r from-[#0f1923] to-[#1a2332] py-12 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Customer Support Center
            </h1>
            <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto">
              We're here to help. Reach out via phone, email, or chat — or
              submit a complaint and we'll get back to you within 24 hours.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-3">
                <Phone className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">
                Phone Support
              </h3>
              <p className="text-amber-700 font-bold text-base">
                +91-1800-MAW-HELP
              </p>
              <p className="text-gray-500 text-xs mt-1">Toll free, 24/7</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">
                Email Support
              </h3>
              <p className="text-blue-700 font-bold text-base">
                support@maw.in
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Response within 24hrs
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">
                Live Chat
              </h3>
              <p className="text-green-700 font-bold text-base">Chat with us</p>
              <p className="text-gray-500 text-xs mt-1">
                Click the chat bubble
              </p>
            </div>
          </div>

          {/* Complaint Form */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <Headset className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Submit a Complaint
                </h2>
                <p className="text-gray-500 text-xs">
                  Tell us what's wrong and we'll fix it.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="support-subject"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Subject
                </label>
                <select
                  id="support-subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                  data-ocid="support_page.subject_select"
                >
                  <option value="">Select an issue type</option>
                  {SUBJECT_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="support-description"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="support-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={5}
                  placeholder="Please describe your issue in detail..."
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all resize-none"
                  data-ocid="support_page.description_input"
                />
              </div>

              <button
                type="submit"
                disabled={createIssue.isPending || !isAuthenticated}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                data-ocid="support_page.submit_button"
              >
                <Send className="w-4 h-4" />
                {createIssue.isPending ? "Submitting..." : "Submit Complaint"}
              </button>

              {!isAuthenticated && (
                <p className="text-xs text-red-600">
                  Please log in to submit a support ticket.
                </p>
              )}
            </form>
          </div>

          {/* My Complaints */}
          {isAuthenticated && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
              <h2 className="text-lg font-bold text-gray-900 mb-5">
                My Complaints
              </h2>

              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="h-16 rounded-lg bg-gray-100 animate-pulse"
                    />
                  ))}
                </div>
              ) : !myIssues || myIssues.length === 0 ? (
                <div className="text-center py-10">
                  <Headset className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">
                    No complaints submitted yet.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {myIssues.map((issue, idx) => (
                    <div
                      key={issue.id.toString()}
                      className="flex items-start justify-between gap-4 p-4 rounded-lg border border-gray-100 bg-gray-50 hover:bg-gray-100 transition-colors"
                      data-ocid={`support_page.complaint.item.${idx + 1}`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-sm text-gray-900 truncate">
                            {issue.subject}
                          </h4>
                          <StatusBadge status={issue.status} />
                        </div>
                        <p className="text-gray-600 text-xs line-clamp-2">
                          {issue.description}
                        </p>
                        <p className="text-gray-400 text-[10px] mt-1.5">
                          Submitted on{" "}
                          {new Date(
                            Number(issue.createdAt) / 1_000_000,
                          ).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </LightLayout>
  );
}
