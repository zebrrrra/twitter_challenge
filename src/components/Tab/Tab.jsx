//import { useParams,Link } from 'react-router-dom'; 
import style from './Tab.module.scss';
import { useState } from 'react';
import {Routes,Route, useNavigate} from 'react-router-dom';
import TweetList from '../TweetList/TweetList';
import LikeList from '../LikeList/LikeList';
import ReplyList from '../ReplyList/ReplyList';

const Tab = ({ userId }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("推文");
    
    const handleClick = (tabName) => {
        setActiveTab(tabName);
        switch (tabName) {
            case "推文":
                navigate(`/${userId}/tweets`);
                break;
            case "回覆":
                navigate(`/${userId}/replies`);
                break;
            case "喜歡的內容":
                navigate(`/${userId}/likes`);
                break;
            default:
                navigate(`/${userId}/tweets`);
                break;
        }
    };

    return (
        <div>
            <div className={style.tabContainer}>
                <div 
                    className={`${style.tab} ${activeTab === "推文" ? style.active : ""}`}
                    onClick={() => handleClick("推文")}
                >
                    推文
                </div>
                <div 
                    className={`${style.tab} ${activeTab === "回覆" ? style.active : ""}`}
                    onClick={() => handleClick("回覆")}
                >
                    回覆
                </div>
                <div 
                    className={`${style.tab} ${activeTab === "喜歡的內容" ? style.active : ""}`}
                    onClick={() => handleClick("喜歡的內容")}
                >
                    喜歡的內容
                </div>
            </div>
            <Routes>
                <Route path="tweets" element={<TweetList userId={userId} />} />
                <Route path="replies" element={<ReplyList userId={userId} />} />
                <Route path="likes" element={<LikeList userId={userId} />} />
                <Route path="*" element={<TweetList userId={userId} />} /> 
            </Routes>
        </div>
    );
}

export default Tab;




/*const Tab = (userId) =>{
    return(
        <Routes>
            <Route path ='tweets'>
                <TweetList userId={userId} />
            </Route>



        </Routes>
    )

}

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