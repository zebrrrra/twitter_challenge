import {ReactComponent as LikeIcon} from '../../assets/icon/like_1.svg';
import {ReactComponent as IsLikeIcon} from '../../assets/icon/like.svg';
import replyIcon from '../../assets/icon/reply_1.svg'
import style from './OpenTweet.module.scss';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { getATweets } from '../../apis/tweet';
dayjs.extend(localizedFormat);
dayjs.locale('zh-tw');
function getTime(createdAt) {
    const createdTime = dayjs(createdAt);
        return createdTime.format('h:mmA·YYYY/MM/DD');
    }



const OpenTweet = ({ tweet,onLike,onUnLike }) => {
    const handleButtonClick =  () =>{
        console.log('like:',onLike, 'unlike:', onUnLike,'isCurrentUserLiked:', tweet.isCurrentUserLiked);
        if (tweet.isCurrentUserLiked){
         onUnLike (tweet.id);
        } else{
            onLike (tweet.id);
        }
    };
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
                    <img src={avatar} className={style.avatar} alt="avatar"/>
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
                            {likesCount} 喜歡次數
                               {isCurrentUserLiked? 
                                    <IsLikeIcon className={style.isLikeIcon} onClick={handleButtonClick}/>
                                    :
                                    <LikeIcon className={style.likeIcon} onClick={handleButtonClick} />
                                }
                                </div>
                        </div>
                    </div>

                </div>
                </div>
            </>
        );

}

export default OpenTweet;
