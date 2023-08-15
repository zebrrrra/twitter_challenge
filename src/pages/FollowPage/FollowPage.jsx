import style from './FollowPage.module.scss';
import { Header, ChatNavbars, FollowTab, FollowRecommendList } from '../../components';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import useTweet from '../../hooks/TweetHook';

const FollowPage = () => {
  //網址用戶的id
  const { id } = useParams();
  //登入用戶 
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { handTweetSubmit } = useTweet()

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
          <FollowRecommendList userId={id} loginUserId={user && user.id} />
        </div>
      </div>
    </div>
  )
}

export default FollowPage;
