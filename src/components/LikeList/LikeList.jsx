import LikeCard from '../LikeCard/LikeCard';
import useLike from '../../hooks/LikeHook';
import { useAuth } from '../../context/AuthContext';
import { useUpdateTag } from '../../context/UpdateTagContext';
import { useGetLikeQuery } from '../../hooks/QueryHook';
import Skeleton from 'react-loading-skeleton';

const LikeList = ({ userId }) => {
    const { user } = useAuth();
    const currentUserId = user?.id;
    const { updateTag, setUpdateTag } = useUpdateTag();
    // const [likes, setLikes] = useState([]);
    const { data, isLoading } = useGetLikeQuery(userId, updateTag)
    const { likeTweets: updateLikes, handleLike, handleUnLike } = useLike({
        dataItems: data,
        currentUserId: currentUserId,
        setUpdateTag
    });
    if (isLoading) {
        return <Skeleton />
    }
    // useEffect(() => {
    //     const abortController = new AbortController();
    //     const fetchLikes = async () => {
    //         const data = await getUserLike({ id: userId, signal: abortController.signal });
    //         if (data) {
    //             setLikes(data);
    //         }
    //     }
    //     fetchLikes();
    //     return () => {
    //         abortController.abort()
    //     }
    // }, [userId, updateTag]);


    if (data.length === 0) {
        return <h4>這邊還沒有喜歡的回覆。要追加什麼嗎?</h4>;
    }

    return updateLikes ? updateLikes.map((like, index) =>
        <LikeCard
            like={like}
            key={like.id}
            onLike={() => handleLike(like.Tweet.id)}
            onUnLike={() => handleUnLike(like.Tweet.id)}

            type="like" />) : null;
}

export default LikeList;
