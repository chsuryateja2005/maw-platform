import { PageHeader } from "@/components/ui/PageHeader";
import { StatBadge } from "@/components/ui/StatBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LightSidebarLayout } from "@/layouts/LightSidebarLayout";
import { cn } from "@/lib/utils";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  HeadphonesIcon,
  Package,
  Send,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { SUPPORT_NAV } from "./SupportDashboard";

const TICKET_DETAIL = {
  id: "TKT-2841",
  customer: "Rohan Mehta",
  email: "rohan.mehta@email.com",
  subject: "Order not delivered after 7 days",
  priority: "urgent",
  status: "open",
  category: "Complaint",
  createdAt: "19 May 2026, 09:14 AM",
  orderId: "ORD-88201",
  accountCreated: "12 Jan 2025",
  relatedOrders: [
    {
      id: "ORD-88201",
      status: "shipped",
      total: "₹2,450",
      date: "12 May 2026",
    },
    {
      id: "ORD-87654",
      status: "delivered",
      total: "₹1,180",
      date: "03 Apr 2026",
    },
    {
      id: "ORD-86920",
      status: "delivered",
      total: "₹4,230",
      date: "15 Feb 2026",
    },
  ],
  messages: [
    {
      id: "msg-1",
      sender: "Rohan Mehta",
      role: "customer" as const,
      text: "Hi, I placed an order 7 days ago (ORD-88201) and it still hasn't been delivered. The tracking page shows 'In Transit' since last Thursday. Can you please help?",
      time: "19 May 2026, 09:14",
    },
    {
      id: "msg-2",
      sender: "Priya Desai",
      role: "agent" as const,
      text: "Hello Rohan! I'm sorry to hear about the delay. I've checked your order ORD-88201 and it does appear to be stuck at a transit hub. Let me escalate this to our logistics team immediately.",
      time: "19 May 2026, 10:30",
    },
    {
      id: "msg-3",
      sender: "Rohan Mehta",
      role: "customer" as const,
      text: "Thank you! Is there an estimated delivery date you can provide? I need the item urgently for a gift.",
      time: "19 May 2026, 10:45",
    },
    {
      id: "msg-4",
      sender: "Priya Desai",
      role: "agent" as const,
      text: "I completely understand the urgency. Our logistics team has flagged this as priority. You should receive a delivery update within 24 hours. I'll also apply a ₹200 voucher to your account for the inconvenience.",
      time: "19 May 2026, 11:05",
    },
    {
      id: "msg-5",
      sender: "Rohan Mehta",
      role: "customer" as const,
      text: "That's very kind, thank you! I'll wait for the update. Appreciate your quick response.",
      time: "19 May 2026, 11:20",
    },
  ],
};

const PRIORITY_VARIANT = {
  urgent: "danger" as const,
  high: "warning" as const,
  medium: "info" as const,
  low: "muted" as const,
};

export function SupportTicketDetail() {
  const navigate = useNavigate();
  const params = useParams({ strict: false }) as { ticketId?: string };
  const ticketId = params.ticketId ?? "TKT-2841";
  const ticket = { ...TICKET_DETAIL, id: ticketId };

  const [reply, setReply] = useState("");
  const [messages, setMessages] = useState(ticket.messages);

  const handleSend = () => {
    if (!reply.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}`,
        sender: "Priya Desai",
        role: "agent" as const,
        text: reply.trim(),
        time: "Just now",
      },
    ]);
    setReply("");
    toast.success("Reply sent successfully");
  };

  const handleResolve = () => {
    toast.success(`Ticket ${ticketId} marked as resolved`);
  };

  return (
    <LightSidebarLayout
      portalName="Support Center"
      portalLogo={HeadphonesIcon}
      navItems={SUPPORT_NAV}
      userLabel="Priya Desai"
      userSubLabel="Support Agent"
    >
      <PageHeader
        title={ticket.subject}
        subtitle={`${ticket.id} • Opened ${ticket.createdAt}`}
        action={
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate({ to: "/support/tickets" })}
            data-ocid="ticket_detail.back.button"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
            Back to Tickets
          </Button>
        }
      />

      <div className="flex gap-6 items-start">
        {/* Left — Thread */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 min-w-0 space-y-4"
        >
          {/* Ticket Meta */}
          <div className="bg-white border border-border rounded-xl p-5">
            <div className="flex flex-wrap items-center gap-3">
              <StatBadge
                status={ticket.priority}
                variant={
                  PRIORITY_VARIANT[
                    ticket.priority as keyof typeof PRIORITY_VARIANT
                  ]
                }
              />
              <StatBadge status={ticket.status} />
              <Badge variant="secondary">{ticket.category}</Badge>
              <span className="text-xs text-muted-foreground ml-auto">
                Created {ticket.createdAt}
              </span>
            </div>
          </div>

          {/* Messages */}
          <div className="bg-white border border-border rounded-xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-border">
              <h3 className="text-sm font-semibold text-foreground">
                Conversation
              </h3>
            </div>
            <div
              className="p-5 space-y-4 max-h-[480px] overflow-y-auto"
              data-ocid="ticket_detail.conversation"
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex gap-3",
                    msg.role === "agent" ? "flex-row-reverse" : "flex-row",
                  )}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
                      msg.role === "agent"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground",
                    )}
                  >
                    {msg.sender
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div
                    className={cn(
                      "max-w-[75%] space-y-1",
                      msg.role === "agent" ? "items-end" : "items-start",
                    )}
                  >
                    <div
                      className={cn(
                        "px-4 py-2.5 rounded-2xl text-sm leading-relaxed",
                        msg.role === "agent"
                          ? "bg-primary text-primary-foreground rounded-tr-sm"
                          : "bg-muted text-foreground rounded-tl-sm",
                      )}
                    >
                      {msg.text}
                    </div>
                    <p
                      className={cn(
                        "text-xs text-muted-foreground",
                        msg.role === "agent" ? "text-right" : "text-left",
                      )}
                    >
                      {msg.sender} · {msg.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Reply box */}
            <div className="border-t border-border p-4 space-y-3">
              <Textarea
                placeholder="Type your reply..."
                rows={3}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                className="resize-none text-sm"
                data-ocid="ticket_detail.reply.textarea"
              />
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  data-ocid="ticket_detail.resolve.button"
                  onClick={handleResolve}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                  Mark as Resolved
                </Button>
                <Button
                  size="sm"
                  data-ocid="ticket_detail.send.button"
                  onClick={handleSend}
                  disabled={!reply.trim()}
                >
                  <Send className="w-3.5 h-3.5 mr-1.5" />
                  Send Reply
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right — Info Panel */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="w-72 shrink-0 space-y-4"
        >
          {/* Customer Info */}
          <div className="bg-white border border-border rounded-xl p-5">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              Customer Info
            </h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/70 to-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                {ticket.customer
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {ticket.customer}
                </p>
                <p className="text-xs text-muted-foreground">{ticket.email}</p>
              </div>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order ID</span>
                <span className="font-mono font-medium text-foreground">
                  {ticket.orderId}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Account Since</span>
                <span className="font-medium text-foreground">
                  {ticket.accountCreated}
                </span>
              </div>
            </div>
          </div>

          {/* Related Orders */}
          <div className="bg-white border border-border rounded-xl p-5">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              Related Orders
            </h3>
            <div className="space-y-2">
              {ticket.relatedOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors"
                >
                  <Package className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-mono font-medium text-foreground">
                      {order.id}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {order.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-foreground">
                      {order.total}
                    </p>
                    <StatBadge
                      status={order.status}
                      showDot={false}
                      className="text-[10px] py-0 px-1.5"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </LightSidebarLayout>
  );
}
