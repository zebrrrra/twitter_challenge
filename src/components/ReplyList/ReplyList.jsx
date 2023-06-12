import { useEffect, useState } from 'react';
import ReplyCard from '../ReplyCard/ReplyCard';
import { getUserRepliedTweets } from '../../apis/user';
import { getATweetReply } from '../../apis/tweet';

//假設有Authcontext(還沒寫)

const ReplyList = ({ userId,tweetId }) => {
    const [replies, setReplies] = useState([]);
    console.log(userId);
    useEffect(() => {
        const fetchReplies = async () => {
            let data ='';
            if (userId){
                data = await getUserRepliedTweets(userId);
            }
            else if (tweetId){
                data = await getATweetReply(tweetId);
            }
            console.log(data); // 測試
            if (data) {
                setReplies(data);
            }
        }
        fetchReplies();
    }, [userId,tweetId]);

    return replies.map(reply => <ReplyCard key={reply.id} reply={reply} type="reply" />);
}

export default ReplyList;

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