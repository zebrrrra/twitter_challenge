import avatar from '../../assets/Photo.png'
import style from './MainPost.module.scss';

const MainPost= () => {


    return(
        <div className={style.mainPostContainer}>
            <img className ={style.avatar} src = {avatar} alt="avatar"/>
            <div className={style.tweetArea}>
            <div className={style.tweetText}><input className={style.tweetText} type="text" placeholder="有什麼新鮮事？" required/></div>
            </div>
            <button className={style.tweetButton}>推文</button>

        </div>


    )

}

export default MainPost;