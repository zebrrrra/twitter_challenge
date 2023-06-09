//import { useParams,Link } from 'react-router-dom'; 
import style from './Tab.module.scss';
import { useState } from 'react';

const Tab = ({onTabChange}) =>{
    const [activeTab, setactiveTab] = useState("推文");
    const handleClick = (tabName) =>
    {
        setactiveTab (tabName);
        if (onTabChange){
            onTabChange(tabName);
        }
    };
    return(
        <div className={style.tabContainer}>
          <div className={`${style.tab} ${activeTab ==="推文"?style.active:""}`} onClick={()=>handleClick("推文")}>推文</div>
            <div className={`${style.tab} ${activeTab==="回覆"?style.active:""}`} onClick={()=>handleClick("回覆")}>回覆</div>
            <div className={`${style.tab} ${activeTab==="喜歡的內容"?style.active:""}`} onClick={()=>handleClick("喜歡的內容")}>喜歡的內容</div>
        </div>
    )

}


export default Tab;

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