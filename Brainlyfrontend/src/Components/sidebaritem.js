import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
// This component is now robust and handles both cases (with or without icon).
export const SidebarItem = ({ icon, text, active, onClick }) => {
    return (_jsxs(motion.li
    // The left padding is adjusted if no icon is present, ensuring text alignment.
    , { 
        // The left padding is adjusted if no icon is present, ensuring text alignment.
        className: `flex items-center p-2 rounded-lg cursor-pointer transition-colors duration-200 ${active
            ? "bg-primary/10 text-primary font-semibold"
            : "text-text-secondary hover:bg-secondary-dark"} ${!icon ? 'pl-4' : ''}`, onClick: onClick, whileTap: { scale: 0.95 }, children: [icon && _jsx("span", { className: "mr-3", children: icon }), _jsx("span", { children: text })] }));
};
