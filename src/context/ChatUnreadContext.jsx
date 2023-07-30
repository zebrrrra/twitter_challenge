import { useContext, createContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useParams } from 'react-router-dom';

export const ChatUnReadContext = createContext();
export const useChatUnRead = () => useContext(ChatUnReadContext);
export function ChatUnReadProvider({ children }) {
  const [chatUnRead, setChatUnRead] = useState({ empty: true, messages: [] });
  const [chatMessages, setChatMessages] = useState({});
  const { roomId } = useParams()
  const { socket } = useAuth();

  useEffect(() => {
    if (socket) {
      if (roomId) {
        socket.emit('client-enter-room', roomId);
        socket.on('server-enter-room', (res) => console.log(res));
      }
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
        socket.off('server-enter-room', (res) => console.log(res));
      };
    }
  }, [socket, roomId]);

  return (
    <ChatUnReadContext.Provider value={{ chatUnRead, setChatUnRead, socket }}>
      {children}
    </ChatUnReadContext.Provider>
  );
}
