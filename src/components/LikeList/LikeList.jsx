//import TweetContext from '../Tab/Tab';
import { useEffect, useState } from 'react';
import LikeCard from '../LikeCard/LikeCard';
import { getUserLike } from '../../apis/user';
import useLike from '../../hooks/LikeHook';
import { useAuth } from '../../context/AuthContext';
import { useUpdateTag } from '../../context/UpdateTagContext';

const LikeList =({userId })=> {
    const {user} =useAuth();
    const currentUserId = user?.id;
    const { updateTag, setUpdateTag } = useUpdateTag();
    const [likes,setLikes] = useState([]);
    const {likeTweets: updateLikes,handleLike,handleUnLike} =useLike({
        dataItems:likes,
        currentUserId: currentUserId,    
        setUpdateTag
    });

    useEffect(()=>{
        const fetchLikes = async () => {
            const data = await getUserLike(userId);  
            if (data) {
                setLikes(data);
            }
        }
        fetchLikes();
     }, [userId,updateTag] );
     

     if (likes.length === 0) {
        return <h4>這邊還沒有喜歡的回覆。要追加什麼嗎?</h4>;
      }

return updateLikes?updateLikes.map((like,index) => 
<LikeCard 
like={like}
 key={like.id}
 onLike={()=>handleLike(like.Tweet.id)}
 onUnLike={()=>handleUnLike(like.Tweet.id)} 
 
 type="like"/>): null;
    }

export default LikeList;
