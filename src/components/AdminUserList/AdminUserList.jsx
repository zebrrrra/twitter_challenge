import { useEffect,useState } from "react";
import { getAdminUsers } from "../../apis/admin";
import AdminUserCard from '../AdminUserCard/AdminUserCard';
import style from './AdminUserList.module.scss';

const AdminUserList =({userId})=>{
const [adminAllUser, setAdminAllUsers] = useState([]);

useEffect(()=>{
    const fetchAdminUser =async ()=>{
        const data = await getAdminUsers();
        console.log(data);
        if (data) {
            setAdminAllUsers(data);
        }
    }
    fetchAdminUser();
},[userId]);
return (
    <div className={style.adminUserContainer}>
        {
adminAllUser.map (adminAllUser =>{
    if (!adminAllUser.id){
        return null;
    }
    return <AdminUserCard
    key ={adminAllUser.id}
    user={adminAllUser}
    type="allUserList"
    />
})
}

    </div>



)
    }





export default AdminUserList;







