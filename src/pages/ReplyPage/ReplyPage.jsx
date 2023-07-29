import style from './ReplyPage.module.scss'
import { ReplyMainInTest, Header, ChatNavbars, RecommendList } from '../../components';
import useTweet from '../../hooks/TweetHook';

const ReplyPage = () => {
  const { handTweetSubmit } = useTweet()

  return (
    <div className={style.replyContainer}>
      <div className={style.homeColumn}>
        <div className={style.leftColumn}>
          <ChatNavbars onTweetSubmit={handTweetSubmit} />
        </div>
        <div className={style.middleColumn}>
          <Header />
          <ReplyMainInTest />
        </div>
        <div className={style.rightColumn}>
          <RecommendList />
        </div>
      </div>
    </div>
  )
}

export default ReplyPage;