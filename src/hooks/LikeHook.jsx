import { useState, useEffect } from 'react';
import {postLike, postUnLike} from '../apis/like';
import { getATweet } from '../apis/tweet';


const useLike = ({dataItems, currentUserId})=> {
  const [likeTweets, setLikeTweets] = useState(dataItems);
  const [likedTweetIds, setLikedTweetIds] = useState([]);
 
  useEffect (()=>{
    setLikeTweets(dataItems);
  },[dataItems]);
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
    if (response && response.status === 'success') {
      setTimeout(async () => {
        const updatedTweet = await getATweet(id);
        if(updatedTweet){
          setLikeTweets((currentItems) => currentItems.map((item) => 
            item.Tweet.id === id 
              ? { ...item, Tweet: updatedTweet, isCurrentUserLiked: true }
              : item
          ));
          setLikedTweetIds((currentIds) => [...currentIds, id]);
        }
      }, 500); // delay for 500ms
    }
  }
  
  const handleUnLike = async (id) => {
    const response = await postUnLike(id);
    if (response && response.status === 'success') {
      setTimeout(async () => {
        const updatedTweet = await getATweet(id);
        if(updatedTweet){
          setLikeTweets((currentItems) => currentItems.map((item) => 
            item.Tweet.id === id 
              ? { ...item, Tweet: updatedTweet, isCurrentUserLiked: false }
              : item
          ));
          setLikedTweetIds((currentIds) => currentIds.filter((tweetId) => tweetId !== id));
        }
      }, 500); // delay for 500ms
    }
  }
  return {
    likeTweets,
    handleLike,
    handleUnLike,
  };
}

export default useLike;