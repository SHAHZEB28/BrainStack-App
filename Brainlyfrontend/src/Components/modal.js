import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./button";
export function Modal({ isOpen, onClose, title, children }) {
    return (_jsx(AnimatePresence, { children: isOpen && (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50", onClick: onClose, children: _jsxs(motion.div, { initial: { y: -50, opacity: 0 }, animate: { y: 0, opacity: 1 }, exit: { y: -50, opacity: 0 }, className: "bg-white rounded-2xl p-8 max-w-lg w-full", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h2", { className: "text-2xl font-bold text-primary", children: title }), _jsx(Button, { variant: "secondary", size: "sm", text: "Close", onClick: onClose })] }), children] }) })) }));
}
