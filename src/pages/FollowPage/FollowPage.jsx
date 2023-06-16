import {Navbars, RecommendList} from '../../components';
import FollowTab from '../../components/Tab/FollowTab';
import Headers from '../../components/Headers/Headers';
import {useAuth} from '../../context/AuthContext';
import { useNavigate,useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import style from './FollowPage.module.scss';
import {getUsers} from '../../apis/user';
const FollowPage = ()=>{
  //網址用戶的id
    const {id} =useParams();
    //登入用戶 
    const { user,isAuthenticated} = useAuth();
    console.log(user); //測試
    const navigate =useNavigate();
    const [profileUser,setProfileUser] =useState(null);


    useEffect(()=>{
      if (!isAuthenticated){
        navigate ('/login');
      }
  
      const fetchUser = async () => {
        const userData = await getUsers(id);
        setProfileUser(userData);
      };
      fetchUser();
    }, [navigate, isAuthenticated, id]);

    //整個頁面的follow方法
    

    return(
        <div className={style.followContainer}>
        <div className={style.homeColumn}>
          <div className={style.leftColumn}>
            <Navbars userId={id}/>
            </div>
            <div className={style.middleColumn}>
              <Headers userId={profileUser && profileUser.id}/>
            <FollowTab userId={id} loginUserId={user && user.id}/>
            </div>
        <div className={style.rightColumn}>
            <RecommendList/>
            </div>
      </div>
    </div>
    )
}

export default FollowPage;
