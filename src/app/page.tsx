"use client";

import { useEffect } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function RootRedirect() {
  useEffect(() => {
    const preferred = navigator.language?.toLowerCase().startsWith("fr") ? "fr" : "en";
    window.location.replace(`${basePath}/${preferred}/`);
  }, []);

  return (
    <div className="flex min-h-screen flex-1 items-center justify-center bg-white">
      <p className="text-sm text-slate-500">
        Redirecting… /{" "}
        <a className="underline" href={`${basePath}/en/`}>
          English
        </a>{" "}
        —{" "}
        <a className="underline" href={`${basePath}/fr/`}>
          Français
        </a>
      </p>
    </div>
  );
}
