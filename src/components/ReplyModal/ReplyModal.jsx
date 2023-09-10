import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import style from "./ReplyModal.module.scss"
import { ReactComponent as Line } from "../../assets/icons/line.svg"
import { ReactComponent as Close } from "../../assets/icons/orangeClose.svg";
import { ReactComponent as Back } from "../../assets/icons/back.svg";
import { useAuth } from "../../context/AuthContext"
import { useState } from "react"
import useReply from '../../hooks/ReplyHook';
import { ClipLoader } from 'react-spinners';
dayjs.extend(relativeTime);
dayjs.locale('zh-tw');
function getTime(createdAt) {
  const currentTime = dayjs();
  const createdTime = dayjs(createdAt);

  if (currentTime.diff(createdTime, 'hour') < 24) {
    return createdTime.fromNow();//day.js的套件
  } else {
    return createdTime.format('YYYY/MM/DD');
  }
}

const ReplyModal = ({
  onClose, open, tweetId, tweet }) => {
  const [comment, setComment] = useState('')
  const { user } = useAuth()
  const userAvatar = localStorage.getItem('avatar') ? localStorage.getItem('avatar') : user.avatar
  const { description, createdAt, User } = tweet || {}
  const { account, avatar, name } = User || {}
  const { mutation, message } = useReply({ id: tweetId, comment, tweetOwnerId: User.id, onClose })
  const isError = !comment.trim() || comment.length > 140
  const override = {
    position: 'absolute',
    top: '45%',
    left: '45%',
  };

  if (!open) return
  return (
    <div className={style.background}>
      <div className={`${style.container} ${mutation.isLoading && `${style.isLoading}`}`}>
        <div className={style.buttonContainer}>
          <button className={style.saveButton} onClick={() => onClose(false)}>
            <Close className={style.closeButton} />
            <Back className={style.backButton} />
          </button>
        </div>
        <div className={style.ContentContainer}>
          <ClipLoader size={60} color='#cccccc' loading={mutation.isLoading} cssOverride={override} />
          <div className={style.leftContainer}>
            <div className={`${style.avatarContainer} ${style.top}`}>
              <img src={avatar} alt="推文者avatar" />
            </div>
            <Line className={style.line} />
            <div className={`${style.avatarContainer} ${style.down}`}>
              <img src={userAvatar} alt="回覆者avatar" />
            </div>
          </div>
          <div className={style.rightContainer}>
            <div className={style.rightTopContainer}>
              <h5 className={style.name}>{name}<span>@{account}・{getTime(createdAt)}</span></h5>
              <p className={style.introduction}>{description}</p>
              <p className={style.hint}>回覆給<span>@{account}</span></p>
            </div>
            <div className={style.rightBottomContainer}>
              <textarea
                style={{ resize: 'none', width: '88%' }}
                className={style.tweetText}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="推你的回覆"></textarea>
              <div className={style.ReplyButtonContainer}>
                {isError && <small>{message}</small>}
                <button onClick={mutation.mutate} disabled={mutation.isLoading}>回覆</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReplyModal