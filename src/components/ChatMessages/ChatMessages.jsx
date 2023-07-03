import style from "./ChatMessages.module.scss"
import ChatMessage from "../ChatMessage/ChatMessage";
import StateMessage from "../StateMessage/StateMessage";
import { useAuth } from "../../context/AuthContext"

const ChatMessages = () => {
  const { onlineMessages } = useAuth()


  return (
    <div className={style.ChatMessagesContainer}>
      {console.log(onlineMessages)}
      {onlineMessages?.map(m => (<StateMessage message={m} key={m} />))}
      <ChatMessage isOwner={true} />
      <ChatMessage isOwner={false} />
    </div>
  )
}
export default ChatMessages