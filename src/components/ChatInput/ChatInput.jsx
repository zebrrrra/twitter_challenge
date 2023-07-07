import style from "./ChatInput.module.scss"
import { useState } from "react"
import { ReactComponent as Send } from "../../assets/icons/send.svg"
import { useAuth } from "../../context/AuthContext"

const ChatInput = ({ onSelfSend }) => {
  const [text, setText] = useState('')
  const { user, socket } = useAuth()


  const handleSend = (e) => {
    e.preventDefault();

    if (socket) {
      onSelfSend(text)
      socket.emit('client-message', user.account, text)
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