import { useContext, createContext, useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { socket } from '../apis/socket';

export const ChatUnReadContext = createContext();
export const useChatUnRead = () => useContext(ChatUnReadContext);
export function ChatUnReadProvider({ children }) {

  const [chatUnRead, setChatUnRead] = useState({ empty: true, messages: [], allUnreadCounts: 0, header: {} });
  const { roomId } = useParams()
  const { pathname } = useLocation();

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

  useEffect(() => {
    const handleNewMessage = (res) => {
      const messages = res.newMessageData//陣列
      const allUnreadCounts = res.allUnreadMessageCounts;//數字

      // 只需在私訊頁更新
      if (/^\/chat\/\d+$/.test(pathname)) {
        if (Number(roomId) === 0) {
          // 從未私訊過 
          setChatUnRead((pre) => ({ ...pre, empty: true, messages, allUnreadCounts, header: { title: '尚未聊天過', subtitle: '尚未聊天過' } }))
        } else {
          // 已有私訊過
          const target = messages.filter((item) => item.roomId === Number(roomId))[0].targetUser
          console.log(target)
          setChatUnRead((pre) => ({ ...pre, empty: false, messages, allUnreadCounts, header: { title: target.name, subtitle: target.account } }))
        }
      }
    }
    // 登入後emit一次，socket update才再emit
    socket.emit('client-new-message');
    socket.on('server-new-message', handleNewMessage)

    return () => {
      socket.off('server-new-message', handleNewMessage);
      setChatUnRead({ empty: true, messages: [], allUnreadCounts: 0, header: {} })
    }
  }, [socket, roomId])

  return (
    <ChatUnReadContext.Provider value={{ chatUnRead, setChatUnRead }}>
      {children}
    </ChatUnReadContext.Provider>
  );
}
