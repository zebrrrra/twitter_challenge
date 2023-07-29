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
    // no chatUser& no chatUnRead.messages:新用戶直接透過navbar進入私人聊天室
    // only no chatUser：過去已有談話紀錄，navbar進入私人聊天室抓談話紀錄第一個，點avatar/text就是抓chatUser
    // only no chatUnRead.messages：過去未有談話紀錄，navbar進入私人聊天室抓chatUser(roomId)，點avatar就是抓chatUser

    const handleHeaderContext = () => {
      // console.log('roomId', roomId)
      // console.log('chatUser', chatUser, `length: ${Object.keys(chatUser).length}`)
      // console.log('chatUnRead', chatUnRead)
      // no chatUser& no chatUnRead.messages
      if (chatUnRead.messages.length === 0 && Object.keys(chatUser).length === 0) {
        setHeaderContext({
          title: 'Say something',
          subtitle: 'I‘m giving up on you'
        })
        return
      }
      switch (Object.keys(chatUser).length) {
        //  only no chatUser
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