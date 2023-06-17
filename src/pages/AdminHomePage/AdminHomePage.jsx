import style from './AdminHomePage.module.scss'
import {Header} from '../../components';
import AdminNavbars from '../../components/Navbars/AdminNavbar';
import AdminAllTweet from '../../components/AdminAllTweet/AdminAllTweet';
import AdminHeader from '../../components/AdminHeader/AdminHeaders';

const AdminHomePage = () => {


  return (
    <div className={style.homeContainer}>
      <div className={style.homeColumn}>
        <div className={style.leftColumn}>
          <AdminNavbars />
        </div>
        <div className={style.middleColumn}>
          <AdminHeader />
          <AdminAllTweet/>
        </div>
      </div>
    </div>
  )
}

export default AdminHomePage;