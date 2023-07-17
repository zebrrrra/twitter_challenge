import style from './HomePage.module.scss'
//import AllTweets from '../../components/AllTweets/AllTweets';
import { Navbars, Header, MainPost, AllTweets, RecommendList } from '../../components';
import { useAuth } from '../../context/AuthContext'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatNavbars from '../../components/ChatNavbar/ChatNavbars';

const HomePage = () => {
  const [newTweet, setNewTweet] = useState(null)
  const handTweetSubmit = (newTweetValue) => {
    setNewTweet(newTweetValue)
  }
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
          {/* <Navbars onTweetSubmit={handTweetSubmit} /> */}
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