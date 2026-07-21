"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase/client";
import type { Profile, Room } from "@/lib/supabase/types";

type RoomWithClient = Room & { client: Pick<Profile, "email" | "full_name" | "company"> | null };

export function RoomSelector({
  selectedRoomId,
  onSelect,
  label,
}: {
  selectedRoomId: string | null;
  onSelect: (roomId: string) => void;
  label: string;
}) {
  const supabase = getSupabaseClient();
  const [rooms, setRooms] = useState<RoomWithClient[]>([]);

  useEffect(() => {
    if (!supabase) return;

    async function load() {
      if (!supabase) return;
      const { data: roomRows } = await supabase
        .from("rooms")
        .select("*")
        .order("created_at", { ascending: false });
      if (!roomRows) return;

      const clientIds = Array.from(new Set(roomRows.map((r) => r.client_id)));
      const { data: profileRows } = await supabase
        .from("profiles")
        .select("id, email, full_name, company")
        .in("id", clientIds);

      const profileMap = new Map((profileRows ?? []).map((p) => [p.id, p]));
      const merged = roomRows.map((r) => ({ ...r, client: profileMap.get(r.client_id) ?? null }));
      setRooms(merged);

      if (!selectedRoomId && merged.length > 0) onSelect(merged[0].id);
    }

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);

  if (rooms.length === 0) return null;

  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </span>
      <select
        value={selectedRoomId ?? ""}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full max-w-sm rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-navy-950 outline-none focus:border-green-500"
      >
        {rooms.map((room) => (
          <option key={room.id} value={room.id}>
            {room.client?.full_name || room.client?.company || room.client?.email || room.id}
          </option>
        ))}
      </select>
    </label>
  );
}
