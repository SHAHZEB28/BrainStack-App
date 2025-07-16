import { ReactNode, useState } from "react";
import { motion, Variants } from "framer-motion";
import { ShareIcon } from "../Icons/shareicon";
import { DeleteIcon } from "../Icons/deleteicon";
import { CheckIcon } from "../Icons/checkicon";

interface CardProps {
  icon: ReactNode;
  title: string;
  tags: string[];
  date: string;
  link: string;
  children: ReactNode;
  onDelete: () => void;
}

const cardVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export function Card({ icon, title, tags, date, link, children, onDelete }: CardProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleShareClick = () => {
    navigator.clipboard.writeText(link);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <motion.div
      variants={cardVariants}
      // The card now uses the new design system for a consistent and professional look.
      className="p-5 bg-white rounded-xl border border-ui-border shadow-subtle flex flex-col h-full"
      whileHover={{ y: -5, boxShadow: "var(--tw-shadow-lifted)" }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className="text-text-secondary mr-3">{icon}</div>
          <h3 className="font-semibold text-text-primary">{title}</h3>
        </div>
        <div className="flex items-center space-x-3 text-text-secondary">
          <button onClick={handleShareClick} className="hover:text-brand-primary transition-colors">
            {isCopied ? <CheckIcon className="text-green-500" /> : <ShareIcon size="sm" />}
          </button>
          <button onClick={onDelete} className="hover:text-brand-accent transition-colors"><DeleteIcon /></button>
        </div>
      </div>
      <div className="text-text-primary text-sm mb-4 flex-grow">{children}</div>
      <div className="flex justify-between items-center text-xs text-text-secondary">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="bg-brand-secondary text-text-secondary px-2 py-1 rounded-md">
              #{tag}
            </span>
          ))}
        </div>
        <span>{date}</span>
      </div>
    </motion.div>
  );
}
