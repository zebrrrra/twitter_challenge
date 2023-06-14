import style from "./UserInfo.module.scss"
import { Link } from "react-router-dom"
import EditModal from "../EditModal/EditModal"
import { useState, useEffect } from "react"
import { getUsers } from "../../apis/user"
import { useAuth } from "../../context/AuthContext"

const UserInfo = ({ currentId }) => {
  const [openModal, setOpenModal] = useState(false);
  const [currentData, setCurrentData] = useState(null)
  // 使用個變數作為判斷是否為別人 點擊頭
  // const { user } = useAuth()
  console.log(currentId)

  // 點按鈕的
  const handleOpenClick = async () => {
    setOpenModal(true)

    // 發送api載入自己的資料
    const userData = await getUsers(currentId)
    console.log(userData)//有抓到
    setCurrentData(userData)
  }

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUsers(currentId);
      setCurrentData(userData);
    };
    fetchData();
  }, [currentId, openModal]);

  const { account, avatar, cover, name, introduction, followersCount, followingsCount } = currentData || {}

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
        <span className={style.account}>{account}</span>
        <p>{introduction}</p>
        <div className={style.linkGroup}>
          <Link to="" className={style.link}>{followingsCount}個<span>正在追隨</span></Link>
          <Link to="" className={style.link}>{followersCount}個<span>跟隨者</span></Link>
        </div>
      </div>
      {openModal && <EditModal open={openModal} onClose={(value) => setOpenModal(value)} currentId={currentId} userData={currentData} />}
    </div >

  )

}

export default UserInfo