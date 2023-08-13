import style from "./AllTweets.module.scss"
import Skeleton from 'react-loading-skeleton'
import TweetCard from '../TweetCard/TweetCard';
import { getAllTweets } from '../../apis/tweet';
import useLike from '../../hooks/LikeHook';
import { useUpdateTag } from '../../context/UpdateTagContext';
import { useQuery } from "@tanstack/react-query"

const AllTweets = ({ newTweet }) => {
    const { updateTag, setUpdateTag } = useUpdateTag();
    const { data, isLoading } = useQuery({ queryKey: ['allTweet', { newTweet, updateTag }], queryFn: getAllTweets, refetchOnWindowFocus: false })
    const { likeTweets: updateLikes, handleLike, handleUnLike } = useLike({ dataItems: data, setUpdateTag });

    if (isLoading) {
        return <Skeleton count={10} className={style.skeleton} />
    }

    return updateLikes ? updateLikes.map(alltweet => {
        if (!alltweet?.User) {
            return null;
        }
        return <TweetCard key={alltweet.id}
            tweet={alltweet}
            onLike={() => handleLike(alltweet.id)}
            onUnLike={() => handleUnLike(alltweet.id)}
            type="alltweet" />
    }) : null;
}

export default AllTweets;