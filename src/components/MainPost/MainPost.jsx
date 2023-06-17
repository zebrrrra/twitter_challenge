import style from './MainPost.module.scss';
import { useState } from 'react';
import { postTweets } from '../../apis/tweet';
import { async } from 'q';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import TweetModal from '../TweetModal/TweetModal';
import { Value } from 'sass';
const MainPost = ({ user }) => {
  // const [tweetText, setTweetText] = useState('');
  // const [message, setMessage] = useState('')
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false)

  const handleOpen = () => {
    setOpenModal(true)
  }

  if (!user) {
    return null;//可以改成加載loading
  }
  return (
    <div className={style.mainPostContainer} >
      <img className={style.avatar} src={user.avatar} alt="avatar" />
      <div className={style.tweetArea}>
        <div className={style.tweetText}>
          <textarea className={style.tweetText}
            type="text"
            placeholder="有什麼新鮮事？"
            readOnly
          /></div>
      </div>
      <button className={style.tweetButton} onClick={handleOpen}>推文</button>
      {openModal && <TweetModal open={openModal} onClose={(Value) => setOpenModal(Value)} />}

    </div>
    // TweetModal

  )

}

export default MainPost;