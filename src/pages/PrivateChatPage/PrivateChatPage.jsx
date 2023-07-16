import style from './ChatPage.module.scss';
import { useAuth } from '../../context/AuthContext';
import { ChatNavbar, ChatRoom } from '../../components';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useChat } from '../../context/ChatContext';
import ChatPrivateText from '../../components/ChatPrivateText/ChatPrivateText';

const PrivateChatPage = () => {
  const [headerContext, setHeaderContext] = useState('')
  const { isAuthenticated, user } = useAuth();
  const { roomId, targetId } = useParams();
  const socket = useChat();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate, isAuthenticated])

  useEffect(() => {
    const matchChatPerson = () => {
      if (targetId) {
        const target = JSON.parse(localStorage.getItem('usersUpdate')).filter(({ id }) => id === Number(targetId))
        setHeaderContext(target[0].name)
      }
    }
    matchChatPerson()
  }, [targetId])

  return (
    <div className={style.homeContainer}>
      <div className={style.homeColumn}>
        <div className={style.leftColumn}>
          <ChatNavbar />
        </div>
        <div className={style.middleColumn}>
          <ChatPrivateText />
        </div>
        <div className={style.rightColumn}>
          <ChatRoom headerContext={headerContext} roomId={roomId} />
        </div>
      </div>
    </div>
  )
}

export default PrivateChatPage;
