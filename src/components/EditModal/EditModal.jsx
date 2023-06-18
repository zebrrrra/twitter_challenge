import { useState } from "react"
import style from "../EditModal/EditModal.module.scss"
import AuthInput from "../AuthInput/AuthInput"
import { ReactComponent as Upload } from "../../assets/icons/camera.svg"
import { ReactComponent as Fork } from "../../assets/icons/Vector.svg"
import { putUserProfile } from "../../apis/user"
import Swal from "sweetalert2"
import { useUpdateTag } from '../../context/UpdateTagContext';

const EditModal = ({ open, onClose, userId, userData }) => {

  const { avatar, cover, name, introduction } = userData
  const [editName, setEditName] = useState(name);
  const [editAvatar, setEditAvatar] = useState(avatar);
  const [editCover, setEditCover] = useState(cover);
  const [editIntroduction, setEditIntroduction] = useState(introduction);

  // 給預覽用
  const [preViewAvatar, setPreViewAvatar] = useState('');
  const [preViewCover, setPreViewCover] = useState('');

  const { setUpdateTag } = useUpdateTag();

  // 預覽
  const handleAvatarUpload = (e) => {
    // 取得使用者上傳的圖
    const data = e.target.files[0];
    if (!data) return;
    setEditAvatar(data)
    const reader = new FileReader();

    reader.onload = (e) => {
      setPreViewAvatar(e.target.result);
    };
    reader.readAsDataURL(data);
  }


  // 預覽
  const handleCoverUpload = (e) => {
    const data = e.target.files[0];
    if (!data) return;
    setEditCover(data)
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreViewCover(e.target.result);
    };

    reader.readAsDataURL(data);

  }


  // 儲存後發送api
  const handleProfileSave = async ({ cover, avatar, name, introduction }) => {
    if (!editName?.trim() || !editIntroduction?.trim()) {
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

    const { success } = await putUserProfile({ id: userId, name: editName, avatar: editAvatar, cover: editCover, introduction: editIntroduction })
    setUpdateTag(prev => !prev);
    if (success) {
      Swal.fire({
        title: '編輯成功',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
        position: 'top',
      });
      // 如果使用者有編輯頭像
      if (preViewAvatar) {
        const imageURL = URL.createObjectURL(editAvatar)
        localStorage.setItem('avatar', imageURL);
      }
      onClose(false)
      return
    }

    if (!success) {
      Swal.fire({
        title: '編輯失敗',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        position: 'top',
      });
    }
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
          {preViewCover ? (
            <img src={preViewCover} alt="Preview" />
          ) : (
            <img src={editCover} alt="cover" />
          )}
          <Upload className={style.upload} />
          <Fork className={style.fork} />
        </label>
        <input type="file"
          id="coverUpload"
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleCoverUpload}
        />

        <label htmlFor="Avatarupload" className={style.avatarContainer}>
          {preViewAvatar ? (
            <img src={preViewAvatar} alt="Preview" className={style.avatar} />
          ) : (
            <img src={editAvatar} alt="avatar" className={style.avatar} />
          )}
          <Upload className={style.upload} />
        </label>
        <input type="file"
          id="Avatarupload"
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleAvatarUpload}
        />

        {/* </form> */}

        <div className={style.inputContainer}>
          <AuthInput value={editName} label="名稱" id="username" type="text" placeholder="請輸入使用者名稱" maxLength={50} onChange={(nameValue) => setEditName(nameValue)} />

          <AuthInput value={editIntroduction} label="自我介紹" id="introduction" type="text" placeholder="請輸入自我介紹" maxLength={160} height={147} onChange={(introductionValue) => setEditIntroduction(introductionValue)} />
        </div>
      </div>
    </div>



  )
}
export default EditModal