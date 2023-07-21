import style from "./ChatRoom.module.scss"
import { useState, useEffect, useCallback } from "react"
import ChatInput from "../ChatInput/ChatInput"
import avatar from "../../assets/icons/avatar.svg"
import ChatBody from "../ChatBody/ChatBody"
import { useChat } from '../../context/ChatContext';

import { useAuth } from "../../context/AuthContext"
import { chatTimeFormat } from "../../apis/data"


const ChatRoom = ({ headerContent, roomId }) => {
  const [message, setMessage] = useState([])
  const [historyMessage, setHistoryMessage] = useState([])
  const { user } = useAuth() || {}
  const socket = useChat()
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

  // enter room & leave room
  useEffect(() => {
    if (socket?.connected && roomId !== 4) {
      socket.emit('client-enter-room', roomId);
      socket.on('server-enter-room', (res) => console.log(res))

      return () => {
        // socket.emit('client-leave-room', roomId)後端會自動leave
        socket.off('server-enter-room', (res) => console.log(res))
      }
    }
  }, [roomId])

  useEffect(() => {
    if (socket?.connected) {
      socket.emit('client-record', roomId)
      console.log('emit record', roomId)
    }
    return () => {
      setMessage([]);
      setHistoryMessage([]);
    }

  }, [roomId]);

  // 監聽上下線
  useEffect(() => {
    const handleServerJoin = (res) => {
      setMessage((prevState) =>
        [...prevState, { isChat: false, message: res }]);
    };

    const handleServerLeave = (res) => {
      setMessage((prevState) =>
        [...prevState, { isChat: false, message: res }]);
    };
    if (socket && roomId === 4) {
      socket.on('server-join', handleServerJoin);
      socket.on('server-leave', handleServerLeave);

    }

    return () => {
      socket?.off('server-join', handleServerJoin);
      socket?.off('server-leave', handleServerLeave);
    };
  }, [socket]);

  // 獨立監聽server-record
  useEffect(() => {
    if (socket) {
      socket.on('server-record', handleServerRecord)
    }

    return () => {
      socket?.off('server-record', handleServerRecord)
    }
  }, [socket?.connected, roomId])



  // 獨立監聽server-message
  useEffect(() => {
    const handleServerMessage = (res) => {
      console.log('server-message', res)
      if (Number(roomId) !== Number(res.room)) return

      const other = { text: res.message, time: chatTimeFormat(res.timestamp), avatar: res.user.avatar, isOwner: res.user.id === user.id }
      setMessage((preState) => [...preState, { isChat: true, message: other }])

    }

    if (socket) {
      console.log('im lisening')
      socket.on('server-message', handleServerMessage);
    }

    return () => {
      console.log('not lisening')
      socket?.off('server-message', handleServerMessage);

    }
  }, [socket, roomId])


  // 接收來自ChatInput的props
  const handleSelfSend = (text, time) => {
    const self = { text, time: chatTimeFormat(time), avatar, isOwner: true }
    setMessage((preState => [...preState, { isChat: true, message: self }]))
  }

  return (
    <>
      <div className={style.HeaderContainer}>
        <div className={style.title}>{headerContent.title}</div>
        {roomId !== 4 && (<div className={style.subtitle}>@{headerContent.subtitle}</div>)}
      </div>
      <ChatBody message={message} historyMessage={historyMessage} />
      <ChatInput onSelfSend={handleSelfSend} roomId={roomId} />
    </>
  )
}
export default ChatRoom





