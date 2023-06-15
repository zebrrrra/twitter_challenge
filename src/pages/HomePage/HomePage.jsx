import style from './HomePage.module.scss'
//import AllTweets from '../../components/AllTweets/AllTweets';
import {Navbars, Header,MainPost,AllTweets,RecommendList} from '../../components';
import {useAuth} from '../../context/AuthContext'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import { useContext } from 'react';

const HomePage = () => {
  const { isAuthenticated,user} = useAuth();
  console.log(user); //測試
  const navigate =useNavigate();
  useEffect(()=>{
    if (!isAuthenticated){
      navigate ('/login');
    }
    },[navigate,isAuthenticated])

  return (
    <div className={style.homeContainer}>
      <div className={style.homeColumn}>
        <div className={style.leftColumn}>
          <Navbars userId={ user&& user.id}/>
        </div>
        <div className={style.middleColumn}>
          <Header />
          <MainPost user={user} />
          <AllTweets/>
        </div>
        <div className={style.rightColumn}>
          <RecommendList />
        </div>
      </div>
    </div>
  )
}

export default HomePage;