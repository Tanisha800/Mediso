"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  description?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  color?: "teal" | "blue" | "amber" | "rose";
}

const colorMap = {
  teal: {
    bg: "bg-gradient-to-br from-teal-50/50 to-emerald-50/50 dark:from-teal-950/30 dark:to-emerald-950/20",
    icon: "text-teal-600 dark:text-teal-400",
    iconBg: "bg-gradient-to-br from-teal-100 to-teal-50 dark:from-teal-900/50 dark:to-teal-800/30 shadow-sm",
    badge: "text-teal-700 bg-teal-100/80 dark:text-teal-300 dark:bg-teal-900/40",
  },
  blue: {
    bg: "bg-gradient-to-br from-sky-50/50 to-blue-50/50 dark:from-sky-950/30 dark:to-blue-950/20",
    icon: "text-blue-600 dark:text-blue-400",
    iconBg: "bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/50 dark:to-blue-800/30 shadow-sm",
    badge: "text-blue-700 bg-blue-100/80 dark:text-blue-300 dark:bg-blue-900/40",
  },
  amber: {
    bg: "bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-950/30 dark:to-orange-950/20",
    icon: "text-amber-600 dark:text-amber-400",
    iconBg: "bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/50 dark:to-amber-800/30 shadow-sm",
    badge: "text-amber-700 bg-amber-100/80 dark:text-amber-300 dark:bg-amber-900/40",
  },
  rose: {
    bg: "bg-gradient-to-br from-rose-50/50 to-red-50/50 dark:from-rose-950/30 dark:to-red-950/20",
    icon: "text-rose-600 dark:text-rose-400",
    iconBg: "bg-gradient-to-br from-rose-100 to-rose-50 dark:from-rose-900/50 dark:to-rose-800/30 shadow-sm",
    badge: "text-rose-700 bg-rose-100/80 dark:text-rose-300 dark:bg-rose-900/40",
  },
};

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
  color = "teal",
}: StatCardProps) {
  const c = colorMap[color];

  return (
    <div
      className={cn(
        "relative rounded-[20px] border border-white/60 dark:border-slate-700/60 p-5 shadow-sm group",
        "backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-white/90 dark:hover:border-slate-600/80 cursor-default",
        c.bg
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 transition-colors group-hover:text-slate-700 dark:group-hover:text-slate-300">{title}</p>
          <p className="mt-1 text-3xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
            {value}
          </p>
          {description && (
            <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">{description}</p>
          )}
        </div>
        <div className={cn("rounded-xl p-3 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3", c.iconBg)}>
          <Icon className={cn("h-5 w-5", c.icon)} />
        </div>
      </div>
      {trend && trendValue && (
        <div className="mt-3">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
              c.badge
            )}
          >
            {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {trendValue}
          </span>
        </div>
      )}
    </div>
  );
}
