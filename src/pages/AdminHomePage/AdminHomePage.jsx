import style from './AdminHomePage.module.scss'
import {Header} from '../../components';
import AdminNavbars from '../../components/Navbars/AdminNavbar';
import AdminAllTweet from '../../components/AdminAllTweet/AdminAllTweet';
import {useAuth} from '../../context/AuthContext'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const AdminHomePage = () => {
  //const { isAuthenticated,user} = useAuth();
  //console.log(user); //測試
  //const navigate =useNavigate();
  //useEffect(()=>{
    //if (!isAuthenticated){
    //  navigate ('/admin');
   // }
   // },[navigate,isAuthenticated])

  return (
    <div className={style.homeContainer}>
      <div className={style.homeColumn}>
        <div className={style.leftColumn}>
          <AdminNavbars />
        </div>
        <div className={style.middleColumn}>
          <Header />
          <AdminAllTweet/>
        </div>
      </div>
    </div>
  )
}

export default AdminHomePage;