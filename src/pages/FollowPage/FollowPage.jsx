import style from './FollowPage.module.scss';
import { Header, ChatNavbars, FollowTab, FollowRecommendList } from '../../components';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUsers } from '../../apis/user';
import { UpdateTagProvider } from '../../context/UpdateTagContext';
import useTweet from '../../hooks/TweetHook';

const FollowPage = () => {
  //網址用戶的id
  const { id } = useParams();
  //登入用戶 
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [profileUser, setProfileUser] = useState(null);
  const { handTweetSubmit } = useTweet()


  //const [isCurrentFollowed, setIsCurrentFollowed] = useState(false);


  //const [isCurrentFollowed, setIsCurrentFollowed] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }

    const fetchUser = async () => {
      const userData = await getUsers(id);
      setProfileUser(userData);
    };
    fetchUser();
  }, [navigate, isAuthenticated, id]);

  //整個頁面的follow方法


  return (
    <div className={style.followContainer}>
      <div className={style.homeColumn}>
        <div className={style.leftColumn}>
          <ChatNavbars onTweetSubmit={handTweetSubmit} />
        </div>
        <div className={style.middleColumn}>
          <Header userId={profileUser && profileUser.id} />
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
