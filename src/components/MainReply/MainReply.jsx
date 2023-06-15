import { useEffect, useState } from 'react';
import MainReplyCard from '../MainReplyCard/MainReplyCard';
import { getATweetReply } from '../../apis/tweet'



const MainReply = ({ tweetId }) => {
  const [replies, setReplies] = useState([]);
  console.log(tweetId);
  useEffect(() => {
    const fetchReplies = async () => {
      const data = await getATweetReply(tweetId);
      console.log(data); // 測試
      if (data) {
        setReplies(data);
      }
    }
    fetchReplies();
  }, [tweetId]);

  return replies.map(reply => <MainReplyCard key={reply.id} reply={reply} type="reply" />);
}

export default MainReply;