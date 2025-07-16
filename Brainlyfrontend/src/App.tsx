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
import { NewContentData } from "./Services/contentservice";
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

type FormData = {
  title: string;
  link?: string;
  content?: string;
  tags?: string; 
}

const categoryInfo = {
  all: { title: "Add New Content", fieldLabel: "Select a category first", fieldType: "none", icon: <DocumentIcon /> },
  tweet: { title: "Add New Tweet", fieldLabel: "Tweet Link", fieldType: "link", icon: <TweetsIcon /> },
  video: { title: "Add New YouTube", fieldLabel: "YouTube Link", fieldType: "link", icon: <VideosIcon /> },
  document: { title: "Add New Document", fieldLabel: "Content", fieldType: "content", icon: <DocumentIcon /> },
  link: { title: "Add New Link", fieldLabel: "Link URL", fieldType: "link", icon: <LinkIcon /> },
};

function App() {
  const { content, loading, error, addContent, deleteContent } = useContent();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [formData, setFormData] = useState<FormData>({ title: "", tags: "" });

  useEffect(() => {
    if (isAddModalOpen) {
      setFormData({ title: "", tags: "" });
    }
  }, [isAddModalOpen]);

  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    content.forEach(item => {
      item.tag.forEach(t => tagsSet.add(t));
    });
    return Array.from(tagsSet);
  }, [content]);

  const handleLogout = () => {
    signOut();
    window.location.reload();
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (activeFilter === 'all' || activeFilter.startsWith('#')) return;
    const type = activeFilter as NewContentData['type'];
    
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

  const currentCategory = categoryInfo[activeFilter as keyof typeof categoryInfo] || categoryInfo.all;

  const renderCardContent = (item: typeof content[0]) => {
    if (item.type === 'tweet' && item.link) {
      return <TweetEmbed link={item.link} />;
    }
    if (item.type === 'video' && item.link) {
      return <YoutubeEmbed link={item.link} />;
    }
    if (item.type === 'document' && item.content) {
      return <p className="whitespace-pre-wrap text-sm text-text-secondary">{item.content}</p>;
    }
    if (item.link) {
      return <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline break-all">{item.link}</a>;
    }
    return null;
  };

  return (
    // The main container now uses the new background color from the theme.
    <div className="flex min-h-screen bg-ui-background">
      <Sidebar
        onLogout={handleLogout}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        tags={allTags}
      />
      <div className="flex-1 p-8">
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-between items-center mb-8"
        >
          {/* The heading now uses the new text colors and font styles. */}
          <h2 className="text-4xl font-bold text-text-primary">
            All Notes
          </h2>
          <div className="flex items-center space-x-4">
            <Button variant="secondary" startIcon={<ShareIcon size="sm" />} text="Share Brain" onClick={() => setIsShareModalOpen(true)} />
            <Button
              variant="primary"
              startIcon={<PlusIcon size="sm" />}
              text="Add Content"
              onClick={() => setIsAddModalOpen(true)}
              disabled={activeFilter === 'all' || activeFilter.startsWith('#')}
            />
          </div>
        </motion.header>

        <motion.main
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {loading && <p>Loading...</p>}
          {error && <p className="text-brand-accent">Error: {error}</p>}
          <AnimatePresence>
            {filteredContent.map((item) => (
              <Card
                key={item._id}
                icon={categoryInfo[item.type as keyof typeof categoryInfo]?.icon || <DocumentIcon />}
                title={item.title || "Untitled"}
                tags={item.tag}
                date={new Date().toLocaleDateString()}
                link={item.link || ""}
                onDelete={() => deleteContent(item._id)}
              >
                {renderCardContent(item)}
              </Card>
            ))}
          </AnimatePresence>
        </motion.main>
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={currentCategory.title}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-text-secondary">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleFormChange}
              className="mt-1 block w-full px-3 py-2 bg-white border-ui-border rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
            />
          </div>
          
          {currentCategory.fieldType === 'content' ? (
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-text-secondary">{currentCategory.fieldLabel}</label>
              <textarea
                id="content"
                name="content"
                value={formData.content || ""}
                onChange={handleFormChange}
                rows={6}
                className="mt-1 block w-full px-3 py-2 bg-white border-ui-border rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
              />
            </div>
          ) : (
            <div>
              <label htmlFor="link" className="block text-sm font-medium text-text-secondary">{currentCategory.fieldLabel}</label>
              <input
                type="url"
                id="link"
                name="link"
                value={formData.link || ""}
                onChange={handleFormChange}
                required
                className="mt-1 block w-full px-3 py-2 bg-white border-ui-border rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
              />
            </div>
          )}

          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-text-secondary">Tags (comma-separated)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags || ""}
              onChange={handleFormChange}
              placeholder="e.g. productivity, ideas, learning"
              className="mt-1 block w-full px-3 py-2 bg-white border-ui-border rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
            />
          </div>

          <Button text="Save Content" type="submit" size="lg" className="w-full" />
        </form>
      </Modal>
      
      <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />
    </div>
  );
}

export default App;
