import style from "./OtherUserInfo.module.scss"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { ReactComponent as BellOpen } from "../../assets/icon/btn_notfi打開.svg"
import { ReactComponent as BellClose } from "../../assets/icon/btn_notfi關閉.svg"
import email from "../../assets/icon/email.svg"
import { useFollow, useUnFollow } from "../../hooks/FollowHook"
import { useChat } from "../../context/ChatContext"
import { useGetUserQuery } from "../../hooks/QueryHook"
import Skeleton from "react-loading-skeleton"
import { useAuth } from "../../context/AuthContext"

const OtherUserInfo = ({ userId, isSubscribed }) => {
  const { user } = useAuth()
  const [isToggle, setIsToggle] = useState(false)
  const { data, isLoading } = useGetUserQuery(userId)
  const { followMutation } = useFollow({ userId, loginUserId: user.id })
  const { unFollowMutation } = useUnFollow({ userId, loginUserId: user.id })

  const { id, account, avatar, cover, name, introduction, followersCount, followingsCount, isCurrentUserFollowed } = data || {}
  const socket = useChat()

  const buttonClass = isCurrentUserFollowed ? style.buttonFollowing : style.buttonFollower;
  const buttonText = isCurrentUserFollowed ? "正在跟隨" : "跟隨";
  const handleFollowClick = () => {
    if (isCurrentUserFollowed) {
      unFollowMutation.mutate()
      // handleUnFollow(id);
    } else {
      followMutation.mutate()
      // handleFollow(id);
    }
  }
  const handleBellOpen = () => {
    socket.emit('client-unsubscribe', userId)
    setIsToggle(!isToggle)
  }
  const handleBellClose = () => {
    socket.emit('client-subscribe', userId)
    setIsToggle(!isToggle)
  }

  useEffect(() => {
    setIsToggle(isSubscribed)
  }, [isSubscribed])

  // 測試用
  useEffect(() => {
    socket.on('server-unsubscribe', (res) => console.log('from BellOpen', res));
    socket.on('server-subscribe', (res) => console.log('from BellClose', res));

    return () => {
      socket.off('server-unsubscribe');
      socket.off('server-subscribe');
    };
  }, [socket]);

  // useEffect(() => {
  //   const abortController = new AbortController();
  //   const fetchUser = async () => {
  //     const data = await getUser({ id: userId, signal: abortController.signal });
  //     setUserData(data);
  //   };
  //   fetchUser();
  //   return () => {
  //     abortController.abort()
  //   }
  // }, [userId, updateTag]);
  if (isLoading) {
    return <Skeleton className={style.skeleton} />
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
        <div className={style.emailContainer}>
          <img src={email} alt="email" />
        </div>
        {isToggle ? <BellOpen onClick={handleBellOpen} /> : <BellClose onClick={handleBellClose} />}
        <button className={buttonClass} onClick={handleFollowClick}>{buttonText}</button>
      </div>
      <div className={style.textContainer}>
        <h5 className={style.name}>{name}</h5>
        <span className={style.account}>@{account}</span>
        <p>{introduction}</p>
        <div className={style.linkGroup}>
          <Link to={`/${userId}/followings`} className={style.link}>{followingsCount}個<span>正在追隨</span></Link>
          <Link to={`/${userId}/followers`} className={style.link}>{followersCount}個<span>跟隨者</span></Link>
        </div>
      </div>
    </div >

  )

}

export default OtherUserInfo