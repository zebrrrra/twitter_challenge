import style from "./TweetModal.module.scss"
import { useAuth } from "../../context/AuthContext"
import { ReactComponent as Close } from "../../assets/icons/orangeClose.svg";
import { ReactComponent as Back } from "../../assets/icons/back.svg";
import useTweet from "../../hooks/TweetHook";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  position: 'absolute',
  bottom: '50%',
  left: '50%',
};

const TweetModal = ({ open, onClose }) => {
  const { user } = useAuth();
  const { mutation, message, tweetText, setTweetText } = useTweet(onClose)

  const userAvatar = localStorage.getItem('avatar') ? localStorage.getItem('avatar') : user.avatar

  if (!open) return
  return (
    <>
      <div className={style.background}>
        <div className={`${style.container} ${mutation.isLoading && `${style.isLoading}`}`}>
          <div className={style.buttonContainer}>
            <button onClick={() => onClose(false)}>
              <Close className={style.closeButton} />
              <Back className={style.backButton} />
            </button>
          </div>
          <div className={style.ContentContainer}>
            <div className={`${style.avatarContainer} ${style.down}`}>
              <img src={userAvatar} alt="avatar" />
            </div>
            <div className={style.textareaContainer}>
              <ClipLoader size={60} color='#cccccc' loading={mutation.isLoading} cssOverride={override} />
              <textarea
                style={{ resize: 'none', width: '88%' }}
                value={tweetText}
                onChange={(e) => setTweetText(e.target.value)}
                placeholder="有什麼新鮮事?">
              </textarea>
              <small className={style.small}>{message}</small>
            </div>
            <button className={style.button} onClick={() => mutation.mutate()} disabled={mutation.isLoading}>推文</button>
          </div>
        </div>
      </div>
    </>
  );
}
export default TweetModal