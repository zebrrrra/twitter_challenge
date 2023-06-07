import { useState } from 'react'
import style from './RegisterPage.module.scss'
import { ReactComponent as Logo } from '../../assets/icons/logo.svg'
import { Link } from 'react-router-dom'
import { AuthInput } from '../../components'

const RegisterPage = () => {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [confirmWord, setConfirmWord] = useState('')
  let message = ''

  return (
    <div className={style.container}>
      <Logo className={style.logo} />
      <h3 className={style.title}>建立你的帳號</h3>
      <form className={style.form}>
        <AuthInput label='帳號' id="account" type="text" placeholder="請輸入帳號" value={account} message={message} onChange={(accountValue) => setAccount(accountValue)} />

        <AuthInput label='名稱' id="username" type="text" placeholder="請輸入使用者名稱" value={username} message={message} maxLength={50} onChange={(nameValue) => setUsername(nameValue)} />

        <AuthInput label='Email' id="email" type="email" placeholder="請輸入Email" value={email} message={message} onChange={(emailValue) => setEmail(emailValue)} />

        <AuthInput label='密碼' id="password" type="password" placeholder="請輸入密碼" value={password} message={message} onChange={(passwordValue) => setPassword(passwordValue)} />

        <AuthInput label='密碼確認' id="confirm" type="password" placeholder="請再次輸入密碼" value={confirmWord} onChange={(confirmWordValue) => setConfirmWord(confirmWordValue)} />

        <button className={style.button} type="submit">註冊</button>
      </form >
      <div className={style.linkGroup}>
        <Link to='/login' className={style.link}>取消</Link>
      </div>
    </div>
  )
}


export default RegisterPage