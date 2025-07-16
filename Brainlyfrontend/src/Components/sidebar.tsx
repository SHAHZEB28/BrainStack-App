import { useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { SidebarItem } from "./sidebaritem";
import { TweetsIcon } from "../Icons/tweeticon";
import { VideosIcon } from "../Icons/videoicon";
import { DocumentIcon } from "../Icons/documenticon";
import { LinkIcon } from "../Icons/linkicon";
import { TagIcon } from "../Icons/tagicon";
import { BrainIcon } from "../Icons/brainicon";
import { LogoutIcon } from "../Icons/logouticon";
import { AllNotesIcon } from "../Icons/allnotesicon";

interface SidebarProps {
  onLogout: () => void;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  tags: string[];
}

const sidebarVariants: Variants = {
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

const itemVariants: Variants = {
  hidden: { y: 10, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export const Sidebar = ({ onLogout, activeFilter, onFilterChange, tags }: SidebarProps) => {
  const [showTags, setShowTags] = useState(false);
  const isTagViewActive = activeFilter === 'tags-view' || activeFilter.startsWith('#');

  return (
    <motion.aside
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      // The sidebar now has a slightly different background and a subtle border.
      className="w-64 p-4 bg-white/50 backdrop-blur-lg border-r border-ui-border h-screen sticky top-0 flex flex-col"
    >
      <div>
        <motion.div variants={itemVariants} className="flex items-center mb-8">
          <BrainIcon className="mr-3" />
          <h1 className="text-xl font-extrabold text-text-primary">
            Second Brain
          </h1>
        </motion.div>
        <motion.ul className="space-y-2">
          <motion.div variants={itemVariants}><SidebarItem icon={<AllNotesIcon />} text="All Notes" active={activeFilter === 'all'} onClick={() => onFilterChange('all')} /></motion.div>
          <motion.div variants={itemVariants}><SidebarItem icon={<TweetsIcon />} text="Tweets" active={activeFilter === 'tweet'} onClick={() => onFilterChange('tweet')} /></motion.div>
          <motion.div variants={itemVariants}><SidebarItem icon={<VideosIcon />} text="YouTube" active={activeFilter === 'video'} onClick={() => onFilterChange('video')} /></motion.div>
          <motion.div variants={itemVariants}><SidebarItem icon={<DocumentIcon />} text="Documents" active={activeFilter === 'document'} onClick={() => onFilterChange('document')} /></motion.div>
          <motion.div variants={itemVariants}><SidebarItem icon={<LinkIcon />} text="Links" active={activeFilter === 'link'} onClick={() => onFilterChange('link')} /></motion.div>
          
          <motion.div variants={itemVariants} className="pt-4 mt-4 border-t border-ui-border">
            <SidebarItem
              icon={<TagIcon />}
              text="# Tags"
              active={isTagViewActive}
              onClick={() => setShowTags(!showTags)}
            />
            <AnimatePresence>
              {showTags && (
                <motion.ul
                  key="tags-list"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="pl-8 mt-2 space-y-1 overflow-hidden"
                >
                  {tags.map(tag => (
                    <SidebarItem 
                      key={tag}
                      text={`#${tag}`}
                      active={`#${tag}` === activeFilter}
                      onClick={() => onFilterChange(`#${tag}`)}
                    />
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.ul>
      </div>
      <motion.div variants={itemVariants} className="mt-auto">
        <SidebarItem icon={<LogoutIcon />} text="Logout" onClick={onLogout} />
      </motion.div>
    </motion.aside>
  );
};
