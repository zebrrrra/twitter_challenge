import style from "./TweetModal.module.scss"
import { useState } from 'react';
import { postTweets } from "../../apis/tweet";
import { useAuth } from "../../context/AuthContext"
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";


const TweetModal = ({ open, onClose, onTweetSubmit }) => {

  const [tweetText, setTweetText] = useState('');//要填預設值
  const [message, setMessage] = useState('')
  const { user } = useAuth();
  const navigate = useNavigate();


  const userAvatar = localStorage.getItem('avatar') ? localStorage.getItem('avatar') : user.avatar

  const handleClick = () => {
    onClose(false)
  }
  const handleSubmit = async () => {
    if (!tweetText.trim()) {
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
    if (tweetText.length > 140) {
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

    const { status } = await postTweets(tweetText)
    if (status === 'success') {
      Swal.fire({
        title: '內容成功提交',
        icon: 'success',
        showConfirmButton: false,
        timer: 3000,
        position: 'top',
      });

      if (typeof onTweetSubmit === 'function'){
      onTweetSubmit(tweetText)
      return
    }
    onClose(false)}
    setTweetText('');
    //navigate(`/${user.id}`);//要測試
    // window.location.reload();//直接刷新頁面
  }
  if (!open) return
  return (
    <div className={style.background}>
      <div className={style.container}>
        <div className={style.buttonContainer}>
          <button className={style.saveButton} onClick={handleClick}> X </button>
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
// { resize: 'none', width: '528px', height: '300px' }
