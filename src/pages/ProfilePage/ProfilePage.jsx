import style from './ProfilePage.module.scss'
import { ChatNavbars, Header, Main, RecommendList } from '../../components';
import { useAuth } from '../../context/AuthContext'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate, isAuthenticated])

  return (
    <div className={style.profileContainer}>
      <div className={style.homeColumn}>
        <div className={style.leftColumn}>
          <ChatNavbars />
        </div>
        <div className={style.middleColumn}>
          <Header userId={user?.id} />
          <Main userId={user?.id} />
        </div>
        <div className={style.rightColumn}>
          <RecommendList />
        </div>
      </div>
    </div>
  )
}


export default ProfilePage;