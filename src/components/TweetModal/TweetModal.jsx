import style from "./TweetModal.module.scss"

// avatar會拿掉改成接props
import avatar from '../../assets/icons/avatar.svg'


const TweetModal = (onClose) => {

  return (
    <div className={style.background}>
      <div className={style.container}>
        <div className={style.buttonContainer}>
          <button className={style.saveButton} onClick={() => onClose(false)}> X </button>
        </div>
        {/* 底下layout 未完成 */}
        <div className={style.ContentContainer}>
          <div className={`${style.avatarContainer} ${style.down}`}>
            <img src={avatar} alt="avatar" />
          </div>
          <textarea style={{ resize: 'none', width: '88%' }}></textarea>
          <button className={style.button}>回覆</button>
        </div>
      </div>
    </div>
  )
}
export default TweetModal
// { resize: 'none', width: '528px', height: '300px' }
