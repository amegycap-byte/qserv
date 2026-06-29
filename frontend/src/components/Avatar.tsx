"use client";

import { cn } from "@/lib/utils";

const avatarColors = [
  "bg-blue-600 text-white",
  "bg-blue-500 text-white",
  "bg-blue-700 text-white",
  "bg-slate-700 text-white",
  "bg-slate-600 text-white",
  "bg-blue-400 text-white",
];

interface AvatarProps {
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  imageUrl?: string | null;
  className?: string;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getColorIndex(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % avatarColors.length;
}

export default function Avatar({ name, size = "md", imageUrl, className }: AvatarProps) {
  const initials = getInitials(name);
  const colorClass = avatarColors[getColorIndex(name)];

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-bold shrink-0",
        colorClass,
        {
          "w-8 h-8 text-xs": size === "sm",
          "w-10 h-10 text-sm": size === "md",
          "w-14 h-14 text-lg": size === "lg",
          "w-20 h-20 text-2xl": size === "xl",
        },
        className
      )}
    >
      {initials}
    </div>
  );
}
