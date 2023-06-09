import style from './RecommendList.module.scss';
//import {RecommendItem} from 'src/components/RecommendItem/RecommendItem.jsx';
//import {AuthContext} from 'react' //TODO: 要確認有沒有寫這個;
import  Avatar  from '../../assets/icon/img.svg'
 const RecommendList = ()=>{

    return(

        <div className={style.recommendListContainer}>
            <h5 className="justify center">推薦跟隨</h5>
        <div className={style.recommendCard}>
        
        <img className={style.avatar} src={Avatar}alt="Avatar"/>
        <div className={style.userInfo}>
        <div className={style.name}>pizzahut </div>
        <div className={style.userName}>@pizzahut</div>
        </div>
        <button className={style.buttonFollowing}>正在跟隨</button>
        </div>
        <div className={style.recommendCard}>
        
        <img className={style.avatar} src={Avatar}alt="Avatar"/>
        <div className={style.userInfo}>
        <div className={style.name}>pizzahut </div>
        <div className={style.userName}>@pizzahut</div>
        </div>
        <button className={style.buttonFollower}>跟隨</button>
        </div>
        <div className={style.recommendCard}>
        
        <img className={style.avatar} src={Avatar}alt="Avatar"/>
        <div className={style.userInfo}>
        <div className={style.name}>pizzahut </div>
        <div className={style.userName}>@pizzahut</div>
        </div>
        <button className={style.buttonFollowing}>正在跟隨</button>
        </div>

        </div>

    )
}
export default RecommendList;



//先註解掉確定版面位置對再來
/*const RecommendList = ({ userList }) =>{

const { authToken,isLoggedIn} = useContext (AuthContext);
const [userList, setUserList] = useState([]);


return(
<div className= {style.RecommendList}>
<div className={style.recommendCard}>
{userList.map((user)=>(
<RecommendItem
key={user.id}
avatar={user.avatar}
name={user.name}
username={user.username}
isFollowed= {user.isFollowed}
onToggleFollow={()=> toggleFollow(user.id)}?
/>
))}
</div>
</div>
);
};

export default RecommendList;*/
