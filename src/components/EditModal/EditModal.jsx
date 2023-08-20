import { useState } from "react"
import style from "../EditModal/EditModal.module.scss"
import AuthInput from "../AuthInput/AuthInput"
import { ReactComponent as Upload } from "../../assets/icons/camera.svg"
import { ReactComponent as Fork } from "../../assets/icons/Vector.svg"
import { ReactComponent as Close } from "../../assets/icons/orangeClose.svg"
import { ReactComponent as Back } from "../../assets/icons/back.svg"
import { putUserProfile } from "../../apis/user"
import Swal from "sweetalert2"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ClipLoader } from 'react-spinners';

const EditModal = ({ open, onClose, userId, userData }) => {
  const { avatar, cover, name, introduction } = userData
  const [editName, setEditName] = useState(name);
  const [editAvatar, setEditAvatar] = useState(avatar);
  const [editCover, setEditCover] = useState(cover);
  const [editIntroduction, setEditIntroduction] = useState(introduction);

  // 給預覽用
  const [preViewAvatar, setPreViewAvatar] = useState('');
  const [preViewCover, setPreViewCover] = useState('');
  const queryClient = useQueryClient()

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
  // 處理put請求
  const mutation = useMutation({
    mutationFn: () => {
      if (!editName?.trim() || !editIntroduction?.trim()) {
        Swal.fire({
          title: '內容不可空白',
          icon: 'error',
          showConfirmButton: false,
          timer: 2000,
          position: 'top',
        });
        throw new Error('內容不可空白')
      }
      if (editName.length > 50 || editIntroduction.length > 160) {
        Swal.fire({
          title: '字數超出上限!',
          icon: 'error',
          showConfirmButton: false,
          timer: 2000,
          position: 'top',
        });
        throw new Error('字數超出上限')
      }
      return putUserProfile({ id: userId, name: editName, avatar: editAvatar, cover: editCover, introduction: editIntroduction })
    },
    onSuccess: (data) => {
      if (data.data.status === 'success') {
        queryClient.invalidateQueries({ queryKey: ['getUser', { id: userId }] })
        queryClient.invalidateQueries({ queryKey: ['getUserTweets', { id: userId }] })
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
      } else {
        Swal.fire({
          title: '編輯失敗',
          icon: 'error',
          showConfirmButton: false,
          timer: 2000,
          position: 'top',
        });
      }
    }
  })

  const override = {
    position: 'absolute',
    bottom: '50%',
    left: '50%',
    translate: '-25%',
  };

  if (!open) return;
  return (
    <div className={style.grayBackground}>
      <div className={`${style.container} ${mutation.isLoading && `${style.isLoading}`}`}>
        <header className={style.header}>
          <div className={style.leftContainer}>
            <button onClick={() => onClose(false)} disabled={mutation.isLoading}>
              <Close className={style.closeButton} />
              <Back className={style.backButton} />
            </button>
            <h5 className="title">編輯個人資料</h5>
          </div>
          <button className={style.saveButton} onClick={mutation.mutate} disabled={mutation.isLoading}> 儲存 </button>
        </header>

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
          disabled={mutation.isLoading}
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
          disabled={mutation.isLoading}
        />
        <div className={style.inputContainer}>
          <ClipLoader size={60} color='#cccccc' loading={mutation.isLoading} cssOverride={override} />
          <AuthInput value={editName} label="名稱" id="username" type="text" placeholder="請輸入使用者名稱" maxLength={50} onChange={(nameValue) => setEditName(nameValue)} disabled={mutation.isLoading} />
          <AuthInput value={editIntroduction} label="自我介紹" id="introduction" type="text" placeholder="請輸入自我介紹" maxLength={160} height={147} onChange={(introductionValue) => setEditIntroduction(introductionValue)} disabled={mutation.isLoading} />
        </div>
      </div>
    </div>
  )
}
export default EditModal