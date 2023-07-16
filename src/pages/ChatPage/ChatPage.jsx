import style from './ChatPage.module.scss';
import { useAuth } from '../../context/AuthContext';
import { ChatNavbar, ChatRoom } from '../../components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../../context/ChatContext';
import ChatUser from '../../components/ChatUser/ChatUser';


const ChatPage = () => {

  const { isAuthenticated, user } = useAuth();
  const socket = useChat();

  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate, isAuthenticated])

  const [selectedUserId, setSelectedUserId] = useState(null);

  return (
    <div className={style.homeContainer}>
      <div className={style.homeColumn}>
        <div className={style.leftColumn}>
          <ChatNavbar />
        </div>
        <div className={style.middleColumn}>
          <ChatUser />
        </div>
        <div className={style.rightColumn}>
          <ChatRoom headerContext={"公開聊天室"} roomId={4} />
        </div>
      </div>
    </div>
  )
}

export default ChatPage;