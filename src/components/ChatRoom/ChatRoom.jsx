import style from "./ChatRoom.module.scss"
import { useState, useEffect } from "react"
import ChatInput from "../ChatInput/ChatInput"
import ChatBody from "../ChatBody/ChatBody"
import avatar from "../../assets/icons/avatar.svg"

// import { useChat } from "../../context/ChatContext"
import { useAuth } from "../../context/AuthContext"
import dayjs from 'dayjs';
import 'dayjs/locale/zh-tw';


const ChatRoom = ({ headerContext = '公開聊天室' }) => {
  const [message, setMessage] = useState([])
  const { socket } = useAuth() || {}
  dayjs.locale('zh-tw');


  useEffect(() => {
    const handleServerJoin = (res) => {
      setMessage((prevState) => {
        return [...prevState, { isChat: false, message: res }];
      });
    };

    const handleServerLeave = (res) => {
      setMessage((prevState) => {
        return [...prevState, { isChat: false, message: res }];
      });
    };

    const handleServerMessage = (res) => {
      const time = dayjs(res.timestamp).format('A hh:mm');
      const other = { text: res.message, time, avatar: res.user.avatar, isOwner: false }
      setMessage((preState => [...preState, { isChat: true, message: other }]))
    }

    if (socket) {
      console.log(`${socket} mounted`)
      socket.on('server-join', handleServerJoin);
      socket.on('server-message', handleServerMessage);
      socket.on('server-leave', handleServerLeave);

    }

    return () => {
      // 跳頁或下線都會進入cleanup 

      if (socket) {
        console.log(`${socket} unmounted`)
        socket?.off('server-join', handleServerJoin);
        socket?.off('server-message', handleServerMessage);
        socket?.off('server-leave', handleServerLeave);

      }
    };
  }, [socket]);

  const handleSelfSend = (text) => {
    const time = dayjs().format('A hh:mm')
    const self = { text, time, avatar, isOwner: true }
    setMessage((preState => [...preState, { isChat: true, message: self }]))
  }




  return (
    <>
      <div className={style.HeaderContainer}>
        {headerContext}
      </div>
      <ChatBody message={message} />
      <ChatInput onSelfSend={handleSelfSend} />
    </>
  )
}
export default ChatRoom