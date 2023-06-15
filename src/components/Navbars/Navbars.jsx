import style from '../Navbars/Navbars.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getUsers } from "../../apis/user"
//import Modal
import TweetModal from '../TweetModal/TweetModal';
import EditModal from "../EditModal/EditModal"
//import SVG
import ACLogo from '../../assets/icon/logo.png';
import HomeIcon from '../../assets/icons/homeLine.svg';
import InfoIcon from '../../assets/icons/userLine.svg';
import SettingIcon from '../../assets/icons/cogLine.svg'
import LogoutIcon from '../../assets/icons/logout.svg'
import { useAuth } from '../../context/AuthContext';

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
          <Link to="/main">
            <div className={style.NavbarItem}>
              <img className={style.NavbarPng} src={HomeIcon} alt="Home" />
              <span>首頁</span>
            </div>
          </Link>
          <Link to="/profile">
            <div className={style.NavbarItem}>
              <img className={style.NavbarPng} src={InfoIcon} alt="Icon" />
              <span>個人資料</span>
            </div>
          </Link>
          <Link to="/setting">
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
