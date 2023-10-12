import style from './ChatNavbars.module.scss'
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
import publicIcon from '../../assets/icons/publicChat.svg'
import isPublicIcon from '../../assets/icons/isPublicChat.svg'

import GroupIcon from '../../assets/icons/Group.svg';
import isNoticeIcon from '../../assets/icons/isNotice.svg'
import NoticeIcon from '../../assets/icons/Notice.svg'

//chat
import { useAuth } from '../../context/AuthContext';
import { useChatUnRead } from '../../context/ChatUnreadContext';
import { ReactComponent as Tweet } from "../../assets/icons/write.svg"
const ChatNavbars = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isIconClicked, setIconClicked] = useState(false);
  const location = useLocation();
  const { logout, room } = useAuth()
  const { chatUnRead } = useChatUnRead();
  const { roomId } = useParams()

  useEffect(() => {
    setIconClicked(location.pathname);
  }, [location]);

  const handleTabClick = () => {
    setIconClicked(true);
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
              <span className={style.NavbarName}>首頁</span>
            </div>
          </Link>
          <Link to="/notice">
            <div
              className={`${style.NavbarItem} ${location.pathname === '/notice' ? style.active : ''}`}
              onClick={() => handleTabClick('notice')}>
              <img className={style.NavbarPng}
                src={isIconClicked === '/notice' ? isNoticeIcon : NoticeIcon} alt="notice" />
              <span className={style.NavbarName}>通知</span>
            </div>
          </Link>
          <Link to="/chat">
            <div
              className={`${style.NavbarItem} ${location.pathname === '/chat' ? style.active : ''}`}
              onClick={() => handleTabClick('chat')}
            >
              <img className={style.NavbarPng}
                src={isIconClicked === '/chat' ? isPublicIcon : publicIcon}
                alt="Icon" />
              <span className={style.NavbarName}>公開聊天室</span>
            </div>
          </Link>
          {/* 如果room為0可能表示此登入者為新帳號 */}
          <Link to={`/chat/${room}`}>
            <div
              className={`${style.NavbarItem} ${location.pathname === `/chat/${roomId}` ? style.active : ''}`}
              onClick={() => handleTabClick(`/chat/${roomId}`)}
            >
              <img className={style.NavbarPng}
                src={chatUnRead.allUnreadCounts > 0 ? GroupIcon : (isIconClicked === `/chat/${roomId}` ? isChatIcon : chatIcon)}
                alt="Icon" />
              <span className={style.NavbarName}>私人訊息</span>
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
              <span className={style.NavbarName}>個人資料</span>
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
              <span className={style.NavbarName}>設定</span>
            </div>
          </Link>
          <button className={style.NavbarButton} onClick={() => setOpenModal(true)}>
            <span>推文</span>
            <Tweet className={style.NavbarTweetIcon} />
          </button>
        </div>
        {openModal && <TweetModal open={openModal} onClose={(res) => setOpenModal(res)} />}
        <div className={style.logout} onClick={logout}><img className={style.NavbarPng} src={LogoutIcon} alt="logout" /><span className={style.NavbarName}>登出</span></div>
      </div>

    </>

  )
}
export default ChatNavbars;


