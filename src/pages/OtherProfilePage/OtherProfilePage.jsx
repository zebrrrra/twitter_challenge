import style from './OtherProfilePage.module.scss'
import { useEffect, useState } from 'react';
import { RecommendList } from '../../components';
import { ChatNavbars } from '../../components';
import { Header } from '../../components';
import { OtherMain } from '../../components';
import { useParams, useNavigate } from 'react-router-dom';
import { useChat } from '../../context/ChatContext';
import { useAuth } from '../../context/AuthContext';

const OtherProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth()
  const socket = useChat()
  const [isSubscribed, setIsSubscribed] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate, isAuthenticated])

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


  return (
    <div className={style.profileContainer}>
      <div className={style.homeColumn}>
        <div className={style.leftColumn}>
          <ChatNavbars />
        </div>
        <div className={style.middleColumn}>
          <Header userId={Number(id)} />
          <OtherMain userId={Number(id)} isSubscribed={isSubscribed} />
        </div>
        <div className={style.rightColumn}>
          <RecommendList />
        </div>
      </div>
    </div>
  )
}

export default OtherProfilePage;