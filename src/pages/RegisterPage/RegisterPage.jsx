import { useState } from 'react'
import style from './RegisterPage.module.scss'
import { ReactComponent as Logo } from '../../assets/icons/logo.svg'
import { Link } from 'react-router-dom'
import { AuthInput } from '../../components'
import Swal from 'sweetalert2'
// import { register } from '../../apis/user'
import { useAuth } from '../../context/AuthContext'
const RegisterPage = () => {
  const [account, setAccount] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [checkPassword, setCheckPassword] = useState('')
  // const [responseError, setResponseError] = useState(false)
  // const [errorInfo, setErrorInfo] = useState('')
  // 改用context
  const { register, isAuthenticated, user, responseError, errorInfo, setResponseError } = useAuth()

  const authInputCollection = [
    { label: '帳號', id: 'account', type: 'text', placeholder: '請輸入帳號', value: account, onChange: (accountValue) => setAccount(accountValue) },
    { label: '名稱', id: '名稱', type: 'text', placeholder: '請輸入使用者名稱', value: name, maxLength: 50, onChange: (nameValue) => setName(nameValue) },
    { label: 'Email', id: 'email', type: 'email', placeholder: '請輸入Email', value: email, onChange: (emailValue) => setEmail(emailValue) },
    { label: '密碼', id: '密碼', type: 'password', placeholder: '請輸入密碼', value: password, onChange: (passwordValue) => setPassword(passwordValue) },
    { label: '密碼確認', id: '密碼確認', type: 'password', placeholder: '請再次輸入密碼', value: checkPassword, onChange: (checkPasswordValue) => setCheckPassword(checkPasswordValue) },
  ];

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!account.trim() || !password.trim() || !name.trim() || !checkPassword.trim() || !email.trim()) {
      Swal.fire({
        title: '內容不可為空白',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        position: 'top',
      });
      return
    }
    // // 發api { true, 成功資訊, 錯誤資訊 }
    const success = await register({ account, name, password, email, checkPassword })

    if (success) {
      const message = '登入成功'
      Swal.fire({
        title: message,
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
        position: 'top',
      });
      setResponseError(false)
      return
    }

    if (!success) {

      Swal.fire({
        title: errorInfo,
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        position: 'top',
      });
      setResponseError(true)

      return
    }
  }

  return (
    <div className={style.container}>
      <Logo className={style.logo} />
      <h3 className={style.title}>建立你的帳號</h3>
      <form className={style.form} onSubmit={handleRegisterSubmit}>
        {authInputCollection.map(({ label, id, type, placeholder, value, maxLength, onChange }) => (
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
          />
        ))}
        <button className={style.button} type="submit" >註冊</button>
      </form >
      <div className={style.linkGroup}>
        <Link to='/login' className={style.link}>取消</Link>
      </div>
    </div>
  )
}
export default RegisterPage
