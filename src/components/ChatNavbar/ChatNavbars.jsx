import style from '../Navbars/Navbars.module.scss';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
//import Modal
import TweetModal from '../TweetModal/TweetModal';
//import SVG
import ACLogo from '../../assets/icon/logo.png';
import HomeIcon from '../../assets/icons/homeLine.svg';
import InfoIcon from '../../assets/icons/userLine.svg';
import SettingIcon from '../../assets/icons/cogLine.svg'
import LogoutIcon from '../../assets/icons/logout.svg'
import isHomeIcon from '../../assets/icons/isHome.svg'
import isSettingIcon from '../../assets/icons/isSetting.svg'
import isInfoIcon from '../../assets/icons/isProfile.svg'
import chatIcon from '../../assets/icons/message.svg'
//chat
import { useChat } from '../../context/ChatContext';

const ChatNavbars = ({ onTweetSubmit }) => {
  const [openModal, setOpenModal] = useState(false);
  const [activeTab, setActiveTab] = useState('');
  const [isIconClicked, setIconClicked] = useState(false);
  const [hasNewMessage, setHasNewMessage]= useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  //要讀取socket.io
  const socket = useChat();
 //連線
  useEffect (()=>{
    if(socket){
    socket.on('server-message',()=>{
      setHasNewMessage(true);
    });
    return ()=>{
      if(socket){
      socket.off('server-message');
    };
  }}
  },[socket]);


  useEffect(() => {
    setIconClicked(location.pathname);
  }, [location]);

  const handlebuttonClick = () => {
    setOpenModal(true)
  }


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('avatar');
    navigate('/login');
  }


  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setIconClicked(true);
    if(tabName===''){
      setHasNewMessage(false);
    }
  }

  return (
    <>
      <div className={style.navbarContainer}>
        <div className={style.NavbarLogo}><img src={ACLogo} alt="" /></div>
        <div className={style.NavbarGroup}>
          <Link to="/main">
            <div
              className={`${style.NavbarItem} ${location.pathname === '/main' ? style.active : ''}`}
              onClick={() => handleTabClick('main')}>
              <img className={style.NavbarPng}
                src={isIconClicked === '/main' ? isHomeIcon : HomeIcon} alt="Home" />
              <span>首頁</span>
            </div>
          </Link>
           <Link to="/">
            <div
              className={`${style.NavbarItem} ${location.pathname === '/' ? style.active : ''}`}
              onClick={() => handleTabClick('')}
            >
              <img className={style.NavbarPng}
                src={isIconClicked === '/' ?chatIcon:chatIcon} alt="Icon" /> {/* 要確定Icon設計是否要自己畫*/}
              <span>公開聊天室</span>
            </div>
          </Link>

          <Link to="/profile">
            <div
              className={`${style.NavbarItem} ${location.pathname === '/profile' ? style.active : ''}`}
              onClick={() => handleTabClick('profile')}
            >
              <img className={style.NavbarPng}
                src={isIconClicked === '/profile' ? isInfoIcon : InfoIcon} alt="Icon" />
              <span>個人資料</span>
            </div>
          </Link>
          <Link to="/setting">
            <div
              className={`${style.NavbarItem} ${location.pathname === '/setting' ? style.active : ''}`}
              onClick={() => handleTabClick('setting')}
            >
              <img className={style.NavbarPng}
                src={isIconClicked === '/setting' ? isSettingIcon : SettingIcon}
                alt="Setting" />
              <span>設定</span>
            </div>
          </Link>
          <button className={style.NavbarButton} onClick={handlebuttonClick}>推文</button>
        </div>
        {openModal && <TweetModal open={openModal} onClose={() => setOpenModal(false)} onTweetSubmit={onTweetSubmit} />}
        <div className={style.logout} onClick={handleLogout}><img className={style.NavbarPng} src={LogoutIcon} alt="logout" />登出</div>
      </div>
      
    </>

  )
}
export default ChatNavbars;




