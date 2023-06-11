import { useState } from 'react'
import style from './AdminLoginPage.module.scss'
import { ReactComponent as Logo } from '../../assets/icons/logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { AuthInput } from '../../components'
import { adminLogin } from '../../apis/user'
import Swal from 'sweetalert2'
const AdminLoginPage = () => {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')


  const navigate = useNavigate()
  const handleAdminLogin = async (e) => {
    e.preventDefault();

    if (!account.trim() || !password.trim()) {
      Swal.fire({
        title: '請先登入帳號',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        position: 'top',
      });
      return
    }

    const { success, data, isAdmin, errInfo } = await adminLogin({ account, password })

    if (success && isAdmin) {
      const token = data.data.token
      console.log(token)

      localStorage.setItem('token', token)
      Swal.fire({
        title: '登入成功',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
        position: 'top',
      });
      setError(false)
      navigate('/profile')
      return
    } else {

      Swal.fire({
        title: '登入失敗',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        position: 'top',
      });
      setError(true)
      setMessage(errInfo)
      return
    }

  }

  return (
    <div className={style.container}>
      <Logo className={style.logo} />
      <h3 className={style.title}>後台登入</h3>
      <form className={style.form} onSubmit={handleAdminLogin}>
        <AuthInput label='帳號' id="account" type="text" placeholder="請輸入帳號" value={account} message={message} onChange={(accountValue) => setAccount(accountValue)} isError={error} />
        <AuthInput label='密碼' id="password" type="password" placeholder="請輸入密碼" value={password} onChange={(passwordValue) => setPassword(passwordValue)} isError={error} message={message} />
        <button className={style.button} type="submit" >登入</button>
      </form >
      <div className={style.linkGroup}>
        <Link to='/login' className={style.link}>前台登入</Link>
      </div>
    </div>
  )
}


export default AdminLoginPage