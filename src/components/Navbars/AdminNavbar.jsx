import style from '../Navbars/Navbars.module.scss';
import { Link, useNavigate } from 'react-router-dom';
//import SVG
import ACLogo from '../../assets/icon/logo.png';
import HomeIcon  from '../../assets/icon/home_1.svg';
import InfoIcon from '../../assets/icon/user.svg';
import LogoutIcon from '../../assets/icon/logout_1.svg'

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
            <Link to="/">
            <div className={style.NavbarItem}>
                <img className={style.NavbarPng} src={HomeIcon} alt="Home" />
                <span>推文清單</span>
            </div>
            </Link>
            <Link to="/">
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




