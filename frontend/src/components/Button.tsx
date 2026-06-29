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
          "inline-flex items-center justify-center font-semibold transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group",
          {
            "bg-gradient-to-r from-gold to-gold-600 text-white hover:shadow-lg hover:shadow-gold/30 active:scale-[0.97]": variant === "primary",
            "bg-primary text-white hover:bg-primary-light hover:shadow-lg active:scale-[0.97] border border-gold/20": variant === "secondary",
            "border-2 border-gold text-gold bg-gold/10 hover:bg-gold hover:text-white hover:shadow-lg hover:shadow-gold/30 active:scale-[0.97]": variant === "outline",
            "text-gold hover:bg-gold/10": variant === "ghost",
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
        {variant === "primary" && (
          <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        )}
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </button>
    );
  }
);
Button.displayName = "Button";

export default Button;
