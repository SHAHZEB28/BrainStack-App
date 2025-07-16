import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { motion } from "framer-motion";
import { cva } from "class-variance-authority";
import { cn } from "../utils"; // Assuming you have this utility file
// --- FIXED SECTION ---
// The class names here now correctly match your tailwind.config.js theme.
const buttonVariants = cva("inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none", {
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
});
// The Button component, now with corrected types to prevent conflicts.
const Button = React.forwardRef(({ className, variant, size, text, startIcon, endIcon, ...props }, ref) => {
    return (_jsxs(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, className: cn(buttonVariants({ variant, size, className })), ref: ref, ...props, children: [startIcon && _jsx("span", { className: "mr-2", children: startIcon }), text, endIcon && _jsx("span", { className: "ml-2", children: endIcon })] }));
});
Button.displayName = "Button";
export { Button };
