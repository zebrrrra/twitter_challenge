import style from './LoginPage.module.scss'
import { ReactComponent as Logo } from '../../assets/icons/logo.svg'
import { Link } from 'react-router-dom'
import { AuthInput } from '../../components'
import { useState } from 'react'
import { login } from '../../apis/auth'
import Swal from 'sweetalert2'

const LoginPage = () => {
  // email是帳號 後面會改
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // 回傳token 和user包
  // 不能用解構賦值撰寫，因為await回來的是undefined
  const handleClick = async (e) => {
    if (!email.trim() || !password.trim()) return
    e.preventDefault();

    // return data包＋status
    const data = await login({ email, password })
    const status = data.status
    const { token } = data.data
    console.log(data)

    if (status === 'success') {
      localStorage.setItem('token', token)
      Swal.fire({
        title: '登入成功',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000,
        position: 'top',
      });
      return
    }

    if (status === 'error') {
      Swal.fire({
        title: '登入失敗',
        icon: 'error',
        showConfirmButton: false,
        timer: 1000,
        position: 'top',
      });
      return
    }

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
        <AuthInput label='帳號' id="email" type="text" placeholder="請輸入帳號" value={email} message={message} onChange={(emailValue) => setEmail(emailValue)} maxLength={50} />
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