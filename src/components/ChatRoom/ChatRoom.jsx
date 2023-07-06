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
  const [onlineMessages, setOnlineMessages] = useState([])
  const [offlineMessages, setOfflineMessages] = useState([])
  const [message, setMessage] = useState([])
  const { socket, user } = useAuth() || {}
  dayjs.locale('zh-tw');


  useEffect(() => {
    const handleServerJoin = (res) => {
      console.log('has join')
      setOnlineMessages((prevState) => {
        // const isDuplicate = prevState.some((item) => item === res);
        // if (isDuplicate) {
        //   return prevState;
        // }
        return [...prevState, res];
      });
    };

    const handleServerLeave = (res) => {
      console.log('has leave')
      setOfflineMessages((prevState) => {
        // const isDuplicate = prevState.some((item) => item === res);
        // if (isDuplicate) {
        //   return prevState;
        // }
        return [...prevState, res];
      });
    };

    const handleServerMessage = (res) => {
      const time = dayjs(res.timestamp).format('A hh:mm');
      const other = { text: res.message, time, avatar: res.user.avatar, isOwner: false }
      console.log(other)
      setMessage((preState => [...preState, other]))
    }

    if (socket) {
      console.log('hi')
      socket.on('server-join', handleServerJoin);
      socket.on('server-message', handleServerMessage);
      socket.on('server-leave', handleServerLeave);

    }
    console.log(`${socket} mounted`)

    return () => {
      // 跳頁或下線都會進入cleanup 
      console.log('bye')
      setOnlineMessages([])
      setOfflineMessages([])

      if (socket) {
        console.log(`${socket} unmounted`)
        socket?.off('server-join', handleServerJoin);
        socket?.off('server-message', handleServerMessage);
        socket?.off('server-leave', handleServerLeave);

      }
    };
  }, [socket]);

  const handleSelfSend = (text) => {
    console.log(text)
    const time = dayjs().format('A hh:mm')
    const self = { text, time, avatar, isOwner: true }
    setMessage((preState => [...preState, self]))
  }




  return (
    <>
      <div className={style.HeaderContainer}>
        {headerContext}
      </div>
      <ChatBody message={message} online={onlineMessages} offline={offlineMessages} />
      <ChatInput onSelfSend={handleSelfSend} />
    </>
  )
}
export default ChatRoom