import TweetCard from '../TweetCard/TweetCard';
import useLike from '../../hooks/LikeHook';
import { useUpdateTag } from '../../context/UpdateTagContext';
import { useGetUserTweetsQuery } from '../../hooks/QueryHook';
import Skeleton from 'react-loading-skeleton';
const TweetList = ({ userId }) => {
    // const [tweets, setTweets] = useState([]);
    const { updateTag, setUpdateTag } = useUpdateTag();
    const { data, isLoading } = useGetUserTweetsQuery(userId, updateTag)
    const { likeTweets: updateLikes, handleLike, handleUnLike } = useLike({ dataItems: data, setUpdateTag });

    if (isLoading) {
        return <Skeleton />
    }
    // useEffect(() => {
    //     const abortController = new AbortController();
    //     const fetchTweets = async () => {
    //         const data = await getUserTweets({ id: userId, signal: abortController.signal });
    //         if (data) {
    //             setTweets(data);
    //         }
    //     }
    //     fetchTweets();
    //     return () => {
    //         abortController.abort()
    //     }
    // }, [userId, updateTag]);
    if (data.length === 0) {
        return <h4>這邊還沒有推文。要追加什麼嗎?</h4>;
    }
    return updateLikes ? updateLikes.map((tweet, index) =>
        <TweetCard
            key={tweet?.id}
            tweet={tweet}
            onLike={() => handleLike(tweet?.id)}
            onUnLike={() => handleUnLike(tweet?.id)}
            type="tweet" />) : null;
}

export default TweetList;

