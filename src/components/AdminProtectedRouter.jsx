import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRouter =({children})=>{

    const {user, isAuthenticated}= useAuth();
    if (!isAuthenticated){
        //如果用戶沒登入，導覽到login
        return <Navigate to="/login" replace/>;
    } else if (user.role !=="admin"){
        //如果用戶不是admin,導到首頁
        return <Navigate to="/login" replace/>;
    } else {
        return children;
    }


}
export default ProtectedRouter;