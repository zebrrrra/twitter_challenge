import style from './FollowPage.module.scss';
import { Header, ChatNavbars, FollowTab, RecommendList } from '../../components';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useTweet from '../../hooks/TweetHook';
import { useChat } from '../../context/ChatContext';

const FollowPage = () => {
  //網址用戶的id
  const { id } = useParams();
  //登入用戶 
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { handTweetSubmit } = useTweet()
  const socket = useChat()
  const [isSubscribed, setIsSubscribed] = useState(false)

  useEffect(() => {
    const handleSubscribe = (res) => {
      console.log(res)
      if (res.length === 0) return
      const existed = res.some(item => item['User.id'] === Number(id))
      setIsSubscribed(existed)
    }
    socket.emit('client-get-subscribe')
    socket.on('server-get-subscribe', handleSubscribe)
    return () => {
      socket.off('server-get-subscribe', handleSubscribe)
    }
  }, [id, socket])

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate, isAuthenticated]);

  //整個頁面的follow方法

  return (
    <div className={style.followContainer}>
      <div className={style.homeColumn}>
        <div className={style.leftColumn}>
          <ChatNavbars onTweetSubmit={handTweetSubmit} />
        </div>
        <div className={style.middleColumn}>
          <Header userId={id} />
          <FollowTab userId={id} loginUserId={user && user.id} />
        </div>
        <div className={style.rightColumn}>
          {/* <FollowRecommendList userId={id} loginUserId={user && user.id} /> */}
          <RecommendList />
        </div>
      </div>
    </div>
  )
}

export default FollowPage;
