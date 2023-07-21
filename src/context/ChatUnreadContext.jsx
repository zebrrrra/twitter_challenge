import { useContext, createContext, useState,useEffect } from 'react';
import { useAuth } from './AuthContext';

export const ChatUnReadContext = createContext();
export const useChatUnRead = () => useContext(ChatUnReadContext);
export function ChatUnReadProvider({ children }) {
    const [chatUnRead, setChatUnRead] = useState({ empty: true, messages: [] });
    const[chatMessages,setChatMessages]=useState({});
  
  const {socket} =useAuth();

  useEffect(() => {
    if (socket) {
      // Emit event
      socket.emit('client-new-message');
  
      // Listen for new messages
      socket.on('server-new-message', (res) => {
        console.log('server-new-message', res);
  
        const messages = res.newMessageData;
        if (messages.length === 0) {
          console.log('nothing is here');
          setChatUnRead({ empty: true, messages });
        } else {
          console.log('something is here');
          setChatUnRead({ empty: false, messages });
        }
      });
  
      return () => {
        // Clean up
        socket.off('server-new-message');
      };
    }
  }, [socket, chatUnRead]);

  return (
    <ChatUnReadContext.Provider value={{ chatUnRead, setChatUnRead }}>
      {children}
    </ChatUnReadContext.Provider>
  );
}
