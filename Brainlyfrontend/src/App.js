import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./Components/button";
import { Card } from "./Components/card";
import { Sidebar } from "./Components/sidebar";
import { Modal } from "./Components/modal";
import { ShareModal } from "./Components/sharemodal";
import { PlusIcon } from "./Icons/plusicon";
import { ShareIcon } from "./Icons/shareicon";
// FIX: Corrected all icon and component import paths to be individual and match your file structure.
import { DocumentIcon } from "./Icons/documenticon";
import { TweetsIcon } from "./Icons/tweeticon";
import { VideosIcon } from "./Icons/videoicon";
import { LinkIcon } from "./Icons/linkicon";
import { TweetEmbed } from "./Components/Embeds/tweetembed";
import { YoutubeEmbed } from "./Components/Embeds/youtubeembed";
import { useContent } from "./Hooks/usecontent";
import { signOut } from "./Services/authservice";
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};
const categoryInfo = {
    all: { title: "Add New Content", fieldLabel: "Select a category first", fieldType: "none", icon: _jsx(DocumentIcon, {}) },
    tweet: { title: "Add New Tweet", fieldLabel: "Tweet Link", fieldType: "link", icon: _jsx(TweetsIcon, {}) },
    video: { title: "Add New YouTube", fieldLabel: "YouTube Link", fieldType: "link", icon: _jsx(VideosIcon, {}) },
    document: { title: "Add New Document", fieldLabel: "Content", fieldType: "content", icon: _jsx(DocumentIcon, {}) },
    link: { title: "Add New Link", fieldLabel: "Link URL", fieldType: "link", icon: _jsx(LinkIcon, {}) },
};
function App() {
    const { content, loading, error, addContent, deleteContent } = useContent();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState('all');
    const [formData, setFormData] = useState({ title: "", tags: "" });
    useEffect(() => {
        if (isAddModalOpen) {
            setFormData({ title: "", tags: "" });
        }
    }, [isAddModalOpen]);
    const allTags = useMemo(() => {
        const tagsSet = new Set();
        content.forEach(item => {
            item.tag.forEach(t => tagsSet.add(t));
        });
        return Array.from(tagsSet);
    }, [content]);
    const handleLogout = () => {
        signOut();
        window.location.reload();
    };
    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Keep this check to prevent adding content when 'all' or a tag is selected
        // as the form fields won't be appropriate in the modal.
        if (activeFilter === 'all' || activeFilter.startsWith('#')) {
            alert("Please select a specific content category (e.g., Tweet, YouTube, Document, Link) from the sidebar before adding content.");
            return;
        }
        const type = activeFilter;
        const tagsArray = formData.tags
            ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
            : [];
        await addContent({
            title: formData.title,
            link: formData.link,
            content: formData.content,
            tag: tagsArray,
            type
        });
        setIsAddModalOpen(false);
    };
    const filteredContent = useMemo(() => {
        if (activeFilter.startsWith('#')) {
            const tagToFilter = activeFilter.substring(1);
            return content.filter(item => item.tag.includes(tagToFilter));
        }
        if (activeFilter === 'all') {
            return content;
        }
        return content.filter(item => item.type === activeFilter);
    }, [content, activeFilter]);
    const currentCategory = categoryInfo[activeFilter] || categoryInfo.all;
    const renderCardContent = (item) => {
        if (item.type === 'tweet' && item.link) {
            return _jsx(TweetEmbed, { link: item.link });
        }
        if (item.type === 'video' && item.link) {
            return _jsx(YoutubeEmbed, { link: item.link });
        }
        if (item.type === 'document' && item.content) {
            return _jsx("p", { className: "whitespace-pre-wrap text-sm text-text-secondary", children: item.content });
        }
        if (item.link) {
            return _jsx("a", { href: item.link, target: "_blank", rel: "noopener noreferrer", className: "text-brand-primary hover:underline break-all", children: item.link });
        }
        return null;
    };
    return (
    // The main container now uses the new background color from the theme.
    _jsxs("div", { className: "flex min-h-screen bg-ui-background", children: [_jsx(Sidebar, { onLogout: handleLogout, activeFilter: activeFilter, onFilterChange: setActiveFilter, tags: allTags }), _jsxs("div", { className: "flex-1 p-8", children: [_jsxs(motion.header, { initial: { y: -20, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: 0.5, delay: 0.2 }, className: "flex justify-between items-center mb-8", children: [_jsx("h2", { className: "text-4xl font-bold text-text-primary", children: "All Notes" }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx(Button, { variant: "secondary", startIcon: _jsx(ShareIcon, { size: "sm" }), text: "Share Brain", onClick: () => setIsShareModalOpen(true) }), _jsx(Button, { variant: "primary", startIcon: _jsx(PlusIcon, { size: "sm" }), text: "Add Content", onClick: () => setIsAddModalOpen(true) })] })] }), _jsxs(motion.main, { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", variants: containerVariants, initial: "hidden", animate: "visible", children: [loading && _jsx("p", { children: "Loading..." }), error && _jsxs("p", { className: "text-brand-accent", children: ["Error: ", error] }), _jsx(AnimatePresence, { children: filteredContent.map((item) => (_jsx(Card, { icon: categoryInfo[item.type]?.icon || _jsx(DocumentIcon, {}), title: item.title || "Untitled", tags: item.tag, date: new Date().toLocaleDateString(), link: item.link || "", onDelete: () => deleteContent(item._id), children: renderCardContent(item) }, item._id))) })] })] }), _jsx(Modal, { isOpen: isAddModalOpen, onClose: () => setIsAddModalOpen(false), title: currentCategory.title, children: _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "title", className: "block text-sm font-medium text-text-secondary", children: "Title" }), _jsx("input", { type: "text", id: "title", name: "title", value: formData.title, onChange: handleFormChange, className: "mt-1 block w-full px-3 py-2 bg-white border-ui-border rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm" })] }), currentCategory.fieldType === 'content' ? (_jsxs("div", { children: [_jsx("label", { htmlFor: "content", className: "block text-sm font-medium text-text-secondary", children: currentCategory.fieldLabel }), _jsx("textarea", { id: "content", name: "content", value: formData.content || "", onChange: handleFormChange, rows: 6, className: "mt-1 block w-full px-3 py-2 bg-white border-ui-border rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm" })] })) : (_jsxs("div", { children: [_jsx("label", { htmlFor: "link", className: "block text-sm font-medium text-text-secondary", children: currentCategory.fieldLabel }), _jsx("input", { type: "url", id: "link", name: "link", value: formData.link || "", onChange: handleFormChange, required: true, className: "mt-1 block w-full px-3 py-2 bg-white border-ui-border rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm" })] })), _jsxs("div", { children: [_jsx("label", { htmlFor: "tags", className: "block text-sm font-medium text-text-secondary", children: "Tags (comma-separated)" }), _jsx("input", { type: "text", id: "tags", name: "tags", value: formData.tags || "", onChange: handleFormChange, placeholder: "e.g. productivity, ideas, learning", className: "mt-1 block w-full px-3 py-2 bg-white border-ui-border rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm" })] }), _jsx(Button, { text: "Save Content", type: "submit", size: "lg", className: "w-full" })] }) }), _jsx(ShareModal, { isOpen: isShareModalOpen, onClose: () => setIsShareModalOpen(false) })] }));
}
export default App;
