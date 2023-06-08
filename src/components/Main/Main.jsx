/*import {useEffect, useState } from 'react';
import {Routes, Route, useParams,Navigate} from 'react-router-dom';
import axios from 'axios';*/
import MainPost from '../MainPost/MainPost';
import Tab from '../Tab/Tab';
import TweetList from '../TweetList/TweetList';

const Main = ()=>{
  return (
    <div>
    <MainPost/>
    <Tab/>
    <TweetList/>
    </div>
  )

}


/*const Main = () => {
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
export default Main ;