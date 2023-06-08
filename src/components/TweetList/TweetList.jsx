//import TweetContext from '../Tab/Tab';
import TweetCard from '../TweetCard/TweetCard';
//import style from '';
//假設有Authcontext

const TweetList =()=>{
return (
    <TweetCard/>
)

};
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