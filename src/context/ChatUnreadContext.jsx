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
    if (socket) {
      // Emit event
      socket.emit('client-new-message');

      // Listen for new messages
      socket.on('server-new-message', (res) => {
        console.log('server-new-message', res);

        const messages = res.newMessageData
        const allUnreadCounts = res.allUnreadMessageCounts;
        if (messages.length === 0) {

          setChatUnRead({ empty: true, messages, allUnreadCounts });
        } else {
          setChatUnRead({ empty: false, messages, allUnreadCounts });
        }
      });

      return () => {
        // Clean up
        socket.off('server-new-message');
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
