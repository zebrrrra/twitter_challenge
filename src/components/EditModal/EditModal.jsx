import { useState } from "react"
import style from "../EditModal/EditModal.module.scss"
import AuthInput from "../AuthInput/AuthInput"
import editAvatar from '../../assets/icons/editAvatar.svg'
import editCover from "../../assets/icons/editCover.svg"
import { ReactComponent as Upload } from "../../assets/icons/camera.svg"
import { ReactComponent as Fork } from "../../assets/icons/Vector.svg"
import { putUserProfile } from "../../apis/user"

const EditModal = ({ open, onClose, onChange }) => {
  //  name, introduction, avatar, cover


  // /users/: id / profile 修改資料以後資料庫變成undefined
  // 這個問題已經解決，主要問題是以下：
  // - handleAvatarUpload / handleCoverUpload 不需要改成 new FormData
  //   - const handleProfileSave = async() 這裡面不需要放參數
  // - 確認 user.js / EditModal.jsx 裡面 PutUserProfile 參數的順序，原本是有順序問題
  // 程式碼修改已經寫在會議記錄裡面，要改 user.js / EditModel.jsx 兩隻檔案


  //接api的資料
  const [cover, setCover] = useState(editCover)
  const [avatar, setAvatar] = useState(editAvatar)

  const [name, setName] = useState('')
  const [introduction, setIntroduction] = useState('')


  const handleAvatarUpload = (e) => {
    // 取得使用者上傳的圖
    const data = e.target.files[0];
    if (!data) return;
    const formData = new FormData();
    formData.append('avatar', data)

    // console.log(formData.get('avatar'))
    setAvatar(formData)
  }

  const handleCoverUpload = (e) => {
    const data = e.target.files[0];
    if (!data) return;
    const formData = new FormData();
    formData.append('cover', data)
    setCover(formData)

  }

  // 儲存後發送api
  const handleProfileSave = async ({ cover, avatar, name, introduction }) => {


    let id = 174

    const payload = await putUserProfile({ id, cover, avatar, name, introduction })

    console.log(payload)
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
          <img src={cover} alt="cover" />
          <Upload className={style.upload} />
          <Fork className={style.fork} />
        </label>
        <input type="file"
          id="coverUpload"
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleCoverUpload} />

        <label htmlFor="Avatarupload" className={style.avatarContainer}>
          <img src={avatar} alt="avatar" />
          <Upload className={style.upload} />
        </label>
        <input type="file"
          id="Avatarupload"
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleAvatarUpload} />

        {/* </form> */}


        <div className={style.inputContainer}>
          <AuthInput value={name} label="名稱" id="username" type="text" placeholder="請輸入使用者名稱" maxLength={50} onChange={(nameValue) => setName(nameValue)} message />

          <AuthInput value={introduction} label="自我介紹" id="introduction" type="text" placeholder="請輸入自我介紹" maxLength={160} onChange={(introductionValue) => setIntroduction(introductionValue)} message height={147} />
        </div>
      </div>
    </div>



  )
}
export default EditModal