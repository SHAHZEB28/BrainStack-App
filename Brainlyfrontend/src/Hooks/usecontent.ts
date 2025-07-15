import { useState, useEffect, useCallback } from 'react';
import { getContent, addContent, deleteContent, Content, NewContentData } from '../Services/contentservice';

export const useContent = () => {
  const [content, setContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getContent();
      
      // DEBUGGING: This will print the exact data received from the backend to your browser's console.
      console.log("Data received from backend:", data);

      setContent(data || []);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch content');
      setContent([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const handleAddContent = async (newContent: NewContentData) => {
    try {
      await addContent(newContent);
      await fetchContent();
    } catch (err: any) {
      console.error("Failed to add content:", err);
      setError(err.message || 'Failed to add content');
    }
  };

  const handleDeleteContent = async (contentId: string) => {
    try {
      await deleteContent(contentId);
      await fetchContent();
    } catch (err: any)      {
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
