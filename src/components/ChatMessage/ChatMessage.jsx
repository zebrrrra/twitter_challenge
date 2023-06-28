import style from "./ChatMessage.module.scss"
import avatar from "../../assets/icons/avatar.svg"
const ChatMessage = () => {
  //TODO 判斷message的擁有者，若是發送message的人看到會是加上owner的樣式，他人則是無owner樣式
  return (
    <div className={`${style.container} ${style.owner}`}>
      <div className={style.avatarContainer}>
        <img
          src={avatar}
          alt=""
        />
      </div>
      <div className={style.contentContainer}>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque eligendi assumenda tempore unde maiores hic perspiciatis incidunt quis nostrum eos totam facere, quisquam excepturi eum id dignissimos aspernatur temporibus facilis.</p>
        <span>下午6:09</span>
      </div>
    </div>
  )
}
export default ChatMessage