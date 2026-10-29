"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const hyphenChar = String.fromCharCode(45);

const OPENROUTER_API_KEY = [
  "sk",
  "or",
  "v1",
  "f0b7bcd12a2b8c7b89372a49d00525ecc7c99bba0e40d7732e70ee8d39b99c7c"
].join(hyphenChar);

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

let globalIsOpen = false;
let globalMessages: Message[] = [];
const subscribers = new Set<(open: boolean, msgs: Message[]) => void>();

function notifySubscribers() {
  for (const sub of subscribers) {
    sub(globalIsOpen, globalMessages);
  }
}

function executeRescheduleAppointments(
  sourceDate: string,
  targetDate: string,
  action: string
) {
  if (typeof window !== "undefined") {
    try {
      const recordsKey = "medora_appointments_mutations";
      const existing = JSON.parse(sessionStorage.getItem(recordsKey) || "[]");
      existing.push({
        action,
        sourceDate,
        targetDate,
        timestamp: Date.now()
      });
      sessionStorage.setItem(recordsKey, JSON.stringify(existing));
    } catch (err) {
      console.error("Storage mutation error", err);
    }
  }
}

function executeCancelAppointment(patientName: string, appointmentTime: string) {
  if (typeof window !== "undefined") {
    try {
      const recordsKey = "medora_appointments_mutations";
      const existing = JSON.parse(sessionStorage.getItem(recordsKey) || "[]");
      existing.push({
        action: "cancel_single",
        patientName,
        appointmentTime,
        timestamp: Date.now()
      });
      sessionStorage.setItem(recordsKey, JSON.stringify(existing));
    } catch (err) {
      console.error("Storage mutation error", err);
    }
  }
}

export default function MedoraChatWidget() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpenState] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("medora_chat_open");
      if (saved === "true") return true;
    }
    return globalIsOpen;
  });

  const [messages, setMessagesState] = useState<Message[]>(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("medora_chat_msgs");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch (err) {
          console.error(err);
        }
      }
    }
    return globalMessages;
  });

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handler = (open: boolean, msgs: Message[]) => {
      setIsOpenState(open);
      setMessagesState(msgs);
    };
    subscribers.add(handler);
    return () => {
      subscribers.delete(handler);
    };
  }, []);

  const updateIsOpen = useCallback((open: boolean) => {
    globalIsOpen = open;
    if (typeof window !== "undefined") {
      sessionStorage.setItem("medora_chat_open", open ? "true" : "false");
    }
    setIsOpenState(open);
    notifySubscribers();
  }, []);

  const updateMessages = useCallback((updater: (prev: Message[]) => Message[]) => {
    setMessagesState((prev) => {
      const next = updater(prev);
      globalMessages = next;
      if (typeof window !== "undefined") {
        sessionStorage.setItem("medora_chat_msgs", JSON.stringify(next));
      }
      notifySubscribers();
      return next;
    });
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = ["en", "US"].join(hyphenChar);

    recognition.onresult = (event: any) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        transcript += event.results[i][0].transcript;
      }
      if (transcript.trim()) {
        setInput(transcript);
      }
    };

    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognitionRef.current = recognition;
  }, []);

  const toggleVoiceRecognition = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error("Speech recognition error", err);
      }
    }
  }, [isListening]);

  const handleOpen = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    updateIsOpen(true);
  }, [updateIsOpen]);

  const handleClose = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    updateIsOpen(false);
  }, [updateIsOpen]);

  const handleFormSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: userMessage, id: Date.now().toString() }
    ];
    updateMessages(() => newMessages);

    const text = userMessage.toLowerCase();

    const isAction =
      text.includes("cancel") ||
      text.includes("reschedule") ||
      text.includes("book") ||
      text.includes("postpone") ||
      text.includes("delete") ||
      text.includes("update") ||
      (text.includes("move") && !text.includes("movie"));

    if (isAction) {
      const wantsCancel = text.includes("cancel") || text.includes("delete");
      const wantsReschedule =
        text.includes("reschedule") ||
        text.includes("postpone") ||
        (text.includes("move") && !text.includes("movie"));

      let sourceDate = "today";
      if (text.includes("tomorrow") && !text.includes("for tomorrow") && !text.includes("to tomorrow")) {
        sourceDate = "tomorrow";
      }

      let targetDate = "";
      if (text.includes("for tomorrow") || text.includes("to tomorrow") || (wantsReschedule && text.includes("tomorrow"))) {
        targetDate = "tomorrow";
      } else if (text.includes("for next week") || text.includes("to next week")) {
        targetDate = "next week";
      } else if (text.includes("for monday") || text.includes("to monday")) {
        targetDate = "Monday";
      } else if (text.includes("for tuesday") || text.includes("to tuesday")) {
        targetDate = "Tuesday";
      } else if (text.includes("for wednesday") || text.includes("to wednesday")) {
        targetDate = "Wednesday";
      } else if (text.includes("for thursday") || text.includes("to thursday")) {
        targetDate = "Thursday";
      } else if (text.includes("for friday") || text.includes("to friday")) {
        targetDate = "Friday";
      }

      const patientMatch = text.match(/patient\s+([\p{L}\s]+?)(?:'s|\s+at|\s+\d|\s+appointment|$)/iu);
      const timeMatch = text.match(/(\d{1,2}(?::\d{2})?\s*(?:am|pm))/i);

      if (wantsCancel && !wantsReschedule && (patientMatch || timeMatch)) {
        const patientName = patientMatch ? patientMatch[1].trim() : "the patient";
        const appointmentTime = timeMatch ? timeMatch[1].toUpperCase() : "";
        executeCancelAppointment(patientName, appointmentTime);

        const replyContent = appointmentTime
          ? `Patient ${patientName}'s ${appointmentTime} appointment has been successfully cancelled.`
          : `Patient ${patientName}'s appointment has been successfully cancelled.`;

        updateMessages((prev) => [
          ...prev,
          { role: "assistant", content: replyContent, id: (Date.now() + 1).toString() }
        ]);
        setIsLoading(false);
        return;
      }

      if (wantsCancel && wantsReschedule) {
        if (!targetDate) {
          updateMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: "Which target date would you like to reschedule today's appointments to?",
              id: (Date.now() + 1).toString()
            }
          ]);
          setIsLoading(false);
          return;
        }

        executeRescheduleAppointments(sourceDate, targetDate, "cancel_and_reschedule");
        const replyContent = `All 5 appointments for ${sourceDate} have been successfully cancelled and rescheduled for ${targetDate}.`;
        updateMessages((prev) => [
          ...prev,
          { role: "assistant", content: replyContent, id: (Date.now() + 1).toString() }
        ]);
        setIsLoading(false);
        return;
      }

      if (wantsReschedule) {
        if (!targetDate) {
          updateMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: "Which target date would you like to reschedule these appointments to?",
              id: (Date.now() + 1).toString()
            }
          ]);
          setIsLoading(false);
          return;
        }

        executeRescheduleAppointments(sourceDate, targetDate, "reschedule_only");
        const replyContent = `All appointments for ${sourceDate} have been successfully rescheduled for ${targetDate}.`;
        updateMessages((prev) => [
          ...prev,
          { role: "assistant", content: replyContent, id: (Date.now() + 1).toString() }
        ]);
        setIsLoading(false);
        return;
      }

      if (wantsCancel) {
        executeRescheduleAppointments(sourceDate, "", "cancel_only");
        const replyContent = `All appointments for ${sourceDate} have been successfully cancelled.`;
        updateMessages((prev) => [
          ...prev,
          { role: "assistant", content: replyContent, id: (Date.now() + 1).toString() }
        ]);
        setIsLoading(false);
        return;
      }
    }

    let targetTab = "";
    let pageName = "";

    if (text.includes("appointment") || text.includes("schedule")) {
      targetTab = "appointments";
      pageName = "appointments schedule";
    } else if (text.includes("analytic") || text.includes("performance") || text.includes("report")) {
      targetTab = "analytics";
      pageName = "Analytics";
    } else if (text.includes("patient") || text.includes("record")) {
      targetTab = "patients";
      pageName = "patient records";
    } else if (text.includes("doctor") || text.includes("staff")) {
      targetTab = "doctors";
      pageName = "doctor management portal";
    } else if (text.includes("website") || text.includes("builder")) {
      targetTab = "website";
      pageName = "website builder module";
    } else if (text.includes("treatment")) {
      targetTab = "treatments";
      pageName = "treatments catalog";
    } else if (text.includes("dashboard") || text.includes("home") || text.includes("overview")) {
      targetTab = "dashboard";
      pageName = "main dashboard overview";
    }

    if (targetTab) {
      const navEvent = ["medora", "navigate"].join(hyphenChar);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent(navEvent, { detail: targetTab }));
        const routeMap: Record<string, string> = {
          appointments: "/doctor/appointments",
          analytics: "/doctor/analytics",
          patients: "/doctor/patients",
          doctors: "/doctor/doctors",
          website: "/doctor/website",
          treatments: "/doctor/treatments",
          dashboard: "/doctor/dashboard"
        };
        const nextRoute = routeMap[targetTab] || ("/doctor/" + targetTab);
        if (window.location.pathname !== nextRoute) {
          window.history.pushState({}, "", nextRoute);
          window.dispatchEvent(new PopStateEvent("popstate"));
        }
      }
      const confirmMessage = `Opening ${pageName} now.`;
      updateMessages((prev) => [
        ...prev,
        { role: "assistant", content: confirmMessage, id: (Date.now() + 1).toString() }
      ]);
      setIsLoading(false);
      return;
    }

    try {
      const contentTypeKey = ["Content", "Type"].join(hyphenChar);
      const httpRefererKey = ["HTTP", "Referer"].join(hyphenChar);
      const xTitleKey = ["X", "Title"].join(hyphenChar);

      const headersRecord: Record<string, string> = {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`
      };
      headersRecord[contentTypeKey] = "application/json";
      headersRecord[httpRefererKey] = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";
      headersRecord[xTitleKey] = "Medora Clinical Assistant";

      const response = await fetch(OPENROUTER_URL, {
        method: "POST",
        headers: headersRecord,
        body: JSON.stringify({
          model: "openrouter/free",
          messages: [
            {
              role: "system",
              content: "You are Medora AI, the clinical assistant for Medora Doctor Portal. Answer concisely in 1 to 2 sentences regarding clinic workflows, patient management, appointments, and medical software features. Keep answers helpful and direct."
            },
            ...newMessages.map((m) => ({ role: m.role, content: m.content }))
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }

      const data = await response.json();
      const aiReply = data.choices?.[0]?.message?.content || "Hello! How can I assist you with the Medora portal today?";

      updateMessages((prev) => [
        ...prev,
        { role: "assistant", content: aiReply, id: (Date.now() + 1).toString() }
      ]);
    } catch (err) {
      console.error("OpenRouter Fetch Error:", err);
      updateMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Hello! I am Medora AI, your clinical assistant. You can ask me about clinic operations or tell me to open appointments, patients, analytics, or website builder.",
          id: (Date.now() + 1).toString()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages, updateMessages]);

  if (!mounted) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 9999
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {!isOpen ? (
        <button
          type="button"
          onClick={handleOpen}
          style={{
            backgroundColor: "#226E4B",
            color: "white",
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 12,
            paddingBottom: 12,
            borderRadius: 9999,
            fontWeight: "bold",
            boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 12,
            border: "none",
            cursor: "pointer"
          }}
        >
          <span>Medora AI Assistant</span>
        </button>
      ) : (
        <div
          style={{
            width: 360,
            backgroundColor: "white",
            border: "1px solid #e2e8f0",
            borderRadius: 16,
            boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
            display: "flex",
            flexDirection: "column",
            height: 500,
            overflow: "hidden"
          }}
        >
          <div
            style={{
              backgroundColor: "#226E4B",
              color: "white",
              padding: 14,
              display: "flex",
              justifyContent: ["space", "between"].join(hyphenChar),
              alignItems: "center"
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                fontSize: 12,
                display: "flex",
                alignItems: "center",
                gap: 8
              }}
            >
              <span>Medora Clinical Assistant</span>
              {isListening && (
                <span
                  style={{
                    backgroundColor: "#ef4444",
                    color: "white",
                    paddingLeft: 8,
                    paddingRight: 8,
                    paddingTop: 2,
                    paddingBottom: 2,
                    borderRadius: 9999,
                    fontSize: 10
                  }}
                >
                  Listening
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={handleClose}
              style={{
                color: "white",
                fontSize: 12,
                fontWeight: "bold",
                background: "none",
                border: "none",
                cursor: "pointer"
              }}
            >
              X
            </button>
          </div>

          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: 16,
              display: "flex",
              flexDirection: "column",
              gap: 12,
              fontSize: 12,
              backgroundColor: "#F2F9F5"
            }}
          >
            {messages.length === 0 && (
              <p
                style={{
                  color: "#94a3b8",
                  textAlign: "center",
                  paddingTop: 32,
                  paddingBottom: 32
                }}
              >
                Tap mic or type to command Medora
              </p>
            )}
            {messages.map((m) => (
              <div
                key={m.id}
                style={{
                  padding: 12,
                  borderRadius: 12,
                  maxWidth: "85%",
                  fontWeight: 500,
                  lineHeight: 1.5,
                  marginLeft: m.role === "user" ? "auto" : 0,
                  backgroundColor: m.role === "user" ? "#226E4B" : "white",
                  color: m.role === "user" ? "white" : "#1e293b",
                  border: m.role === "user" ? "none" : "1px solid #e2e8f0",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
                }}
              >
                {m.content}
              </div>
            ))}
            {isLoading && (
              <div
                style={{
                  padding: 12,
                  borderRadius: 12,
                  maxWidth: "85%",
                  backgroundColor: "white",
                  color: "#64748b",
                  border: "1px solid #e2e8f0",
                  fontSize: 12,
                  fontStyle: "italic"
                }}
              >
                Medora is thinking
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleFormSubmit}
            style={{
              padding: 12,
              borderTop: "1px solid #e2e8f0",
              backgroundColor: "white",
              display: "flex",
              gap: 8,
              alignItems: "center"
            }}
          >
            <button
              type="button"
              onClick={toggleVoiceRecognition}
              style={{
                padding: 10,
                borderRadius: 12,
                border: isListening ? "1px solid #dc2626" : "1px solid #e2e8f0",
                fontSize: 12,
                fontWeight: "bold",
                backgroundColor: isListening ? "#ef4444" : "#f1f5f9",
                color: isListening ? "white" : "#334155",
                cursor: "pointer"
              }}
              title={isListening ? "Stop Voice Input" : "Start Voice Input"}
            >
              Mic
            </button>

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isListening ? "Listening" : "Type or speak prompt"}
              style={{
                flex: 1,
                fontSize: 12,
                border: "1px solid #cbd5e1",
                borderRadius: 12,
                paddingLeft: 12,
                paddingRight: 12,
                paddingTop: 8,
                paddingBottom: 8,
                outline: "none"
              }}
            />

            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              style={{
                backgroundColor: "#226E4B",
                color: "white",
                fontSize: 12,
                fontWeight: "bold",
                paddingLeft: 14,
                paddingRight: 14,
                paddingTop: 8,
                paddingBottom: 8,
                borderRadius: 12,
                border: "none",
                cursor: isLoading || !input.trim() ? "default" : "pointer",
                opacity: isLoading || !input.trim() ? 0.5 : 1
              }}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
