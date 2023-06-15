import style from "./AdminUserCard.module.scss"
import background from '../../assets/icons/background.svg'
import avatar from '../../assets/icons/avatar.svg'
import { Link } from "react-router-dom"
import { ReactComponent as PostIcon } from '../../assets/icon/post.svg';
import { ReactComponent as LikeIcon } from '../../assets/icon/like_1.svg'



const AdminUserCard = ({ user }) => {
 
  const {
    name,
    account,
    cover,
    avatar,
    followersCount,
    followingsCount,
    tweetsCount,
    receivedLikesCount,
  } =user;
  const formatCount =(count)=>{
    if (count < 1000){
     return count;
    } else{
     return (count/ 1000).toFixed(1)+"k";//toFixed的意思是會留一個小數位
    }
     
   }
   

  return (
   
    <div className={style.container}>
      <div className={style.bgContainer}>
        <img src={cover} alt="background" />
      </div>
      <div className={style.avatarContainer}>
        <img src={avatar} alt="avatar" />
        
      </div>
      <div className={style.buttonContainer}>
      </div>
      <div className={style.textContainer}>
        <h5 className={style.name}>{name}</h5>
        <span className={style.account}>@{account}</span>
        <p></p>
        <div className={style.iconContainer}>
        <div className={style.icon}><PostIcon/></div> <p>{formatCount(tweetsCount)}</p>
        <div className={style.icon}><LikeIcon/></div> <p>{formatCount(receivedLikesCount)}</p>
        </div>
        <div className={style.followGroup}>
          <div className={style.follow}>{followersCount}<p>跟隨中</p></div>
          <div className={style.follow}>{followingsCount}<p>跟隨者</p></div>
        </div>
      </div>
    </div >

  )
}

export default AdminUserCard;