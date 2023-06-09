import style from "./MainTweet.module.scss"
import { ReactComponent as Like } from "../../assets/icons/outlinedlike.svg"
import { ReactComponent as Reply } from "../../assets/icons/outlinedreply.svg"
import avatar from '../../assets/icons/avatar.svg'


const MainTweet = ({ replyNumber = 34, likeNumber = 808, name = 'apple', account = "euhue", introduction = "Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt. ", createdAt = "上午0:00・0000年0月0日" }) => {
  return (
    <div className={style.container}>
      <div className={style.tweetContainer}>
        <div className={style.titleContainer}>
          <div className={style.avatarContainer}>
            <img src={avatar} alt="avatar" />
          </div>
          <div className={style.nameContainer}>
            <h5 className={style.name}>{name}</h5>
            <span className={style.account}>@{account}</span>
          </div>
        </div>
        <p className={style.introduction}>{introduction}</p>
        <p className={style.time}>{createdAt}</p>
      </div>
      <div className={style.dataContainer}>
        <div className={style.data}>{replyNumber}<span>回覆</span></div>
        <div className={style.data}>{likeNumber}<span >喜歡次數</span></div>
      </div>
      <div className={style.iconContainer}>
        <div className={style.icon}>
          <Reply />
        </div>
        <div className={style.icon}>
          <Like />
        </div>
      </div>
    </div>


  )
}
export default MainTweet

{/* <div className={style.buttonContainer}>
        <button className={style.button} type="button">編輯個人資料</button>
      </div>
      <div className={style.textContainer}>
        <h5 className={style.name}>hkjhuhuh</h5>
        <span className={style.account}>@hkjhuhuh</span>
        <p>每次角度傍晚時畢竟⋯自己很認家的綠以為我這樣⋯的生的原因大概也信任，了沒多久能抱歉我。
        </p>
        <div className={style.linkGroup}>
          <Link to="" className={style.link}>321個<span>跟隨中</span></Link>
          <Link to="" className={style.link}>31個<span>跟隨者</span></Link>
        </div>
      </div>
    </div > */}