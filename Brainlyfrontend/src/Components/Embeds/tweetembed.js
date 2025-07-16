import { jsx as _jsx } from "react/jsx-runtime";
import { Tweet } from 'react-tweet';
// This component extracts the Tweet ID from a URL and renders the tweet.
export const TweetEmbed = ({ link }) => {
    // Extracts the last part of the URL path, which is the tweet ID.
    const tweetId = link.split('/').pop()?.split('?')[0];
    if (!tweetId) {
        return _jsx("p", { className: "text-accent", children: "Invalid Tweet link" });
    }
    return (_jsx("div", { className: "w-full", children: _jsx(Tweet, { id: tweetId }) }));
};
