import { createActor } from "@/backend";
import type { Issue } from "@/backend";
import { IssueStatus } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useCreateIssue } from "@/hooks/useQueries";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Headphones,
  Loader2,
  LogIn,
  Mail,
  Phone,
  Send,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const CONTACT_INFO = [
  {
    id: "phone",
    icon: Phone,
    label: "Helpline",
    value: "+91-1800-MAW-HELP (1800-629-4357)",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    id: "email",
    icon: Mail,
    label: "Email",
    value: "support@mawplatform.com",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
];

const PRIORITIES = [
  { value: "Low", label: "Low", color: "text-emerald-600" },
  { value: "Medium", label: "Medium", color: "text-amber-600" },
  { value: "High", label: "High", color: "text-rose-600" },
];

function formatDate(ts: bigint) {
  const ms = Number(ts) / 1_000_000;
  return new Date(
    ms > 1e12 ? ms : ts < 1e13 ? Number(ts) * 1000 : ms,
  ).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function IssueRow({ issue, index }: { issue: Issue; index: number }) {
  const isPending = issue.status === IssueStatus.pending;
  const preview = issue.description.slice(0, 80);
  const shortId = issue.id.slice(0, 8).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
      className="flex items-start gap-3 p-3 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors"
      data-ocid={`support.issue.${index + 1}`}
    >
      <div className="mt-0.5">
        {isPending ? (
          <Clock className="w-4 h-4 text-amber-500" />
        ) : (
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-mono font-semibold text-muted-foreground">
            #{shortId}
          </span>
          <Badge
            className={`text-xs px-2 py-0 ${
              isPending
                ? "bg-amber-100 text-amber-700 border-amber-200"
                : "bg-emerald-100 text-emerald-700 border-emerald-200"
            }`}
          >
            {isPending ? "Pending" : "Resolved"}
          </Badge>
        </div>
        <p className="text-sm text-foreground mt-0.5 truncate">
          {preview}
          {issue.description.length > 80 ? "…" : ""}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {formatDate(issue.createdAt)}
        </p>
      </div>
    </motion.div>
  );
}

export function CustomerSupportSection() {
  const { isAuthenticated, login } = useAuth();

  const { actor, isFetching: actorFetching } = useActor(createActor);

  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [subjectError, setSubjectError] = useState("");
  const [descError, setDescError] = useState("");

  const { data: myIssues, isLoading: issuesLoading } = useQuery<Issue[]>({
    queryKey: ["myIssues"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyIssues();
    },
    enabled: !!actor && !actorFetching && isAuthenticated,
  });

  const createMutation = useCreateIssue();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    let hasError = false;
    if (!subject.trim()) {
      setSubjectError("Please enter a subject.");
      hasError = true;
    } else {
      setSubjectError("");
    }
    if (!description.trim()) {
      setDescError("Please describe your issue.");
      hasError = true;
    } else {
      setDescError("");
    }
    if (hasError) return;
    createMutation.mutate({
      subject: subject.trim(),
      description: `Priority: ${priority} | ${description.trim()}`,
    });
  }

  return (
    <section
      id="support-section"
      className="max-w-5xl mx-auto px-6 py-12"
      data-ocid="support.section"
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-3 mb-8"
      >
        <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
          <Headphones className="w-6 h-6 text-amber-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground font-display">
            Customer Support Helpline
          </h2>
          <p className="text-sm text-muted-foreground">
            We're here to help — reach out any time
          </p>
        </div>
        <Badge className="ml-auto bg-emerald-100 text-emerald-700 border-emerald-200 gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
          24/7 Available
        </Badge>
      </motion.div>

      {/* Contact info row */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay: 0.08 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
      >
        {CONTACT_INFO.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card shadow-sm"
          >
            <div
              className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0`}
            >
              <item.icon className={`w-5 h-5 ${item.color}`} />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="text-sm font-semibold text-foreground truncate">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Complaint form card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.12 }}
          className="lg:col-span-3"
        >
          <Card className="p-6 bg-card border-border shadow-sm rounded-xl">
            <h3 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              Raise a Complaint
            </h3>

            {!isAuthenticated ? (
              <div className="text-center py-8" data-ocid="support.auth_prompt">
                <Headphones className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-4">
                  Sign in to submit a complaint and track your issues.
                </p>
                <Button
                  onClick={login}
                  className="gap-2"
                  data-ocid="support.sign_in_button"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Subject */}
                <div>
                  <label
                    htmlFor="support-subject"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Issue Subject <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="support-subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    onBlur={() => {
                      if (!subject.trim())
                        setSubjectError("Please enter a subject.");
                      else setSubjectError("");
                    }}
                    placeholder="e.g. Order not delivered, Wrong item received"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                    data-ocid="support.subject_input"
                  />
                  {subjectError && (
                    <p
                      className="text-xs text-destructive mt-1"
                      data-ocid="support.subject_field_error"
                    >
                      {subjectError}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="support-desc"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Description <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="support-desc"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onBlur={() => {
                      if (!description.trim())
                        setDescError("Please describe your issue.");
                      else setDescError("");
                    }}
                    placeholder="Describe your issue in detail..."
                    rows={4}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors resize-none"
                    data-ocid="support.description_textarea"
                  />
                  {descError && (
                    <p
                      className="text-xs text-destructive mt-1"
                      data-ocid="support.description_field_error"
                    >
                      {descError}
                    </p>
                  )}
                </div>

                {/* Priority */}
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">
                    Priority
                  </p>
                  <div
                    className="flex gap-3"
                    role="radiogroup"
                    aria-label="Issue priority"
                  >
                    {PRIORITIES.map((p) => (
                      <label
                        key={p.value}
                        className={`flex items-center gap-1.5 cursor-pointer px-3 py-1.5 rounded-lg border transition-colors text-sm font-medium ${
                          priority === p.value
                            ? "border-amber-400 bg-amber-50"
                            : "border-border bg-card hover:bg-muted/40"
                        }`}
                        data-ocid={`support.priority.${p.value.toLowerCase()}`}
                      >
                        <input
                          type="radio"
                          name="priority"
                          value={p.value}
                          checked={priority === p.value}
                          onChange={() => setPriority(p.value)}
                          className="sr-only"
                        />
                        <span className={p.color}>{p.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={createMutation.isPending}
                  className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white font-semibold gap-2"
                  data-ocid="support.submit_button"
                >
                  {createMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting…
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Issue
                    </>
                  )}
                </Button>
              </form>
            )}
          </Card>
        </motion.div>

        {/* My issues panel */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.18 }}
          className="lg:col-span-2"
        >
          <Card className="p-5 bg-card border-border shadow-sm rounded-xl h-full">
            <h3 className="text-base font-bold text-foreground mb-4">
              My Previous Issues
            </h3>

            {!isAuthenticated ? (
              <p className="text-sm text-muted-foreground">
                Sign in to see your complaint history.
              </p>
            ) : issuesLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-16 rounded-lg bg-muted/50 animate-pulse"
                  />
                ))}
              </div>
            ) : myIssues && myIssues.length > 0 ? (
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {myIssues.map((issue, i) => (
                  <IssueRow key={issue.id} issue={issue} index={i} />
                ))}
              </div>
            ) : (
              <div
                className="text-center py-8"
                data-ocid="support.issues_empty_state"
              >
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  No issues submitted yet.
                </p>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
