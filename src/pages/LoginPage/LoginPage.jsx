import style from './LoginPage.module.scss'
import { ReactComponent as Logo } from '../../assets/icons/logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { AuthInput } from '../../components'
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react'
import Swal from 'sweetalert2'
import { useEffect } from 'react';

const LoginPage = () => {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const { login, isAuthenticated, user, error, message } = useAuth();
  const navigate = useNavigate()

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
    const success = await login({ account, password });
    if (success) {
      Swal.fire({
        title: '登入成功',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
        position: 'top',
      });
      navigate('/') //wait to solve 
      return
    }

    Swal.fire({
      title: '登入失敗',
      icon: 'error',
      showConfirmButton: false,
      timer: 1000,
      position: 'top',
    });
    return
  }
  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/${user?.id}/`);
    }
  }, [navigate, isAuthenticated, user]);



  return (
    <div className={style.container}>
      <Logo className={style.logo} />
      <h3 className={style.title}>登入Alphitter</h3>
      <form className={style.form} onSubmit={handleLoginSubmit}>
        <AuthInput label='帳號' id="account" type="text" placeholder="請輸入帳號" value={account} onChange={(accountValue) => setAccount(accountValue)} maxLength={50} isError={error} message={message} />

        <AuthInput label='密碼' id="password" type="password" placeholder="請輸入密碼" value={password} onChange={(passwordValue) => setPassword(passwordValue)} isError={error} />
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