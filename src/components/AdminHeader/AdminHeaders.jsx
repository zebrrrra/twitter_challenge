import style from './Headers.module.scss';
import { useLocation } from 'react-router-dom';

const AdminHeader = () => {
  

    const location = useLocation();


    let headerContext="";
    const path = location.pathname;

    if (path === '/admin/list') {
        headerContext = 
        <div className={style.Header}>推文清單</div>

    }
    else if (path.includes('/admin/user')){
        headerContext =
        <div className={style.Header}>使用者列表</div>
    }
    else {
        headerContext = '';
    }

    return (
        <div className={style.HeaderContainer}>
            {headerContext}
        </div>
    );
}

export default AdminHeader;
