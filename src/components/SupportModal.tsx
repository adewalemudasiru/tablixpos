import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useAppStore } from "../store/AppContext";

const INTER = "'Inter', sans-serif";
const RED   = "#e91835";

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Priority = "Low" | "Medium" | "High";
type TicketStatus = "Open" | "In Progress" | "Resolved";

interface SupportReply {
  id: string;
  sender: "You" | "Support";
  message: string;
  createdAt: string;
}

interface SupportTicket {
  id: string;
  businessId: string;
  businessName: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: TicketStatus;
  priority: Priority;
  replies?: SupportReply[];
}

const SK_SUPPORT = "tablix_support_messages";

function getBusinessName(): string {
  try {
    const raw = localStorage.getItem("tablix_app_store_v1");
    if (raw) {
      const parsed = JSON.parse(raw) as Record<string, unknown>;
      if (typeof parsed.restaurantName === "string") return parsed.restaurantName;
    }
  } catch (_) {}
  return "Unknown Business";
}

export function SupportModal({ isOpen, onClose }: SupportModalProps) {
  const [activeTab, setActiveTab] = useState<"new" | "history">("new");
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [replyText, setReplyText] = useState("");

  const [subject, setSubject]   = useState("");
  const [message, setMessage]   = useState("");
  const [priority, setPriority] = useState<Priority>("Medium");
  const [email, setEmail]       = useState("");
  const [sent, setSent]         = useState(false);
  const [sending, setSending]   = useState(false);

  const valid = subject.trim() && message.trim().length >= 15 && email.trim().includes("@");

  // Load tickets on open or mount
  useEffect(() => {
    if (isOpen) {
      try {
        const raw = localStorage.getItem(SK_SUPPORT);
        setTickets(raw ? JSON.parse(raw) : []);
      } catch (_) {
        setTickets([]);
      }
    }
  }, [isOpen]);

  const simulateAgentReply = (ticketId: string, userLastMessage: string) => {
    setTickets((prevTickets) => {
      const ticket = prevTickets.find((t) => t.id === ticketId);
      if (!ticket) return prevTickets;

      let agentMessage = "Thank you for the follow-up. Our support team has received your message and we are reviewing it right now.";
      const msgLower = userLastMessage.toLowerCase();
      if (msgLower.includes("when") || msgLower.includes("time") || msgLower.includes("slow")) {
        agentMessage = "We understand this is urgent. We are investigating the delay and expect to get this resolved for you within the next hour.";
      } else if (msgLower.includes("error") || msgLower.includes("fail") || msgLower.includes("bug") || msgLower.includes("broken")) {
        agentMessage = "Our technical team has been assigned to look at this error. We will notify you here once a patch is rolled out.";
      } else if (msgLower.includes("thanks") || msgLower.includes("thank you") || msgLower.includes("ok")) {
        agentMessage = "You're very welcome! Let us know if you need anything else.";
      }

      const agentReply: SupportReply = {
        id: `rep${Date.now() + 1}`,
        sender: "Support",
        message: agentMessage,
        createdAt: new Date().toISOString(),
      };

      const updatedTicket: SupportTicket = {
        ...ticket,
        status: "In Progress",
        replies: [...(ticket.replies || []), agentReply],
      };

      // Update current selected details if applicable
      setSelectedTicket((current) => (current && current.id === ticketId ? updatedTicket : current));

      const updatedList = prevTickets.map((t) => (t.id === ticketId ? updatedTicket : t));
      localStorage.setItem(SK_SUPPORT, JSON.stringify(updatedList));
      return updatedList;
    });
  };

  const handleSend = async () => {
    if (!valid) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 700));
    const bizName = getBusinessName();
    
    const newTicket: SupportTicket = {
      id:           `sup${Date.now()}`,
      businessId:   "current",
      businessName: bizName,
      email:        email.trim(),
      subject:      subject.trim(),
      message:      message.trim(),
      createdAt:    new Date().toISOString(),
      status:       "Open",
      priority,
      replies: [],
    };

    const updatedList = [newTicket, ...tickets];
    setTickets(updatedList);
    localStorage.setItem(SK_SUPPORT, JSON.stringify(updatedList));

    setSent(true);
    setSending(false);

    // Simulate agent response 10 seconds later
    setTimeout(() => {
      simulateAgentReply(newTicket.id, "Hello support");
    }, 10000);
  };

  const handlePostReply = () => {
    if (!replyText.trim() || !selectedTicket) return;
    const newReply: SupportReply = {
      id: `rep${Date.now()}`,
      sender: "You",
      message: replyText.trim(),
      createdAt: new Date().toISOString(),
    };
    const updatedReplies = [...(selectedTicket.replies || []), newReply];
    const updatedTicket: SupportTicket = {
      ...selectedTicket,
      replies: updatedReplies,
      status: selectedTicket.status === "Resolved" ? "Open" : selectedTicket.status, // reopen if resolved
    };

    const updatedList = tickets.map((t) => (t.id === selectedTicket.id ? updatedTicket : t));
    setTickets(updatedList);
    localStorage.setItem(SK_SUPPORT, JSON.stringify(updatedList));
    setSelectedTicket(updatedTicket);
    setReplyText("");

    // Simulate Agent reply 4 seconds later
    setTimeout(() => {
      simulateAgentReply(selectedTicket.id, newReply.message);
    }, 4000);
  };

  const handleClose = () => {
    if (!sending) {
      onClose();
      setTimeout(() => {
        setSent(false);
        setSubject("");
        setMessage("");
        setEmail("");
        setPriority("Medium");
        setSelectedTicket(null);
        setActiveTab("new");
      }, 300);
    }
  };

  const PRIORITIES: Priority[] = ["Low", "Medium", "High"];
  const priorityColor = { Low: "#16a34a", Medium: "#d97706", High: RED };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-black/50"
            style={{ backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={handleClose}
          />
          <motion.div
            className="fixed inset-0 z-[61] flex items-end sm:items-center justify-center p-0 sm:p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full sm:max-w-lg sm:rounded-2xl overflow-hidden flex flex-col"
              style={{
                borderRadius: "20px 20px 0 0",
                maxHeight: "92vh",
                background: "var(--page-card-bg)",
                border: "1px solid var(--page-border)",
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
              }}
              initial={{ y: 60, scale: 0.97 }} animate={{ y: 0, scale: 1 }} exit={{ y: 60, scale: 0.97 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 shrink-0" style={{ borderBottom: "1px solid var(--page-border)" }}>
                <div className="flex items-center gap-3">
                  {selectedTicket ? (
                    <button
                      onClick={() => setSelectedTicket(null)}
                      className="size-8 flex items-center justify-center rounded-lg hover:bg-[var(--page-hover-bg)] transition-colors text-[var(--page-text-muted)]"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  ) : (
                    <div className="size-9 rounded-xl flex items-center justify-center" style={{ background: "var(--c-primary-light)" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke={RED} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                  <div>
                    <p style={{ fontFamily: INTER, fontWeight: 700, fontSize: 15, color: "var(--page-text)" }}>
                      {selectedTicket ? selectedTicket.subject : "Contact Support"}
                    </p>
                    <p style={{ fontFamily: INTER, fontSize: 12, color: "var(--page-text-muted)" }}>
                      {selectedTicket ? `ID: ${selectedTicket.id}` : "We typically reply within 24 hours"}
                    </p>
                  </div>
                </div>
                <button onClick={handleClose} className="size-8 flex items-center justify-center rounded-lg hover:bg-[var(--page-hover-bg)] transition-colors text-[var(--page-text-muted)]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                </button>
              </div>

              {/* Tabs (only when no ticket is selected) */}
              {!selectedTicket && (
                <div className="flex px-5 border-b border-[var(--page-border)] shrink-0">
                  <button
                    onClick={() => setActiveTab("new")}
                    className="flex-1 py-3 text-center text-sm font-semibold border-b-2 transition-all outline-none"
                    style={{
                      borderBottomColor: activeTab === "new" ? RED : "transparent",
                      color: activeTab === "new" ? RED : "var(--page-text-muted)",
                      cursor: "pointer"
                    }}
                  >
                    New Request
                  </button>
                  <button
                    onClick={() => setActiveTab("history")}
                    className="flex-1 py-3 text-center text-sm font-semibold border-b-2 transition-all outline-none"
                    style={{
                      borderBottomColor: activeTab === "history" ? RED : "transparent",
                      color: activeTab === "history" ? RED : "var(--page-text-muted)",
                      cursor: "pointer"
                    }}
                  >
                    Ticket Log ({tickets.length})
                  </button>
                </div>
              )}

              {/* Content / Body */}
              <div className="flex-1 overflow-y-auto" style={{ minHeight: "350px" }}>
                {selectedTicket ? (
                  /* --- Detail & Chat View --- */
                  <div className="flex flex-col h-full overflow-hidden">
                    {/* Chat Messages */}
                    <div className="flex-1 p-5 space-y-4 overflow-y-auto" style={{ maxHeight: "45vh" }}>
                      {/* Ticket Meta Header Inside Chat */}
                      <div className="p-3.5 rounded-xl border border-[var(--page-border)] bg-[var(--page-input-bg)] flex justify-between items-center gap-3">
                        <div className="text-xs text-[var(--page-text-muted)]">
                          Created: {new Date(selectedTicket.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                        </div>
                        <div className="flex gap-1.5 shrink-0">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{
                            background: selectedTicket.priority === "Low" ? "var(--c-success-bg)" : selectedTicket.priority === "Medium" ? "var(--c-warning-bg)" : "var(--c-danger-bg)",
                            color: selectedTicket.priority === "Low" ? "var(--c-success-text)" : selectedTicket.priority === "Medium" ? "var(--c-warning-text)" : "var(--c-danger-text)"
                          }}>
                            {selectedTicket.priority}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{
                            background: selectedTicket.status === "Open" ? "var(--c-info-bg)" : selectedTicket.status === "In Progress" ? "var(--c-warning-bg)" : "var(--c-success-bg)",
                            color: selectedTicket.status === "Open" ? "var(--c-info-text)" : selectedTicket.status === "In Progress" ? "var(--c-warning-text)" : "var(--c-success-text)"
                          }}>
                            {selectedTicket.status}
                          </span>
                        </div>
                      </div>

                      {/* Original Ticket Description */}
                      <div className="flex flex-col items-start gap-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-[var(--page-text)]">You</span>
                          <span className="text-[10px] text-[var(--page-text-muted)]">
                            {new Date(selectedTicket.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                          </span>
                        </div>
                        <div className="rounded-2xl rounded-tl-none p-3.5 max-w-[85%] text-sm" style={{ background: "var(--page-surface-2)", color: "var(--page-text)", border: "1px solid var(--page-border)", lineHeight: 1.5 }}>
                          {selectedTicket.message}
                        </div>
                      </div>

                      {/* Follow-up Replies */}
                      {selectedTicket.replies?.map((r) => {
                        const isUser = r.sender === "You";
                        return (
                          <div key={r.id} className={`flex flex-col ${isUser ? "items-end" : "items-start"} gap-1`}>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-[var(--page-text)]">{r.sender}</span>
                              <span className="text-[10px] text-[var(--page-text-muted)]">
                                {new Date(r.createdAt).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                              </span>
                            </div>
                            <div
                              className={`rounded-2xl p-3.5 max-w-[85%] text-sm ${isUser ? "rounded-tr-none text-white" : "rounded-tl-none"}`}
                              style={isUser ? { background: RED, boxShadow: "0 4px 10px rgba(233,24,53,0.15)" } : { background: "var(--page-surface-2)", color: "var(--page-text)", border: "1px solid var(--page-border)", lineHeight: 1.5 }}
                            >
                              {r.message}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Chat Input Field */}
                    <div className="p-4 border-t border-[var(--page-border)] bg-[var(--page-card-bg)] flex gap-2 shrink-0">
                      <input
                        type="text"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Type a follow-up message..."
                        className="flex-1 rounded-xl px-3.5 py-2.5 outline-none text-sm"
                        style={{
                          fontFamily: INTER,
                          color: "var(--page-text)",
                          background: "var(--page-input-bg)",
                          border: "1.5px solid var(--page-border)"
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && replyText.trim()) {
                            handlePostReply();
                          }
                        }}
                      />
                      <button
                        onClick={handlePostReply}
                        disabled={!replyText.trim()}
                        className="px-4 py-2.5 rounded-xl font-bold text-sm text-white transition-all shrink-0"
                        style={{
                          background: replyText.trim() ? RED : "rgba(233,24,53,0.4)",
                          cursor: replyText.trim() ? "pointer" : "not-allowed"
                        }}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                ) : activeTab === "new" ? (
                  /* --- New Request Tab --- */
                  <div className="p-5">
                    {sent ? (
                      <div className="flex flex-col items-center gap-4 py-8 text-center">
                        <div className="size-16 rounded-2xl flex items-center justify-center animate-bounce" style={{ background: "rgba(48, 209, 88, 0.1)" }}>
                          <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <polyline points="22 4 12 14.01 9 11.01" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <div>
                          <p style={{ fontFamily: INTER, fontWeight: 700, fontSize: 18, color: "var(--page-text)" }}>Message Sent!</p>
                          <p style={{ fontFamily: INTER, fontSize: 14, color: "var(--page-text-muted)", lineHeight: "22px", marginTop: 6 }}>
                            Your support request has been submitted. Our team will review it and respond to <strong>{email}</strong> within 24 hours.
                          </p>
                        </div>
                        <div className="flex gap-3 mt-2">
                          <button
                            onClick={handleClose}
                            className="px-6 py-2.5 rounded-xl"
                            style={{ background: "transparent", border: "1px solid var(--page-border)", fontFamily: INTER, fontSize: 14, fontWeight: 600, color: "var(--page-text)", cursor: "pointer" }}
                          >
                            Close
                          </button>
                          <button
                            onClick={() => {
                              setSent(false);
                              setActiveTab("history");
                              setSubject("");
                              setMessage("");
                            }}
                            className="px-6 py-2.5 rounded-xl"
                            style={{ background: RED, fontFamily: INTER, fontSize: 14, fontWeight: 600, color: "white", border: "none", cursor: "pointer" }}
                          >
                            View Ticket Log
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-4">
                        {/* Email */}
                        <div className="flex flex-col gap-1.5">
                          <label style={{ fontFamily: INTER, fontSize: 13, fontWeight: 500, color: "var(--page-text)" }}>Your Email</label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            className="w-full rounded-xl px-3.5 py-2.5 outline-none"
                            style={{ fontFamily: INTER, fontSize: 14, color: "var(--page-text)", background: "var(--page-input-bg)", border: "1.5px solid var(--page-border)" }}
                          />
                        </div>

                        {/* Subject */}
                        <div className="flex flex-col gap-1.5">
                          <label style={{ fontFamily: INTER, fontSize: 13, fontWeight: 500, color: "var(--page-text)" }}>Subject</label>
                          <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="e.g. Issue with menu items"
                            className="w-full rounded-xl px-3.5 py-2.5 outline-none"
                            style={{ fontFamily: INTER, fontSize: 14, color: "var(--page-text)", background: "var(--page-input-bg)", border: "1.5px solid var(--page-border)" }}
                          />
                        </div>

                        {/* Priority */}
                        <div className="flex flex-col gap-1.5">
                          <label style={{ fontFamily: INTER, fontSize: 13, fontWeight: 500, color: "var(--page-text)" }}>Priority</label>
                          <div className="flex gap-2">
                            {PRIORITIES.map((p) => (
                              <button
                                key={p}
                                onClick={() => setPriority(p)}
                                className="flex-1 py-2 rounded-xl transition-all"
                                style={{
                                  fontFamily: INTER, fontSize: 12, fontWeight: priority === p ? 700 : 400,
                                  background: priority === p ? `${priorityColor[p]}15` : "var(--page-input-bg)",
                                  border: `1.5px solid ${priority === p ? priorityColor[p] : "var(--page-border)"}`,
                                  color: priority === p ? priorityColor[p] : "var(--page-text-muted)", cursor: "pointer",
                                }}
                              >
                                {p}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Message */}
                        <div className="flex flex-col gap-1.5">
                          <label style={{ fontFamily: INTER, fontSize: 13, fontWeight: 500, color: "var(--page-text)" }}>Message</label>
                          <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Describe your issue in detail..."
                            rows={5}
                            className="w-full rounded-xl px-3.5 py-2.5 outline-none resize-none"
                            style={{ fontFamily: INTER, fontSize: 14, color: "var(--page-text)", background: "var(--page-input-bg)", border: "1.5px solid var(--page-border)", lineHeight: "22px" }}
                          />
                          <p style={{ fontFamily: INTER, fontSize: 11, color: "var(--page-text-muted)", textAlign: "right" }}>{message.length} chars (min 15)</p>
                        </div>

                        <button
                          onClick={handleSend}
                          disabled={!valid || sending}
                          className="w-full py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
                          style={{
                            background: (!valid || sending) ? "rgba(233,24,53,0.4)" : RED,
                            fontFamily: INTER, fontSize: 14, fontWeight: 700, color: "white",
                            border: "none", cursor: (!valid || sending) ? "not-allowed" : "pointer",
                            boxShadow: valid ? "0 4px 14px -2px rgba(233,24,53,0.4)" : "none",
                          }}
                        >
                          {sending
                            ? <><div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                            : "Send Support Request"
                          }
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  /* --- Ticket History Log Tab --- */
                  tickets.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                      <div className="size-16 rounded-2xl flex items-center justify-center mb-4 bg-[var(--page-surface-2)]">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke="var(--page-text-muted)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <p style={{ fontFamily: INTER, fontWeight: 700, fontSize: 16, color: "var(--page-text)" }}>No tickets yet</p>
                      <p style={{ fontFamily: INTER, fontSize: 13, color: "var(--page-text-muted)", marginTop: 4, maxWidth: 280 }}>
                        When you submit support requests, they will show up here along with their status updates.
                      </p>
                      <button
                        onClick={() => setActiveTab("new")}
                        className="mt-5 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
                        style={{ background: RED, border: "none", cursor: "pointer" }}
                      >
                        Submit a request
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3 p-5 overflow-y-auto" style={{ maxHeight: "55vh" }}>
                      {tickets.map((t) => {
                        const date = new Date(t.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
                        return (
                          <div
                            key={t.id}
                            onClick={() => setSelectedTicket(t)}
                            className="p-4 rounded-xl border border-[var(--page-border)] bg-[var(--page-card-bg)] hover:bg-[var(--page-hover-bg)] transition-all cursor-pointer flex flex-col gap-2 relative group"
                            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}
                          >
                            <div className="flex justify-between items-start gap-4">
                              <p className="font-semibold text-sm text-[var(--page-text)] group-hover:text-[#e91835] transition-colors line-clamp-1">{t.subject}</p>
                              <div className="flex gap-1.5 shrink-0">
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{
                                  background: t.priority === "Low" ? "var(--c-success-bg)" : t.priority === "Medium" ? "var(--c-warning-bg)" : "var(--c-danger-bg)",
                                  color: t.priority === "Low" ? "var(--c-success-text)" : t.priority === "Medium" ? "var(--c-warning-text)" : "var(--c-danger-text)"
                                }}>
                                  {t.priority}
                                </span>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{
                                  background: t.status === "Open" ? "var(--c-info-bg)" : t.status === "In Progress" ? "var(--c-warning-bg)" : "var(--c-success-bg)",
                                  color: t.status === "Open" ? "var(--c-info-text)" : t.status === "In Progress" ? "var(--c-warning-text)" : "var(--c-success-text)"
                                }}>
                                  {t.status}
                                </span>
                              </div>
                            </div>
                            <p className="text-xs text-[var(--page-text-muted)] line-clamp-2 leading-relaxed">{t.message}</p>
                            <div className="flex justify-between items-center mt-1 text-[10px] text-[var(--page-text-muted)]">
                              <span>Submitted: {date}</span>
                              {t.replies && t.replies.length > 0 && (
                                <span className="font-semibold text-[#e91835]">{t.replies.length} {t.replies.length === 1 ? "reply" : "replies"}</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
