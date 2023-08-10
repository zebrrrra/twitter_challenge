//import TweetContext from '../Tab/Tab';
import { useEffect, useState } from 'react';
import TweetCard from '../TweetCard/TweetCard';
import { getUserTweets } from '../../apis/user';
import useLike from '../../hooks/LikeHook';
import { useUpdateTag } from '../../context/UpdateTagContext';

const TweetList = ({ userId }) => {
    const [tweets, setTweets] = useState([]);
    const { updateTag, setUpdateTag } = useUpdateTag();
    const { likeTweets: updateLikes, handleLike, handleUnLike } = useLike({ dataItems: tweets, setUpdateTag });


    useEffect(() => {
        const abortController = new AbortController();
        const fetchTweets = async () => {
            const data = await getUserTweets({ id: userId, signal: abortController.signal });
            if (data) {
                setTweets(data);
            }
        }
        fetchTweets();
        return () => {
            abortController.abort()
        }
    }, [userId, updateTag]);


    if (tweets.length === 0) {
        return <h4>這邊還沒有推文。要追加什麼嗎?</h4>;
    }

    return updateLikes ? updateLikes.map((tweet, index) =>
        <TweetCard
            key={tweet.id}
            tweet={tweet}
            onLike={() => handleLike(tweet.id)}
            onUnLike={() => handleUnLike(tweet.id)}
            type="tweet" />) : null;
}

export default TweetList;

