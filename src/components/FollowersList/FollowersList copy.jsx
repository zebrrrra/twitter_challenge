/*import FollowCard from "../FollowCard/FollowCard";
import { postFollowShips,deleteFollowShips } from "../../apis/followship";
import { getUserFollowers,getUsers } from "../../apis/user";
import { useEffect,useState } from "react";


const FollowersList = ({userId})=>{

    const [users, setUsers] = useState([]);

    const handleFollow = async (id) => {
        const response = await postFollowShips(id);
        if (response && response.status === 'success') {
            const updatedUser = await getUsers(id);
            if (updatedUser) {
                setUsers((currentUsers) =>
                    currentUsers.map((user) =>
                        user.id === id
                            ? { ...user, ...updatedUser, isCurrentUserFollowed: true }
                            : user
                    )
                );
            }
        }
    };
    
    const handleUnFollow = async (id) => {
        const response = await deleteFollowShips(id);
        if (response && response.status === 'success') {
            const updatedUser = await getUsers(id);
            if (updatedUser) {
                setUsers((currentUsers) =>
                    currentUsers.map((user) =>
                        user.id === id
                            ? { ...user, ...updatedUser, isCurrentUserFollowed: false }
                            : user
                    )
                );
            }
        }
    };
    useEffect(()=>{
        const fetchFollowers= async ()=>{
            const userData = await getUserFollowers(userId);
            console.log(userData);//測試
            console.log(users);
            if (userData){
                setUsers(userData.map(user=>({
                    ...user.Follower,
                    isCurrentUserFollowed:user.isCurrentUserFollowed
                })
                ));
            }
        }
        fetchFollowers();
    },[userId]);

    return (
        <>
        {users.map(user => (
    <FollowCard
    key ={user.id}
    user={user}
    onFollow={handleFollow}
    onUnfollow={handleUnFollow}/>
    
     ))}
     </>
    )
    };

export default FollowersList;*/