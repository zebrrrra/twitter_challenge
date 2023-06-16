//ReplyModal.jsx
import style from "./ReplyModal.module.scss"
import { ReactComponent as Line } from "../../assets/icons/line.svg"
import { useAuth } from "../../context/AuthContext"
import { useState } from "react"
import Swal from "sweetalert2"
import { postATweetReply } from "../../apis/tweet"


// 需要getuser，關掉modal後拉api，更新底下回覆list

const ReplyModal = ({
  onClose, open, User, tweetId, tweet }) => {
  const [comment, setComment] = useState('')
  const [message, setMessage] = useState('')
  const { user } = useAuth()

  if (!open) return
  console.log(tweet)
  console.log(tweetId)//從點內文來 有值
  console.log(User)

  const { description, createdAt } = tweet || {}

  const { account, avatar, name } = User || {}
  // console.log(User)
  // console.log(user)//登入使用者
  const isError = !comment.trim() || comment.length > 140

  const handleReplyClick = async () => {
    if (!comment.trim()) {
      Swal.fire({
        title: '內容不可空白',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        position: 'top',
      });
      setMessage('內容不可空白')
      return
    }
    if (comment.length > 140) {
      Swal.fire({
        title: '內容超出上限',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        position: 'top',
      });
      setMessage('內容不可超過140字')
      return
    }

    const { success } = await postATweetReply({ tweetId, comment })
    console.log(success)
    if (success) {
      Swal.fire({
        title: '內容成功提交',
        icon: 'success',
        showConfirmButton: false,
        timer: 3000,
        position: 'top',
      });
      onClose(false)
      return
    }
  }

  return (
    <div className={style.background}>
      <div className={style.container}>
        <div className={style.buttonContainer}>
          <button className={style.saveButton} onClick={() => onClose(false)}> X </button>
        </div>

        <div className={style.ContentContainer}>
          <div className={style.leftContainer}>
            <div className={`${style.avatarContainer} ${style.top}`}>
              <img src={avatar} alt="推文者avatar" />
            </div>
            <Line className={style.line} />
            <div className={`${style.avatarContainer} ${style.down}`}>
              <img src={user.avatar} alt="回覆者avatar" />
            </div>
          </div>
          <div className={style.rightContainer}>
            <div className={style.rightTopContainer}>
              <h5 className={style.name}>{name}<span>@{account}・{createdAt}小時</span></h5>
              <p className={style.introduction}>{description}</p>
              <p className={style.hint}>回覆給<span>@{user.account}</span></p>
            </div>
            <div className={style.rightBottomContainer}>
              <div className={style.tweetText}>
                <input className={style.tweetText} type="text" placeholder="推你的回覆" required onChange={(e) => setComment(e.target.value)} />
              </div>
              <div className={style.ReplyButtonContainer}>
                {isError && <small>{message}</small>}
                <button onClick={handleReplyClick}>回覆</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReplyModal
// const ReplyModal = ({
//   onClose, open, User, detailTweet, tweetId, tweet }) => {
//   const [comment, setComment] = useState('')
//   const [message, setMessage] = useState('')
//   const { user } = useAuth()

//   if (!open) return
//   const { account, avatar, name } = User || {}
//   const { description, createdAt } = detailTweet || {}
//   // console.log(User)
//   // console.log(user)//登入使用者
//   const isError = !comment.trim() || comment.length > 140

//   const handleReplyClick = async () => {
//     if (!comment.trim()) {
//       Swal.fire({
//         title: '內容不可空白',
//         icon: 'error',
//         showConfirmButton: false,
//         timer: 2000,
//         position: 'top',
//       });
//       setMessage('內容不可空白')
//       return
//     }
//     if (comment.length > 140) {
//       Swal.fire({
//         title: '內容超出上限',
//         icon: 'error',
//         showConfirmButton: false,
//         timer: 2000,
//         position: 'top',
//       });
//       setMessage('內容不可超過140字')
//       return
//     }

//     const { success } = await postATweetReply({ tweetId, comment })
//     console.log(success)
//     if (success) {
//       Swal.fire({
//         title: '內容成功提交',
//         icon: 'success',
//         showConfirmButton: false,
//         timer: 3000,
//         position: 'top',
//       });
//       onClose(false)
//       return
//     }
//   }

//   return (
//     <div className={style.background}>
//       <div className={style.container}>
//         <div className={style.buttonContainer}>
//           <button className={style.saveButton} onClick={() => onClose(false)}> X </button>
//         </div>

//         <div className={style.ContentContainer}>
//           <div className={style.leftContainer}>
//             <div className={`${style.avatarContainer} ${style.top}`}>
//               <img src={avatar} alt="推文者avatar" />
//             </div>
//             <Line className={style.line} />
//             <div className={`${style.avatarContainer} ${style.down}`}>
//               <img src={user.avatar} alt="回覆者avatar" />
//             </div>
//           </div>
//           <div className={style.rightContainer}>
//             <div className={style.rightTopContainer}>
//               <h5 className={style.name}>{name}<span>@{account}・{createdAt}小時</span></h5>
//               <p className={style.introduction}>{description}</p>
//               <p className={style.hint}>回覆給<span>@{user.account}</span></p>
//             </div>
//             <div className={style.rightBottomContainer}>
//               <div className={style.tweetText}>
//                 <input className={style.tweetText} type="text" placeholder="推你的回覆" required onChange={(e) => setComment(e.target.value)} />
//               </div>
//               <div className={style.ReplyButtonContainer}>
//                 {isError && <small>{message}</small>}
//                 <button onClick={handleReplyClick}>回覆</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }