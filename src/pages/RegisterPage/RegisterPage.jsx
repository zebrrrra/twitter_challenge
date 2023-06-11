import { useState } from 'react'
import style from './RegisterPage.module.scss'
import { ReactComponent as Logo } from '../../assets/icons/logo.svg'
import { Link } from 'react-router-dom'
import { AuthInput } from '../../components'
import Swal from 'sweetalert2'
import { register } from '../../apis/user'

const RegisterPage = () => {
  const [account, setAccount] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [checkPassword, setCheckPassword] = useState('')
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')



  // try to useEffect [error]
  const handleNameInput = (nameValue) => {
    setName(nameValue)
    // 以下這段可能有問題沒辦法改變state
    if (name.length > 50) {
      console.log(name)
      setError(true)

      setMessage('字數超出上限')

    }
  }

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
    const { success, message, errInfo } = await register({ account, name, password, email, checkPassword })

    if (success) {
      console.log('ok')
      Swal.fire({
        title: message,
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
        position: 'top',
      });
      setError(false)
      return
    } else {
      console.log(errInfo)
      setError(true)
      setMessage(errInfo)
      return
    }
  }

  return (
    <div className={style.container}>
      <Logo className={style.logo} />
      <h3 className={style.title}>建立你的帳號</h3>
      <form className={style.form} onSubmit={handleRegisterSubmit}>
        <AuthInput label='帳號' id="account" type="text" placeholder="請輸入帳號" value={account} message={message} onChange={(accountValue) => setAccount(accountValue)} isError={error} />

        <AuthInput label='名稱' id="name" type="text" placeholder="請輸入使用者名稱" value={name} maxLength={50} onChange={handleNameInput} isError={error} message={message} />

        <AuthInput label='Email' id="email" type="email" placeholder="請輸入Email" value={email} message={message} onChange={(emailValue) => setEmail(emailValue)} isError={error} />

        <AuthInput label='密碼' id="password" type="password" placeholder="請輸入密碼" value={password} message={message} onChange={(passwordValue) => setPassword(passwordValue)} isError={error} />

        <AuthInput label='密碼確認' id="checkPassword" type="password" placeholder="請再次輸入密碼" value={checkPassword} message={message} onChange={(checkPasswordValue) => setCheckPassword(checkPasswordValue)} isError={error} />

        <button className={style.button} type="submit" >註冊</button>
      </form >
      <div className={style.linkGroup}>
        <Link to='/login' className={style.link}>取消</Link>
      </div>
    </div>
  )
}


export default RegisterPage