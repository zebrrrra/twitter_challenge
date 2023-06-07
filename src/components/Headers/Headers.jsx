import style from './Headers.module.scss';
//import { useAuthContext } from ''; // 判斷登入的
//import { Link } from 'react-router-dom';
import LeftIcon from '../../assets/icon/back.svg';
//文字變動:首頁 & username &推文 &'帳戶設定
//TODO: 要確認變動值的內容

const Header = ({currentSection, setCurrentSection, otherUser, otherUserTweetCount}) => {
    //const {userData, userTweetCount} = useAuthContext();

    const handleClickSection = () => {
        setCurrentSection('mainPage');
    }

    let headerContext="";

    switch (currentSection) {
        case 'homePage':
            headerContext = '首頁';  
            break;
        case 'replyPage':
            headerContext =
                <>
                    <img src={LeftIcon} alt="left" onClick={handleClickSection} />
                    推文
                </>;
            break;
        case 'otherUserPage':
            headerContext =
                <>
                    <img src={LeftIcon} alt="left" onClick={handleClickSection} />
                    <span>{otherUser}</span>
                    <div>{otherUserTweetCount} 推文</div>
                </>;
            break;
        case 'settingPage':
            headerContext = '帳戶設定';
            break;
        default:
            headerContext = '首頁';
    }

    return(
        <div className={style.HeaderContainer}>
            {headerContext}
        </div>
    )
}

export default Header;






