import {
  Sparkles,
  Factory,
  Cpu,
  BarChart3,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  factory: Factory,
  cpu: Cpu,
  "bar-chart": BarChart3,
  target: Target,
  users: Users,
};

export function CategoryIcon({ icon, className }: { icon: string; className?: string }) {
  const Icon = iconMap[icon] ?? Sparkles;
  return <Icon className={className} />;
}
