import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { motion } from "framer-motion";
import { ShareIcon } from "../Icons/shareicon";
import { DeleteIcon } from "../Icons/deleteicon";
import { CheckIcon } from "../Icons/checkicon";
const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.4,
            ease: "easeOut",
        },
    },
};
export function Card({ icon, title, tags, date, link, children, onDelete }) {
    const [isCopied, setIsCopied] = useState(false);
    const handleShareClick = () => {
        navigator.clipboard.writeText(link);
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 2000);
    };
    return (_jsxs(motion.div, { variants: cardVariants, 
        // The card now uses the new design system for a consistent and professional look.
        className: "p-5 bg-white rounded-xl border border-ui-border shadow-subtle flex flex-col h-full", whileHover: { y: -5, boxShadow: "var(--tw-shadow-lifted)" }, transition: { duration: 0.2 }, children: [_jsxs("div", { className: "flex justify-between items-start mb-4", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "text-text-secondary mr-3", children: icon }), _jsx("h3", { className: "font-semibold text-text-primary", children: title })] }), _jsxs("div", { className: "flex items-center space-x-3 text-text-secondary", children: [_jsx("button", { onClick: handleShareClick, className: "hover:text-brand-primary transition-colors", children: isCopied ? _jsx(CheckIcon, { className: "text-green-500" }) : _jsx(ShareIcon, { size: "sm" }) }), _jsx("button", { onClick: onDelete, className: "hover:text-brand-accent transition-colors", children: _jsx(DeleteIcon, {}) })] })] }), _jsx("div", { className: "text-text-primary text-sm mb-4 flex-grow", children: children }), _jsxs("div", { className: "flex justify-between items-center text-xs text-text-secondary", children: [_jsx("div", { className: "flex flex-wrap gap-2", children: tags.map((tag) => (_jsxs("span", { className: "bg-brand-secondary text-text-secondary px-2 py-1 rounded-md", children: ["#", tag] }, tag))) }), _jsx("span", { children: date })] })] }));
}
