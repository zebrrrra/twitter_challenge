import style from './ReplyPage.module.scss'
import { ReplyMainInTest, Header, ChatNavbars, RecommendList } from '../../components';

const ReplyPage = () => {

  return (
    <div className={style.replyContainer}>
      <div className={style.homeColumn}>
        <div className={style.leftColumn}>
          <ChatNavbars />
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