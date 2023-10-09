import { useState, useEffect } from 'react'
import style from './AdminLoginPage.module.scss'
import { ReactComponent as Logo } from '../../assets/icons/logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { AuthInput } from '../../components'
import { useAuth } from '../../context/AuthContext'
import { useAdminLogin } from '../../hooks/LoginHook'
import { ClipLoader } from 'react-spinners'

const AdminLoginPage = () => {
  const [userData, setUserData] = useState({ account: '', password: '' })
  const { isAuthenticated } = useAuth();
  const { mutation, responseError, errorInfo } = useAdminLogin(userData)
  const navigate = useNavigate()

  const override = {
    position: 'absolute',
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/list");
    }
  }, [navigate, isAuthenticated]);

  const authInputCollection = [
    { label: '帳號', id: '帳號', type: 'text', placeholder: '請輸入帳號', value: userData.account, onChange: (value) => setUserData(prev => ({ ...prev, 'account': value })), disabled: mutation?.isLoading },
    { label: '密碼', id: '密碼', type: 'password', placeholder: '請輸入密碼', value: userData.password, onChange: (value) => setUserData(prev => ({ ...prev, 'password': value })), disabled: mutation?.isLoading }]
  return (
    <div className={style.container}>
      <Logo className={style.logo} />
      <h3 className={style.title}>後台登入</h3>
      <ClipLoader size={60} color='#cccccc' loading={mutation.isLoading} cssOverride={override} />
      <form className={style.form} onSubmit={mutation.mutate}>
        {authInputCollection.map(({ label, id, type, placeholder, value, maxLength, onChange, disabled }) => (
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
            disabled={disabled}
          />
        ))}
        <button className={style.button} type="submit" disabled={mutation.isLoading}>登入</button>
      </form >
      <div className={style.linkGroup}>
        <Link to='/login' className={style.link}>前台登入</Link>
      </div>
    </div>
  )
}


export default AdminLoginPage