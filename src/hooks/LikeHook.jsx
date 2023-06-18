import { useState, useEffect } from 'react';
import { postLike, postUnLike } from '../apis/like';
import { getATweet } from '../apis/tweet';
import { useUpdateTag } from '../context/UpdateTagContext';

const useLike = ({ dataItems, currentUserId, setUpdateTag }) => {
  const [likeTweets, setLikeTweets] = useState(Array.isArray(dataItems) ? dataItems : [dataItems]);
  const { updateTag } = useUpdateTag();

  useEffect(() => {
    setLikeTweets(Array.isArray(dataItems) ? dataItems : [dataItems]);
  }, [dataItems, updateTag]);


  const updateTweet = async (id) => {
    const updatedTweet = await getATweet(id);
    if (updatedTweet) {
      setLikeTweets((currentItems) => currentItems.map((item) => item.Tweet.id === id
        ? { ...item, Tweet: updatedTweet }
        : item
      ));
    }
  }

  const handleLike = async (id) => {
    const response = await postLike(id);
    if (id !== currentUserId) {
      if (response && response.status === 'success') {
        const updatedTweet = await getATweet(id);
        if (updatedTweet) {
          setLikeTweets((currentItems) => currentItems.map((item) =>

            item.Tweet
              ? item.Tweet.id === id
                ? { ...item, Tweet: updatedTweet, isCurrentUserLiked: true }
                : item
              : item.id === id
                ? { ...item, ...updatedTweet, isCurrentUserLiked: true }
                : item
          ));
          setUpdateTag(!updateTag);
        }
      }
    }


  }

  const handleUnLike = async (id) => {
    const response = await postUnLike(id);
    if (id !== currentUserId) {
      if (response && response.status === 'success') {
        const updatedTweet = await getATweet(id);
        if (updatedTweet) {
          setLikeTweets((currentItems) => currentItems.map((item) =>
            item.Tweet
              ? item.Tweet.id === id
                ? { ...item, Tweet: updatedTweet, isCurrentUserLiked: false }
                : item
              : item.id === id
                ? { ...item, Tweet: updatedTweet, isCurrentUserLiked: false }
                : item
          ));
          setUpdateTag(!updateTag);
        }
      }
    }
  };
  // console.log('likeTweetsat', likeTweets);
  return {
    likeTweets,
    handleLike,
    handleUnLike,
  };
}

export default useLike;