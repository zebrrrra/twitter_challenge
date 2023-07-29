import style from "./TweetModal.module.scss"
import { useAuth } from "../../context/AuthContext"
import { ReactComponent as Close } from "../../assets/icons/orangeClose.svg";
import { ReactComponent as Back } from "../../assets/icons/back.svg";
import useTweet from "../../hooks/TweetHook";

const TweetModal = ({ open, onClose, onTweetSubmit }) => {
  const { user } = useAuth();
  const { tweetSubmit, message, tweetText, setTweetText } = useTweet(onTweetSubmit)

  const userAvatar = localStorage.getItem('avatar') ? localStorage.getItem('avatar') : user.avatar

  const handleClick = () => {
    onClose(false)
  }
  const handleSubmit = () => {
    tweetSubmit()
    if (Array.from(tweetText).length > 0) {
      onClose(false)
    }
  }

  if (!open) return
  return (
    <div className={style.background}>
      <div className={style.container}>
        <div className={style.buttonContainer}>
          <button onClick={handleClick}>
            <Close className={style.closeButton} />
            <Back className={style.backButton} />
          </button>
        </div>

        <div className={style.ContentContainer}>
          <div className={`${style.avatarContainer} ${style.down}`}>
            <img src={userAvatar} alt="avatar" />
          </div>
          <div className={style.textareaContainer}>
            <textarea
              style={{ resize: 'none', width: '88%' }}
              value={tweetText}
              onChange={(e) => setTweetText(e.target.value)}
              placeholder="有什麼新鮮事?">
            </textarea>
            <small className={style.small}>{message}</small>
          </div>
          <button className={style.button} onClick={handleSubmit}>推文</button>
        </div>
      </div>
    </div>
  );
}
export default TweetModal