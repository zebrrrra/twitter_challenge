import MainReplyCard from '../MainReplyCard/MainReplyCard';
// import { getATweetReply } from '../../apis/tweet'
import { useGetATweetReplyQuery } from '../../hooks/QueryHook';
import Skeleton from 'react-loading-skeleton';

const MainReply = ({ tweetId, newReply }) => {
  // const [replies, setReplies] = useState([]);
  const { data, isLoading } = useGetATweetReplyQuery(tweetId, newReply);
  if (isLoading) {
    return <Skeleton />
  }
  // useEffect(() => {
  //   const abortController = new AbortController();
  //   const fetchReplies = async () => {
  //     const data = await getATweetReply({ id: tweetId, signal: abortController.signal });
  //     if (data) {
  //       setReplies(data);
  //     }
  //   }
  //   fetchReplies();
  //   return () => {
  //     abortController.abort()
  //   }
  // }, [tweetId, newReply]);

  return data && data.map(reply => <MainReplyCard key={reply.id} reply={reply} type="reply" />);
}

export default MainReply;