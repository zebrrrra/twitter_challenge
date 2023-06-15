import FollowCard from "../FollowCard/FollowCard";
import useFollow from "../../hooks/FollowHook";
import { useEffect,useState } from "react";
import { getUserFollowings } from "../../apis/user";


const FollowingList = ({userId})=>{
    const [users, setUsers] = useState([]);
    const {handleFollow, handleUnFollow} = useFollow(users,setUsers);
    console.log('Rendering FollowingList with users:', users);

    useEffect(()=>{
        const fetchFollowings= async ()=>{
            const userData = await getUserFollowings(userId);
            console.log(userData);//測試
            console.log(users);
            if (userData){
                setUsers(userData.map(user=>({
                    ...user.Following,
                     isCurrentUserFollowed: user.Following.isCurrentUserFollowed === 'true'
                })
                ));
            }
        }
        fetchFollowings();
    },[userId]);

    return (
        <>
        {users&& users.map(user => (
    <FollowCard
    key ={user.id}
    user={user}
    onFollow={handleFollow}
    onUnfollow={handleUnFollow}/>
    
     ))}
     </>
    )
    };

export default FollowingList;