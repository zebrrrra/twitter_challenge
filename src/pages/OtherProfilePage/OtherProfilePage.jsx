import style from './OtherProfilePage.module.scss'
import { useEffect, useState } from 'react';
import { RecommendList } from '../../components';
import { Navbars } from '../../components';
import { Header } from '../../components';
import { OtherMain } from '../../components';
import { useAuth } from '../../context/AuthContext'
import { useParams } from 'react-router-dom';
import { useChat } from '../../context/ChatContext';

const OtherProfilePage = () => {
  const { user } = useAuth()
  const { id } = useParams();  // 從 URL 參數中取得 userId
  const userId = id || user.id;  // 如果 URL 參數中有 userId，就使用它，否則使用當前用戶的 ID
  const socket = useChat()
  const [isSubscribed, setIsSubscribed] = useState(false)

  useEffect(() => {
    const handleSubscribe = (res) => {
      console.log(res)
      if (res.length === 0) return
      const existed = res.some(item => item['User.id'] === Number(userId))
      setIsSubscribed(existed)
    }
    socket.emit('client-get-subscribe')
    socket.on('server-get-subscribe', handleSubscribe)
    return () => {
      socket.off('server-get-subscribe', handleSubscribe)
    }
  }, [userId])

  return (
    <div className={style.profileContainer}>
      <div className={style.homeColumn}>
        <div className={style.leftColumn}>
          <Navbars />
        </div>
        <div className={style.middleColumn}>
          <Header userId={userId} />
          <OtherMain userId={userId} isSubscribed={isSubscribed} />
        </div>
        <div className={style.rightColumn}>
          <RecommendList />
        </div>
      </div>
    </div>
  )
}

export default OtherProfilePage;