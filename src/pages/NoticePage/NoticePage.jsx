import { ChatNavbars, RecommendList, Header, NoticeCard } from "../../components";
import style from "./NoticePage.module.scss"
import useTweet from "../../hooks/TweetHook";
import useNotice from "../../hooks/NoticeHook";

const NoticePage = () => {
  const { handTweetSubmit } = useTweet()
  const { notice } = useNotice()

  return (
    <div className={style.homeContainer}>
      <div className={style.homeColumn}>
        <div className={style.leftColumn}>
          <ChatNavbars onTweetSubmit={handTweetSubmit} />
        </div>
        <div className={style.middleColumn}>
          <Header />
          {notice.map(n => (<NoticeCard notice={n} />))}
        </div>
        <div className={style.rightColumn}>
          <RecommendList />
        </div>
      </div>
    </div>
  )
}
export default NoticePage