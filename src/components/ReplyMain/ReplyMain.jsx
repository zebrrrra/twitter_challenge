import OpenTweet from '../OpenTweet/OpenTweet'
import ReplyList from '../ReplyList/ReplyList'
import { useEffect,useState } from 'react';
import {useParams} from 'react-router-dom';
import useLike from '../../hooks/LikeHook';
import {getATweet} from '../../apis/tweet';

const ReplyMain = () => {
  const { id } = useParams();
  const [tweet, setTweet] = useState([]);
  const {likeTweets: handleLike,handleUnLike} =useLike({dataItems:tweet?[tweet]:[]});

  useEffect(()=>{
      const fetchTweets = async () => {
          const data = await getATweet(id);
          console.log(data); //測試
          if (data) {
              setTweet(data);
          }
      }
      fetchTweets();
  },[id]); 
   return (
    <>
    {tweet && <OpenTweet
     tweet={tweet}
     onLike={()=>handleLike(id)}
     onUnLike={()=>handleUnLike(id)}/>}
    <ReplyList tweetId={id}/>
    </>
  )

}

export default ReplyMain;