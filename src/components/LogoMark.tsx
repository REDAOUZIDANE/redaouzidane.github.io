type LogoMarkProps = {
  className?: string;
  variant?: "color" | "white";
};

export function LogoMark({ className, variant = "color" }: LogoMarkProps) {
  const navy = variant === "white" ? "#ffffff" : "#0f2138";
  const green = variant === "white" ? "#ffffff" : "#2ea25e";
  const gray = variant === "white" ? "#ffffffb3" : "#8b95a3";

  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="37" cy="24" r="9" stroke={gray} strokeWidth="2" strokeDasharray="2 3.2" />
      <rect x="8" y="10" width="9" height="28" rx="1.5" fill={navy} />
      <path d="M25 38V17.5L32 10V38H25Z" fill={green} />
      <path d="M17 24L25 17.5" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function LogoLockup({ className, variant = "color" }: LogoMarkProps) {
  const isWhite = variant === "white";
  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      <LogoMark variant={variant} className="h-8 w-8 shrink-0" />
      <span className="flex items-baseline gap-1 font-display leading-none tracking-tight">
        <span className={`text-lg font-extrabold ${isWhite ? "text-white" : "text-navy-950"}`}>
          LIMBO
        </span>
        <span className={`text-lg font-medium ${isWhite ? "text-white/80" : "text-slate-600"}`}>
          Consulting
        </span>
      </span>
    </span>
  );
}
