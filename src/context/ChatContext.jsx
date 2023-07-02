import {useContext, createContext} from'react';
import { useAuth } from './AuthContext';

const ChatContext =createContext();
export const useChat =()=>useContext(ChatContext);

export const ChatContextProvider=({children})=>{
    const {socket} =useAuth();
    return (
        <ChatContext.Provider value={socket}>
            {children}
        </ChatContext.Provider>

    );
};