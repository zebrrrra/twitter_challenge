import { ReactComponent as LikeIcon } from '../../assets/icon/like_1.svg';
import { ReactComponent as IsLikeIcon } from '../../assets/icon/like.svg';
import { ReactComponent as Reply } from "../../assets/icons/outlinedreply.svg"
import ReplyModal from "../ReplyModal/ReplyModal"
import { useNavigate } from 'react-router-dom';
import style from './TweetCard.module.scss';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState } from "react";
import { useLike, useUnlike } from '../../hooks/LikeHook';

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


const TweetCard = ({ User, tweet, tweetId, userId }) => {
    const [openModal, setOpenModal] = useState(false)
    const [currentUserAvatar, setCurrentUserAvatar] = useState(null)
    const { likeMutation } = useLike({ tweetId, userId })
    const { unlikeMutation } = useUnlike({ tweetId, userId })
    const navigate = useNavigate();

    const handleAvatarClick = (event, tweetOwnerId) => {
        event.stopPropagation();
        navigate(`/${tweetOwnerId}`);
    };

    const handleUnlike = (e) => {
        e.stopPropagation()
        unlikeMutation.mutate()
    }

    const handleLike = (e) => {
        e.stopPropagation()
        likeMutation.mutate()
    }


    const handleModalClick = (e) => {
        e.stopPropagation();
        setOpenModal(true)
    }

    const handleReplyPageClick = (tweetId) => {
        navigate(`/tweets/${tweetId}`);
    }

    return (
        <>
            <div className={style.tweetCardContainer}>
                <div className={style.tweetCard} onClick={(e) => handleReplyPageClick(tweet.id, e)}>
                    <img src={tweet?.User?.avatar} className={style.avatar} onClick={(event) => handleAvatarClick(event, tweet.User.id)} alt="avatar" />
                    <div className={style.contentContainer}>
                        <div className={style.nameAndUserId}>
                            <span className={style.name}>{tweet?.User.name}</span>
                            <span className={style.userIdTime}>@{tweet?.User.account}・{getTime(tweet?.createdAt)}</span>
                        </div>
                        <div className={style.tweet}>
                            {tweet?.description}
                        </div>
                        <div className={style.countContainer}>
                            <div className={style.count}>
                                <Reply className={style.replyIcon} onClick={handleModalClick} />{tweet?.repliesCount}</div>
                            <div className={style.count}>
                                {tweet?.isCurrentUserLiked ?
                                    <IsLikeIcon className={style.isLikeIcon} onClick={handleUnlike} />
                                    :
                                    <LikeIcon className={style.likeIcon} onClick={handleLike} />
                                }
                                {tweet?.likesCount}</div>
                        </div>
                    </div>
                </div>
            </div>
            {openModal && <ReplyModal open={openModal} onClose={(value) => setOpenModal(value)} User={User} tweet={tweet} tweetId={tweet.id} currentUserAvatar={currentUserAvatar} />}
        </>
    );
}

export default TweetCard


