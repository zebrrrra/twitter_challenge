import style from './AdminTweetCard.module.scss'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg'


dayjs.extend(relativeTime);
dayjs.locale('zh-tw');
function getTime(createdAt) {
    const currentTime = dayjs();
    const createdTime = dayjs(createdAt);

    if (currentTime.diff(createdTime, 'hour') < 24) {
        return createdTime.fromNow();//day.js的套件
    } else {
        return createdTime.format('YYYY/MM/DD');
    }
}



const AdminTweetCard = ({ tweet,handleOnDelete }) => {

    const {
        id,
        User: {name,account,avatar}= {},
        description,
        createdAt,
    } = tweet;


        return (
            <>
                <div className={style.tweetCardContainer}>
                <div className={style.tweetCard}>
                    <img src={avatar} className={style.avatar} alt="avatar"/>
                    <div className={style.contentContainer}>
                        <div className={style.nameAndUserId}>
                            <span className={style.name}>{name}</span>
                            <span className={style.userIdTime}>@{account}・{getTime(createdAt)}</span>
                        </div>
                        <div className={style.tweet}>
                            {description} 
                        </div>
        
                    </div>
                    <div className={style.closeIcon}>
                    <div onClick={()=>handleOnDelete(id)}><CloseIcon/></div>
                    </div>
                </div>
                </div>
            </>
        );

}

export default AdminTweetCard;



