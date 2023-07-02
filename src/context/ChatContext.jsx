import {useContext, createContext} from'react';
import { useAuth } from './AuthContext';

const ChatContext =createContext();
export const useChat =()=>useContext(ChatContext);
export const ChatProvider=({children})=>{
    const {socket} =useAuth();
    return (
        <ChatContext.Provider value={socket}>
            {children}
        </ChatContext.Provider>

    );
};