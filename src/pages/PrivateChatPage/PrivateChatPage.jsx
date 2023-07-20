import style from './ChatPage.module.scss';
import { useAuth } from '../../context/AuthContext';
import { ChatNavbar, ChatRoom } from '../../components';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ChatPrivateText from '../../components/ChatPrivateText/ChatPrivateText';
import { useChatUser } from '../../context/ChatUserContext';

const PrivateChatPage = () => {
  const [headerContext, setHeaderContext] = useState({})
  const { isAuthenticated, user } = useAuth();
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { chatUser } = useChatUser()
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate, isAuthenticated])


  useEffect(() => {
    const handleHeaderContex = () => {
      setHeaderContext({ title: chatUser.name, subtitle: chatUser.account })
    }
    handleHeaderContex()
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
