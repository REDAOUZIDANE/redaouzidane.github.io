"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Download, FileText, Upload } from "lucide-react";
import { getSupabaseClient } from "@/lib/supabase/client";
import type { FileRecord } from "@/lib/supabase/types";
import type { Dictionary } from "@/lib/i18n/types";

const BUCKET = "deliverables";

function formatSize(bytes: number | null) {
  if (!bytes) return "";
  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }
  return `${value.toFixed(value < 10 && unitIndex > 0 ? 1 : 0)} ${units[unitIndex]}`;
}

export function FilesPanel({
  roomId,
  userId,
  t,
}: {
  roomId: string;
  userId: string;
  t: Dictionary["portal"]["room"];
}) {
  const supabase = getSupabaseClient();
  const [files, setFiles] = useState<FileRecord[]>([]);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const loadFiles = useCallback(async () => {
    if (!supabase) return;
    const { data } = await supabase
      .from("files")
      .select("*")
      .eq("room_id", roomId)
      .order("created_at", { ascending: false });
    if (data) setFiles(data);
  }, [supabase, roomId]);

  useEffect(() => {
    // setFiles happens after the await inside loadFiles, not synchronously here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadFiles();
  }, [loadFiles]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !supabase) return;
    setUploading(true);

    const path = `${roomId}/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, file);

    if (!uploadError) {
      await supabase.from("files").insert({
        room_id: roomId,
        storage_path: path,
        file_name: file.name,
        size_bytes: file.size,
        uploaded_by: userId,
      });
      await loadFiles();
    }

    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function handleDownload(file: FileRecord) {
    if (!supabase) return;
    const { data } = await supabase.storage
      .from(BUCKET)
      .createSignedUrl(file.storage_path, 60);
    if (data?.signedUrl) window.open(data.signedUrl, "_blank");
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-navy-950">{t.filesTitle}</h2>
        <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-slate-200 px-3.5 py-2 text-xs font-semibold text-navy-900 transition-colors hover:border-navy-950">
          <Upload className="h-3.5 w-3.5" />
          {uploading ? t.uploading : t.uploadLabel}
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      </div>

      <ul className="mt-4 space-y-2">
        {files.length === 0 && <p className="text-sm text-slate-400">{t.noFiles}</p>}
        {files.map((file) => (
          <li
            key={file.id}
            className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3"
          >
            <div className="flex min-w-0 items-center gap-2.5">
              <FileText className="h-4 w-4 shrink-0 text-green-600" />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-navy-900">{file.file_name}</p>
                <p className="text-xs text-slate-400">{formatSize(file.size_bytes)}</p>
              </div>
            </div>
            <button
              onClick={() => handleDownload(file)}
              className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-green-600 hover:text-green-700"
            >
              <Download className="h-3.5 w-3.5" />
              {t.download}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
