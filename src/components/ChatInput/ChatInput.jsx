import style from "./ChatInput.module.scss"
import { useState } from "react"
import { ReactComponent as Send } from "../../assets/icons/send.svg"
import { useAuth } from "../../context/AuthContext"
import dayjs from 'dayjs';

const ChatInput = ({ onSelfSend }) => {
  const [text, setText] = useState('')
  const { socket } = useAuth()


  const handleSend = (e) => {
    e.preventDefault();

    if (socket) {
      const time = dayjs().format('YYYY-MM-DD HH:mm:ss')
      console.log(time)
      // FIXME 無法成功emit
      socket.emit('client-message', text, time)
      onSelfSend(text, time)
    }
    setText('')
  }


  return (
    <form className={style.container} onSubmit={handleSend}>
      <div className={style.inputContainer}>
        <input type="text" className={style.input} value={text} placeholder="輸入訊息..." onChange={(e) => setText(e.target.value)} />
      </div>
      <button className={style.button}>
        <Send className={style.send} />
      </button>
    </form>
  )
}
export default ChatInput