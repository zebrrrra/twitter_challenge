import style from '../Navbars/Navbars.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
//import Modal
import TweetModal from '../TweetModal/TweetModal';
//import SVG
import ACLogo from '../../assets/icon/logo.png';
import HomeIcon from '../../assets/icon/home_1.svg';
import InfoIcon from '../../assets/icon/user.svg';
import SettingIcon from '../../assets/icon/cog_1.svg'
import LogoutIcon from '../../assets/icon/logout_1.svg'
//import { ReactComponent as HomeIconActive } from '../../assets/icon/home.png';
//import { ReactComponent as UserIcon } from '../../assets/icon/outlineduser.png';

const Navbars = () => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  //const handleLogoChange =()=>{


  //}
  const handlebuttonClick = () => {
    setOpenModal(true)
  }
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <>
      <div className={style.navbarContainer}>
        <div className={style.NavbarLogo}><img src={ACLogo} alt="" /></div>
        <div className={style.NavbarGroup}>
          <Link to="/">
            <div className={style.NavbarItem}>
              <img className={style.NavbarPng} src={HomeIcon} alt="Home" />
              <span>首頁</span>
            </div>
          </Link>
          <Link to="/">
            <div className={style.NavbarItem}>
              <img className={style.NavbarPng} src={InfoIcon} alt="Icon" />
              <span>個人資料</span>
            </div>
          </Link>
          <Link to="/">
            <div className={style.NavbarItem}>
              <img className={style.NavbarPng} src={SettingIcon} alt="Setting" />
              <span>設定</span>
            </div>
          </Link>
          <button className={style.NavbarButton} onClick={handlebuttonClick}>推文</button>
        </div>
        {openModal && <TweetModal open={openModal} onClose={() => setOpenModal(false)} />}
      </div>
      <div className={style.logout} onClick={handleLogout}><img className={style.NavbarPng} src={LogoutIcon} alt="logout" />登出</div>
    </>

  )
}
export default Navbars;





/*先全部註解確認版面後再跑
//已登入的使用者
const checkIfLoggedIn=()=>{
const token = localStorage.getItem('token');
return token !== null;    
}

//登出頁面
const handleLogout=(e)=>{
    preventDefault(e);
    localStorage.removeItem('authToken');
    Navigate('/LoginPage');

};

//Navbar
const Navbar ()=>{
    //function
    const navigate=useNavigate();
    const [isLoggedIn,setIsLoggedIn]= useState(false);
    return(
       <nav className={styles.NavbarContainer}>
       <ACLogo/>
       <div className={styles.NavBarItem}>
        <NavBarItem
        path='/'
        text="首頁"
        icon=HomeIcon={isActive}
        />
        <NavBarItem
        path='/'
        text="個人資料"
        icon=
        />
        <NavBarItem
        path='/'
        text="設定"
        icon=
        />
        </div>
        <button className={styles.button}>推文</button>
        </nav>
        /*{isLoggedIn? (<div className={styles.logout} onClick={handleLogout}>登出
        </div>) :(
            <div className={styles.logout}>登入</div>
        )
   
    )
}*/
