import * as React from "react";
import { cn } from "@/lib/utils";

interface GlassmorphismCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "glow" | "neon";
}

const GlassmorphismCard = React.forwardRef<HTMLDivElement, GlassmorphismCardProps>(
  ({ className, children, variant = "default", ...props }, ref) => {
    const variants = {
      default: "bg-card/10 border-border/20 shadow-glass",
      glow: "bg-card/15 border-primary/30 shadow-neon hover:shadow-neon",
      neon: "bg-card/20 border-primary/50 shadow-neon animate-glow-pulse"
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-xl backdrop-blur-md transition-all duration-300",
          "before:absolute before:inset-0 before:bg-gradient-glass before:opacity-50",
          "after:absolute after:inset-0 after:rounded-xl after:border after:border-white/10",
          variants[variant],
          className
        )}
        {...props}
      >
        {/* Glass shimmer effect */}
        <div className="absolute inset-0 -skew-x-12 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-glass-shimmer" />
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  }
);

GlassmorphismCard.displayName = "GlassmorphismCard";

export { GlassmorphismCard };