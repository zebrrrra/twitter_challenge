import style from "./ChatBody.module.scss"
import ChatMessage from "../ChatMessage/ChatMessage";
import StateMessage from "../StateMessage/StateMessage";

const ChatBody = ({ message }) => {

  return (
    <div className={style.chatBodyContainer}>

      {message.map(({ isChat, message }, index) => isChat ? (<ChatMessage message={message} key={index} />) : (<StateMessage message={message} key={index} />))}

    </div>
  )
}
export default ChatBody