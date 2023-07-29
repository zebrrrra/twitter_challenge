import style from './ChatPage.module.scss';
import { useAuth } from '../../context/AuthContext';
import { ChatNavbars, ChatRoom, ChatPrivateText } from '../../components';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useChatUser } from '../../context/ChatUserContext';
import { useChatUnRead } from '../../context/ChatUnreadContext';
import useTweet from '../../hooks/TweetHook';

const PrivateChatPage = () => {
  const [headerContext, setHeaderContext] = useState({})

  const { isAuthenticated } = useAuth();
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { chatUser, setChatUser } = useChatUser()
  const { chatUnRead } = useChatUnRead();
  const { handTweetSubmit } = useTweet()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate, isAuthenticated])


  useEffect(() => {

    const handleHeaderContext = () => {
      // console.log('roomId', roomId)
      // console.log('chatUser', chatUser, `length: ${Object.keys(chatUser).length}`)
      // console.log('chatUnRead', chatUnRead.messages[0].targetUser.name)
      if (chatUnRead.messages.length === 0) return
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
    return () => {
      setHeaderContext({})
      setChatUser({})
    }
  }, [roomId])

  return (
    <div className={style.homeContainer}>
      <div className={style.homeColumn}>
        <div className={style.leftColumn}>
          <ChatNavbars onTweetSubmit={handTweetSubmit} />
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