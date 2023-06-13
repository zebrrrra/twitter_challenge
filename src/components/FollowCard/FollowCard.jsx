import Avatar from '../../assets/icon/img1.png';
import style from './FollowCard.module.scss';

const FollowCard = () => {


    return (
        <div className={style.followCardContainer}>
        <img src={Avatar} alt="avatar"/>
        <div className='name'>Apple</div>
        <div className='intro'></div>
        <button className={style.buttonFollowing}>正在跟隨</button>
        </div>

    )
}

export default FollowCard;