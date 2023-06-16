
import style from './FollowCard.module.scss';
import { useNavigate } from 'react-router-dom';

const FollowCard = ({user,loginUserId,onFollow,onUnfollow}) => {
const buttonClass = user.isCurrentUserFollowed ?style.buttonFollowing: style.buttonFollower;
const buttonText = user.isCurrentUserFollowed? "正在跟隨":"跟隨";
const navigate = useNavigate();

const handleAvatarClick = (userId) => {
  navigate(`/${userId}`);
};


    return (
        <div className={style.followCardContainer}>
                 <div className={style.followCard}>  
        <img className={style.avatar} src={user.avatar}onClick={() => handleAvatarClick(user.id)}alt="Avatar"/>
        <div className={style.userInfo}>
        <div className={style.name}>{user.name}</div>
        <div className={style.intro}>{user.introduction}</div></div>
        {user.isCurrentUserFollowed ? (
          <button className={buttonClass} onClick={() => onUnfollow(user.id)}>
            {buttonText}
          </button>
        ) : (
          <button className={buttonClass} onClick={() => onFollow(user.id)}>
            {buttonText}
          </button>
             )}
        </div>
        </div> 
    
    )
    
}
export default FollowCard;