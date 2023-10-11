import style from "./NoticeCard.module.scss"
import avatar from "../../assets/icons/avatar.svg"
import { YMDTimeFormat } from "../../apis/time"
const NoticeCard = ({ notice }) => {
  const { comment, createdAt,
    noticeMessage, description
    , user, userId, tweetId
  } = notice || {}

  return (
    <div className={style.noticeContainer}>
      <div className={style.noticeCard} >
        <img src={user.avatar} className={style.avatar} alt="avatar" />
        <div className={style.contentContainer}>
          <div className={style.nameAndUserId}>
            <span className={style.name}>{noticeMessage}</span>
            <span className={style.userIdTime}>{YMDTimeFormat(createdAt)}</span>
          </div>
          <div className={style.description}>
            {comment ? comment : description}
          </div>
        </div>
      </div>
    </div>
  )
}
export default NoticeCard