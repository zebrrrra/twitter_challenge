
import style from './FollowCard.module.scss';


const FollowCard = ({user,onFollow,onUnfollow}) => {


const buttonClass = user.isCurrentUserFollowed ?style.buttonFollowing: style.buttonFollower;
const buttonText = user.isCurrentUserFollowed? "正在跟隨":"跟隨";


const handleButtonClick=()=>{
    if (user.isCurrentUserFollowed){
        onUnfollow(user.id);
    } else{
        onFollow(user.id);
    }
    console.log('user is:', user);
console.log('isCurrentUserFollowed is:', user.isCurrentUserFollowed);
};
    return (
        <div className={style.followCardContainer}>
                 <div className={style.followCard}>  
        <img className={style.avatar} src={user.avatar}alt="Avatar"/>
        <div className={style.userInfo}>
        <div className={style.name}>{user.name}</div>
        <div className={style.intro}>{user.introduction}</div></div>
        <button className={buttonClass} onClick={handleButtonClick}>{buttonText}</button>

        </div>
        </div> 
    
    )
    
}
export default FollowCard;