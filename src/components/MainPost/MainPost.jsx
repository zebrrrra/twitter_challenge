import avatar from '../../assets/Photo.png'
import style from './MainPost.module.scss';
import { useState } from 'react';
import { postTweets } from '../../apis/tweet';

const MainPost= () => {
    const [tweetText, setTweetText] =useState ('');
    const handleSubmit =async () => {
        const data = await postTweets(tweetText);
        console.log(data);//測試
        setTweetText('');//傳完回到空值
    }
    
    return(
        <div className={style.mainPostContainer}>
            <img className ={style.avatar} src = {avatar} alt="avatar"/>
            <div className={style.tweetArea}>
            <div className={style.tweetText}>
                <input className={style.tweetText} 
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