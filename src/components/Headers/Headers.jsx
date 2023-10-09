import style from './Headers.module.scss';
import { useLocation } from 'react-router-dom';
import LeftIcon from '../../assets/icons/back.svg';
import { useNavigate } from 'react-router';
import { useGetUserQuery } from '../../hooks/QueryHook';
import Skeleton from 'react-loading-skeleton';


const Header = ({ userId }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { data, isLoading, isFetching } = useGetUserQuery(userId)
    const handleClickSection = () => {
        navigate(-1);
    }

    if (isLoading && isFetching) {
        return <Skeleton className={style.skeleton} />
    }


    let headerContext = "";
    const path = location.pathname;

    if (path === '/main') {
        headerContext =
            <div className={style.Header}>首頁</div>

    } else if (path.match(new RegExp(`/profile|/${userId}/followers|/${userId}/followings|/${userId}/(tweets|likes|replies)$|/${userId}`))) {
        headerContext =
            <><div className={style.imgContainer}>
                <img src={LeftIcon} alt="left" onClick={handleClickSection} /></div>
                <div className={style.contentContainer}>
                    <span className={style.name}>{data?.name}</span>
                    <div className={style.tweetCount}>{data?.tweetsCount} 推文</div></div>

            </>;
    } else if (path.includes('/otherProfile')) {
        headerContext =
            <><div className={style.imgContainer}>
                <img src={LeftIcon} alt="left" onClick={handleClickSection} /></div>
                <div className={style.contentContainer}>
                    <span className={style.name}>{data.name}</span>
                    <div className={style.tweetCount}>{data.tweetsCount} 推文</div></div>
            </>;
    }
    else if (path.includes(`/tweets/:tweetId`)) {
        headerContext =
            <div className={style.Header}>推文</div>
    }
    else if (path.includes(`/`)) {
        headerContext =
            <><div className={style.imgContainer}>
                <img src={LeftIcon} alt="left" onClick={handleClickSection} /></div>
                <div className={style.contentContainer}>
                    <div className={style.Header}> 推文</div></div>
            </>;

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
