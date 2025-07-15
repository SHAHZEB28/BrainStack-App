import { motion, Variants } from "framer-motion";
import * as React from "react";

// The 'icon' prop is optional to allow for tag items without an icon.
interface SidebarItemProps {
  icon?: React.ReactNode;
  text: string;
  active?: boolean;
  onClick?: () => void;
}

// This component is now robust and handles both cases (with or without icon).
export const SidebarItem = ({ icon, text, active, onClick }: SidebarItemProps) => {
  return (
    <motion.li
      // The left padding is adjusted if no icon is present, ensuring text alignment.
      className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors duration-200 ${
        active
          ? "bg-primary/10 text-primary font-semibold"
          : "text-text-secondary hover:bg-secondary-dark"
      } ${!icon ? 'pl-4' : ''}`}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
    >
      {/* The icon is conditionally rendered only if it exists. */}
      {icon && <span className="mr-3">{icon}</span>}
      <span>{text}</span>
    </motion.li>
  );
};
