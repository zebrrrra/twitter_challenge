//OtherUserInfo.jsx
// import style from "./UserInfo.module.scss"
import style from "./OtherUserInfo.module.scss"
import { Link } from "react-router-dom"
import EditModal from "../EditModal/EditModal"
import { useState, useEffect } from "react"
import { getUsers } from "../../apis/user"
import { useAuth } from "../../context/AuthContext"
import { ReactComponent as BellOpen } from "../../assets/icon/btn_notfi打開.svg"
import { ReactComponent as BellClose } from "../../assets/icon/btn_notfi關閉.svg"
import email from "../../assets/icon/email.svg"

const OtherUserInfo = ({ userId }) => {
  const [openModal, setOpenModal] = useState(false);
  const [currentData, setCurrentData] = useState(null)
  const [isToggle, setIsToggle] = useState(false)
  const { account, avatar, cover, name, introduction, followersCount, followingsCount } = currentData || {}

  console.log(userId)

  const handleFollow = () => { }


  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUsers(userId);
      setCurrentData(userData);
    };
    fetchData();
  }, [userId, openModal]);


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
        {isToggle ? <BellOpen onClick={() => setIsToggle(!isToggle)} /> : <BellClose onClick={() => setIsToggle(!isToggle)} />}
        <button className={style.buttonFollowing} type="button" onClick={handleFollow}>{"正在跟隨"}</button>
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
      {openModal && <EditModal open={openModal} onClose={(value) => setOpenModal(value)} currentId={userId} userData={currentData} />}
    </div >

  )

}

export default OtherUserInfo