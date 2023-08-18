import TweetCard from '../TweetCard/TweetCard';
import { useGetUserTweetsQuery } from '../../hooks/QueryHook';
import Skeleton from 'react-loading-skeleton';
const TweetList = ({ userId }) => {
    const { data, isLoading } = useGetUserTweetsQuery(userId)

    if (isLoading) {
        return <Skeleton />
    }
    if (data.length === 0) {
        return <h4>這邊還沒有推文。要追加什麼嗎?</h4>;
    }

    return !isLoading ? data.map((tweet) =>
        <TweetCard
            key={tweet?.id}
            tweet={tweet}
            tweetId={tweet.id}
            userId={tweet.UserId}
            type="tweet" />) : null;
}

export default TweetList;

