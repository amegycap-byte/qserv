"use client";

import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  reviewsCount?: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
}

export default function RatingStars({ rating, reviewsCount, size = "sm", showCount = true }: RatingStarsProps) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.3;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push("full");
    } else if (i === fullStars + 1 && hasHalf) {
      stars.push("half");
    } else {
      stars.push("empty");
    }
  }

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {stars.map((type, i) => (
          <svg
            key={i}
            className={cn(
              { "w-3.5 h-3.5": size === "sm", "w-4 h-4": size === "md", "w-5 h-5": size === "lg" }
            )}
            viewBox="0 0 20 20"
            fill="none"
          >
            {type === "full" && (
              <path
                d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.51.91-5.32L2.27 6.6l5.34-.78L10 1z"
                fill="#2563EB"
                stroke="#2563EB"
                strokeWidth="0.5"
              />
            )}
            {type === "half" && (
              <>
                <path
                  d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.51.91-5.32L2.27 6.6l5.34-.78L10 1z"
                  fill="#2563EB"
                  stroke="#2563EB"
                  strokeWidth="0.5"
                />
                <rect x="10" y="1" width="10" height="18" fill="white" />
              </>
            )}
            {type === "empty" && (
              <path
                d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.51.91-5.32L2.27 6.6l5.34-.78L10 1z"
                fill="none"
                stroke="#2563EB"
                strokeWidth="1"
                opacity="0.25"
              />
            )}
          </svg>
        ))}
      </div>
      <span className={cn("font-semibold text-blue-600", { "text-xs": size === "sm", "text-sm": size === "md", "text-base": size === "lg" })}>
        {rating.toFixed(1)}
      </span>
      {showCount && reviewsCount !== undefined && (
        <span className={cn("text-slate-400", { "text-xs": size === "sm", "text-sm": size === "md" })}>
          ({reviewsCount.toLocaleString()})
        </span>
      )}
    </div>
  );
}
