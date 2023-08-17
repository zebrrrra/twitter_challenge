import { useState, useEffect } from 'react';
import { postLike, postUnLike } from '../apis/like';
import { getATweet } from '../apis/tweet';
import { useUpdateTag } from '../context/UpdateTagContext';
import { useGetATweetQuery } from './QueryHook';//TODO 預備使用query
import { useMutation } from '@tanstack/react-query';

const useLike = ({ dataItems, currentUserId, setUpdateTag }) => {
  const [likeTweets, setLikeTweets] = useState(Array.isArray(dataItems) ? dataItems : [dataItems]);
  const { updateTag } = useUpdateTag();

  useEffect(() => {
    setLikeTweets(Array.isArray(dataItems) ? dataItems : [dataItems]);
  }, [dataItems, updateTag]);

  const handleLike = async (id) => {
    const response = await postLike(id);
    if (id !== currentUserId) {
      if (response && response.status === 'success') {
        const updatedTweet = await getATweet({ id });
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
        const updatedTweet = await getATweet({ id });
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

  return {
    likeTweets,
    handleLike,
    handleUnLike,
  };
}

export default useLike;

export const useUnlike = ({ id }) => {
  const mutation = useMutation({
    mutationFn: async () => {
      // 一些前處理...
      return await postUnLike(id)//發請求
    },
    // 處理回來的資料....
    onSuccess: (data) => {
      if (data.status === 'success') {
        console.log(data)
      }
    }
  })
  return { mutation }//使用：onSubmit={mutation.mutate}, mutation.isLoading回傳true or false來顯示UI
}