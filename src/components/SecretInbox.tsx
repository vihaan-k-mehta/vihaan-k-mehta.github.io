import { useEffect, useRef, useState } from "react";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

// Not secret once built (ships in the public bundle like any constant) —
// but no credential lives alongside it. The password is entered at runtime
// and kept only in sessionStorage, never in source.
const API_BASE = "https://gigabyte.tail4e5b53.ts.net";
const API_USER = "cheeku";
const SESSION_KEY = "sx_k";

type Chat = {
  id: string;
  title: string;
  imgURL: string | null;
  lastActivity: string | null;
  unreadCount: number;
};

type Message = {
  id: string;
  text: string;
  senderName: string | null;
  isSender: boolean;
  timestamp: string | null;
};

function authHeader(pw: string) {
  return "Basic " + btoa(`${API_USER}:${pw}`);
}

async function api(pw: string, path: string, opts: RequestInit = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...opts,
    headers: {
      Authorization: authHeader(pw),
      ...(opts.body ? { "Content-Type": "application/json" } : {}),
      ...opts.headers,
    },
  });
  if (res.status === 401) throw new Error("unauthorized");
  if (!res.ok) throw new Error(`request failed (${res.status})`);
  return res.json();
}

function timeAgo(iso: string | null) {
  if (!iso) return "";
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  return `${Math.floor(hours / 24)}d`;
}

export function SecretInbox() {
  const [open, setOpen] = useState(false);
  const [pw, setPw] = useState<string | null>(null);
  const [pwInput, setPwInput] = useState("");
  const [authError, setAuthError] = useState(false);

  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatID, setActiveChatID] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Konami listener
  useEffect(() => {
    let progress = 0;
    function onKeyDown(e: KeyboardEvent) {
      const expected = KONAMI[progress];
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === expected) {
        progress += 1;
        if (progress === KONAMI.length) {
          progress = 0;
          setOpen(true);
        }
      } else {
        progress = key === KONAMI[0] ? 1 : 0;
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Load any credential already entered this browser session
  useEffect(() => {
    const saved = sessionStorage.getItem(SESSION_KEY);
    if (saved) setPw(saved);
  }, []);

  // Esc to close
  useEffect(() => {
    if (!open) return;
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open]);

  // Poll chat list while open + authed
  useEffect(() => {
    if (!open || !pw) return;
    let cancelled = false;
    async function tick() {
      try {
        const data = await api(pw!, "/api/chats");
        if (!cancelled) setChats(data.chats || []);
      } catch (err) {
        if (!cancelled && (err as Error).message === "unauthorized") {
          sessionStorage.removeItem(SESSION_KEY);
          setPw(null);
        }
      }
    }
    tick();
    const id = setInterval(tick, 8000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [open, pw]);

  // Poll messages for the active chat
  useEffect(() => {
    if (!open || !pw || !activeChatID) return;
    let cancelled = false;
    async function tick() {
      try {
        const data = await api(pw!, `/api/chats/${encodeURIComponent(activeChatID!)}/messages`);
        if (!cancelled) setMessages(data.messages || []);
      } catch {
        // transient network hiccup — next poll will retry
      }
    }
    tick();
    const id = setInterval(tick, 3000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [open, pw, activeChatID]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ block: "end" });
  }, [messages]);

  async function submitPassword(e: React.FormEvent) {
    e.preventDefault();
    setAuthError(false);
    try {
      await api(pwInput, "/api/chats");
      sessionStorage.setItem(SESSION_KEY, pwInput);
      setPw(pwInput);
      setPwInput("");
    } catch {
      setAuthError(true);
    }
  }

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!pw || !activeChatID || !draft.trim()) return;
    const text = draft;
    setDraft("");
    try {
      await api(pw, `/api/chats/${encodeURIComponent(activeChatID)}/messages`, {
        method: "POST",
        body: JSON.stringify({ text }),
      });
      const data = await api(pw, `/api/chats/${encodeURIComponent(activeChatID)}/messages`);
      setMessages(data.messages || []);
    } catch {
      setDraft(text);
    }
  }

  if (!open) return null;

  const activeChat = chats.find((c) => c.id === activeChatID) || null;

  return (
    <div className="fixed inset-0 z-[999] bg-background/98 backdrop-blur-sm flex flex-col text-foreground">
      <div className="flex items-center justify-end p-3 border-b border-border">
        <button
          onClick={() => setOpen(false)}
          className="text-sm text-muted-foreground hover:text-foreground px-3 py-1 rounded-md border border-border"
        >
          Close (Esc)
        </button>
      </div>

      {!pw ? (
        <div className="flex-1 flex items-center justify-center">
          <form onSubmit={submitPassword} className="flex flex-col gap-2 w-64">
            <input
              autoFocus
              type="password"
              value={pwInput}
              onChange={(e) => setPwInput(e.target.value)}
              className="bg-secondary border border-border rounded-md px-3 py-2 text-sm outline-none focus:border-primary"
              placeholder=""
            />
            <button
              type="submit"
              className="bg-primary text-primary-foreground rounded-md px-3 py-2 text-sm font-medium"
            >
              Continue
            </button>
            {authError && (
              <div className="text-xs text-red-500">Incorrect.</div>
            )}
          </form>
        </div>
      ) : (
        <div className="flex-1 flex min-h-0">
          <aside className="w-64 min-w-[200px] border-r border-border overflow-y-auto">
            {chats.length === 0 && (
              <div className="text-xs text-muted-foreground p-4">Nothing yet.</div>
            )}
            {chats.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveChatID(c.id)}
                className={`w-full text-left flex items-center gap-2 px-3 py-2 border-b border-border hover:bg-secondary/60 ${
                  c.id === activeChatID ? "bg-secondary" : ""
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-muted flex-shrink-0 overflow-hidden">
                  {c.imgURL && (
                    <img src={c.imgURL} alt="" className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium truncate">{c.title || "?"}</div>
                  <div className="text-xs text-muted-foreground">{timeAgo(c.lastActivity)}</div>
                </div>
                {c.unreadCount > 0 && (
                  <div className="text-[10px] bg-primary text-primary-foreground rounded-full px-1.5 py-0.5">
                    {c.unreadCount}
                  </div>
                )}
              </button>
            ))}
          </aside>

          <div className="flex-1 flex flex-col min-w-0">
            <div className="px-4 py-2 border-b border-border text-sm font-medium">
              {activeChat?.title || ""}
            </div>
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.isSender ? "justify-end" : "justify-start"}`}>
                  <div className="max-w-[70%] min-w-0">
                    {!m.isSender && m.senderName && (
                      <div className="text-[11px] text-muted-foreground mb-0.5">{m.senderName}</div>
                    )}
                    <div
                      className={`px-3 py-2 rounded-2xl text-sm whitespace-pre-wrap break-words ${
                        m.isSender
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-secondary text-foreground rounded-bl-sm"
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            {activeChatID && (
              <form onSubmit={sendMessage} className="flex gap-2 p-3 border-t border-border">
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  className="flex-1 bg-secondary border border-border rounded-full px-3 py-2 text-sm outline-none focus:border-primary"
                  placeholder="Message..."
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground rounded-full px-4 py-2 text-sm font-medium"
                >
                  Send
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
