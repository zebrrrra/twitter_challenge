import style from "./TweetModal.module.scss"
import { useState } from 'react';
import { postTweets } from "../../apis/tweet";

// avatar會拿掉改成接props
import avatar from '../../assets/icons/avatar.svg'


<<<<<<< HEAD
const TweetModal = ({open,onClose}) => {
const [tweetText, setTweetText] =useState('');//要填預設值
const handleSubmit =async () =>{
  const data = await postTweets(tweetText);
  console.log (data);//測試用
  setTweetText('');//傳完回到空值
}
=======
const TweetModal = ({ open, onClose }) => {
  const [tweetText, setTweetText] = useState('有什麼新鮮事?');//要填預設值
  const handleSubmit = async () => {
    const data = await postTweets(tweetText);
    console.log(data);//測試用
    setTweetText('');//傳完回到空值
  }
>>>>>>> main

  return open ? (
    <div className={style.background}>
      <div className={style.container}>
        <div className={style.buttonContainer}>
          <button className={style.saveButton} onClick={() => onClose(false)}> X </button>
        </div>
        {/* 底下layout 未完成 */}
        <div className={style.ContentContainer}>
          <div className={`${style.avatarContainer} ${style.down}`}>
            <img src={avatar} alt="avatar" />
          </div>
<<<<<<< HEAD
          <textarea 
          style={{ resize: 'none', width: '88%' }} 
          value={tweetText} 
          onChange={(e)=>setTweetText(e.target.value)}
          placeholder="有什麼新鮮事?"> </textarea>
=======
          <textarea style={{ resize: 'none', width: '88%' }} value={tweetText} onChange={(e) => setTweetText(e.target.value)}> </textarea>
>>>>>>> main
          <button className={style.button} onClick={handleSubmit}>推文</button>
        </div>
      </div>
    </div>
  ):null;
  ) : null;
}
export default TweetModal
// { resize: 'none', width: '528px', height: '300px' }
