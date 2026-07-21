import { AuthProvider } from "@/lib/supabase/AuthProvider";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
