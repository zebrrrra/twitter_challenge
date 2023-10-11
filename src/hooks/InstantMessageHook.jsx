import { useEffect, useState } from "react"
import { chatTimeFormat } from "../apis/time";
import { useChat } from "../context/ChatContext";
import { useAuth } from "../context/AuthContext";


const useInstantMessage = (roomId) => {
  const [message, setMessage] = useState([])
  const socket = useChat()
  const { user } = useAuth() || {}


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

  // 處理enter public
  useEffect(() => {
    if (roomId === 4) {
      socket.emit('client-enter-room', 'public');
      socket.on('server-enter-room', (res) => console.log(res));
    }

    return () => {
      setMessage([])
      socket.off('server-enter-room', (res) => console.log(res));
    }
  }, [roomId])

  // 處理update-room
  useEffect(() => {
    const handleEnterMessage = (res) => {
      console.log(res)
      setMessage((prevState) => {
        const isDuplicate = prevState.some(({ message }) => message === res.message)
        if (isDuplicate) {
          return prevState
        }
        return [...prevState, { isChat: false, message: res.message }]
      })
    }
    socket.on('server-update-room', handleEnterMessage)

    return () => {
      socket.off('server-update-room', handleEnterMessage)
    }
  }, [socket, roomId])

  useEffect(() => {
    const handleServerMessage = (res) => {
      console.log('server-message', res)
      if (Number(roomId) !== Number(res.room)) return

      const other = { text: res.message, time: chatTimeFormat(res.timestamp), avatar: res.user.avatar, isOwner: res.user.id === user.id }
      setMessage((preState) => [...preState, { isChat: true, message: other }])

    }

    if (socket) {
      socket.on('server-message', handleServerMessage);
    }

    return () => {
      setMessage([])
      socket?.off('server-message', handleServerMessage);

    }
  }, [socket, roomId])

  return { message, setMessage }
}
export default useInstantMessage