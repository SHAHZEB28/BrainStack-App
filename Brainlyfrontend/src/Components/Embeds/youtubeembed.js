import { jsx as _jsx } from "react/jsx-runtime";
// This component extracts the YouTube video ID and renders it in a responsive iframe.
export const YoutubeEmbed = ({ link }) => {
    /**
     * FIX: Replaced the simple `split()` method with a robust regular expression.
     * This regex can find the video ID from various YouTube URL formats
     * (e.g., youtube.com/watch?v=..., youtu.be/..., youtube.com/embed/...).
     * @param url - The YouTube URL.
     * @returns The 11-character video ID or null if not found.
     */
    const getYouTubeID = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        if (match && match[2].length === 11) {
            return match[2];
        }
        return null;
    };
    const videoId = getYouTubeID(link);
    if (!videoId) {
        return _jsx("p", { className: "text-accent text-center p-4", children: "Invalid or unsupported YouTube link" });
    }
    return (_jsx("div", { className: "aspect-video w-full", children: _jsx("iframe", { width: "100%", height: "100%", src: `https://www.youtube.com/embed/${videoId}`, title: "YouTube video player", frameBorder: "0", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", allowFullScreen: true, className: "rounded-lg" }) }));
};
