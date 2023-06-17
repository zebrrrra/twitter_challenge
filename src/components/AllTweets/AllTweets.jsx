import { useEffect, useState } from 'react';
import TweetCard from '../TweetCard/TweetCard';
import { getAllTweets } from '../../apis/tweet';
import useLike from '../../hooks/LikeHook';
import { useUpdateTag } from '../../context/UpdateTagContext';


const AllTweets =({ userId })=>{
    const [allTweets, setAllTweets] = useState([]);
    const { updateTag, setUpdateTag } = useUpdateTag();
    const {likeTweets: updateLikes,handleLike,handleUnLike} =useLike({dataItems:allTweets,setUpdateTag});

    useEffect(()=>{
        const fetchTweets = async () => {
            const data = await getAllTweets();
            console.log(data); //測試
            if (data) {
                setAllTweets(data);
            }
        }
        fetchTweets();
    }, [ userId,updateTag]); 

    return updateLikes?updateLikes.map(alltweet => {
        if(!alltweet.User){
            return null;
        }
    return<TweetCard key={alltweet.id}
     tweet={alltweet} 
     onLike={()=>handleLike(alltweet.id)}
    onUnLike={()=>handleUnLike(alltweet.id)} 
     type="alltweet"/>}):null;
}

export default AllTweets;