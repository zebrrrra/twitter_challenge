import style from "./ChatMessage.module.scss"
const ChatMessage = ({ message }) => {
  const { text, time, avatar, isOwner } = message

  return (
    <div className={`${style.container} ${isOwner && style.owner}`}>
      <div className={style.avatarContainer}>
        <img
          src={avatar}
          alt=""
        />
      </div>
      <div className={style.contentContainer}>
        {isOwner ? (<p>{text}</p>) : (<p>{text}</p>)}
        <span>{time}</span>
      </div>
    </div>
  )
}
export default ChatMessage