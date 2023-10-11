import style from './FollowPage.module.scss';
import { Header, ChatNavbars, FollowTab, RecommendList } from '../../components';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

const FollowPage = () => {
  //網址用戶的id
  const { id } = useParams();
  //登入用戶 
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate, isAuthenticated]);

  return (
    <div className={style.followContainer}>
      <div className={style.homeColumn}>
        <div className={style.leftColumn}>
          <ChatNavbars />
        </div>
        <div className={style.middleColumn}>
          <Header userId={id} />
          <FollowTab userId={Number(id)} loginUserId={user && user.id} />
        </div>
        <div className={style.rightColumn}>
          <RecommendList />
        </div>
      </div>
    </div>
  )
}

export default FollowPage;
