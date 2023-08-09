import style from './SettingPage.module.scss'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthInput, ChatNavbars } from '../../components';
import Swal from 'sweetalert2';
import { useAuth } from '../../context/AuthContext';
import useTweet from '../../hooks/TweetHook';
import { putUserSetting } from '../../apis/user';
import { getUser } from '../../apis/user';

const SettingPage = () => {
  const [userData, setUserData] = useState({ account: '', name: '', email: '', password: '', checkPassword: '' })
  const [responseError, setResponseError] = useState(false)
  const [errorInfo, setErrorInfo] = useState('')
  const navigate = useNavigate();
  const { user } = useAuth()
  const { handTweetSubmit } = useTweet()

  const handleSubmit = async (e) => {
    const id = user.id
    e.preventDefault();

    if (!userData.account?.trim() || !userData.password?.trim() || !userData.name?.trim() || !userData.checkPassword?.trim() || !userData.email?.trim()) {
      Swal.fire({
        title: '內容不可空白',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        position: 'top',
      });
      return
    }
    const { success, message } = await putUserSetting({
      id,
      account: userData.account,
      name: userData.name,
      email: userData.email,
      password: userData.password,
      checkPassword: userData.checkPassword
    });

    if (success) {
      Swal.fire({
        title: '編輯成功',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
        position: 'top',
      });
      setResponseError(false)
      navigate(`/profile`)
      return
    }

    if (!success) {
      Swal.fire({
        title: `${message}`,
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        position: 'top',
      });
      setResponseError(true)
      setErrorInfo(message)
      return
    }
  }

  useEffect(() => {
    const abortController = new AbortController();
    const fetchUser = async () => {
      const data = await getUser({ id: user?.id, signal: abortController.signal })
      if (data) {
        const { account, email, name } = data
        setUserData(pre => ({ ...pre, account, email, name }))
      }
    }
    fetchUser()
    return () => {
      abortController.abort()
    }
  }, [])

  const inputCollection = [
    { name: 'account', label: '帳號', id: 'account', type: 'text', placeholder: '請輸入帳號', value: userData.account, onChange: (value) => setUserData(prev => ({ ...prev, 'account': value })) },
    { name: 'name', label: '名稱', id: 'name', type: 'text', placeholder: '請輸入使用者名稱', value: userData.name, maxLength: 50, onChange: (value) => setUserData(prev => ({ ...prev, 'name': value })) },
    { name: 'email', label: 'Email', id: 'email', type: 'email', placeholder: '請輸入Email', value: userData.email, onChange: (value) => setUserData(prev => ({ ...prev, 'email': value })) },
    { name: 'password', label: '密碼', id: '密碼', type: 'password', placeholder: '請輸入密碼', value: userData.password, onChange: (value) => setUserData(prev => ({ ...prev, 'password': value })) },
    { name: 'checkPassword', label: '密碼確認', id: '密碼確認', type: 'password', placeholder: '請再次輸入密碼', value: userData.checkPassword, onChange: (value) => setUserData(prev => ({ ...prev, 'checkPassword': value })) },
  ];

  return (
    <div className={style.homeContainer}>
      <div className={style.homeColumn}>
        <div className={style.leftColumn}>
          <ChatNavbars onTweetSubmit={handTweetSubmit} />
        </div>
        <div className={style.middleColumn}>
          <div className={style.settingHeader}>帳戶設定</div>
          <form className={style.form} onSubmit={handleSubmit}>
            {inputCollection.map(({ label, id, type, placeholder, value, maxLength, onChange, name }) => (
              <AuthInput
                key={id}
                label={label}
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                maxLength={maxLength}
                onChange={onChange}
                responseError={responseError}
                errorInfo={errorInfo}
                name={name}
              />
            ))}
            <button className={style.button} type="submit">儲存</button>
          </form >
        </div>
        <div className={style.rightColumn}>
          <div className={style.navbarContainer}></div>
        </div>
      </div>
    </div>
  )
}





export default SettingPage