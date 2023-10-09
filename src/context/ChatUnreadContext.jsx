import { useContext, createContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { socket } from '../apis/socket';

export const ChatUnReadContext = createContext();
export const useChatUnRead = () => useContext(ChatUnReadContext);
export function ChatUnReadProvider({ children }) {
  const [chatUnRead, setChatUnRead] = useState({ empty: true, messages: [] });
  const [chatMessages, setChatMessages] = useState({});
  // BUG 公開聊天室和私人聊天室互相切換頁面，roomId都是undefined
  const { roomId } = useParams()

  useEffect(() => {
    const handleNewMessage = (res) => {
      console.log('server-new-message', res);

      const messages = res.newMessageData
      const allUnreadCounts = res.allUnreadMessageCounts;
      if (messages.length === 0) {

        setChatUnRead({ empty: true, messages, allUnreadCounts });
      } else {
        setChatUnRead({ empty: false, messages, allUnreadCounts });
      }
    }
    // 登入後emit一次，socket update才再emit
    socket.emit('client-new-message');
    socket.on('server-new-message', handleNewMessage)

    return () => {
      socket.off('server-new-message', handleNewMessage);
    }
  }, [socket])

  useEffect(() => {
    const handleEnterRoom = (res) => {
      console.log(res)
      // only for mount私人page，確保先enter-room才得到new-message
      socket.emit('client-new-message');
    }
    if (socket) {
      if (roomId) {
        socket.emit('client-enter-room', roomId);
        socket.on('server-enter-room', handleEnterRoom);
      }
      return () => {
        // Clean up
        socket.off('server-enter-room', handleEnterRoom);
      };
    }
    // TODO 陣列裡放location.pathname就可以換頁時重抓server-new-message
  }, [socket, roomId]);



  return (
    <ChatUnReadContext.Provider value={{ chatUnRead, setChatUnRead, socket }}>
      {children}
    </ChatUnReadContext.Provider>
  );
}
