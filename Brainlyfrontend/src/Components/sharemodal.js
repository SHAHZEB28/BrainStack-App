import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useShare } from '../Hooks/useshare';
import { Modal } from './modal';
import { Button } from './button';
import { CopyIcon } from '../Icons/copyicon';
import { CheckIcon } from '../Icons/checkicon';
export const ShareModal = ({ isOpen, onClose }) => {
    // Use the custom hook to manage sharing logic
    const { shareLink, loading, error, generateShareLink, revokeShareLink, setShareLink } = useShare();
    const [copied, setCopied] = useState(false);
    // When the modal opens, automatically try to generate a share link.
    useEffect(() => {
        if (isOpen) {
            generateShareLink();
        }
        else {
            // Reset state when modal closes
            setShareLink(null);
            setCopied(false);
        }
    }, [isOpen, generateShareLink, setShareLink]);
    const handleCopy = () => {
        if (shareLink) {
            navigator.clipboard.writeText(shareLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        }
    };
    return (_jsx(Modal, { isOpen: isOpen, onClose: onClose, title: "Share Your Brain", children: _jsxs("div", { className: "space-y-4", children: [loading && _jsx("p", { className: "text-text-secondary text-center", children: "Generating link..." }), error && _jsx("p", { className: "text-accent text-center", children: error }), shareLink && (_jsxs("div", { className: "space-y-4", children: [_jsx("p", { className: "text-sm text-text-secondary", children: "Anyone with this link will be able to view your Second Brain." }), _jsxs("div", { className: "flex items-center space-x-2 p-2 border border-secondary-dark rounded-lg bg-secondary", children: [_jsx("input", { type: "text", value: shareLink, readOnly: true, className: "flex-grow bg-transparent outline-none text-text-primary text-sm" }), _jsx("button", { onClick: handleCopy, className: "p-2 rounded-md hover:bg-secondary-dark transition-colors", children: copied ? _jsx(CheckIcon, { className: "text-green-500" }) : _jsx(CopyIcon, {}) })] }), _jsx(Button, { variant: "secondary", text: "Stop Sharing", onClick: revokeShareLink, className: "w-full !bg-accent/10 !text-accent hover:!bg-accent/20" })] }))] }) }));
};
