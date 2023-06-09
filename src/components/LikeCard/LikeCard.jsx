import likeIcon from '../../assets/icon/like_1.svg';
import isLikeIcon from '../../assets/icon/like.svg';
import replyIcon from '../../assets/icon/reply_1.svg'
import { ReactComponent as Avatar } from '../../assets/icon/img.svg'
import style from './LikeCard.module.scss';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {useState} from 'react';

dayjs.extend(relativeTime);
dayjs.locale('zh-tw');
//要算時間用-先保留試著用Day.js
function getTime(createdAt) {
    const currentTime = dayjs();
    const createdTime = dayjs(createdAt);

    if (currentTime.diff(createdTime, 'hour') < 24) {
        return createdTime.fromNow();//day.js的套件
    } else {
        return createdTime.format('YYYY/MM/DD');
    }
}


const LikeCard = ({ like }) => {

    const {
        Tweet:{
        User: {name,account,avatar}= {},

        description,
        repliesCount,
        likesCount,
        createdAt,}={},
        isCurrentUserLiked,
    } = like;
    //如果圖片不存在或讀不出來使用預設圖片
    const [imgSrc, setImgSrc] =useState(avatar||Avatar);
    const handleError =()=>{
        setImgSrc(Avatar);
    }
            return (
                <>
                    <div className={style.tweetCardContainer}>
                    <div className={style.tweetCard}>
                        <img src={imgSrc} onError={handleError}className={style.avatar} alt="avatar"/>
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
                                    <img src={replyIcon} alt="reply" />{repliesCount}</div>
                                <div className={style.count}>
                                    <img src={isCurrentUserLiked? isLikeIcon:likeIcon} alt="like" />{likesCount}</div>
                            </div>
                        </div>

                    </div>
                    </div>
                </>
            );
 
    }


export default LikeCard;