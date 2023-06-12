
import RecommendList from '../../components/RecommendList/RecommendList';
import Navbar from '../../components/Navbars/Navbars';
import Header from '../../components/Headers/Headers';
import Main from '../../components/Main/Main';
import style from './ProfilePage.module.scss'
import {useAuth} from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ProfilePage = () => {
  const { user, isAuthenticated } =useAuth();
  const navigate =useNavigate();
  useEffect(()=>{
    if (!isAuthenticated){
      navigate ('/login');
    }
    }
    ,[navigate,isAuthenticated])
    
  return (
    <div className={style.profileContainer}>
      <div className={style.homeColumn}>
        <div className={style.leftColumn}>
          <Navbar />
        </div>
        <div className={style.middleColumn}>
          <Header />
          <Main userId={user.id} />
        </div>
        <div className={style.rightColumn}>
          <RecommendList />
        </div>
      </div>
    </div>
  )
}

export default ProfilePage;