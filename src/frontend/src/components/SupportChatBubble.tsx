import { useAuth } from "@/hooks/useAuth";
import { useCreateIssue } from "@/hooks/useQueries";
import { cn } from "@/lib/utils";
import { Headset, MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  isForm?: boolean;
  isContact?: boolean;
}

const QUICK_REPLIES = [
  "Track my order",
  "Return/Refund policy",
  "Payment issue",
  "Contact support team",
  "Raise a complaint",
] as const;

const FAQ_RESPONSES: Record<string, string> = {
  "Track my order":
    "Go to My Orders page to track your order status in real time. Orders > Status tab.",
  "Return/Refund policy":
    "We accept returns within 7 days of delivery. Go to My Orders, select your order, and click Request Return.",
  "Payment issue":
    "For payment issues, please raise a complaint below or call our helpline at 1800-MAW-HELP (toll free).",
};

function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

export function SupportChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formSubject, setFormSubject] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAuth();
  const createIssue = useCreateIssue();

  // Initial greeting when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: generateId(),
          sender: "bot",
          text: "Hi! I'm your MAW support assistant. How can I help you today?",
        },
      ]);
    }
  }, [isOpen, messages.length]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleQuickReply = (reply: string) => {
    const userMsg: ChatMessage = {
      id: generateId(),
      sender: "user",
      text: reply,
    };

    if (reply === "Contact support team") {
      setMessages((prev) => [
        ...prev,
        userMsg,
        {
          id: generateId(),
          sender: "bot",
          text: "Here are our support contact details:",
          isContact: true,
        },
      ]);
      return;
    }

    if (reply === "Raise a complaint") {
      if (!isAuthenticated) {
        setMessages((prev) => [
          ...prev,
          userMsg,
          {
            id: generateId(),
            sender: "bot",
            text: "Please log in to raise a support ticket.",
          },
        ]);
        return;
      }
      setShowForm(true);
      setMessages((prev) => [
        ...prev,
        userMsg,
        {
          id: generateId(),
          sender: "bot",
          text: "Please fill in the details below to raise a complaint:",
          isForm: true,
        },
      ]);
      return;
    }

    const response = FAQ_RESPONSES[reply] ?? "How else can I help you?";
    setMessages((prev) => [
      ...prev,
      userMsg,
      { id: generateId(), sender: "bot", text: response },
    ]);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const text = inputText.trim();
    const userMsg: ChatMessage = {
      id: generateId(),
      sender: "user",
      text,
    };

    let botResponse =
      "For specific help please call +91-1800-MAW-HELP or raise a complaint above.";
    const lower = text.toLowerCase();
    if (lower.includes("order")) {
      botResponse = FAQ_RESPONSES["Track my order"];
    } else if (lower.includes("return") || lower.includes("refund")) {
      botResponse = FAQ_RESPONSES["Return/Refund policy"];
    } else if (lower.includes("payment") || lower.includes("pay")) {
      botResponse = FAQ_RESPONSES["Payment issue"];
    }

    setMessages((prev) => [
      ...prev,
      userMsg,
      { id: generateId(), sender: "bot", text: botResponse },
    ]);
    setInputText("");
  };

  const handleSubmitComplaint = async () => {
    if (!formSubject.trim() || !formDescription.trim()) {
      toast.error("Please fill in both subject and description.");
      return;
    }
    try {
      await createIssue.mutateAsync({
        subject: formSubject.trim(),
        description: formDescription.trim(),
      });
      toast.success("Complaint submitted successfully!");
      setFormSubject("");
      setFormDescription("");
      setShowForm(false);
      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          sender: "bot",
          text: "Your complaint has been submitted successfully. Our team will review it within 24 hours.",
        },
      ]);
    } catch {
      toast.error("Failed to submit complaint. Please try again.");
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        data-ocid="support_chat.open_button"
        className={cn(
          "fixed right-4 bottom-24 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300",
          "bg-amber-500 hover:bg-amber-600 text-white",
          isOpen ? "scale-90 rotate-90" : "scale-100 hover:scale-105",
        )}
        aria-label={isOpen ? "Close support chat" : "Open support chat"}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <div className="relative">
            <Headset className="w-6 h-6" />
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-amber-500 animate-pulse" />
          </div>
        )}
      </button>

      {/* Chat panel */}
      <div
        className={cn(
          "fixed right-4 bottom-40 z-50 w-[300px] h-[420px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right",
          isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none",
        )}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3 flex-shrink-0"
          style={{ backgroundColor: "#0f1923" }}
        >
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-amber-400" />
            <span className="text-white font-semibold text-sm">
              MAW Support
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close chat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex",
                msg.sender === "user" ? "justify-end" : "justify-start",
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
                  msg.sender === "user"
                    ? "bg-amber-500 text-white rounded-br-md"
                    : "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-md",
                )}
              >
                {msg.text}

                {/* Contact details card */}
                {msg.isContact && (
                  <div className="mt-2 space-y-1.5 bg-gray-50 rounded-lg p-2.5">
                    <p className="text-xs text-gray-600">
                      <span className="font-semibold">Phone:</span>{" "}
                      +91-1800-MAW-HELP
                    </p>
                    <p className="text-xs text-gray-600">
                      <span className="font-semibold">Email:</span>{" "}
                      support@maw.in
                    </p>
                    <p className="text-xs text-gray-500">Available 24/7</p>
                  </div>
                )}

                {/* Inline complaint form */}
                {msg.isForm && showForm && (
                  <div className="mt-2 space-y-2 bg-gray-50 rounded-lg p-2.5">
                    <input
                      type="text"
                      placeholder="Subject"
                      value={formSubject}
                      onChange={(e) => setFormSubject(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-gray-200 bg-white outline-none focus:border-amber-400 transition-colors"
                      data-ocid="support_chat.form.subject_input"
                    />
                    <textarea
                      placeholder="Describe your issue..."
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      rows={3}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-gray-200 bg-white outline-none focus:border-amber-400 transition-colors resize-none"
                      data-ocid="support_chat.form.description_input"
                    />
                    <button
                      type="button"
                      onClick={handleSubmitComplaint}
                      disabled={createIssue.isPending}
                      className="w-full py-1.5 text-xs font-semibold rounded bg-amber-500 hover:bg-amber-600 text-white transition-colors disabled:opacity-50"
                      data-ocid="support_chat.form.submit_button"
                    >
                      {createIssue.isPending ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Quick reply buttons */}
          {messages.length > 0 &&
            messages[messages.length - 1].sender === "bot" && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {QUICK_REPLIES.map((reply) => (
                  <button
                    key={reply}
                    type="button"
                    onClick={() => handleQuickReply(reply)}
                    className="px-2.5 py-1 text-[11px] rounded-full border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors"
                    data-ocid={`support_chat.quick_reply.${reply.toLowerCase().replace(/[^a-z0-9]/g, "_")}.button`}
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input bar */}
        <div className="flex items-center gap-2 px-3 py-2.5 border-t border-gray-100 bg-white flex-shrink-0">
          <input
            type="text"
            placeholder="Type a message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
            className="flex-1 text-sm px-3 py-1.5 rounded-full bg-gray-100 border-0 outline-none focus:ring-1 focus:ring-amber-400 transition-all"
            data-ocid="support_chat.text_input"
          />
          <button
            type="button"
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="w-8 h-8 rounded-full bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            data-ocid="support_chat.send_button"
            aria-label="Send message"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </>
  );
}
