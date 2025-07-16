import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils"; // Assuming you have this utility file

// --- FIXED SECTION ---
// The class names here now correctly match your tailwind.config.js theme.
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-brand-primary text-white hover:bg-brand-primary/90",
        secondary: "bg-brand-secondary text-brand-primary hover:bg-brand-secondary/80",
      },
      size: {
        sm: "h-9 px-3",
        md: "h-10 px-4 py-2",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

// This defines the props for our component.
// It omits the conflicting event handler types from Framer Motion's props
// and then merges them with standard React button attributes.
type MotionButtonProps = Omit<
  HTMLMotionProps<"button">,
  "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag"
>;

export type ButtonProps = MotionButtonProps &
  VariantProps<typeof buttonVariants> & {
    text: string;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
  };

// The Button component, now with corrected types to prevent conflicts.
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, text, startIcon, endIcon, ...props }, ref) => {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {startIcon && <span className="mr-2">{startIcon}</span>}
        {text}
        {endIcon && <span className="ml-2">{endIcon}</span>}
      </motion.button>
    );
  }
);
Button.displayName = "Button";

export { Button };