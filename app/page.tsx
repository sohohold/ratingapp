'use client'

import React, { useState } from 'react';
import {
  Card,
  CardBody,
  Button,
  Input,
} from '@nextui-org/react';
import LookupTweet from './twitter-api'

const TweetImageFetcher = () => {
  const [tweetUrl, setTweetUrl] = useState('');
  const [tweetId, setTweetId] = useState('');
  const [error, setError] = useState('');

  const fetchImage = async () => {
    setError('');
    try {
      // Extract Tweet ID from URL
      const _id = tweetUrl.split('/').pop() as string
      setTweetId(_id);
      return tweetId
    } catch (err) {
      setError('Failed to fetch image. Please try again.');
    }
  };

  return (
    <div className='flex min-h-full flex-col items-center justify-center p-12 gap-1'>
      <div className='flex flex-row gap-2'>
        <Input
          label='Tweet URL' size='lg' color="primary"
          onChange={(event) => setTweetUrl(event.target.value)} />
        <Button color='primary' onClick={fetchImage}>GET</Button>
      </div>
      {tweetId !== '' && <LookupTweet tweetId={tweetId} />}
      {error && (
        <Card>
          <CardBody>
            {error}
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default TweetImageFetcher;
