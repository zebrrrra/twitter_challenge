
import style from './FollowCard.module.scss';
import { useNavigate } from 'react-router-dom';
import { useFollow, useUnFollow } from '../../hooks/FollowHook';
const FollowCard = ({ user, cardId, userId, loginUserId, isFollowed }) => {

  const buttonClass = isFollowed ? style.buttonFollowing : style.buttonFollower;
  const buttonText = isFollowed ? "正在跟隨" : "跟隨";
  const navigate = useNavigate();
  const { followMutation } = useFollow({ userId, cardId })
  const { unFollowMutation } = useUnFollow({ userId, cardId })

  const handleAvatarClick = (userId) => {
    navigate(`/${userId}`);
  };

  const handleButtonClick = () => {
    if (isFollowed) {
      // 橘色按鈕
      unFollowMutation.mutate()
    } else {
      // 白色按鈕
      followMutation.mutate()
    }
  }

  return (
    <div className={style.followCardContainer}>
      <div className={style.followCard}>
        <img className={style.avatar} src={user.avatar} onClick={() => handleAvatarClick(user.id)} alt="Avatar" />
        <div className={style.userInfo}>
          <div className={style.name}>{user.name}</div>
          <span className={style.intro}>{user.introduction}</span></div>
        {user.id !== loginUserId && <button className={buttonClass} onClick={handleButtonClick}>{buttonText}</button>}
      </div>
    </div>

  )

}
export default FollowCard;