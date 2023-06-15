//EdiitModal.jsx

import { useState } from "react"
import style from "../EditModal/EditModal.module.scss"
import AuthInput from "../AuthInput/AuthInput"
import editAvatar from '../../assets/icons/editAvatar.svg'
import editCover from "../../assets/icons/editCover.svg"
import { ReactComponent as Upload } from "../../assets/icons/camera.svg"
import { ReactComponent as Fork } from "../../assets/icons/Vector.svg"
import { putUserProfile } from "../../apis/user"
import { useAuth } from "../../context/AuthContext"
import Swal from "sweetalert2"
const EditModal = ({ open, onClose, userId, userData }) => {
  const { user } = useAuth()

  const { avatar, cover, name, introduction } = userData
  console.log(userData)//can get
  console.log(userId)//can get
  console.log(user.id)//can get

  const [editName, setEditName] = useState(name);
  const [editAvatar, setEditAvatar] = useState(avatar);
  const [editCover, setEditCover] = useState(cover);
  const [editIntroduction, setEditIntroduction] = useState(introduction);


  const handleAvatarUpload = (e) => {
    // 取得使用者上傳的圖
    const data = e.target.files[0];
    if (!data) return;
    setEditAvatar(data)
  }

  const handleCoverUpload = (e) => {
    const data = e.target.files[0];
    if (!data) return;
    setEditCover(data)

  }

  // 儲存後發送api
  const handleProfileSave = async ({ cover, avatar, name, introduction }) => {
    if (!editName.trim() || !editIntroduction.trim()) {
      Swal.fire({
        title: '內容不可為空白',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        position: 'top',
      });
      return
    }
    if (editName.length > 50 || editIntroduction.length > 160) {
      Swal.fire({
        title: '字數超出上限',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        position: 'top',
      });
      return
    }

    const { success, message } = await putUserProfile({ id: userId, name: editName, avatar: editAvatar, cover: editCover, introduction: editIntroduction })
    if (success) {
      console.log('成功')
      Swal.fire({
        title: '編輯成功',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
        position: 'top',
      });
      return
    }

    if (!success) {
      console.log(message)
      Swal.fire({
        title: '編輯失敗',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        position: 'top',
      });
    }
    console.log(message)

    onClose(false)

  }


  if (!open) return;
  return (
    <div className={style.grayBackground}>
      <div className={style.container}>
        <header className={style.header}>
          <div className={style.leftContainer}>
            <button onClick={() => onClose(false)}> X </button>
            <h5 className="title">編輯個人資料</h5>
          </div>
          <button className={style.saveButton} onClick={handleProfileSave}> 儲存 </button>
        </header>
        {/* <form className={style.uploadFormContainer} action="/api/users/:id/profile" method="POST" encType="multipart/form-data"> */}

        <label htmlFor="coverUpload" className={style.bgContainer}>
          <img src={editCover} alt="cover" />
          <Upload className={style.upload} />
          <Fork className={style.fork} />
        </label>
        <input type="file"
          id="coverUpload"
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleCoverUpload} />

        <label htmlFor="Avatarupload" className={style.avatarContainer}>
          <img src={editAvatar} alt="avatar" />
          <Upload className={style.upload} />
        </label>
        <input type="file"
          id="Avatarupload"
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleAvatarUpload} />

        {/* </form> */}


        <div className={style.inputContainer}>
          <AuthInput value={editName} label="名稱" id="username" type="text" placeholder="請輸入使用者名稱" maxLength={50} onChange={(nameValue) => setEditName(nameValue)} />

          <AuthInput value={editIntroduction} label="自我介紹" id="introduction" type="text" placeholder="請輸入自我介紹" maxLength={160} onChange={(introductionValue) => setEditIntroduction(introductionValue)} height={147} />
        </div>
      </div>
    </div>



  )
}
export default EditModal