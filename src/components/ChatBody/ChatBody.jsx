import style from "./ChatBody.module.scss"
import ChatMessage from "../ChatMessage/ChatMessage";
import StateMessage from "../StateMessage/StateMessage";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ChatBody = ({ message, historyMessage }) => {
  return (
    <div className={style.chatBodyContainer} >

      {historyMessage.length === 0 && (<Skeleton count={8} className={style.skeleton} />)}

      {historyMessage[0]?.map((m, index) => (<ChatMessage message={m} key={index} />))}

      {message.map(({ isChat, message }, index) => isChat ? (<ChatMessage message={message} key={index} />) : (<StateMessage message={message} key={index} />))}

    </div>
  )
}
export default ChatBody