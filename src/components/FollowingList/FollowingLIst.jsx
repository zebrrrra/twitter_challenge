/*import FollowCard from "../FollowCard/FollowCard";
import { postFollowShips,deleteFollowShips } from "../../apis/followship";
import { getUserFollowings } from "../../apis/user";
import { useEffect,useState,useContext } from "react";
import { FollowContext } from "../../context/FollowContext";

const FollowingList = ({userId})=>{

    const [users, setUsers] = useState([]);

    const handleFollow = async(id)=>{
        const response = await postFollowShips(id);
        if (response && response.status === 'success'){
            setUsers(users.map(user=>user.id ===id?{...user, isCurrentUserFollowed:true}:user));
        }
    };
    const handleUnFollow = async(id)=> {
        const response = await deleteFollowShips(id);
        if (response && response.status ==='success'){
            setUsers(users.map (user=>user.id===id?{...user, isCurrentUserFollowed:false}:user));
        }
    };

    useEffect(()=>{
        const fetchFollowers= async ()=>{
            const userData = await getUserFollowings(userId);
            console.log(userData);//測試
            if (userData){
                setUsers(userData.map(user=>({
                    ...user.Following,
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

export default FollowingList;*/