import style from './PrivateChatPage.module.scss';
import { useAuth } from '../../context/AuthContext';
import { ChatNavbars, ChatRoom, ChatPrivateText } from '../../components';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useChatUnRead } from '../../context/ChatUnreadContext';

const PrivateChatPage = () => {

  const { isAuthenticated } = useAuth();
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { chatUnRead } = useChatUnRead();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate, isAuthenticated])

  return (
    <div className={style.homeContainer}>
      <div className={style.homeColumn}>
        <div className={style.leftColumn}>
          <ChatNavbars />
        </div>
        <div className={style.middleColumn}>
          <ChatPrivateText roomId={roomId} />
        </div>
        <div className={style.rightColumn}>
          <ChatRoom headerContext={{ title: chatUnRead.header.title, subtitle: chatUnRead.header.subtitle }} roomId={roomId} />
        </div>
      </div>
    </div>
  )
}

export default PrivateChatPage;