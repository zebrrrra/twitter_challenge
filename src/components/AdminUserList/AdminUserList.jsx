import AdminUserCard from '../AdminUserCard/AdminUserCard';
import style from './AdminUserList.module.scss';
import { useGetAdminUserQuery } from "../../hooks/QueryHook";
import Skeleton from "react-loading-skeleton";

const AdminUserList = ({ userId }) => {
    // const [adminAllUser, setAdminAllUsers] = useState([]);
    const { data, isLoading } = useGetAdminUserQuery(userId)
    // useEffect(() => {
    //     const fetchAdminUser = async () => {
    //         const data = await getAdminUsers();
    //         if (data) {
    //             setAdminAllUsers(data);
    //         }
    //     }
    //     fetchAdminUser();
    // }, [userId]);
    if (isLoading) {
        return <Skeleton />
    }
    return (
        <div className={style.adminUserContainer}>
            {
                data?.map(adminAllUser => {
                    if (!adminAllUser.id) {
                        return null;
                    }
                    return <AdminUserCard
                        key={adminAllUser.id}
                        user={adminAllUser}
                        type="allUserList"
                    />
                })
            }
        </div>
    )
}





export default AdminUserList;







