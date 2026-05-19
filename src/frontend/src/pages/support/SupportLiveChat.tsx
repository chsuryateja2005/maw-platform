import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import { LightSidebarLayout } from "@/layouts/LightSidebarLayout";
import { cn } from "@/lib/utils";
import { HeadphonesIcon, Send, Smile } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { SUPPORT_NAV } from "./SupportDashboard";

interface ChatMessage {
  id: string;
  sender: string;
  role: "customer" | "agent";
  text: string;
  time: string;
}

interface Conversation {
  id: string;
  customer: string;
  lastMessage: string;
  time: string;
  unread: number;
  status: "active" | "idle";
  messages: ChatMessage[];
}

const CONVERSATIONS: Conversation[] = [
  {
    id: "chat-1",
    customer: "Anika Sharma",
    lastMessage: "When will my order be dispatched?",
    time: "2m",
    unread: 3,
    status: "active",
    messages: [
      {
        id: "c1-m1",
        sender: "Anika Sharma",
        role: "customer",
        text: "Hi! I placed an order 3 days ago but it still shows 'Processing'.",
        time: "10:12",
      },
      {
        id: "c1-m2",
        sender: "Priya Desai",
        role: "agent",
        text: "Hello Anika! Let me check on that for you right away.",
        time: "10:14",
      },
      {
        id: "c1-m3",
        sender: "Anika Sharma",
        role: "customer",
        text: "When will my order be dispatched?",
        time: "10:15",
      },
    ],
  },
  {
    id: "chat-2",
    customer: "Dev Kapoor",
    lastMessage: "I need a refund for order #5532",
    time: "15m",
    unread: 1,
    status: "active",
    messages: [
      {
        id: "c2-m1",
        sender: "Dev Kapoor",
        role: "customer",
        text: "Hello, I received the wrong product. I ordered a blue shirt but got a red one.",
        time: "09:55",
      },
      {
        id: "c2-m2",
        sender: "Priya Desai",
        role: "agent",
        text: "I'm sorry to hear that Dev. I'll initiate a return and refund for you.",
        time: "09:58",
      },
      {
        id: "c2-m3",
        sender: "Dev Kapoor",
        role: "customer",
        text: "I need a refund for order #5532",
        time: "10:00",
      },
    ],
  },
  {
    id: "chat-3",
    customer: "Ritu Verma",
    lastMessage: "Thank you so much, that's very helpful!",
    time: "1h",
    unread: 0,
    status: "idle",
    messages: [
      {
        id: "c3-m1",
        sender: "Ritu Verma",
        role: "customer",
        text: "Can I change the delivery address for my order?",
        time: "09:10",
      },
      {
        id: "c3-m2",
        sender: "Priya Desai",
        role: "agent",
        text: "Yes! Please share the new address and I'll update it right away.",
        time: "09:12",
      },
      {
        id: "c3-m3",
        sender: "Ritu Verma",
        role: "customer",
        text: "Thank you so much, that's very helpful!",
        time: "09:15",
      },
    ],
  },
  {
    id: "chat-4",
    customer: "Suresh Babu",
    lastMessage: "Does this come with a warranty?",
    time: "2h",
    unread: 2,
    status: "active",
    messages: [
      {
        id: "c4-m1",
        sender: "Suresh Babu",
        role: "customer",
        text: "I'm looking at the electronics category. Does this come with a warranty?",
        time: "08:45",
      },
    ],
  },
  {
    id: "chat-5",
    customer: "Kavita Joshi",
    lastMessage: "My coupon expired before I could use it",
    time: "3h",
    unread: 0,
    status: "idle",
    messages: [
      {
        id: "c5-m1",
        sender: "Kavita Joshi",
        role: "customer",
        text: "My coupon SAVE20 expired before I could use it. Can it be extended?",
        time: "08:00",
      },
      {
        id: "c5-m2",
        sender: "Priya Desai",
        role: "agent",
        text: "I understand that's frustrating. Let me check with the promotions team.",
        time: "08:05",
      },
    ],
  },
  {
    id: "chat-6",
    customer: "Pranav Singh",
    lastMessage: "App is not loading the cart page",
    time: "4h",
    unread: 1,
    status: "active",
    messages: [
      {
        id: "c6-m1",
        sender: "Pranav Singh",
        role: "customer",
        text: "App is not loading the cart page for me. I've tried clearing cache.",
        time: "07:30",
      },
    ],
  },
  {
    id: "chat-7",
    customer: "Meena Reddy",
    lastMessage: "Can I add multiple addresses?",
    time: "5h",
    unread: 0,
    status: "idle",
    messages: [
      {
        id: "c7-m1",
        sender: "Meena Reddy",
        role: "customer",
        text: "Can I add multiple delivery addresses to my account?",
        time: "06:45",
      },
      {
        id: "c7-m2",
        sender: "Priya Desai",
        role: "agent",
        text: "Yes, you can add up to 5 addresses from your profile settings.",
        time: "06:50",
      },
    ],
  },
  {
    id: "chat-8",
    customer: "Arjun Pillai",
    lastMessage: "Is there a student discount available?",
    time: "6h",
    unread: 0,
    status: "idle",
    messages: [
      {
        id: "c8-m1",
        sender: "Arjun Pillai",
        role: "customer",
        text: "Is there a student discount available on the platform?",
        time: "06:00",
      },
    ],
  },
];

export function SupportLiveChat() {
  const [selectedId, setSelectedId] = useState("chat-1");
  const [messageInput, setMessageInput] = useState("");
  const [chatData, setChatData] = useState(CONVERSATIONS);

  const selected = chatData.find((c) => c.id === selectedId) ?? chatData[0];

  const handleSend = () => {
    if (!messageInput.trim()) return;
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "Priya Desai",
      role: "agent",
      text: messageInput.trim(),
      time: "Just now",
    };
    setChatData((prev) =>
      prev.map((c) =>
        c.id === selectedId
          ? {
              ...c,
              messages: [...c.messages, newMsg],
              lastMessage: newMsg.text,
            }
          : c,
      ),
    );
    setMessageInput("");
    toast.success("Message sent");
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
        title="Live Chat"
        subtitle="Real-time customer conversations"
      />

      <div
        className="flex gap-0 bg-white border border-border rounded-xl overflow-hidden"
        style={{ height: "calc(100vh - 220px)" }}
      >
        {/* Left: Conversation List */}
        <div className="w-72 shrink-0 border-r border-border flex flex-col">
          <div className="px-4 py-3 border-b border-border">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Active Conversations
            </p>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-border">
            {chatData.map((conv, i) => (
              <motion.button
                key={conv.id}
                type="button"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                data-ocid={`chat.conversation.item.${i + 1}`}
                className={cn(
                  "w-full flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors text-left",
                  selectedId === conv.id
                    ? "bg-primary/5 border-l-2 border-l-primary"
                    : "hover:bg-muted/40",
                )}
                onClick={() => setSelectedId(conv.id)}
              >
                <div className="relative shrink-0">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/60 to-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                    {conv.customer
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <span
                    className={cn(
                      "absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white",
                      conv.status === "active"
                        ? "bg-emerald-500"
                        : "bg-muted-foreground",
                    )}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {conv.customer}
                    </p>
                    <span className="text-xs text-muted-foreground shrink-0 ml-1">
                      {conv.time}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                    {conv.lastMessage}
                  </p>
                </div>
                {conv.unread > 0 && (
                  <span className="shrink-0 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                    {conv.unread}
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Right: Chat Window */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border bg-muted/20">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/60 to-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                {selected.customer
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <span
                className={cn(
                  "absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white",
                  selected.status === "active"
                    ? "bg-emerald-500"
                    : "bg-muted-foreground",
                )}
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {selected.customer}
              </p>
              <p className="text-xs text-muted-foreground capitalize">
                {selected.status}
              </p>
            </div>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto p-5 space-y-4"
            data-ocid="chat.messages"
          >
            <AnimatePresence initial={false}>
              {selected.messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex gap-3",
                    msg.role === "agent" ? "flex-row-reverse" : "flex-row",
                  )}
                >
                  <div
                    className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
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
                  <div className="max-w-[70%]">
                    <div
                      className={cn(
                        "px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed",
                        msg.role === "agent"
                          ? "bg-primary text-primary-foreground rounded-tr-sm"
                          : "bg-muted text-foreground rounded-tl-sm",
                      )}
                    >
                      {msg.text}
                    </div>
                    <p
                      className={cn(
                        "text-xs text-muted-foreground mt-1",
                        msg.role === "agent" ? "text-right" : "text-left",
                      )}
                    >
                      {msg.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing indicator */}
            <div
              className="flex items-center gap-2 text-xs text-muted-foreground"
              data-ocid="chat.typing_indicator"
            >
              <div className="flex gap-1">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <span
                  className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
              <span>{selected.customer} is typing...</span>
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-border p-4">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-9 w-9 shrink-0 text-muted-foreground"
                data-ocid="chat.emoji.button"
                onClick={() => toast.info("Emoji picker coming soon")}
              >
                <Smile className="w-4 h-4" />
              </Button>
              <input
                type="text"
                placeholder={`Message ${selected.customer}...`}
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && !e.shiftKey && handleSend()
                }
                className="flex-1 px-3.5 py-2 text-sm border border-border rounded-lg focus:outline-none focus:border-primary bg-background transition-colors"
                data-ocid="chat.message_input"
              />
              <Button
                type="button"
                size="sm"
                disabled={!messageInput.trim()}
                onClick={handleSend}
                data-ocid="chat.send.button"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </LightSidebarLayout>
  );
}
