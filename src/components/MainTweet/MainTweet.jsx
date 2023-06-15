//MainTweet.jsx
import style from "./MainTweet.module.scss"
import { ReactComponent as Like } from "../../assets/icons/outlinedlike.svg"
import { ReactComponent as Reply } from "../../assets/icons/outlinedreply.svg"
import ReplyModal from "../ReplyModal/ReplyModal"
import { useState } from "react"

const MainTweet = ({ User, detailTweet, tweetId }) => {
  const [openModal, setOpenModal] = useState(false)

  const { repliesCount, likesCount, description, createdAt } = detailTweet || {}

  const { account, avatar, name } = User || {}

  const handleClick = () => {
    setOpenModal(true)
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
          <p className={style.time}>{createdAt}</p>
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
            <Like />
          </div>
        </div>
      </div>
      {openModal && <ReplyModal open={openModal} onClose={(value) => setOpenModal(value)} User={User} detailTweet={detailTweet} tweetId={tweetId} />}
    </>

  )
}
export default MainTweet