import OpenTweet from '../OpenTweet/OpenTweet'
import ReplyList from '../ReplyList/ReplyList'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useLike from '../../hooks/LikeHook';
import { getATweet } from '../../apis/tweet';

const ReplyMain = () => {
  const { id } = useParams();
  const [tweet, setTweet] = useState([]);
  const { likeTweets, handleLike, handleUnLike } = useLike({ dataItems: tweet ? [tweet] : [] });

  useEffect(() => {
    const abortController = new AbortController();
    const fetchTweets = async () => {
      const data = await getATweet({ id, signal: abortController.signal });
      if (data) {
        setTweet(data);
      }
    }
    fetchTweets();
    return () => {
      abortController.abort()
    }
  }, [id]);

  useEffect(() => {
    if (likeTweets.length > 0) {
      setTweet(likeTweets[0]);
    }
  }, [likeTweets]);


  return (
    <>
      {tweet && <OpenTweet
        tweet={tweet}
        onLike={() => handleLike(id)}
        onUnLike={() => handleUnLike(id)} />}

    </>
  )

}

export default ReplyMain;