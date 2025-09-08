import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-dark shadow-ocean hover:shadow-neon",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-ocean",
        outline: "border border-primary/30 bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:bg-card/70 hover:shadow-neon",
        secondary: "bg-secondary/80 text-secondary-foreground hover:bg-secondary border border-secondary-dark/50 shadow-glass",
        ghost: "hover:bg-accent/20 hover:text-accent-foreground backdrop-blur-sm",
        link: "text-primary underline-offset-4 hover:underline neon-text",
        hero: "gradient-ocean text-primary-foreground hover:shadow-neon transform hover:scale-105 border border-primary-light/20 relative before:absolute before:inset-0 before:bg-gradient-glow before:opacity-0 hover:before:opacity-100 before:transition-opacity",
        ocean: "bg-primary text-primary-foreground hover:bg-primary-light shadow-ocean hover:shadow-neon transform hover:-translate-y-1 animate-glow-pulse",
        surface: "gradient-surface text-secondary-dark border border-accent/30 hover:shadow-neon backdrop-blur-sm",
        glass: "glass-button hover:shadow-neon",
        neon: "bg-primary/20 text-primary border border-primary shadow-neon hover:bg-primary/30 hover:shadow-neon backdrop-blur-sm",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp 
        className={cn(buttonVariants({ variant, size, className }))} 
        ref={ref} 
        {...props}
      >
        {props.children}
        {/* Ripple effect on click */}
        <div className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity bg-gradient-to-r from-transparent via-white to-transparent animate-glass-shimmer pointer-events-none" />
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };