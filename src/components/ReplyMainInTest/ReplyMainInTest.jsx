//ReplyMainInTest.jsx

// import UserInfo from '../UserInfo/UserInfo'
import Tab from '../Tab/Tab';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
// import OtherUserInfo from '../OtherUserInfo/OtherUserInfo';
import MainTweet from '../MainTweet/MainTweet';
import { getATweet } from '../../apis/tweet';
import { useEffect, useState } from 'react';
import MainReply from '../MainReply/MainReply';

const ReplyMainInTest = () => {
  const { tweetId } = useParams()
  const [tweet, setTweet] = useState(null)
  console.log(tweetId)//有值

  // const { user } = useAuth();
  // console.log(tweetId)
  // 主推文需要的資料
  // const [detailTweet, setDetailTweet] = useState(null)
  // 回覆列表
  const [replies, setReplies] = useState(null)

  // User包
  const [User, setUser] = useState(null)

  // const {
  //   User: { name, account, avatar } = {},
  //   description,
  //   repliesCount,
  //   likesCount,
  //   createdAt,
  //   isCurrentUserLiked,
  // } = tweet;

  // 載入時取得一推文
  useEffect(() => {
    const fetchATweet = async () => {
      const data = await getATweet(tweetId);
      if (data) {
        console.log(data); //測試
        const {
          description,
          repliesCount,
          likesCount,
          createdAt,
        } = data;
        const tweet = {
          description,
          repliesCount,
          likesCount,
          createdAt,
        }
        setTweet(tweet)
        setReplies(data.Replies)
        setUser(data.User)
        // setTweetId(id)
      }
    }
    fetchATweet();
  }, [tweetId])//當推文id改變時重新拉一次


  console.log(User)//推文的主人
  // console.log(detailTweet)
  console.log(replies)

  return (
    <>
      <MainTweet User={User} tweetId={tweetId} tweet={tweet} />
      <MainReply USer={User} tweetId={tweetId} />
      {/* <OtherUserInfo currentId={currentId} />
      <Tab userId={currentId} /> */}
      {/* <UserInfo userId={id} />
      <Tab userId={user && user.id} /> */}
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