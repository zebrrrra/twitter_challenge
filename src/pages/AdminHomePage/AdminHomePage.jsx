import style from './AdminHomePage.module.scss'
import AdminNavbars from '../../components/Navbars/AdminNavbar';
import AdminAllTweet from '../../components/AdminAllTweet/AdminAllTweet';

const AdminHomePage = () => {


  return (
    <div className={style.homeContainer}>
      <div className={style.leftColumn}>
        <AdminNavbars />
      </div>
      <div className={style.middleColumn}>
        <div className={style.HeaderContainer}>
          <div className={style.Header}>推文清單</div>
        </div>
        <AdminAllTweet />
      </div>
    </div>
  )
}

export default AdminHomePage;