import style from "./UserInfo.module.scss"
import { Link } from "react-router-dom"
import EditModal from "../EditModal/EditModal"
import { useState } from "react"
import { useGetUserQuery } from "../../hooks/QueryHook"
import Skeleton from "react-loading-skeleton"

const UserInfo = ({ userId }) => {
  const [openModal, setOpenModal] = useState(false);
  const { data, isLoading } = useGetUserQuery(userId)
  const { account, avatar, cover, name, introduction, followersCount, followingsCount } = data || {};

  // 點按鈕的
  const handleOpenClick = async () => {
    setOpenModal(true)
  }

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
        <button className={style.button} type="button" onClick={handleOpenClick}>編輯個人資料</button>
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
      {openModal && <EditModal open={openModal} onClose={(value) => setOpenModal(value)} userId={userId} userData={data} />}
    </div >
  )
}

export default UserInfo