import MainTweet from '../MainTweet/MainTweet';
import MainReply from '../MainReply/MainReply';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useUpdateTag } from '../../context/UpdateTagContext';
import { postLike, postUnLike } from '../../apis/like';
import { useGetATweetQuery } from '../../hooks/QueryHook';
import Skeleton from 'react-loading-skeleton';

const ReplyMainInTest = () => {
  const { tweetId } = useParams()
  // const [tweet, setTweet] = useState(null)
  // const [replies, setReplies] = useState(null)
  const [newReply, setNeweRplies] = useState(null)
  const { updateTag, setUpdateTag } = useUpdateTag();
  // const [isCurrentUserLiked, setIsCurrentUserLiked] = useState(false);
  const { data, isLoading } = useGetATweetQuery(tweetId, updateTag, newReply)

  const { user } = useAuth();
  const currentUserId = user && user.id
  const handleReplySubmit = (newReplyValue) => {
    setNeweRplies(newReplyValue)
  }

  const handleLikeInReply = async (id) => {
    const response = await postLike(id);
    if (id !== currentUserId && response && response.status === 'success') {
      setUpdateTag(!updateTag);
    }
  }

  const handleUnLikeInReply = async (id) => {
    const response = await postUnLike(id);
    if (id !== currentUserId && response && response.status === 'success') {
      setUpdateTag(!updateTag);
    }
  };

  if (isLoading) {
    return <Skeleton />
  }
  // 載入時取得一推文
  // useEffect(() => {
  //   const abortController = new AbortController();
  //   const fetchATweet = async () => {
  //     const data = await getATweet({ id: tweetId, signal: abortController.signal });
  //     if (data) {
  //       const {
  //         description,
  //         repliesCount,
  //         likesCount,
  //         createdAt,
  //         User,
  //         isCurrentUserLiked,
  //       } = data;
  //       const tweet = {
  //         description,
  //         repliesCount,
  //         likesCount,
  //         createdAt,
  //         User,
  //         isCurrentUserLiked
  //       }
  //       setTweet(tweet)
  //       setReplies(data.Replies)
  //     }
  //   }
  //   fetchATweet();
  //   return () => {
  //     abortController.abort()
  //   }
  // }, [tweetId, updateTag, newReply])//當推文id改變時重新拉一次


  return (
    <>
      <MainTweet tweetId={tweetId} tweet={data} onReplySubmit={handleReplySubmit} onLike={handleLikeInReply} onUnLike={handleUnLikeInReply} />
      {/* 下為之前寫的 */}
      {/* <MainTweet tweetId={tweetId} tweet={tweet} updateTag={updateTag} newReply={newReply} onReplySubmit={handleReplySubmit} isCurrentUserLiked={isCurrentUserLiked} onLike={handleLikeInReply} onUnLike={handleUnLikeInReply} /> */}
      <MainReply tweetId={tweetId} newReply={newReply} />
    </>
  )

}
export default ReplyMainInTest;


/*
    <Routes>
    <Route path="tweets/*" element={<TweetList userId={id}/>} />
        <Route path="replies/*" element={<ReplyList userId={id}/>} />
        <Route path="likes/*" element={<LikeList userId={id}/>} />
    </Routes>
    <Tab onTabChange={setActiveTab} />
    <TweetList activeTab={activeTab} />


    const Main = () => {
  const { userId, tab } = useParams();
  const [tweets, setTweets] = useState([]);
  useEffect(() => {
    const tabRoutes = {
      tweets: 'tweets',
      replied: 'replied_tweets',
      likes: 'likes',
    };
    const fetchData = async () => {
      const endpoint = tabRoutes[tab] || 'tweets'; //登入後第一個頁面
      const result = await axios(`/api/users/${userId}/${endpoint}`);
      setTweets(result.data);
    };
    fetchData();
  }, [userId, tab]);


  return (
    <div>
      <Routes>
        <Route path="user/:userId/:tab">
          <Tab />
          <TweetList tweets={tweets} />
        </Route>
        <Route path="/user/:userId">
          <Navigate to={`/user/${userId}/tweets`} />
        </Route>
      </Routes>

    </div>)
};*/