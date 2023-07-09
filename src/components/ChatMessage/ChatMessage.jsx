import style from "./ChatMessage.module.scss"
import { useRef, useEffect } from "react";

const ChatMessage = ({ message }) => {
  const { text, time, avatar, isOwner } = message
  const chatRef = useRef();

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [message])

  return (
    <div className={`${style.container} ${isOwner && style.owner}`} ref={chatRef}>
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