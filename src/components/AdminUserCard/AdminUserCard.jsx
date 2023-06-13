import style from "./AdminUserCard.module.scss"
import background from '../../assets/icons/background.svg'
import avatar from '../../assets/icons/avatar.svg'
import { Link } from "react-router-dom"

import { useState } from "react"
import { getUsers } from "../../apis/user"
import { useAuth } from "../../context/AuthContext"


const UserInfo = ({ img = background, useId }) => {
 
  // 使用個變數作為判斷是否為別人 
 // const { user, payload, setPayload } = useAuth()


  //const handleOpenClick = async () => {
    //setOpenModal(true)

    // 發送api載入自己的資料
    //const id = user.id
    //console.log(id)
    //const userData = await getUsers(id)
    //console.log(userData)
    //setPayload(userData)
  //}
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
    </div >

  )
}

export default UserInfo