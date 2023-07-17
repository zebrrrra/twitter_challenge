import style from "./ChatRoom.module.scss"
import { useState, useEffect, useCallback } from "react"
import ChatInput from "../ChatInput/ChatInput"
import avatar from "../../assets/icons/avatar.svg"
import ChatBody from "../ChatBody/ChatBody"
import { useChat } from '../../context/ChatContext';

import { useAuth } from "../../context/AuthContext"
import { chatTimeFormat } from "../../apis/data"


const ChatRoom = ({ headerContext, roomId }) => {
  const [message, setMessage] = useState([])
  const [historyMessage, setHistoryMessage] = useState([])
  const { user } = useAuth() || {}
  const socket = useChat()

  useEffect(()=>{
    setMessage([]);
    setHistoryMessage([]);
    if(socket?.connected){
      socket.emit('client-record',roomId)
    }
  },[roomId]);

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

  const handleServerRecord = useCallback((res) => {
    console.log('server-record', res)
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

  // 獨立監聽server-record
  useEffect(() => {
    if (socket) {
      // BUG emit兩次
      socket.emit('client-record', roomId)
      socket.on('server-record', handleServerRecord)
      console.log('emit new message', roomId)
    }

    return () => {
      socket?.off('server-record', handleServerRecord)
    }
  }, [socket,roomId])

  // 獨立監聽server-message
  useEffect(() => {
    const handleServerMessage = (res) => {
      console.log('server-message', res)
      if (roomId !== Number(res.room)) return

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
  }, [socket,roomId])

  // 接收來自ChatInput的props
  const handleSelfSend = (text, time) => {
    const self = { text, time: chatTimeFormat(time), avatar, isOwner: true }
    setMessage((preState => [...preState, { isChat: true, message: self }]))
  }


  return (
    <>
      <div className={style.HeaderContainer}>
        {headerContext}
      </div>
      <ChatBody message={message} historyMessage={historyMessage} />
      <ChatInput onSelfSend={handleSelfSend} roomId={roomId} />
    </>
  )
}
export default ChatRoom





