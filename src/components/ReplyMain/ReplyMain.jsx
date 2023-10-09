import OpenTweet from '../OpenTweet/OpenTweet'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useLike from '../../hooks/LikeHook';
import { useGetATweetQuery } from '../../hooks/QueryHook';
import Skeleton from 'react-loading-skeleton';

const ReplyMain = () => {
  const { id } = useParams();
  const [tweet, setTweet] = useState([]);//TODO state待移除
  const { data, isLoading } = useGetATweetQuery(id);
  const { likeTweets, handleLike, handleUnLike } = useLike({ dataItems: data ? [data] : [] });

  // useEffect(() => {
  //   const abortController = new AbortController();
  //   const fetchTweets = async () => {
  //     const data = await getATweet({ id, signal: abortController.signal });
  //     if (data) {
  //       setTweet(data);
  //     }
  //   }
  //   fetchTweets();
  //   return () => {
  //     abortController.abort()
  //   }
  // }, [id]);

  useEffect(() => {
    if (likeTweets.length > 0) {
      setTweet(likeTweets[0]);
    }
  }, [likeTweets]);

  if (isLoading) {
    return <Skeleton />
  }

  return (
    <>
      {data && <OpenTweet
        tweet={data}
        onLike={() => handleLike(id)}
        onUnLike={() => handleUnLike(id)} />}
    </>
  )

}

export default ReplyMain;