import style from "./AllTweets.module.scss"
import Skeleton from 'react-loading-skeleton'
import TweetCard from '../TweetCard/TweetCard';
import { useGetAllTweetsQuery } from "../../hooks/QueryHook";
import { useAuth } from "../../context/AuthContext";
const AllTweets = () => {
    const { user } = useAuth()
    const { data, isLoading } = useGetAllTweetsQuery(user)

    if (isLoading) {
        return <Skeleton count={10} className={style.skeleton} />
    }
    return !isLoading ? data.map(alltweet => {
        if (!alltweet?.User) {

            return null;
        }
        return <TweetCard key={alltweet.id}
            tweet={alltweet}
            tweetId={alltweet.id}
            userId={alltweet.UserId}
            type="alltweet" />
    }) : null;
}

export default AllTweets;