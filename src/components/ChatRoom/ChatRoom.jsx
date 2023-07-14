import style from "./ChatRoom.module.scss"
import { useState, useEffect } from "react"
import ChatInput from "../ChatInput/ChatInput"
import ChatBody from "../ChatBody/ChatBody"
import { useChat } from '../../context/ChatContext';

import { useAuth } from "../../context/AuthContext"
import { chatTimeFormat } from "../../apis/data"


const ChatRoom = ({ headerContext = '公開聊天室' }) => {
  const [message, setMessage] = useState([])
  const [historyMessage, setHistoryMessage] = useState([])
  const { user } = useAuth() || {}
  const socket = useChat()


  useEffect(() => {
    const handleServerJoin = (res) => {
      setMessage((prevState) => [...prevState, { isChat: false, message: res }]);
    };

    const handleServerLeave = (res) => {
      setMessage((prevState) => [...prevState, { isChat: false, message: res }]);
    };

    const handleServerMessage = (res) => {
      //FIXME 聽不到res
      console.log(res)
      const time = chatTimeFormat(res.timestamp);
      const message = { text: res.message, time, avatar: res.user.avatar, isOwner: res.user.id === user.id }
      setMessage((preState) => [...preState, { isChat: true, message }])
    }

    const handleServerRecord = (res) => {
      const history = res.map(({ message, timestamp, User }) => ({ text: message, time: chatTimeFormat(timestamp), avatar: User.avatar, isOwner: User.id === user.id }))

      setHistoryMessage((prevState) => {

        const isDuplicate = prevState.some((item) => item.message?.every((msg) => history.some((h) => h.text === msg.text)))

        if (isDuplicate) {
          return prevState;
        }
        return [...prevState, history]
      })
    }


    if (socket) {
      console.log(`${socket} mounted`)
      socket.emit('client-record')
      socket.on('server-record', handleServerRecord)
      socket.on('server-join', handleServerJoin);
      socket.on('server-message', handleServerMessage);
      socket.on('server-leave', handleServerLeave);
    }

    return () => {
      // 重整進入cleanup     
      console.log(`${socket} unmounted`)
      socket?.off('server-record', handleServerRecord)
      socket?.off('server-join', handleServerJoin);
      socket?.off('server-message', handleServerMessage);
      socket?.off('server-leave', handleServerLeave);
    };
  }, [socket?.connected]);

  return (
    <>
      <div className={style.HeaderContainer}>
        {headerContext}
      </div>
      <ChatBody message={message} historyMessage={historyMessage} />
      <ChatInput />
    </>
  )
}
export default ChatRoom