import style from "./ChatRoom.module.scss"
import { useState, useEffect } from "react"
import ChatInput from "../ChatInput/ChatInput"
import ChatBody from "../ChatBody/ChatBody"
// import { useChat } from "../../context/ChatContext"
import { useAuth } from "../../context/AuthContext"

const ChatRoom = ({ headerContext = '公開聊天室' }) => {
  const [onlineMessages, setOnlineMessages] = useState([])
  const [offlineMessages, setOfflineMessages] = useState([])
  const { socket } = useAuth() || {}

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

    if (socket) {
      console.log('hi')
      socket.on('server-join', handleServerJoin);
      socket.on('server-leave', handleServerLeave);

    }
    console.log(`${socket} mounted`)

    return () => {
      console.log('bye')
      setOnlineMessages([])
      setOfflineMessages([])

      if (socket) {
        console.log(`${socket} unmounted`)
        socket?.off('server-join', handleServerJoin);
        socket?.off('server-leave', handleServerLeave);

      }
    };
  }, [socket]);


  return (
    <>
      <div className={style.HeaderContainer}>
        {headerContext}
      </div>
      <ChatBody online={onlineMessages} offline={offlineMessages} />
      <ChatInput />
    </>
  )
}
export default ChatRoom