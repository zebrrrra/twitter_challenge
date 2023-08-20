import MainTweet from '../MainTweet/MainTweet';
import MainReply from '../MainReply/MainReply';
import { useParams } from 'react-router-dom';
import { useGetATweetQuery } from '../../hooks/QueryHook';

const ReplyMainInTest = () => {
  const { tweetId } = useParams()
  const { data, isLoading } = useGetATweetQuery(tweetId)

  return (
    <>
      <MainTweet tweetId={tweetId} tweet={data} isLoading={isLoading} />
      <MainReply tweetId={tweetId} />
    </>
  )

}
export default ReplyMainInTest;