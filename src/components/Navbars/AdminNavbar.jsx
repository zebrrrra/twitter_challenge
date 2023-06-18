import style from '../Navbars/Navbars.module.scss';
import { Link, useNavigate,useLocation } from 'react-router-dom';
//import SVG
import ACLogo from '../../assets/icon/logo.png';
import HomeIcon from '../../assets/icons/homeLine.svg';
import InfoIcon from '../../assets/icons/userLine.svg';
import LogoutIcon from '../../assets/icons/logout.svg'
import isHomeIcon from '../../assets/icons/isHome.svg'
import isInfoIcon from '../../assets/icons/isProfile.svg'
import { useState,useEffect } from 'react';

const AdminNavbars = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab,setActiveTab] =useState('');
    const [isIconClicked, setIconClicked] = useState(false);
    
    useEffect(() => {
      setIconClicked(location.pathname);
    }, [location]);

    const handleLogout=()=>{
        localStorage.removeItem('token');
        navigate('/login');
    
    
    }
    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
        setIconClicked(true);
      }
    
    return(
        <>
        <div className={style.navbarContainer}>
            <div className={style.NavbarLogo}><img src={ACLogo} alt=""/></div>
            <div className={style.NavbarGroup}>
            <Link to="/admin/list">
            <div 
            className={`${style.NavbarItem} ${location.pathname === '/admin/list' ? style.active : ''}`}
              onClick={() => handleTabClick('admin/list')}>
                <img className={style.NavbarPng} 
                src={isIconClicked === '/admin/list' ? isHomeIcon : HomeIcon} alt="Home" /> 
                <span>推文清單</span>
            </div>
            
            </Link>
            <Link to="/admin/user">
            <div 
            className={`${style.NavbarItem} ${location.pathname === '/admin/user' ? style.active : ''}`}
              onClick={() => handleTabClick('admin/user')}
            >
                <img className={style.NavbarPng} 
                                src={isIconClicked === '/admin/user' ? isInfoIcon : InfoIcon} alt="Icon" />
                <span>使用者列表</span>
            </div>   
            </Link> 
            </div>
        </div>   
        <div className={style.logout}onClick ={handleLogout}><img className={style.NavbarPng}src={LogoutIcon}  alt="logout"/>登出</div>    
        </>
    
    )
}
export default AdminNavbars;




