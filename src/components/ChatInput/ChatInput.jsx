import style from "./ChatInput.module.scss"
import { useState } from "react"
import { ReactComponent as Send } from "../../assets/icons/send.svg"
const ChatInput = () => {
  const [message, setMessage] = useState('')

  const handleSend = (e) => {
    e.preventDefault();
  }
  return (
    <form className={style.container} onSubmit={handleSend}>
      <div className={style.inputContainer}>
        <input type="text" className={style.input} value={message} placeholder="輸入訊息..." onChange={(e) => setMessage(e.target.value)} />
      </div>
      <button className={style.button}>
        <Send className={style.send} />
      </button>
    </form>
  )
}
export default ChatInput