import style from './RecommendList.module.scss';
import RecommendItem from '../RecommendItem/RecommendItem';
import {useState, useEffect} from 'react'; 
import {getTopFollowers} from '../../apis/user';
import {postFollowShips, deleteFollowShips } from '../../apis/followship';
//import {useAuth} from '../../context/AuthContext';
import { async } from 'q';

 const RecommendList = ()=>{
    const [users, setUsers] = useState([]);

    const handleFollow = async (id) =>{
      const response = await postFollowShips(id);
      if (response && response.status ==='success'){
        setUsers (users.map(user=>user.id ===id?{...user, isCurrentUserFollowed:true}:user));
    
    console.log('handlefollow isCurrentUserFollowed:',id)
    }
  };
  const handleunFollow = async (id) =>{
    const response = await deleteFollowShips(id);
    console.log(id) //測試
    if (response && response.status ==='success'){
      setUsers (users.map(user=>user.id ===id?{...user, isCurrentUserFollowed:false}:user));
      console.log('Unfollow isCurrentUserFollowed:',id)
    }
};

    useEffect(()=>{
        const fetchTopFollowers = async () => {
      
            const userData =await getTopFollowers();
            console.log (userData);//測試
            if (userData) {
                setUsers(userData);
            }
        }
        fetchTopFollowers();
    },[]);
    return (
    <div className={style.recommendListContainer}>
      <h5 className="justify center">推薦跟隨</h5>
      {users.map(user => (
        <RecommendItem 
        key={user.id} 
        user={user}
        onFollow={handleFollow}
        onUnfollow={handleunFollow} />
      ))}
    </div>
  )
};

export default RecommendList;