import { useContext, createContext } from 'react';
import { socket } from '../apis/socket';

const ChatContext = createContext();
export const useChat = () => useContext(ChatContext);

export const ChatContextProvider = ({ children }) => {

    return (
        <ChatContext.Provider value={socket}>
            {children}
        </ChatContext.Provider>

    );
};