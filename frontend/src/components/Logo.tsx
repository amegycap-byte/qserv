import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
}

export default function Logo({ variant = "dark", size = "md", showWordmark = true }: LogoProps) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className={cn(
          "flex items-center justify-center rounded-xl font-extrabold tracking-tight shrink-0",
          variant === "dark"
            ? "bg-gradient-to-br from-gold to-gold-600 text-white"
            : "bg-white/10 text-gold border border-gold/30",
          {
            "w-8 h-8 text-sm": size === "sm",
            "w-10 h-10 text-lg": size === "md",
            "w-12 h-12 text-xl": size === "lg",
          }
        )}
      >
        <span className="font-black leading-none">Q</span>
      </div>
      {showWordmark && (
        <span
          className={cn(
            "font-bold tracking-tight",
            variant === "dark" ? "text-primary" : "text-white",
            {
              "text-sm": size === "sm",
              "text-xl": size === "md",
              "text-2xl": size === "lg",
            }
          )}
        >
          Q<span className="text-gold">Serv</span>
        </span>
      )}
    </div>
  );
}
