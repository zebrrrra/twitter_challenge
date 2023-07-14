import style from "./ChatInput.module.scss"
import { useState } from "react"
import { ReactComponent as Send } from "../../assets/icons/send.svg"
import { useChat } from "../../context/ChatContext"

const ChatInput = () => {
  const [text, setText] = useState('')
  const socket = useChat()

  const handleSend = (e) => {
    e.preventDefault();

    if (socket) {
      const time = new Date()
      socket.emit('client-message', text, time)
      console.log('send', text, time)
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