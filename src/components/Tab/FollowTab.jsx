import style from './Tab.module.scss';
import { useState } from 'react';

const FollowTab = () =>{
    const [activeTab, setactiveTab] = useState("追隨者");
    const handleClick = (tabName) =>
    {
        setactiveTab (tabName);
    };
    return(
        <div className={style.tabContainer}>
          <div className={`${style.tab} ${activeTab ==="追隨者"?style.active:""}`} onClick={()=>handleClick("追隨者")}>追隨者</div>
            <div className={`${style.tab} ${activeTab==="正在追隨"?style.active:""}`} onClick={()=>handleClick("正在追隨")}>正在追隨</div>
         
        </div>
    )

}


export default FollowTab;
/*const Tab = () => {
    const { userId } =useParams();

 return (
    <div>
        <div className="tabs">
            <Link to ={`/user/${userId}/tweets`}>Tweets</Link>
            <Link to ={`/user/${userId}/replies`}>Replies</Link>
            <Link to ={`/user/${userId}/likes`}>Likes</Link>
            </div>
    </div>
 )
}

export default Tab;*/