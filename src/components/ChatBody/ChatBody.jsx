import style from "./ChatBody.module.scss"
import ChatMessage from "../ChatMessage/ChatMessage";
import StateMessage from "../StateMessage/StateMessage";

const ChatBody = ({ online, offline }) => {

  return (
    <div className={style.chatBodyContainer}>
      {console.log(online)}
      {console.log(offline)}

      {online?.map((m, index) => (<StateMessage message={m} key={index} />))}
      {offline?.map((m, index) => (<StateMessage message={m} key={index} />))}

      <ChatMessage isOwner={true} />
      <ChatMessage isOwner={false} />
    </div>
  )
}
export default ChatBody