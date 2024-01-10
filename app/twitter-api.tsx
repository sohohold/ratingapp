'use client'

// LookupTweet.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LookupTweet = ({ tweetId }: { tweetId: string }) => {
  const [tweetData, setTweetData] = useState<any>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const url = createUrl(tweetId);
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
            'User-Agent': 'v2TweetLookupReact',
          },
        });
        setTweetData(response.data);
      } catch (e) {
        setError('Failed to fetch data');
      }
    };
    fetchData();
  }, [tweetId]);

  const createUrl = (id: string) => {
    const ids = `ids=${id}`;
    const expansions = 'expansions=attachments.media_keys,author_id';
    const mediaFields = 'media.fields=url';
    const url = `https://api.twitter.com/2/tweets?${ids}&${expansions}&${mediaFields}`;
    return url;
  };

  return (
    <div>
      {tweetData ? (
        <div>
          {/* ここでツイートデータをレンダリング */}
        </div>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default LookupTweet;
