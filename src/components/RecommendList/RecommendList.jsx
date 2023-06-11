import style from './RecommendList.module.scss';
import RecommendItem from '../RecommendItem/RecommendItem';
import {useState, useEffect} from 'react'; 
import {getTopFollowers} from '../../apis/user';
//import {useAuth} from '../../context/AuthContext';
import { async } from 'q';

 const RecommendList = ()=>{
    const [users, setUsers] = useState([]);
    //const {isAuthenticated, login, logout, payload } = useAuth();

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
        <RecommendItem key={user.id} user={user} />
      ))}
    </div>
  )
};

export default RecommendList;
