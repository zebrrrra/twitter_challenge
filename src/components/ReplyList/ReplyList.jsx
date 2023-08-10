import { useEffect, useState } from 'react';
import ReplyCard from '../ReplyCard/ReplyCard';
import { getUserRepliedTweets } from '../../apis/user';

//假設有Authcontext(還沒寫)

const ReplyList = ({ userId }) => {
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchReplies = async () => {
      const data = await getUserRepliedTweets({ id: userId, signal: abortController.signal });
      if (data) {
        setReplies(data);
      }
    }
    fetchReplies();
    return () => {
      abortController.abort()
    }
  }, [userId]);

  if (replies.length === 0) {
    return <h4>這邊還沒有回覆。要追加什麼嗎?</h4>;
  }

  return replies.map(reply => <ReplyCard key={reply.id} reply={reply} type="reply" />);
}

export default ReplyList;

