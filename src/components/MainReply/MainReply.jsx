import MainReplyCard from '../MainReplyCard/MainReplyCard';
import { useGetATweetReplyQuery } from '../../hooks/QueryHook';
import Skeleton from 'react-loading-skeleton';

const MainReply = ({ tweetId }) => {
  const { data, isLoading } = useGetATweetReplyQuery(tweetId);

  if (data?.length === 0) {
    return <span>尚無任何回覆</span>
  }
  return (
    <>
      {isLoading && <Skeleton count={5} style={{ marginTop: '10px', height: '116px', width: '650px' }} />}
      {data && data.map(reply => <MainReplyCard key={reply.id} reply={reply} type="reply" isLoading={isLoading} />)}
    </>
  )
}

export default MainReply;