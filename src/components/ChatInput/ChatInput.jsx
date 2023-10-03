import style from "./ChatInput.module.scss"
import { useEffect, useState } from "react"
import { ReactComponent as Send } from "../../assets/icons/send.svg"
import { useChat } from "../../context/ChatContext"

const ChatInput = ({ onSelfSend, roomId }) => {
  const [text, setText] = useState('')
  const [disabled, setDisabled] = useState(false)
  const socket = useChat()

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim()) return
    const time = new Date()
    socket.emit('client-message', text, time)
    onSelfSend(text, time)
    setText('')
  }
  useEffect(() => {
    if (roomId === 'undefined') {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [roomId])
  return (
    <form className={style.container} onSubmit={handleSend}>
      <div className={disabled ? style.disabled : style.inputContainer}>
        <input type="text" className={style.input} value={text} placeholder="輸入訊息..." onChange={(e) => setText(e.target.value)} disabled={disabled} />
      </div>
      <button className={style.button} disabled={disabled}>
        <Send className={style.send} />
      </button>
    </form>
  )
}
export default ChatInput