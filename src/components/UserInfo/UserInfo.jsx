import style from "./UserInfo.module.scss"
import background from '../../assets/icons/background.svg'
import avatar from '../../assets/icons/avatar.svg'
import { Link } from "react-router-dom"
import EditModal from "../EditModal/EditModal"
import { useState } from "react"


const UserInfo = ({ img = background }) => {
  const [openModal, setOpenModal] = useState(false);
  // const [name, setName] = useState('')


  const handleClick = () => {
    setOpenModal(true)
  }
  return (
    <div className={style.container}>
      <div className={style.bgContainer}>
        <img src={img} alt="background" />
      </div>
      <div className={style.avatarContainer}>
        <img src={avatar} alt="avatar" />
      </div>
      <div className={style.buttonContainer}>
        <button className={style.button} type="button" onClick={handleClick}>編輯個人資料</button>
      </div>
      <div className={style.textContainer}>
        <h5 className={style.name}>hkjhuhuh</h5>
        <span className={style.account}>@hkjhuhuh</span>
        <p>每次角度傍晚時畢竟⋯自己很認家的綠以為我這樣⋯的生的原因大概也信任，了沒多久能抱歉我。
        </p>
        <div className={style.linkGroup}>
          <Link to="" className={style.link}>321個<span>跟隨中</span></Link>
          <Link to="" className={style.link}>31個<span>跟隨者</span></Link>
        </div>
      </div>
      {openModal && <EditModal open={openModal} onClose={() => setOpenModal(false)} />}
    </div >

  )
}

export default UserInfo