import style from './AdminUserPage.module.scss'
import {Header} from '../../components';
import AdminNavbars from '../../components/Navbars/AdminNavbar';
//import AdminAllTweet from '../../components/AdminAllTweet/AdminAllTweet';
//import {useAuth} from '../../context/AuthContext'
//import { useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';
import {useAuth} from '../../context/AuthContext'
import AdminUserList from '../../components/AdminUserList/AdminUserList';


const AdminUserPage = () => {
  //const { isAuthenticated,user} = useAuth();
  //console.log(user); //測試
  //const navigate =useNavigate();
  //useEffect(()=>{
    //if (!isAuthenticated){
    //  navigate ('/admin');
   // }
   // },[navigate,isAuthenticated])

   const {user} = useAuth();

  return (
    <div className={style.homeContainer}>

        <div className={style.leftColumn}>
          <AdminNavbars />
        </div>
        <div className={style.middleColumn}>
          <Header />
            <AdminUserList user={user&&user.id}/>
        </div>
      </div>

  )
}

export default AdminUserPage;