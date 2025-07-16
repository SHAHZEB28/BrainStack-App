import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SidebarItem } from "./sidebaritem";
import { TweetsIcon } from "../Icons/tweeticon";
import { VideosIcon } from "../Icons/videoicon";
import { DocumentIcon } from "../Icons/documenticon";
import { LinkIcon } from "../Icons/linkicon";
import { TagIcon } from "../Icons/tagicon";
import { BrainIcon } from "../Icons/brainicon";
import { LogoutIcon } from "../Icons/logouticon";
import { AllNotesIcon } from "../Icons/allnotesicon";
const sidebarVariants = {
    hidden: { x: -256, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 20,
            staggerChildren: 0.05,
        },
    },
};
const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1 },
};
export const Sidebar = ({ onLogout, activeFilter, onFilterChange, tags }) => {
    const [showTags, setShowTags] = useState(false);
    const isTagViewActive = activeFilter === 'tags-view' || activeFilter.startsWith('#');
    return (_jsxs(motion.aside, { variants: sidebarVariants, initial: "hidden", animate: "visible", 
        // The sidebar now has a slightly different background and a subtle border.
        className: "w-64 p-4 bg-white/50 backdrop-blur-lg border-r border-ui-border h-screen sticky top-0 flex flex-col", children: [_jsxs("div", { children: [_jsxs(motion.div, { variants: itemVariants, className: "flex items-center mb-8", children: [_jsx(BrainIcon, { className: "mr-3" }), _jsx("h1", { className: "text-xl font-extrabold text-text-primary", children: "Second Brain" })] }), _jsxs(motion.ul, { className: "space-y-2", children: [_jsx(motion.div, { variants: itemVariants, children: _jsx(SidebarItem, { icon: _jsx(AllNotesIcon, {}), text: "All Notes", active: activeFilter === 'all', onClick: () => onFilterChange('all') }) }), _jsx(motion.div, { variants: itemVariants, children: _jsx(SidebarItem, { icon: _jsx(TweetsIcon, {}), text: "Tweets", active: activeFilter === 'tweet', onClick: () => onFilterChange('tweet') }) }), _jsx(motion.div, { variants: itemVariants, children: _jsx(SidebarItem, { icon: _jsx(VideosIcon, {}), text: "YouTube", active: activeFilter === 'video', onClick: () => onFilterChange('video') }) }), _jsx(motion.div, { variants: itemVariants, children: _jsx(SidebarItem, { icon: _jsx(DocumentIcon, {}), text: "Documents", active: activeFilter === 'document', onClick: () => onFilterChange('document') }) }), _jsx(motion.div, { variants: itemVariants, children: _jsx(SidebarItem, { icon: _jsx(LinkIcon, {}), text: "Links", active: activeFilter === 'link', onClick: () => onFilterChange('link') }) }), _jsxs(motion.div, { variants: itemVariants, className: "pt-4 mt-4 border-t border-ui-border", children: [_jsx(SidebarItem, { icon: _jsx(TagIcon, {}), text: "# Tags", active: isTagViewActive, onClick: () => setShowTags(!showTags) }), _jsx(AnimatePresence, { children: showTags && (_jsx(motion.ul, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, transition: { duration: 0.3, ease: "easeInOut" }, className: "pl-8 mt-2 space-y-1 overflow-hidden", children: tags.map(tag => (_jsx(SidebarItem, { text: `#${tag}`, active: `#${tag}` === activeFilter, onClick: () => onFilterChange(`#${tag}`) }, tag))) }, "tags-list")) })] })] })] }), _jsx(motion.div, { variants: itemVariants, className: "mt-auto", children: _jsx(SidebarItem, { icon: _jsx(LogoutIcon, {}), text: "Logout", onClick: onLogout }) })] }));
};
