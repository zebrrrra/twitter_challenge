import style from "./MainTweet.module.scss"
import { useEffect, useState } from "react"
import { ReactComponent as LikeIcon } from '../../assets/icon/like_1.svg';
import { ReactComponent as IsLikeIcon } from '../../assets/icon/like.svg';
import { ReactComponent as Reply } from "../../assets/icons/outlinedreply.svg"
import ReplyModal from "../ReplyModal/ReplyModal"
import useLike from "../../hooks/LikeHook"

import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.locale('zh-tw');
function getTime(time) {
  const createdTime = dayjs(time);
  return createdTime.format('A hh:mm・YYYY年MM月DD日 ');
}

const MainTweet = ({ tweet, tweetId, onReplySubmit, setUpdateTag, onUnLike, onLike }) => {
  const [openModal, setOpenModal] = useState(false)
  const { likesCount, repliesCount, description, createdAt, User, isCurrentUserLiked } = tweet || {}

  const { account, avatar, name } = User || {}


  const handleClick = () => {
    setOpenModal(true)
  }

  const handleLikeClick = () => {
    if (isCurrentUserLiked) {
      onUnLike(tweetId);
    } else {
      onLike(tweetId);
    }
  }


  return (
    <>
      <div className={style.container}>
        <div className={style.tweetContainer}>
          <div className={style.titleContainer}>
            <div className={style.avatarContainer}>
              <img src={avatar} alt="avatar" />
            </div>
            <div className={style.nameContainer}>
              <h5 className={style.name}>{name}</h5>
              <span className={style.account}>@{account}</span>
            </div>
          </div>
          <p className={style.introduction}>{description}</p>
          <p className={style.time}>{getTime(createdAt)}</p>
        </div>
        <div className={style.dataContainer}>
          <div className={style.data}>{repliesCount}<span>回覆</span></div>
          <div className={style.data}>{likesCount}<span >喜歡次數</span></div>
        </div>
        <div className={style.iconContainer}>
          <div className={style.icon}>
            <Reply onClick={handleClick} />
          </div>
          <div className={style.icon}>
            {isCurrentUserLiked ?
              <IsLikeIcon className={style.isLikeIcon} onClick={handleLikeClick} />
              :
              <LikeIcon className={style.likeIcon} onClick={handleLikeClick} />
            }
          </div>
        </div>
      </div>
      {openModal && <ReplyModal open={openModal} onClose={(value) => setOpenModal(value)} tweet={tweet} tweetId={tweetId} onReplySubmit={onReplySubmit} />}
    </>

  )
}
export default MainTweet