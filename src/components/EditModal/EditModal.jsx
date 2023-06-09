import { useState } from "react"
import style from "../EditModal/EditModal.module.scss"
import AuthInput from "../AuthInput/AuthInput"
import editAvatar from '../../assets/icons/editAvatar.svg'
import editBackground from '../../assets/icons/editBackground.svg'


const EditModal = ({ open, onClose, onChange }) => {
  const [background, setBackground] = useState(editBackground)
  const [avatar, setAvatar] = useState(editAvatar)

  const [description, setDescription] = useState('')

  if (!open) return;
  return (
    <div className={style.background}>
      <div className={style.container}>
        <header className={style.header}>
          <div className={style.leftContainer}>
            <button onClick={() => onClose(false)}> X </button>
            <h5 className="title">編輯個人資料</h5>
          </div>

          <button className={style.saveButton} onClick={() => onClose(false)}> 儲存 </button>
        </header>

        <div className={style.bgContainer}>
          <img src={background} alt="background" />
        </div>
        <div className={style.avatarContainer}>
          <img src={avatar} alt="avatar" />
        </div>

        <div className={style.inputContainer}>
          <AuthInput value={56} label="名稱" id="username" type="text" placeholder="請輸入使用者名稱" maxLength={50} onChange={(nameValue) => onChange(nameValue)} message />

          <AuthInput value={description} label="自我介紹" id="description" type="text" placeholder="請輸入自我介紹" maxLength={160} onChange={(descriptionValue) => setDescription(descriptionValue)} message height={147} />
        </div>
      </div>
    </div>



  )
}
export default EditModal