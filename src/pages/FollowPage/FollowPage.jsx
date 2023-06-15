import {Navbars, RecommendList} from '../../components';
import FollowTab from '../../components/Tab/FollowTab';
import {useAuth} from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import style from './FollowPage.module.scss';
const FollowPage = ()=>{

    const { user,isAuthenticated} = useAuth();
    console.log(user); //測試
    const navigate =useNavigate();
    useEffect(()=>{
      if (!isAuthenticated){
        navigate ('/login');
      }
      },[navigate,isAuthenticated])
  

    return(
        <div className={style.followContainer}>
        <div className={style.homeColumn}>
          <div className={style.leftColumn}>
            <Navbars/>
            </div>
            <div className={style.middleColumn}>
            <FollowTab userId={user && user.id}/>
            </div>
        <div className={style.rightColumn}>
            <RecommendList/>
            </div>
      </div>
    </div>
    )
}

export default FollowPage;
