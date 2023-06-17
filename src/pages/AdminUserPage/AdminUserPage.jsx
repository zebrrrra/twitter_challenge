import style from './AdminUserPage.module.scss'
import {Header} from '../../components';
import AdminNavbars from '../../components/Navbars/AdminNavbar';
import {useAuth} from '../../context/AuthContext'
import AdminUserList from '../../components/AdminUserList/AdminUserList';
import AdminHeader from '../../components/AdminHeader/AdminHeaders';


const AdminUserPage = () => {
   const {user} = useAuth();

  return (
    <div className={style.homeContainer}>

        <div className={style.leftColumn}>
          <AdminNavbars />
        </div>
        <div className={style.middleColumn}>
          <AdminHeader />
            <AdminUserList user={user&&user.id}/>
        </div>
      </div>

  )
}

export default AdminUserPage;