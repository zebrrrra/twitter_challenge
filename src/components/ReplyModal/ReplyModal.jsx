import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import style from "./ReplyModal.module.scss"
import { ReactComponent as Line } from "../../assets/icons/line.svg"
import { useAuth } from "../../context/AuthContext"
import { useState } from "react"
import Swal from "sweetalert2"
import { postATweetReply } from "../../apis/tweet"
import { useLocation } from 'react-router-dom';

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
  onClose, open, tweetId, tweet, currentUserAvatar, onReplySubmit }) => {
  const [comment, setComment] = useState('')
  const [message, setMessage] = useState('')
  // const { user, payload } = useAuth()
  const location = useLocation()

  const isReplyPage = location.pathname === `/tweets/${tweetId}`

  if (!open) return

  const userAvatar = localStorage.getItem('avatar')

  const { description, createdAt, User } = tweet || {}
  const { account, avatar, name } = User || {}

  const isError = !comment.trim() || comment.length > 140

  const handleReplyClick = async () => {
    if (!comment.trim()) {
      Swal.fire({
        title: '內容不可空白',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        position: 'top',
      });
      setMessage('內容不可空白')
      return
    }
    if (comment.length > 140) {
      Swal.fire({
        title: '內容超出上限',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        position: 'top',
      });
      setMessage('內容不可超過140字')
      return
    }

    const { success } = await postATweetReply({ tweetId, comment })
    console.log(success)
    if (success) {
      Swal.fire({
        title: '內容成功提交',
        icon: 'success',
        showConfirmButton: false,
        timer: 3000,
        position: 'top',
      });

      if (isReplyPage) {
        onReplySubmit(comment)
      }
      onClose(false)
      return
    }
  }

  return (
    <div className={style.background}>
      <div className={style.container}>
        <div className={style.buttonContainer}>
          <button className={style.saveButton} onClick={() => onClose(false)}> X </button>
        </div>

        <div className={style.ContentContainer}>
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
              <h5 className={style.name}>{name}<span>@{account}・{getTime(createdAt)}小時</span></h5>
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
                <button onClick={handleReplyClick}>回覆</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReplyModal