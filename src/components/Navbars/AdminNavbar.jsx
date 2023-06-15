import style from '../Navbars/Navbars.module.scss';
import { Link, useNavigate } from 'react-router-dom';
//import SVG
import ACLogo from '../../assets/icon/logo.png';
import HomeIcon from '../../assets/icons/homeLine.svg';
import InfoIcon from '../../assets/icons/userLine.svg';
import LogoutIcon from '../../assets/icons/logout.svg'

const AdminNavbars = () => {
    const navigate = useNavigate();

    //const handleonClick =()=>{

    //}
    const handleLogout=()=>{
        localStorage.removeItem('token');
        navigate('/login');
    
    
    }

    return(
        <>
        <div className={style.navbarContainer}>
            <div className={style.NavbarLogo}><img src={ACLogo} alt=""/></div>
            <div className={style.NavbarGroup}>
            <Link to="/admin/list">
            <div className={style.NavbarItem}>
                <img className={style.NavbarPng} src={HomeIcon} alt="Home" />
                <span>推文清單</span>
            </div>
            </Link>
            <Link to="/admin/user">
            <div className={style.NavbarItem}>
                <img className={style.NavbarPng} src={InfoIcon} alt="Icon"/>
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




