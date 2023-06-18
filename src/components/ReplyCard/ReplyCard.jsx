import style from './ReplyCard.module.scss';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useNavigate } from 'react-router-dom';

dayjs.extend(relativeTime);
dayjs.locale('zh-tw');
//要算時間用-先保留試著用Day.js
function getTime(createdAt) {
    const currentTime = dayjs();
    const createdTime = dayjs(createdAt);

    if (currentTime.diff(createdTime, 'hour') < 24) {
        return createdTime.fromNow();//day.js的套件
    } else {
        return createdTime.format('YYYY/MM/DD');
    }
}

const ReplyCard = ({reply}) => {
    const navigate = useNavigate();
    const handleAvatarClick = (userId) => {
        navigate(`/${userId}`);
      };

    const {
        User: { name, account,avatar } = {},
        Tweet: { User } = {},
        comment,
        createdAt,
    } = reply;

    return(
        <div className={style.tweetCardContainer}>
                    <div className={style.tweetCard}>
                    <img src={avatar} className={style.avatar} onClick={() => handleAvatarClick(reply.User.id)} alt="avatar"/>
                        <div className={style.contentContainer}>
                            <div className={style.nameAndUserId}>
                                <span className={style.name}>{name}</span>
                                <span className={style.userIdTime}>@{account}・{getTime(createdAt)}</span>
                            </div>
                            <div className={style.replyContainer}>
                                <div className={style.reply}>回覆</div>
                                <div className={style.replyId}>@{User?.account}</div> </div>
                            <div className={style.tweet}>
                                {comment}
                            </div>

                        </div>
                    </div>
                    </div>

            )

    

}
export default ReplyCard;
