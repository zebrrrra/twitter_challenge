import style from "./UserInfo.module.scss"
import background from '../../assets/icons/background.svg'
import avatar from '../../assets/icons/avatar.svg'
import { Link } from "react-router-dom"
import EditModal from "../EditModal/EditModal"
import { useState } from "react"
import { getUsers } from "../../apis/user"
<<<<<<< HEAD
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useAuth } from "../../context/AuthContext"

=======
>>>>>>> main

const UserInfo = ({ img = background, useId }) => {
  const [openModal, setOpenModal] = useState(false);
<<<<<<< HEAD
  // 使用個變數作為判斷是否為別人 
  const { user, payload, setPayload } = useAuth()


  const handleOpenClick = async () => {
    setOpenModal(true)

    // 發送api載入自己的資料
    const id = user.id
    console.log(id)
    const userData = await getUsers(id)
    console.log(userData)
    setPayload(userData)
=======
  // 使用個變數作為判斷是否為別人 點擊頭

  const handleClick = async () => {
    setOpenModal(true)
    // id透過jwt解析token獲得

    // 發送api載入自己的資料
    // const payload = await getUsers(id)
>>>>>>> main
  }
  // useEffect(() => {
  //   console.log('params id:', userId); // params id: 123
  // }, []);
  return (
    <div className={style.container}>
      <div className={style.bgContainer}>
        <img src={img} alt="background" />
      </div>
      <div className={style.avatarContainer}>
        <img src={avatar} alt="avatar" />
      </div>
      <div className={style.buttonContainer}>
        <button className={style.button} type="button" onClick={handleOpenClick}>編輯個人資料</button>
      </div>
      <div className={style.textContainer}>
        <h5 className={style.name}>"qq"</h5>
        <span className={style.account}>@"sss"</span>
        <p>"qq"</p>
        <div className={style.linkGroup}>
          <Link to="" className={style.link}>321個<span>跟隨中</span></Link>
          <Link to="" className={style.link}>31個<span>跟隨者</span></Link>
        </div>
      </div>
<<<<<<< HEAD
      {openModal && <EditModal payload={payload} open={openModal} onClose={(value) => setOpenModal(value)} />}
=======
      {openModal && <EditModal open={openModal} onClose={(value) => setOpenModal(value)} />}
>>>>>>> main
    </div >

  )
}

export default UserInfo