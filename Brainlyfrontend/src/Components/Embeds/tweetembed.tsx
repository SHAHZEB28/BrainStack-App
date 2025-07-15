import { Tweet } from 'react-tweet';

// This component extracts the Tweet ID from a URL and renders the tweet.
export const TweetEmbed = ({ link }: { link: string }) => {
  // Extracts the last part of the URL path, which is the tweet ID.
  const tweetId = link.split('/').pop()?.split('?')[0];

  if (!tweetId) {
    return <p className="text-accent">Invalid Tweet link</p>;
  }

  return (
    <div className="w-full">
      <Tweet id={tweetId} />
    </div>
  );
};
