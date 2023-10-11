import style from './RecommendItem.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useFollow, useUnFollow } from '../../hooks/FollowHook';

const RecommendItem = ({ user }) => {
  const { id } = useParams()
  const buttonClass = user.isCurrentUserFollowed ? style.buttonFollowing : style.buttonFollower;
  const buttonText = user.isCurrentUserFollowed ? "正在跟隨" : "跟隨";
  const { followMutation } = useFollow({ userId: Number(id), cardId: user.id })
  const { unFollowMutation } = useUnFollow({ userId: Number(id), cardId: user.id })

  const handleButtonClick = () => {
    if (user.isCurrentUserFollowed) {
      unFollowMutation.mutate()
    } else {
      followMutation.mutate()
    }
  }

  const navigate = useNavigate();
  const handleAvatarClick = (userId) => {
    navigate(`/${userId}`);
  };
  return (
    <div className={style.RecommendListContainer}>
      <div className={style.recommendCard}>

        <img src={user.avatar} className={style.avatar} onClick={() => handleAvatarClick(user.id)} alt="avatar" />
        <div className={style.userInfo}>
          <div className={style.name}>{user.name} </div>
          <div className={style.userName}>@{user.account}</div>
        </div>
        <button className={buttonClass} onClick={handleButtonClick}>{buttonText}</button>
      </div>
    </div>
  )

}
export default RecommendItem;