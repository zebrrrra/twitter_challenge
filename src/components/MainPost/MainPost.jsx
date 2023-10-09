import style from './MainPost.module.scss';
import { useNavigate } from 'react-router-dom';
import useTweet from '../../hooks/TweetHook';
import ClipLoader from "react-spinners/ClipLoader";

const MainPost = ({ user }) => {
  const navigate = useNavigate();
  const userAvatar = localStorage.getItem('avatar') ? localStorage.getItem('avatar') : user?.avatar
  const { mutation, message, tweetText, setTweetText } = useTweet()

  const handleSubmit = () => {
    mutation.mutate()
  }

  const handleAvatarClick = (userId) => {
    navigate(`/${userId}`);
  };

  if (!user) {
    return null;//可以改成加載loading
  }
  const override = {
    position: 'absolute',
    top: '115px'
  };

  return (
    <>
      <ClipLoader color='#cccccc' loading={mutation.isLoading} cssOverride={override} />
      <div className={`${style.mainPostContainer} ${mutation.isLoading && `${style.isLoading}`}`} >
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
        <button className={style.tweetButton} onClick={handleSubmit} disabled={mutation.isLoading}>推文</button>
      </div>
    </>
  )
}

export default MainPost;