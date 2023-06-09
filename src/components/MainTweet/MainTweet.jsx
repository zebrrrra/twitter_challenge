import style from "./MainTweet.module.scss"
import { ReactComponent as Like } from "../../assets/icons/outlinedlike.svg"
import { ReactComponent as Reply } from "../../assets/icons/outlinedreply.svg"
import avatar from '../../assets/icons/avatar.svg'
import ReplyModal from "../ReplyModal/ReplyModal"
import { useState } from "react"

const MainTweet = ({ replyNumber = 34, likeNumber = 808, name = 'apple', account = "euhue", introduction = "Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt. ", createdAt = "上午0:00・0000年0月0日" }) => {
  const [openModal, setOpenModal] = useState(false)
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
          <p className={style.introduction}>{introduction}</p>
          <p className={style.time}>{createdAt}</p>
        </div>
        <div className={style.dataContainer}>
          <div className={style.data}>{replyNumber}<span>回覆</span></div>
          <div className={style.data}>{likeNumber}<span >喜歡次數</span></div>
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
      {openModal && <ReplyModal open={openModal} onClose={(value) => setOpenModal(value)} />}
    </>


  )
}
export default MainTweet
