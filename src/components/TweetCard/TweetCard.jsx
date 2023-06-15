import {ReactComponent as LikeIcon} from '../../assets/icon/like_1.svg';
import {ReactComponent as IsLikeIcon} from '../../assets/icon/like.svg';
import { ReactComponent as Reply } from "../../assets/icons/outlinedreply.svg"
import ReplyModal from "../ReplyModal/ReplyModal"
import { useNavigate } from 'react-router-dom';
import style from './TweetCard.module.scss';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState } from "react";


dayjs.extend(relativeTime);
dayjs.locale('zh-tw');
function getTime(createdAt) {
    const currentTime = dayjs();
    const createdTime = dayjs(createdAt);

    if (currentTime.diff(createdTime, 'hour') < 24) {
        return createdTime.fromNow();//day.js的套件
    } else {
        return createdTime.format('YYYY/MM/DD');
    }
}


const TweetCard = ({ User,tweetId,tweet,onLike,onUnLike }) => {
    const [openModal, setOpenModal] = useState(false)
    const navigate = useNavigate();
    


    const handleAvatarClick = (userId) => {
        navigate(`/${userId}`);
      };

    const handleButtonClick =  () =>{
        console.log('like:',onLike, 'unlike:', onUnLike,'isCurrentUserLiked:', tweet.isCurrentUserLiked);
        if (tweet.isCurrentUserLiked){
         onUnLike (tweet.id);
        } else{
            onLike (tweet.id);
        }
    };

    const handleClick = () => {
        setOpenModal(true)
      }
      
    const {
        User: {name,account,avatar}= {},
        description,
        repliesCount,
        likesCount,
        createdAt,
        isCurrentUserLiked,
    } = tweet;


        return (
            <>
                <div className={style.tweetCardContainer}>
                <div className={style.tweetCard}>
                     <img src={avatar} className={style.avatar}  onClick={() => handleAvatarClick(tweet.User.id)}alt="avatar"/>
                    <div className={style.contentContainer}>
                        <div className={style.nameAndUserId}>
                            <span className={style.name}>{name}</span>
                            <span className={style.userIdTime}>@{account}・{getTime(createdAt)}</span>
                        </div>
                        <div className={style.tweet}>
                            {description}
                        </div>
                        <div className={style.countContainer}>
                            <div className={style.count}>
                            <Reply onClick={handleClick} className={style.count}/>{repliesCount}</div>
                            <div className={style.count}>
                               {isCurrentUserLiked? 
                                    <IsLikeIcon className={style.isLikeIcon} onClick={handleButtonClick}/>
                                    :
                                    <LikeIcon className={style.likeIcon} onClick={handleButtonClick} />
                                }
                                {likesCount}</div>
                        </div>
                    </div>

                </div>
               
                </div>
                {openModal && <ReplyModal open={openModal} onClose={(value) => setOpenModal(value)} User={User} tweet={tweet} tweetId={tweetId} />}
            </>
        );

}

export default TweetCard


