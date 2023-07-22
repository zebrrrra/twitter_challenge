import style from './ChatPage.module.scss';
import { useAuth } from '../../context/AuthContext';
import { ChatNavbar, ChatRoom } from '../../components';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ChatPrivateText from '../../components/ChatPrivateText/ChatPrivateText';
import { useChatUser } from '../../context/ChatUserContext';
import { useChatUnRead } from '../../context/ChatUnreadContext';

const PrivateChatPage = () => {
  const [headerContext, setHeaderContext] = useState({})

  const { isAuthenticated } = useAuth();
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { chatUser } = useChatUser()
  const { chatUnRead } = useChatUnRead();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate, isAuthenticated])


  useEffect(() => {

    const handleHeaderContext = () => {
      switch (Object.keys(chatUser).length) {
        // 未選擇目標對象
        case 0:
          setHeaderContext({
            title: chatUnRead.messages[0].targetUser.name,
            subtitle: chatUnRead.messages[0].targetUser.account
          });
          break;
        default:
          setHeaderContext({ title: chatUser.name, subtitle: chatUser.account });
          break;
      }

    }
    handleHeaderContext()
  }, [chatUser?.id])


  return (
    <div className={style.homeContainer}>
      <div className={style.homeColumn}>
        <div className={style.leftColumn}>
          <ChatNavbar />
        </div>
        <div className={style.middleColumn}>
          <ChatPrivateText roomId={roomId} />
        </div>
        <div className={style.rightColumn}>
          <ChatRoom headerContext={headerContext} roomId={roomId} />
        </div>
      </div>
    </div>
  )
}

export default PrivateChatPage;
