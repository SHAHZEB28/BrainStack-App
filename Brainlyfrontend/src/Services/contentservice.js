import { api } from './api';
import { z } from 'zod';
// Schema for creating new content, including the 'tag' array.
const newContentSchema = z.object({
    title: z.string().optional(),
    link: z.string().url().optional().or(z.literal('')),
    content: z.string().optional(),
    type: z.enum(["tweet", "video", "document", "link"]),
    tag: z.array(z.string()).optional(), // Use 'tag' (singular) to match the backend schema
});
// Schema for the shape of content received from the backend.
const contentSchema = z.object({
    _id: z.string(),
    title: z.string().optional(),
    link: z.string().optional(),
    content: z.string().optional(),
    type: z.string(),
    tag: z.array(z.string()),
    userId: z.object({
        _id: z.string(),
        username: z.string(),
    }),
});
const contentArraySchema = z.array(contentSchema);
export const getContent = async () => {
    const { data } = await api.get('/content');
    return contentArraySchema.parse(data.content);
};
export const addContent = async (contentData) => {
    newContentSchema.parse(contentData);
    const { data } = await api.post('/content', contentData);
    return data;
};
export const deleteContent = async (contentId) => {
    const { data } = await api.delete('/content', { data: { contentId } });
    return data;
};
export const shareBrain = async () => {
    const { data } = await api.post('/brain/share', { share: true });
    return data;
};
export const stopSharing = async () => {
    const { data } = await api.post('/brain/share', { share: false });
    return data;
};
