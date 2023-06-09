//import TweetContext from '../Tab/Tab';
import { useEffect, useState } from 'react';
import TweetCard from '../TweetCard/TweetCard';
import { getUserTweets,getUserRepliedTweets, getUserLike } from '../../api/user';

//import style from '';
//假設有Authcontext(還沒寫)

const TweetList =({ activeTab, userId })=>{
    const [tweets, setTweets] =useState([]);

    useEffect(()=>{
        const fetchTweets = async () => {
            let data ="";
            switch (activeTab) {
                case "推文":
                    data = await getUserTweets(userId);
                    break;
                case "回覆":
                    data = await getUserRepliedTweets(userId);
                    break;
                case "喜歡的內容":
                    data = await getUserLike(userId);
                    break;
                default:
                    data = await getUserTweets(userId);
                    break;
            }
            console.log(data);//測試
            if (data) {
                setTweets(data);
            }
        }

        fetchTweets();
    }, [activeTab, userId]); // 當 activeTab 或 userId 變更時，重新執行 useEffect
return tweets.map(tweet=>{
    let tweetType ="";
    switch (activeTab){
        case "推文": 
            tweetType ="tweet";
            break;
        case "回覆":
            tweetType="reply";
            break;
        case "喜歡的內容":
            tweetType ="like";
            break;
        default:
            tweetType="tweet";
            break;
    }
    return <TweetCard tweet={tweet} type={tweetType}/>
})}

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