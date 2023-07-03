import style from "./ChatRoom.module.scss"
import ChatInput from "../ChatInput/ChatInput"
import ChatMessages from "../ChatMessages/ChatMessages"
import { useAuth } from "../../context/AuthContext"
const ChatRoom = ({ headerContext = '公開聊天室' }) => {
  return (
    <>
      <div className={style.HeaderContainer}>
        {headerContext}
      </div>
      <ChatMessages />
      <ChatInput />
    </>
  )
}
export default ChatRoom