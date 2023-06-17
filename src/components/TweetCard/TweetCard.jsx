import { ReactComponent as LikeIcon } from '../../assets/icon/like_1.svg';
import { ReactComponent as IsLikeIcon } from '../../assets/icon/like.svg';
import { ReactComponent as Reply } from "../../assets/icons/outlinedreply.svg"
import ReplyModal from "../ReplyModal/ReplyModal"
import { useNavigate } from 'react-router-dom';
import style from './TweetCard.module.scss';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState, useEffect } from "react";
import { useAuth } from '../../context/AuthContext';
import { getUsers } from '../../apis/user';


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


const TweetCard = ({ User, tweet, onLike, onUnLike }) => {
    const [openModal, setOpenModal] = useState(false)
    const [currentUserAvatar, setCurrentUserAvatar] = useState(null)
    const { user } = useAuth()
    const currentUserId = user && user.id

    const navigate = useNavigate();

    const handleAvatarClick = (event, tweetOwnerId) => {
        event.stopPropagation();
        navigate(`/${tweetOwnerId}`);
    };

    const handleButtonClick = (e) => {
        e.stopPropagation()
        console.log('like:', onLike, 'unlike:', onUnLike, 'isCurrentUserLiked:', tweet.isCurrentUserLiked);
        if (tweet.isCurrentUserLiked) {
            onUnLike(tweet.id);
        } else {
            onLike(tweet.id);
        }
    };

    const handleModalClick = (e) => {
        e.stopPropagation();
        setOpenModal(true)
    }

    const handleReplyPageClick = (tweetId) => {

        navigate(`/tweets/${tweetId}`);
    }

    const {
        User: { name, account, avatar } = {},
        description,
        repliesCount,
        likesCount,
        createdAt,
        isCurrentUserLiked,
    } = tweet;


    return (
        <>
            <div className={style.tweetCardContainer}>
                <div className={style.tweetCard} onClick={() => handleReplyPageClick(tweet.id)}>
                    <img src={avatar} className={style.avatar} onClick={(event) => handleAvatarClick(event, tweet.User.id)} alt="avatar" />
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
                                <Reply className={style.replyIcon} onClick={handleModalClick}  />{repliesCount}</div>
                            <div className={style.count}>
                                {isCurrentUserLiked ?
                                    <IsLikeIcon className={style.isLikeIcon} onClick={handleButtonClick} />
                                    :
                                    <LikeIcon className={style.likeIcon} onClick={handleButtonClick} />
                                }
                                {likesCount}</div>
                        </div>
                    </div>

                </div>

            </div>
            {openModal && <ReplyModal open={openModal} onClose={(value) => setOpenModal(value)} User={User} tweet={tweet} tweetId={tweet.id} currentUserAvatar={currentUserAvatar} />}
        </>
    );

}

export default TweetCard



