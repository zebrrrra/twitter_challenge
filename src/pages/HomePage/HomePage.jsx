import style from './HomePage.module.scss'
import { Header, MainPost, AllTweets, RecommendList, ChatNavbars } from '../../components';
import { useAuth } from '../../context/AuthContext'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useTweet from '../../hooks/TweetHook';

const HomePage = () => {
  const { newTweet, handTweetSubmit } = useTweet()
  const { isAuthenticated, user } = useAuth();

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
          <Header />
          <MainPost user={user} onTweetSubmit={handTweetSubmit} />
          <AllTweets newTweet={newTweet} />
        </div>
        <div className={style.rightColumn}>
          <RecommendList />
        </div>
      </div>
    </div>
  )
}

export default HomePage;