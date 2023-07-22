import style from "./ChatRoom.module.scss"
import { useState, useEffect, useCallback } from "react"
import ChatInput from "../ChatInput/ChatInput"
import avatar from "../../assets/icons/avatar.svg"
import ChatBody from "../ChatBody/ChatBody"
import { useChat } from '../../context/ChatContext';
import { useAuth } from "../../context/AuthContext"
import { chatTimeFormat } from "../../apis/data"
import useInstantMessage from "../../hooks/InstantMessageHook"


const ChatRoom = ({ headerContext, roomId }) => {

  const [historyMessage, setHistoryMessage] = useState([])
  const { user } = useAuth() || {}
  const socket = useChat()
  const { message, setMessage } = useInstantMessage(roomId)

  const handleServerRecord = useCallback((res) => {
    console.log('server-record', res)
    if (res === '尚未聊天過，開始發送訊息吧!') {
      setHistoryMessage({ text: res, time: null, avatar: null, isOwner: null })
    }
    if (Number(roomId) !== res[0].roomId) return
    const history = res.map(({ message, timestamp, User }) => ({ text: message, time: chatTimeFormat(timestamp), avatar: User.avatar, isOwner: User.id === user.id }))

    setHistoryMessage((prevState) => {

      const isDuplicate = prevState.some((item) => item.message?.every((msg) => history.some((h) => h.text === msg.text)))

      if (isDuplicate) {
        return prevState;
      }
      return [...prevState, history]
    })
  }, [roomId, user?.id])


  useEffect(() => {
    if (socket?.connected) {
      socket.emit('client-record', roomId)
      console.log('emit record', roomId)
    }
    return () => {
      setHistoryMessage([]);
    }

  }, [roomId]);


  // 獨立監聽server-record
  useEffect(() => {
    if (socket) {
      socket.on('server-record', handleServerRecord)
    }

    return () => {
      socket?.off('server-record', handleServerRecord)
    }
  }, [socket?.connected, roomId])

  // 接收來自ChatInput的props
  const handleSelfSend = (text, time) => {
    const self = { text, time: chatTimeFormat(time), avatar, isOwner: true }
    setMessage((preState => [...preState, { isChat: true, message: self }]))
  }

  return (
    <>
      <div className={style.HeaderContainer}>
        <div className={style.title}>{headerContext.title}</div>
        {roomId !== 4 && (<div className={style.subtitle}>@{headerContext.subtitle}</div>)}
      </div>
      <ChatBody message={message} historyMessage={historyMessage} />
      <ChatInput onSelfSend={handleSelfSend} roomId={roomId} />
    </>
  )
}

export default ChatRoom





