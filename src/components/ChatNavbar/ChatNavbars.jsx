import style from '../Navbars/Navbars.module.scss';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
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
import chatIcon from '../../assets/icons/message.svg';
import isChatIcon from '../../assets/icons/isMessage.svg';
import GroupIcon from '../../assets/icons/Group.svg';
//chat
import { useAuth } from '../../context/AuthContext';
import { useChatUnRead } from '../../context/ChatUnreadContext';

const ChatNavbars = ({ onTweetSubmit }) => {
  const [openModal, setOpenModal] = useState(false);
  const [activeTab, setActiveTab] = useState('');
  const [isIconClicked, setIconClicked] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const location = useLocation();
  const { logout } = useAuth()
  const [publicReadCount, setPublicReadCount] = useState(
    Number(localStorage.getItem("publicReadCount")) || 0);
  const { chatUnRead } = useChatUnRead();
  const { roomId } = useParams()

  useEffect(() => {
    setIconClicked(location.pathname);
  }, [location]);


  const handlebuttonClick = () => {
    setOpenModal(true)
  }


  const handleLogout = () => {
    logout()
  }

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setIconClicked(true);
    if (tabName === '') {
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
          <Link to="/chat">
            <div
              className={`${style.NavbarItem} ${location.pathname === '/chat' ? style.active : ''}`}
              onClick={() => { handleTabClick('chat') }}
            >
              <img className={style.NavbarPng}
                src={isIconClicked === '/chat' ? isChatIcon : chatIcon}
                alt="Icon" />
              <span>公開聊天室</span>
            </div>
          </Link>
          {/* FIXME 當no chatUser& no chatUnRead.messages時，roomId是undefined*/}
          <Link to={roomId ? `/chat/${roomId}` : `/chat/${chatUnRead?.messages[0]?.roomId}`}>
            <div
              className={`${style.NavbarItem} ${location.pathname === `/chat/${roomId}` ? style.active : ''}`}
              onClick={() => { handleTabClick(`/chat/${roomId}`) }}
            >
              <img className={style.NavbarPng}
                src={chatUnRead.allUnreadCounts > 0 ? GroupIcon : (isIconClicked === `/chat/${roomId}` ? isChatIcon : chatIcon)}
                alt="Icon" />
              <span>私人聊天室</span>
              <div>{chatUnRead.allUnreadCounts > 0 && `(${chatUnRead.allUnreadCounts})`}</div>
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
        {openModal && <TweetModal open={openModal} onClose={(res) => setOpenModal(res)} onTweetSubmit={onTweetSubmit} />}
        <div className={style.logout} onClick={handleLogout}><img className={style.NavbarPng} src={LogoutIcon} alt="logout" />登出</div>
      </div>

    </>

  )
}
export default ChatNavbars;


