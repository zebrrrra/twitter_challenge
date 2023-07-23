
import { useContext, createContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
export const ChatUserContext = createContext();
export const useChatUser = () => useContext(ChatUserContext);

export function ChatUserProvider({ children }) {
  const [chatUser, setChatUser] = useState({});
  // const { roomId } = useParams()
  // useEffect(() => {

  //   return () => {
  //     setChatUser({})
  //   }
  // }, [roomId])

  return (
    <ChatUserContext.Provider value={{ chatUser, setChatUser }}>
      {children}
    </ChatUserContext.Provider>
  );
}
