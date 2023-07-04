import style from "./ChatMessages.module.scss"
import ChatMessage from "../ChatMessage/ChatMessage";
import StateMessage from "../StateMessage/StateMessage";
import { useAuth } from "../../context/AuthContext"

const ChatMessages = () => {
  const { onlineMessages, offlineMessages, user } = useAuth()

  return (
    <div className={style.ChatMessagesContainer}>
      {console.log(onlineMessages)}
      {console.log(offlineMessages)}

      {onlineMessages?.map(m => (<StateMessage message={m} key={m} />))}
      {!user && offlineMessages?.map(m => (<StateMessage message={m} key={m} />))}

      <ChatMessage isOwner={true} />
      <ChatMessage isOwner={false} />
    </div>
  )
}
export default ChatMessages