import { useEffect, useState } from "react"
import { useChat } from "../context/ChatContext"

const useNotice = () => {
  const [notice, setNotice] = useState([])
  const socket = useChat()

  const handleServerNotice = (res) => {
    console.log(res)
    const data = res.map((item) => {
      const defaultValues = {
        comment: null,
        description: null,
        tweetId: null,
      };
      return { ...defaultValues, ...item }
    })
    setNotice(data)
  }
  useEffect(() => {
    socket.on('server-get-notice', handleServerNotice)
    socket.emit('client-enter-room', 'notice')
    socket.emit('client-get-notice')
    return () => {
      socket.off('server-get-notice', handleServerNotice)
    }
  }, [socket])
  return { notice }
}
export default useNotice