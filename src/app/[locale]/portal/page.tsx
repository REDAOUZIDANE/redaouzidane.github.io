"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { isLocale, defaultLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { useAuth } from "@/lib/supabase/AuthProvider";
import { getSupabaseClient } from "@/lib/supabase/client";
import { MessagesPanel } from "@/components/portal/MessagesPanel";
import { FilesPanel } from "@/components/portal/FilesPanel";
import { RoomSelector } from "@/components/portal/RoomSelector";

export default function PortalRoomPage() {
  const params = useParams<{ locale: string }>();
  const router = useRouter();
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const dict = getDictionary(locale);
  const t = dict.portal.room;

  const { ready, session, profile } = useAuth();
  const supabase = getSupabaseClient();
  const [ownRoomId, setOwnRoomId] = useState<string | null>(null);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  useEffect(() => {
    if (ready && !session) router.replace(`/${locale}/portal/login/`);
  }, [ready, session, router, locale]);

  useEffect(() => {
    if (!supabase || !profile || profile.is_admin) return;
    supabase
      .from("rooms")
      .select("id")
      .eq("client_id", profile.id)
      .single()
      .then(({ data }) => {
        if (data) setOwnRoomId(data.id);
      });
  }, [supabase, profile]);

  if (!ready || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-slate-500">{t.loadingSession}</p>
      </div>
    );
  }

  const activeRoomId = profile?.is_admin ? selectedRoomId : ownRoomId;

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-navy-950">{t.title}</h1>
          <p className="mt-1 text-sm text-slate-500">
            {t.welcomeBack} {profile?.full_name || profile?.email || session.user.email}
          </p>
        </div>
        <SignOutButton locale={locale} label={t.signOut} />
      </div>

      {profile?.is_admin && (
        <div className="mt-6">
          <RoomSelector
            selectedRoomId={selectedRoomId}
            onSelect={setSelectedRoomId}
            label={t.adminRoomLabel}
          />
        </div>
      )}

      {!activeRoomId ? (
        <p className="mt-10 text-sm text-slate-500">{t.loadingRoom}</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr]">
          <MessagesPanel roomId={activeRoomId} userId={session.user.id} t={t} />
          <FilesPanel roomId={activeRoomId} userId={session.user.id} t={t} />
        </div>
      )}
    </div>
  );
}

function SignOutButton({ locale, label }: { locale: Locale; label: string }) {
  const { signOut } = useAuth();
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        await signOut();
        router.replace(`/${locale}/`);
      }}
      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-navy-900 transition-colors hover:border-navy-950"
    >
      <LogOut className="h-4 w-4" />
      {label}
    </button>
  );
}
