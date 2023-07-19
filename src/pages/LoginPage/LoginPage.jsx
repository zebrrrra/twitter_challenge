import style from './LoginPage.module.scss'
import { ReactComponent as Logo } from '../../assets/icons/logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { AuthInput } from '../../components'
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react'
import Swal from 'sweetalert2'
import { useEffect } from 'react';
import useLogin from '../../hooks/LoginHook';

const LoginPage = () => {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [responseError, setResponseError] = useState(true)
  const [errorInfo, setErrorInfo] = useState('')
  const { isAuthenticated, user } = useAuth();
  const { handleLogin } = useLogin()
  const navigate = useNavigate()

  const authInputCollection = [
    { label: '帳號', id: '帳號', type: 'text', placeholder: '請輸入帳號', value: account, onChange: (accountValue) => setAccount(accountValue) },
    { label: '密碼', id: '密碼', type: 'password', placeholder: '請輸入密碼', value: password, onChange: (passwordValue) => setPassword(passwordValue) }]



  const handleLoginSubmit = async (e) => {
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

    const response = await handleLogin({ account, password });

    if (response.success) {
      if (response.role === 'user') {
        Swal.fire({
          title: '登入成功',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position: 'top',
        });
        setResponseError(false)
        navigate('/main')
        return
      }
    } else {
      Swal.fire({
        title: '登入失敗',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        position: 'top',
      });
      setResponseError(true)
      setErrorInfo(response.message)
      return
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/main');

    }
  }, [navigate, isAuthenticated, user]);


  return (
    <div className={style.container}>
      <Logo className={style.logo} />
      <h3 className={style.title}>登入Alphitter</h3>
      <form className={style.form} onSubmit={handleLoginSubmit}>
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
        <Link to='/register' className={style.link}>註冊</Link>
        ・
        <Link to='/admin' className={style.link}>後台登入</Link>
      </div>
    </div>
  )
}



export default LoginPage