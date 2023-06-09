import style from "./ReplyModal.module.scss"
import avatar from '../../assets/icons/avatar.svg'

const ReplyModal = (onClose) => {
  return (
    <div className={style.background}>
      <div className={style.container}>
        <header className={style.header}>

          <button className={style.saveButton} onClick={() => onClose(false)}> 儲存 </button>
        </header>

        <div className={style.avatarContainer}>
          <img src={avatar} alt="avatar" />
        </div>

        <div className={style.inputContainer}>
        </div>
      </div>
    </div>
  )
}
export default ReplyModal

