import { useState, useEffect } from 'react'
import style from './AdminLoginPage.module.scss'
import { ReactComponent as Logo } from '../../assets/icons/logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { AuthInput } from '../../components'
import { useAuth } from '../../context/AuthContext'
import Swal from 'sweetalert2'
const AdminLoginPage = () => {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [responseError, setResponseError] = useState(true)
  const [errorInfo, setErrorInfo] = useState('')
  const { adminLogin, isAuthenticated, user } = useAuth();


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

    const { success, message } = await adminLogin({ account, password })

    if (success) {
      Swal.fire({
        title: '登入成功',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
        position: 'top',
      });
      setResponseError(false)
      return
    } else {
      Swal.fire({
        title: '登入失敗',
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
    if (isAuthenticated) {
      navigate("/admin/list");
    }
  }, [navigate, isAuthenticated, user]);

  const authInputCollection = [
    { label: '帳號', id: '帳號', type: 'text', placeholder: '請輸入帳號', value: account, onChange: (accountValue) => setAccount(accountValue) },
    { label: '密碼', id: '密碼', type: 'password', placeholder: '請輸入密碼', value: password, onChange: (passwordValue) => setPassword(passwordValue) }]
  return (
    <div className={style.container}>
      <Logo className={style.logo} />
      <h3 className={style.title}>後台登入</h3>
      <form className={style.form} onSubmit={handleAdminLogin}>
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
        <button className={style.button} type="submit" >登入</button>
      </form >
      <div className={style.linkGroup}>
        <Link to='/login' className={style.link}>前台登入</Link>
      </div>
    </div>
  )
}


export default AdminLoginPage