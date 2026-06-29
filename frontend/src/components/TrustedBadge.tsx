"use client";

import { cn } from "@/lib/utils";
import { ShieldCheck, Star, Award } from "lucide-react";

interface TrustedBadgeProps {
  rating: number;
  variant?: "ribbon" | "badge" | "inline";
  size?: "sm" | "md";
}

export default function TrustedBadge({ rating, variant = "badge", size = "sm" }: TrustedBadgeProps) {
  if (variant === "ribbon" && rating >= 4.5) {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-1 bg-gradient-to-r from-gold to-gold-600 text-white font-bold shadow-lg shadow-gold/30",
          size === "sm" ? "px-2.5 py-1 text-[10px] rounded-r-full" : "px-3 py-1.5 text-xs rounded-r-full"
        )}
      >
        <Star className={size === "sm" ? "w-2.5 h-2.5" : "w-3 h-3"} fill="white" />
        Trusted
      </div>
    );
  }

  if (variant === "badge" && rating >= 4.5) {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-1.5 rounded-lg font-semibold",
          size === "sm" ? "px-2 py-1 text-[10px]" : "px-3 py-1.5 text-xs",
          rating >= 4.8
            ? "bg-green-100 text-green-700"
            : "bg-gold/10 text-gold-600"
        )}
      >
        <Award className={size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5"} />
        Top Rated
      </div>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg font-semibold",
        size === "sm" ? "px-2 py-1 text-[10px]" : "px-3 py-1.5 text-xs",
        rating >= 4.5 ? "bg-green-100 text-green-700" : rating >= 4.0 ? "bg-gold/10 text-gold-600" : "bg-gray-100 text-gray-500"
      )}
    >
      <ShieldCheck className={size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5"} />
      Verified
    </div>
  );
}
