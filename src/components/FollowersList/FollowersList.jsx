import FollowCard from "../FollowCard/FollowCard";
import useFollow from "../../hooks/FollowHook";

const FollowersList = ({users, setUsers})=>{
const {handleFollow,handleUnFollow}=useFollow(users,setUsers);



    return (
        <>
        {users&&users.map(user => (
    <FollowCard
    key ={user.id}
    user={user}
    onFollow={handleFollow}
    onUnfollow={handleUnFollow}/>
    
     ))}
     </>
    )
    };

export default FollowersList;