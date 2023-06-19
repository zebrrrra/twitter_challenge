//UserInfo.jsx
import avatar from "../../assets/icons/editAvatar.svg"
import cover from "../../assets/icons/background.svg"
import style from "./UserInfo.module.scss"
import { Link } from "react-router-dom"
import EditModal from "../EditModal/EditModal"
import { useState, useEffect } from "react"
import { getUsers } from "../../apis/user"
import { useAuth } from "../../context/AuthContext"
import { useUpdateTag } from '../../context/UpdateTagContext';

const UserInfo = ({ userId }) => {
  const [openModal, setOpenModal] = useState(false);
  const [currentData, setCurrentData] = useState(null)
  const { updateTag, setUpdateTag } = useUpdateTag();

  const { account, avatar, cover, name, introduction, followersCount, followingsCount } = currentData || {};

  // 點按鈕的
  const handleOpenClick = async () => {
    setOpenModal(true)

    // 發送api載入自己的資料
    const userData = await getUsers(userId)
    setCurrentData(userData)
  }

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const userData = await getUsers(userId);
        setCurrentData(userData);
      }
    };
    fetchData();
  }, [userId, openModal, setUpdateTag]);



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
      {openModal && <EditModal open={openModal} onClose={(value) => setOpenModal(value)} userId={userId} userData={currentData} />}
    </div >

  )

}

export default UserInfo