import style from './Headers.module.scss';
import { useLocation } from 'react-router-dom';
import LeftIcon from '../../assets/icons/back.svg';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { getUserTweets } from '../../apis/user';

const Header = ({userId, setCurrentSection}) => {
    const [tweetCount, setTweetCount] = useState(0);
    const [name, setName] = useState('');
    const navigate= useNavigate();
    const location = useLocation();

    const handleClickSection = () => {
        navigate(-1);
    }

    useEffect(() => {
        const fetchUserTweets = async () => {
            const userTweets = await getUserTweets(userId);
            setTweetCount(userTweets.length);
            if (userTweets.length > 0 && userTweets[0].User) {
                setName(userTweets[0].User.name);
            } else {
                console.error('No tweets found');
            }
        };
        fetchUserTweets();
    }, [userId]);

    let headerContext="";
    const path = location.pathname;

    if (path === '/main') {
        headerContext = 
        <div className={style.Header}>首頁</div>

    }else if (path.match(new RegExp(`/profile|/${userId}/followers|/${userId}/followings|/${userId}/(tweets|likes|replies)$|/${userId}`))) {
        headerContext = 
        <><div className={style.imgContainer}>
            <img src={LeftIcon} alt="left" onClick={handleClickSection} /></div>
            <div className={style.contentContainer}>
            <span className={style.name}>{name}</span>
            <div className={style.tweetCount}>{tweetCount} 推文</div></div>
        </>;
    } else if (path.includes('/otherProfile')) {
        headerContext = 
        <><div className={style.imgContainer}>
        <img src={LeftIcon} alt="left" onClick={handleClickSection} /></div>
        <div className={style.contentContainer}>
        <span className={style.name}>{name}</span>
        <div className={style.tweetCount}>{tweetCount} 推文</div></div>
    </>;
    } else if (path.includes('/setting')) {
        headerContext = 
        <div className={style.Header}>帳戶設定</div>
    } 
    else if (path.includes(`/tweets/:tweetId`)){
        headerContext =
        <div className={style.Header}>推文</div>
    }
    else {
        headerContext = '';
    }

    return (
        <div className={style.HeaderContainer}>
            {headerContext}
        </div>
    );
}

export default Header;
