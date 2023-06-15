import style from "./ReplyModal.module.scss"
// avatar會拿掉改成接props
import avatar from '../../assets/icons/avatar.svg'
import { ReactComponent as Line } from "../../assets/icons/line.svg"

// 接收來自MainTweet的props
// createdAt從父傳來後需經過處理
const ReplyModal = ({
  onClose, open, name, account, introduction, createdAt = 3 }) => {

  if (!open) return
  return (
    <div className={style.background}>
      <div className={style.container}>
        <div className={style.buttonContainer}>
          <button className={style.saveButton} onClick={() => onClose(false)}> X </button>
        </div>

        <div className={style.ContentContainer}>
          <div className={style.leftContainer}>
            <div className={`${style.avatarContainer} ${style.top}`}>
              <img src={avatar} alt="avatar" />
            </div>
            <Line className={style.line} />
            <div className={`${style.avatarContainer} ${style.down}`}>
              <img src={avatar} alt="avatar" />
            </div>
          </div>
          <div className={style.rightContainer}>
            <div className={style.rightTopContainer}>
              <h5 className={style.name}>{name}<span>@{account}・{createdAt}小時</span></h5>
              <p className={style.introduction}>{introduction}</p>
              <p className={style.hint}>回覆給<span>@{account}</span></p>
            </div>
            <div className={style.rightBottomContainer}>
              <div className={style.tweetText}>
                <input className={style.tweetText} type="text" placeholder="推你的回覆" required />
              </div>
              <button>回覆</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ReplyModal
