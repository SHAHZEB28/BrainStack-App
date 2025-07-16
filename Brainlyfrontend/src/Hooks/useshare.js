import { useState, useCallback } from 'react';
import { shareBrain, stopSharing } from '../Services/contentservice';
// This custom hook encapsulates all the logic for the "Share Brain" feature.
export const useShare = () => {
    const [shareLink, setShareLink] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    /**
     * Calls the backend to generate a new shareable link or retrieve an existing one.
     * Wrapped in useCallback to prevent it from being recreated on every render.
     */
    const generateShareLink = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            // The backend can return one of two shapes, so we cast the response
            // to a type that includes both possible properties.
            const response = await shareBrain();
            // FIX: Replaced the problematic line with a safer way to extract the hash.
            // This checks for the 'hash' property first, then falls back to parsing the 'message' property.
            let hash;
            if (response.hash) {
                hash = response.hash;
            }
            else if (response.message) {
                hash = response.message.split('/').pop();
            }
            if (hash) {
                const fullLink = `${window.location.origin}/share/${hash}`;
                setShareLink(fullLink);
            }
            else {
                throw new Error("Failed to retrieve a valid share link from the server.");
            }
        }
        catch (err) {
            setError(err.response?.data?.message || 'Failed to generate share link.');
            setShareLink(null);
        }
        finally {
            setLoading(false);
        }
    }, []); // The empty dependency array means this function is created only once.
    /**
     * Calls the backend to revoke (delete) the shareable link.
     * Also wrapped in useCallback for consistency and best practice.
     */
    const revokeShareLink = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            await stopSharing();
            setShareLink(null);
        }
        catch (err) {
            setError(err.response?.data?.message || 'Failed to revoke share link.');
        }
        finally {
            setLoading(false);
        }
    }, []);
    return { shareLink, loading, error, generateShareLink, revokeShareLink, setShareLink };
};
