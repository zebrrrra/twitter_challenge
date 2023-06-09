import style from './RecommendItem.module.scss';

const RecommendItem = ({user})=>{
const buttonClass = user.isCurrentUserFollowed ?style.buttonFollowing:style.buttonFollower;
const buttonText = user.isCurrentUserFollowed? "正在跟隨":"跟隨";

return(
    <div className={style.recommendCard}>
        
        <img className={style.avatar} src={user.avatar}alt="Avatar"/>
        <div className={style.userInfo}>
        <div className={style.name}>{user.name} </div>
        <div className={style.userName}>@{user.account}</div>
        </div>
        <button className={buttonClass}>{buttonText}</button>
        </div>
)

}
export default RecommendItem;