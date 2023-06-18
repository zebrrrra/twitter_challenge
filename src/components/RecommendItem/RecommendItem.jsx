import style from './RecommendItem.module.scss';
import { useNavigate } from 'react-router-dom';

const RecommendItem = ({user, onFollow, onUnfollow})=>{
const buttonClass = user.isCurrentUserFollowed ?style.buttonFollowing:style.buttonFollower;
const buttonText = user.isCurrentUserFollowed? "正在跟隨":"跟隨";

const handleButtonClick = () => {
    if (user.isCurrentUserFollowed) {
      onUnfollow(user.id);
    } else {
      onFollow(user.id);
    }
  }

  const navigate = useNavigate();
  const handleAvatarClick = (userId) => {
      navigate(`/${userId}`);
    };
return(
    <div className={style.recommendCard}>
        
        <img src={user.avatar} className={style.avatar} onClick={() => handleAvatarClick(user.id)} alt="avatar"/>
        <div className={style.userInfo}>
        <div className={style.name}>{user.name} </div>
        <div className={style.userName}>@{user.account}</div>
        </div>
        <button className={buttonClass} onClick={handleButtonClick}>{buttonText}</button>
        </div>
)

}
export default RecommendItem;