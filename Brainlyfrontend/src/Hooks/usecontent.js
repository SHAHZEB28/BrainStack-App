import { useState, useEffect, useCallback } from 'react';
import { getContent, addContent, deleteContent } from '../Services/contentservice';
export const useContent = () => {
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchContent = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getContent();
            // DEBUGGING: This will print the exact data received from the backend to your browser's console.
            console.log("Data received from backend:", data);
            setContent(data || []);
            setError(null);
        }
        catch (err) {
            setError(err.message || 'Failed to fetch content');
            setContent([]);
        }
        finally {
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        fetchContent();
    }, [fetchContent]);
    const handleAddContent = async (newContent) => {
        try {
            await addContent(newContent);
            await fetchContent();
        }
        catch (err) {
            console.error("Failed to add content:", err);
            setError(err.message || 'Failed to add content');
        }
    };
    const handleDeleteContent = async (contentId) => {
        try {
            await deleteContent(contentId);
            await fetchContent();
        }
        catch (err) {
            console.error("Failed to delete content:", err);
            setError(err.message || 'Failed to delete content');
        }
    };
    return {
        content,
        loading,
        error,
        addContent: handleAddContent,
        deleteContent: handleDeleteContent,
        refetch: fetchContent,
    };
};
