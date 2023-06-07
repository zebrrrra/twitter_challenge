import { useState } from 'react'
import style from './AdminLoginPage.module.scss'
import { ReactComponent as Logo } from '../../assets/icons/logo.svg'
import { Link } from 'react-router-dom'
import { AuthInput } from '../../components'

const AdminLoginPage = () => {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  let message = ''
  const handleClick = () => {
    if (!account.trim() || !password.trim()) return
    // wait api data
  }

  // if(account不存在){
  //   message ='帳號不存在!'
  // }

  // if(account重複){
  //   message ='帳號已重複註冊!'
  // }
  return (
    <div className={style.container}>
      <Logo className={style.logo} />
      <h3 className={style.title}>後台登入</h3>
      <form className={style.form}>
        <AuthInput label='帳號' id="account" type="text" placeholder="請輸入帳號" value={account} message={message} onChange={(accountValue) => setAccount(accountValue)} />
        <AuthInput label='密碼' id="password" type="password" placeholder="請輸入密碼" value={password} onChange={(passwordValue) => setPassword(passwordValue)} />
        <button className={style.button} type="submit" onClick={handleClick}>登入</button>
      </form >
      <div className={style.linkGroup}>
        <Link to='/login' className={style.link}>前台登入</Link>
      </div>
    </div>
  )
}


export default AdminLoginPage