"use client";

import { cn } from "@/lib/utils";
import { forwardRef, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group",
          {
            "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/25 active:scale-[0.97]": variant === "primary",
            "bg-slate-900 text-white hover:bg-slate-700 active:scale-[0.97]": variant === "secondary",
            "border-2 border-blue-600 text-blue-600 bg-transparent hover:bg-blue-600 hover:text-white active:scale-[0.97]": variant === "outline",
            "text-blue-600 hover:bg-blue-50": variant === "ghost",
          },
          {
            "px-5 py-2 text-sm rounded-xl": size === "sm",
            "px-7 py-3.5 text-base rounded-2xl": size === "md",
            "px-10 py-5 text-lg rounded-2xl": size === "lg",
          },
          className
        )}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </button>
    );
  }
);
Button.displayName = "Button";

export default Button;
