import style from './ChatPage.module.scss';
import { useAuth } from '../../context/AuthContext';
import { ChatNavbar, ChatRoom } from '../../components';
import { useEffect } from 'react';
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

  // TODO 在ChatPage元件加上以下
  // 接收來自ChatUser的回調函式（攜帶著別人的name、account以及roomId）
  const fakeName = 'user1'
  const fakeRoomId = 304

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
          <ChatRoom headerContext={fakeName || "公開聊天室"} roomId={fakeRoomId || 4} />
        </div>
      </div>
    </div>
  )
}

export default ChatPage;