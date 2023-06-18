import style from './MainPost.module.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postTweets } from "../../apis/tweet";
import Swal from 'sweetalert2';


const MainPost = ({ user, onTweetSubmit }) => {
  const [tweetText, setTweetText] = useState('');
  const [message, setMessage] = useState('')
  const navigate = useNavigate();
  const userAvatar = localStorage.getItem('avatar') ? localStorage.getItem('avatar') : user?.avatar

  // console.log(user?.avatar)
  // console.log(userAvatar)

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
    console.log(status)
    if (status === 'success') {
      Swal.fire({
        title: '內容成功提交',
        icon: 'success',
        showConfirmButton: false,
        timer: 3000,
        position: 'top',
      });
      setTweetText('');
      onTweetSubmit(tweetText)
      return
    }
    //window.location.reload();//直接刷新頁面
    navigate('/main');
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
        <div className={style.tweetText}>
          <textarea className={style.tweetText}
            type="text"
            placeholder="有什麼新鮮事？"
            value={tweetText}
            onChange={(e) => setTweetText(e.target.value)}
          /></div>
      </div>
      <button className={style.tweetButton} onClick={handleSubmit}>推文</button>
      {/*<button className={style.tweetButton} onClick={handleOpen}>推文</button>
      {openModal && <TweetModal open={openModal} onClose={(Value) => setOpenModal(Value)} onTweetSubmit={onTweetSubmit} />}
  */}
    </div>
    // TweetModal

  )

}

export default MainPost;