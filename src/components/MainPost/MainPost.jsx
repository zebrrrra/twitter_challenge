import style from './MainPost.module.scss';
import { useState } from 'react';
import { postTweets } from '../../apis/tweet';
import { async } from 'q';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
const MainPost= ( {user} ) => {
    const [tweetText, setTweetText] =useState ('');
    const [message, setMessage] = useState('')
    const navigate =useNavigate();


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
          return
        }
        setTweetText('');
        navigate (`/AC_twitter_frontend/main`);
        //window.location.reload();//直接刷新頁面
        
        
      }
    

    if(!user){
        return null;//可以改成加載loading
    }
    return(
        <div className={style.mainPostContainer}>
            <img className={style.avatar} src= {user.avatar} alt="avatar"/>
            <div className={style.tweetArea}>
            <div className={style.tweetText}>
                <textarea className={style.tweetText} 
                type="text" 
                placeholder="有什麼新鮮事？" 
                required
                value={tweetText}
                onChange={(e)=>setTweetText(e.target.value)}/></div>
            </div>
            <button className={style.tweetButton} onClick={handleSubmit}>推文</button>

        </div>


    )

    }

export default MainPost;