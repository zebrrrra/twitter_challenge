import style from './MainPost.module.scss';
import { useNavigate } from 'react-router-dom';
import useTweet from '../../hooks/TweetHook';

const MainPost = ({ user, onTweetSubmit }) => {
  const navigate = useNavigate();
  const userAvatar = localStorage.getItem('avatar') ? localStorage.getItem('avatar') : user?.avatar
  const { tweetSubmit, message, tweetText, setTweetText } = useTweet(onTweetSubmit)

  const handleSubmit = () => {
    tweetSubmit()
  }

  const handleAvatarClick = (userId) => {
    navigate(`/${userId}`);
  };

  if (!user) {
    return null;//可以改成加載loading
  }
  return (
    <div className={style.mainPostContainer} >
      <img className={style.avatar} src={userAvatar} onClick={() => handleAvatarClick(user.id)} alt="avatar" />
      <div className={style.tweetArea}>
        <textarea className={style.tweetText}
          type="text"
          placeholder="有什麼新鮮事？"
          value={tweetText}
          onChange={(e) => setTweetText(e.target.value)}
        />
        <small className={style.small}>{message}</small>
      </div>
      <button className={style.tweetButton} onClick={handleSubmit}>推文</button>
    </div>
  )
}

export default MainPost;