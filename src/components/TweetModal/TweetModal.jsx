import style from "./TweetModal.module.scss"
import { useState } from 'react';
import { postTweets } from "../../apis/tweet";
import { useAuth } from "../../context/AuthContext"
import Swal from 'sweetalert2';
// avatar會拿掉改成接props
import avatar from '../../assets/icons/avatar.svg'
import { useNavigate } from "react-router-dom";


const TweetModal = ({open,onClose,User}) => {

  const [tweetText, setTweetText] =useState('');//要填預設值
    const [message, setMessage] = useState('')
    const {user} =useAuth();
    const navigate = useNavigate();

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
    
        const { success } = await postTweets(tweetText)
        console.log(success)
        if (success) {
          Swal.fire({
            title: '內容成功提交',
            icon: 'success',
            showConfirmButton: false,
            timer: 3000,
            position: 'top',
          });
          onClose(false)
          return
        }
        setTweetText('');
        navigate (`${user.id}`);//要測試
        window.location.reload();//直接刷新頁面
     
      }

  return open ? (
    <div className={style.background}>
      <div className={style.container}>
        <div className={style.buttonContainer}>
          <button className={style.saveButton} onClick={() => onClose(false)}> X </button>
        </div>
        {/* 底下layout 未完成 */}
        <div className={style.ContentContainer}>
          <div className={`${style.avatarContainer} ${style.down}`}>
            <img src={user.avatar}  alt="avatar" />
          </div>
          <textarea 
          style={{ resize: 'none', width: '88%' }} 
          value={tweetText} 
          onChange={(e)=>setTweetText(e.target.value)}
          placeholder="有什麼新鮮事?"> </textarea>
          <button className={style.button} onClick={handleSubmit}>推文</button>
        </div>
      </div>
    </div>
  ):null;
}
export default TweetModal
// { resize: 'none', width: '528px', height: '300px' }
