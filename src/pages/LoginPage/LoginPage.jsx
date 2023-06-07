import style from './LoginPage.module.scss'
import { ReactComponent as Logo } from '../../assets/icons/logo.svg'
import { Link } from 'react-router-dom'
import { AuthInput } from '../../components'
import { useState } from 'react'

const LoginPage = () => {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const handleClick = () => {
    if (!account.trim() || !password.trim()) return
    // wait api data
  }

  let message = ''
  // if(account不存在){
  //   message ='帳號不存在!'
  // }

  // if(account重複){
  //   message ='帳號已重複註冊!'
  // }

  return (
    <div className={style.container}>
      <Logo className={style.logo} />
      <h3 className={style.title}>登入Alphitter</h3>
      <form className={style.form}>
        <AuthInput label='帳號' id="account" type="text" placeholder="請輸入帳號" value={account} message={message} onChange={(accountValue) => setAccount(accountValue)} />
        <AuthInput label='密碼' id="password" type="password" placeholder="請輸入密碼" value={password} onChange={(passwordValue) => setPassword(passwordValue)} />
        <button className={style.button} type="submit" onClick={handleClick}>登入</button>
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