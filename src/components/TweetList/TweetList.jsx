//import TweetContext from '../Tab/Tab';
import { useEffect, useState } from 'react';
import TweetCard from '../TweetCard/TweetCard';
import { getUserTweets } from '../../apis/user';
import useLike from '../../hooks/LikeHook';
import { useUpdateTag } from '../../context/UpdateTagContext';

const TweetList =({ userId })=>{
    const [tweets, setTweets] = useState([]);
    const { updateTag, setUpdateTag } = useUpdateTag();
    const {likeTweets: updateLikes,handleLike,handleUnLike} =useLike({dataItems:tweets,setUpdateTag});
  

    useEffect(()=>{
        const fetchTweets = async () => {
            const data = await getUserTweets(userId);
            console.log(data); //測試
            if (data) {
                setTweets(data);
            }
        }
        fetchTweets();
    },[userId,updateTag]); 

    return updateLikes?updateLikes.map((tweet,index) => 
    <TweetCard 
    key={tweet.id} 
    tweet={tweet}
    onLike={()=>handleLike(tweet.id)}
    onUnLike={()=>handleUnLike(tweet.id)} 
    type="tweet"/>):null;
}

export default TweetList;

/*const TweetList =({tweetsContext})=>{

    return (
        <div className="tweetList">
            {tweetsContext.sort((a,b)=> b.timeStamp- a.timeStamp).map((tweet)=>(
                <TweetCard key={tweet.id} tweet={tweet}/>
            ))}
        </div>
    );
};
export default TweetList;*/