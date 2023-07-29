import style from './ChatPage.module.scss';
import { useAuth } from '../../context/AuthContext';
import { ChatNavbars, ChatRoom, ChatUser } from '../../components';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useTweet from '../../hooks/TweetHook';

const ChatPage = () => {

  const { isAuthenticated } = useAuth();
  const { handTweetSubmit } = useTweet()

  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate, isAuthenticated])

  return (
    <div className={style.homeContainer}>
      <div className={style.homeColumn}>
        <div className={style.leftColumn}>
          <ChatNavbars onTweetSubmit={handTweetSubmit} />
        </div>
        <div className={style.middleColumn}>
          <ChatUser />
        </div>
        <div className={style.rightColumn}>
          <ChatRoom headerContext={{ title: '公開聊天室', subtitle: '' }} roomId={4} />
        </div>
      </div>
    </div>
  )
}

export default ChatPage;