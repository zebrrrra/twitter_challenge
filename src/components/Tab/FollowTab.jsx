//import { useParams,Link } from 'react-router-dom'; 
import style from './Tab.module.scss';
import { useState, useEffect} from 'react';
import {Routes,Route, useLocation} from 'react-router-dom';
import FollowList from '../FollowList/FollowList';



const FollowTab = ({ userId }) => {
    const [activeTab, setActiveTab] = useState("追隨者");
    const location = useLocation();

    useEffect(() => {
        const currentPath = location.pathname.split('/').pop();
        switch (currentPath) {
            case 'followings':
                setActiveTab('追隨者');
                break;
            case 'followers':
                setActiveTab('正在追隨');
                break;
            default:
                setActiveTab('追隨者');
                break;
        }
    }, [location.pathname]);  
    
    const handleClick = (tabName) => {
        setActiveTab(tabName);
        switch (tabName) {
            case 'followings':
                setActiveTab('追隨者');
                break;
            case 'followers':
                setActiveTab('正在追隨');
                break;
            default:
                setActiveTab('追隨者');
                break;
        }
    };

    return (
        <div>
            <div className={style.tabContainer}>
                <div 
                    className={`${style.tab} ${activeTab === "追隨者" ? style.active : ""}`}
                    onClick={() => handleClick("追隨者")}
                >
                    追隨者
                </div>
                <div 
                    className={`${style.tab} ${activeTab === "正在追隨" ? style.active : ""}`}
                    onClick={() => handleClick("正在追隨")}
                >
                    正在追隨
                </div>

            </div>
            <Routes>
                <Route path="followers" element={<FollowList userId={userId} listType="followers"/>} />
                <Route path="followings" element={<FollowList userId={userId} listType="following"/>} />
                <Route path="*" element={<FollowList userId={userId} listType="followers"/>} /> 
            </Routes>
        </div>
    );
}

export default FollowTab;

