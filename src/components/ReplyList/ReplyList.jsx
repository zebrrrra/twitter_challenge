import ReplyCard from '../ReplyCard/ReplyCard';
import { useGetUserRepliedTweetsQuery } from '../../hooks/QueryHook';
import Skeleton from 'react-loading-skeleton';

const ReplyList = ({ userId }) => {
  // const [replies, setReplies] = useState([]);
  const { data, isLoading } = useGetUserRepliedTweetsQuery(userId);
  if (isLoading) {
    return <Skeleton />
  }
  // useEffect(() => {
  //   const abortController = new AbortController();
  //   const fetchReplies = async () => {
  //     const data = await getUserRepliedTweets({ id: userId, signal: abortController.signal });
  //     if (data) {
  //       setReplies(data);
  //     }
  //   }
  //   fetchReplies();
  //   return () => {
  //     abortController.abort()
  //   }
  // }, [userId]);

  if (data.length === 0) {
    return <h4>這邊還沒有回覆。要追加什麼嗎?</h4>;
  }

  return data && data.map(reply => <ReplyCard key={reply.id} reply={reply} type="reply" />);
}

export default ReplyList;

