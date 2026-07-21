"use client";

import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { getSupabaseClient } from "@/lib/supabase/client";
import type { Message } from "@/lib/supabase/types";
import type { Dictionary } from "@/lib/i18n/types";

export function MessagesPanel({
  roomId,
  userId,
  t,
}: {
  roomId: string;
  userId: string;
  t: Dictionary["portal"]["room"];
}) {
  const supabase = getSupabaseClient();
  const [messages, setMessages] = useState<Message[]>([]);
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!supabase) return;
    let active = true;

    supabase
      .from("messages")
      .select("*")
      .eq("room_id", roomId)
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (active && data) setMessages(data);
      });

    const channel = supabase
      .channel(`messages-${roomId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `room_id=eq.${roomId}` },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, [supabase, roomId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase || !body.trim()) return;
    setSending(true);
    const { error } = await supabase
      .from("messages")
      .insert({ room_id: roomId, sender_id: userId, body: body.trim() });
    setSending(false);
    if (!error) setBody("");
  }

  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="font-display text-lg font-bold text-navy-950">{t.messagesTitle}</h2>

      <div className="mt-4 flex-1 space-y-3 overflow-y-auto" style={{ maxHeight: 360, minHeight: 200 }}>
        {messages.length === 0 && <p className="text-sm text-slate-400">{t.noMessages}</p>}
        {messages.map((m) => {
          const isMine = m.sender_id === userId;
          return (
            <div key={m.id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                  isMine ? "bg-navy-950 text-white" : "bg-slate-100 text-navy-900"
                }`}
              >
                {m.body}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className="mt-4 flex items-center gap-2">
        <input
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={t.messagePlaceholder}
          className="flex-1 rounded-full border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-green-500"
        />
        <button
          type="submit"
          disabled={sending || !body.trim()}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-navy-950 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-600 disabled:opacity-50"
        >
          {t.send}
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
