import AdminUserCard from '../AdminUserCard/AdminUserCard';
import style from './AdminUserList.module.scss';
import { useGetAdminUserQuery } from "../../hooks/QueryHook";
import Skeleton from "react-loading-skeleton";

const AdminUserList = ({ userId }) => {
    const { data, isLoading } = useGetAdminUserQuery(userId)
    return (
        <div className={style.adminUserContainer}>
            {isLoading && <Skeleton count={8} containerClassName={style.skeletonContainer} className={style.skeleton} />}
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







