
import { useContext, createContext, useState } from 'react';
export const ChatUserContext = createContext();
export const useChatUser = () => useContext(ChatUserContext);

export function ChatUserProvider({ children }) {
  const [chatUser, setChatUser] = useState({});



  return (
    <ChatUserContext.Provider value={{ chatUser, setChatUser }}>
      {children}
    </ChatUserContext.Provider>
  );
}
