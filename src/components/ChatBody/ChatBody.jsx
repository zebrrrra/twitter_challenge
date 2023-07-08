import style from "./ChatBody.module.scss"
import ChatMessage from "../ChatMessage/ChatMessage";
import StateMessage from "../StateMessage/StateMessage";

const ChatBody = ({ message, historyMessage }) => {


  return (
    <div className={style.chatBodyContainer} >

      {/* {console.log(historyMessage[0])} */}

      {historyMessage[0]?.map((m, index) => (<ChatMessage message={m} key={index} />))}

      {message.map(({ isChat, message }, index) => isChat ? (<ChatMessage message={message} key={index} />) : (<StateMessage message={message} key={index} />))}

    </div>
  )
}
export default ChatBody