import { useState, useEffect } from 'react';
import { useShare } from '../Hooks/useshare';
import { Modal } from './modal';
import { Button } from './button';
import { CopyIcon } from '../Icons/copyicon';
import { CheckIcon } from '../Icons/checkicon';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal = ({ isOpen, onClose }: ShareModalProps) => {
  // Use the custom hook to manage sharing logic
  const { shareLink, loading, error, generateShareLink, revokeShareLink, setShareLink } = useShare();
  const [copied, setCopied] = useState(false);

  // When the modal opens, automatically try to generate a share link.
  useEffect(() => {
    if (isOpen) {
      generateShareLink();
    } else {
      // Reset state when modal closes
      setShareLink(null);
      setCopied(false);
    }
  }, [isOpen, generateShareLink, setShareLink]);

  const handleCopy = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share Your Brain">
      <div className="space-y-4">
        {loading && <p className="text-text-secondary text-center">Generating link...</p>}
        {error && <p className="text-accent text-center">{error}</p>}
        
        {shareLink && (
          <div className="space-y-4">
            <p className="text-sm text-text-secondary">
              Anyone with this link will be able to view your Second Brain.
            </p>
            <div className="flex items-center space-x-2 p-2 border border-secondary-dark rounded-lg bg-secondary">
              <input
                type="text"
                value={shareLink}
                readOnly
                className="flex-grow bg-transparent outline-none text-text-primary text-sm"
              />
              <button onClick={handleCopy} className="p-2 rounded-md hover:bg-secondary-dark transition-colors">
                {copied ? <CheckIcon className="text-green-500" /> : <CopyIcon />}
              </button>
            </div>
            <Button
              variant="secondary"
              text="Stop Sharing"
              onClick={revokeShareLink}
              className="w-full !bg-accent/10 !text-accent hover:!bg-accent/20"
            />
          </div>
        )}
      </div>
    </Modal>
  );
};
