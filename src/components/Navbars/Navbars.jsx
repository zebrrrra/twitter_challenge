import style from '../Navbars/Navbars.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
//import Modal
import TweetModal from '../TweetModal/TweetModal';
//import SVG
import ACLogo from '../../assets/icon/logo.png';
import HomeIcon from '../../assets/icons/homeLine.svg';
import InfoIcon from '../../assets/icons/userLine.svg';
import SettingIcon from '../../assets/icons/cogLine.svg'
import LogoutIcon from '../../assets/icons/logout.svg'
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




