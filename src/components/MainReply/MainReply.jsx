import { useEffect, useState } from 'react';
import MainReplyCard from '../MainReplyCard/MainReplyCard';
import { getATweetReply } from '../../apis/tweet'

const MainReply = ({ tweetId, newReply }) => {
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchReplies = async () => {
      const data = await getATweetReply({ id: tweetId, signal: abortController.signal });
      if (data) {
        setReplies(data);
      }
    }
    fetchReplies();
    return () => {
      abortController.abort()
    }
  }, [tweetId, newReply]);

  return replies.map(reply => <MainReplyCard key={reply.id} reply={reply} type="reply" />);
}

export default MainReply;