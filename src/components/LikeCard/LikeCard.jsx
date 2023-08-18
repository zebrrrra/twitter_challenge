import { ReactComponent as LikeIcon } from '../../assets/icon/like_1.svg';
import { ReactComponent as IsLikeIcon } from '../../assets/icon/like.svg';
import { ReactComponent as Reply } from "../../assets/icons/outlinedreply.svg"
import style from './LikeCard.module.scss';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import ReplyModal from "../ReplyModal/ReplyModal"
import { useNavigate } from 'react-router-dom';
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



const LikeCard = ({ User, like, tweetId, userId }) => {
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


    const {
        Tweet: {
            User: { name, account, avatar } = {},
            description,
            repliesCount,
            likesCount,
            createdAt,
        } = {},
        isCurrentUserLiked,
    } = like;

    //如果圖片不存在或讀不出來使用預設圖片

    return (
        <>
            <div className={style.tweetCardContainer}>
                <div className={style.tweetCard} onClick={() => handleReplyPageClick(like.Tweet.id)}>
                    <img src={avatar} className={style.avatar} onClick={(event) => handleAvatarClick(event, like.Tweet.User.id)} alt="avatar" />
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
                                <Reply className={style.replyIcon} onClick={handleModalClick} />{repliesCount}</div>
                            <div className={style.count}>
                                {isCurrentUserLiked ?
                                    <IsLikeIcon className={style.isLikeIcon} onClick={handleUnlike} />
                                    :
                                    <LikeIcon className={style.likeIcon} onClick={handleLike} />
                                }
                                {likesCount}</div>
                        </div>
                    </div>

                </div>
            </div>
            {openModal && <ReplyModal open={openModal} onClose={(value) => setOpenModal(value)} User={User} tweet={like.Tweet} tweetId={like.Tweet.id} currentUserAvatar={currentUserAvatar} />}
        </>
    );

}


export default LikeCard;